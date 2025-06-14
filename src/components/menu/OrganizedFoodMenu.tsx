
import React, { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useFoodStore } from '@/store/foodStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import FoodCard from './FoodCard';

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

  // Define category structure with updated categories
  const categoryStructure = {
    'Jollof rice': {
      icon: '🍚',
      description: 'Traditional Nigerian jollof rice preparations'
    },
    'Spaghetti': {
      icon: '🍝',
      description: 'Nigerian-style spaghetti dishes'
    },
    'Fried Rice': {
      icon: '🍛',
      description: 'Delicious fried rice varieties'
    },
    'White Rice & Native rice': {
      icon: '🍚',
      description: 'White rice and native rice preparations'
    },
    'Peppersoup': {
      icon: '🍲',
      description: 'Spicy traditional Nigerian peppersoup'
    },
    'Protein': {
      icon: '🥩',
      description: 'Fresh protein options'
    },
    'Extras': {
      icon: '🍽️',
      description: 'Additional sides and extras'
    }
  };

  // Filter and organize foods by category with memoization
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

  const updateQuantity = useCallback((foodId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [foodId]: Math.max(0, (prev[foodId] || 0) + delta)
    }));
  }, []);

  const handleAddToCart = useCallback((food: any) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    const quantity = quantities[food.id] || 1;
    addItem(food, quantity);
    
    setQuantities(prev => ({ ...prev, [food.id]: 0 }));
    toast.success(`${food.name} added to cart!`);
  }, [user, quantities, addItem]);

  const formatPrice = useCallback((price: number) => `₦${price.toLocaleString()}`, []);

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
                    <FoodCard
                      key={food.id}
                      food={food}
                      quantity={quantities[food.id] || 0}
                      onUpdateQuantity={(delta) => updateQuantity(food.id, delta)}
                      onAddToCart={() => handleAddToCart(food)}
                      isUserLoggedIn={!!user}
                      formatPrice={formatPrice}
                    />
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
