
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Clock, ShoppingCart } from 'lucide-react';
import { useFoodStore } from '@/store/foodStore';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export const AIRecommendations: React.FC = () => {
  const { foods } = useFoodStore();
  const { getOrdersByUser } = useOrderStore();
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [user, foods]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!user) {
      // For non-logged in users, show popular items
      const popularItems = foods
        .filter(food => food.isAvailable && food.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map(food => ({
          ...food,
          reason: 'Highly rated by customers',
          confidence: 0.85
        }));
      
      setRecommendations(popularItems);
      setIsLoading(false);
      return;
    }

    // For logged-in users, analyze order history
    const userOrders = getOrdersByUser(user.id);
    const orderedFoodIds = userOrders.flatMap(order => 
      order.items.map(item => item.food.id)
    );
    
    // Get user's preferred categories
    const categoryCount: Record<string, number> = {};
    const spicyPreference = { spicy: 0, mild: 0 };
    
    userOrders.forEach(order => {
      order.items.forEach(item => {
        categoryCount[item.food.category] = (categoryCount[item.food.category] || 0) + 1;
        if (item.food.isSpicy) spicyPreference.spicy++;
        else spicyPreference.mild++;
      });
    });

    const preferredCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([category]) => category);

    const likesSpicy = spicyPreference.spicy > spicyPreference.mild;

    // Generate recommendations based on user preferences
    let recommended = foods
      .filter(food => 
        food.isAvailable && 
        !orderedFoodIds.includes(food.id) &&
        food.rating >= 4.0
      )
      .map(food => {
        let score = food.rating * 0.4; // Base score from rating
        let reason = 'Popular choice';
        let confidence = 0.6;

        // Boost score for preferred categories
        if (preferredCategories.includes(food.category)) {
          score += 2;
          reason = `Based on your love for ${food.category}`;
          confidence += 0.2;
        }

        // Adjust for spice preference
        if (food.isSpicy === likesSpicy) {
          score += 1;
          confidence += 0.1;
        }

        // Boost for similar price range
        const avgOrderValue = userOrders.length > 0 
          ? userOrders.reduce((sum, order) => sum + order.totalAmount, 0) / userOrders.length
          : 2500;
        
        if (Math.abs(food.price - avgOrderValue / 2) < 500) {
          score += 0.5;
          confidence += 0.05;
        }

        return {
          ...food,
          score,
          reason,
          confidence: Math.min(confidence, 0.95)
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    // If not enough recommendations, add some popular items
    if (recommended.length < 3) {
      const additionalItems = foods
        .filter(food => 
          food.isAvailable && 
          food.rating >= 4.5 &&
          !recommended.some(rec => rec.id === food.id)
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3 - recommended.length)
        .map(food => ({
          ...food,
          reason: 'Trending now',
          confidence: 0.75
        }));
      
      recommended = [...recommended, ...additionalItems];
    }

    setRecommendations(recommended);
    setIsLoading(false);
  };

  const handleAddToCart = (food: any) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    addToCart({
      food,
      quantity: 1,
      specialInstructions: ''
    });
    
    toast.success(`${food.name} added to cart!`);
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  if (isLoading) {
    return (
      <Card className="card-premium">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-burgundy animate-spin" />
            <span className="text-muted-foreground">Generating personalized recommendations...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-charcoal">
          <Sparkles className="w-6 h-6 text-burgundy" />
          <span className="font-display">AI Recommendations</span>
          {user && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Personalized for {user.firstName}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((food) => (
            <div
              key={food.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-cream/50 to-white"
            >
              <div className="flex gap-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-charcoal mb-1">{food.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold mr-1" fill="currentColor" />
                      <span className="text-sm">{food.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{food.preparationTime}min</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {food.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-burgundy">
                      {formatPrice(food.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {Math.round(food.confidence * 100)}% match
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(food)}
                        className="h-8 px-3 bg-burgundy hover:bg-burgundy/90"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations available at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
