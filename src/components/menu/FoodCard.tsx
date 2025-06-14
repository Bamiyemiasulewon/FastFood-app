
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Food } from '@/types';

interface FoodCardProps {
  food: Food;
  quantity: number;
  onUpdateQuantity: (delta: number) => void;
  onAddToCart: () => void;
  isUserLoggedIn: boolean;
  formatPrice: (price: number) => string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  quantity,
  onUpdateQuantity,
  onAddToCart,
  isUserLoggedIn,
  formatPrice
}) => {
  return (
    <Card className="overflow-hidden card-premium rounded-xl group hover:shadow-lg transition-shadow">
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
              onClick={() => onUpdateQuantity(-1)}
              disabled={!quantity}
              className="h-7 w-7 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onUpdateQuantity(1)}
              className="h-7 w-7 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full btn-premium rounded-lg py-2 text-sm font-semibold"
          onClick={onAddToCart}
          disabled={!isUserLoggedIn || !quantity}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
