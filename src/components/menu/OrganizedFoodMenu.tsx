import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Star, Clock, ShoppingCart, Plus, Minus, ChevronDown } from 'lucide-react';
import { useFoodStore } from '@/store/foodStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

interface OrganizedFoodMenuProps {
  searchTerm: string;
  dietaryFilter: string;
  sortBy: string;
}

const OrganizedFoodMenu: React.FC<OrganizedFoodMenuProps> = ({ 
  searchTerm, 
  dietaryFilter, 
  sortBy 
}) => {
  const { foods } = useFoodStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Define category structure with Rice Dishes, Pasta, and Fried Rice
  const categoryStructure = {
    'Rice Dishes': {
      icon: '🍚',
      description: 'Traditional Nigerian rice preparations'
    },
    'Pasta': {
      icon: '🍝',
      description: 'Nigerian-style pasta dishes'
    },
    'Fried Rice': {
      icon: '🍛',
      description: 'Delicious fried rice varieties'
    }
  };

  // Filter and organize foods by category
  const organizedFoods = useMemo(() => {
    const filtered = foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDietary = dietaryFilter === 'all' ||
                            (dietaryFilter === 'vegetarian' && food.isVegetarian) ||
                            (dietaryFilter === 'spicy' && food.isSpicy);
      
      return matchesSearch && matchesDietary && food.isAvailable;
    });

    // Sort foods
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'time':
          return a.preparationTime - b.preparationTime;
        default:
          return b.rating - a.rating;
      }
    });

    // Group by category
    const grouped = sorted.reduce((acc, food) => {
      const category = food.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(food);
      return acc;
    }, {} as Record<string, typeof foods>);

    return grouped;
  }, [foods, searchTerm, dietaryFilter, sortBy]);

  const updateQuantity = (foodId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [foodId]: Math.max(0, (prev[foodId] || 0) + delta)
    }));
  };

  const handleAddToCart = (food: any) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    const quantity = quantities[food.id] || 1;
    addItem(food, quantity);
    
    setQuantities(prev => ({ ...prev, [food.id]: 0 }));
    toast.success(`${food.name} added to cart!`);
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const totalItemsCount = Object.values(organizedFoods).flat().length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Menu Categories</h2>
        <p className="text-muted-foreground">
          {totalItemsCount} dishes across {Object.keys(organizedFoods).length} categories
        </p>
      </div>

      {/* Category Accordion */}
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(organizedFoods).map(([category, categoryFoods]) => {
          const categoryInfo = categoryStructure[category as keyof typeof categoryStructure] || {
            icon: '🍽️',
            description: 'Delicious food items'
          };

          return (
            <AccordionItem 
              key={category} 
              value={category}
              className="border border-border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryInfo.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg text-charcoal">{category}</h3>
                      <p className="text-sm text-muted-foreground">{categoryInfo.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {categoryFoods.length} item{categoryFoods.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {categoryFoods.map((food) => (
                    <Card key={food.id} className="overflow-hidden card-premium rounded-xl group hover:shadow-lg transition-shadow">
                      {food.image && (
                        <div className="aspect-square bg-gradient-to-br from-cream to-muted relative overflow-hidden">
                          <img 
                            src={food.image} 
                            alt={food.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {food.isVegetarian && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                Vegetarian
                              </Badge>
                            )}
                            {food.isSpicy && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                                Spicy
                              </Badge>
                            )}
                          </div>
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-lg">
                            <Star className="w-3 h-3 text-gold mr-1" fill="currentColor" />
                            <span className="text-xs font-semibold text-charcoal">{food.rating}</span>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-lg mb-2 text-charcoal line-clamp-1">
                          {food.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {food.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-lg text-burgundy">
                            {formatPrice(food.price)}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {food.preparationTime}min
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center border rounded-md">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(food.id, -1)}
                              disabled={!quantities[food.id]}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">
                              {quantities[food.id] || 0}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(food.id, 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full btn-premium rounded-lg py-2 text-sm font-semibold"
                          onClick={() => handleAddToCart(food)}
                          disabled={!user || !quantities[food.id]}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {totalItemsCount === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">No dishes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default OrganizedFoodMenu;
