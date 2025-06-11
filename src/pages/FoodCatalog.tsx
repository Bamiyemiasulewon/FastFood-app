
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Clock, Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useFoodStore } from '@/store/foodStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export default function FoodCatalog() {
  const { foods } = useFoodStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ['all', ...new Set(foods.map(food => food.category))];

  const filteredFoods = useMemo(() => {
    return foods
      .filter(food => {
        const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            food.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
        const matchesDietary = dietaryFilter === 'all' ||
                              (dietaryFilter === 'vegetarian' && food.isVegetarian) ||
                              (dietaryFilter === 'spicy' && food.isSpicy);
        
        return matchesSearch && matchesCategory && matchesDietary && food.isAvailable;
      })
      .sort((a, b) => {
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
  }, [foods, searchTerm, selectedCategory, dietaryFilter, sortBy]);

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

  return (
    <div className="min-h-screen bg-texture py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            Our <span className="text-gradient-premium">Menu</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover authentic Nigerian cuisine prepared with love
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dietary</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="spicy">Spicy</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="time">Fastest Prep</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredFoods.length} dish{filteredFoods.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <Card key={food.id} className="overflow-hidden card-premium rounded-2xl group">
              <div className="aspect-square bg-gradient-to-br from-cream to-muted relative overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {food.isVegetarian && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Vegetarian
                    </Badge>
                  )}
                  {food.isSpicy && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      Spicy
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center shadow-lg">
                  <Star className="w-4 h-4 text-gold mr-1" fill="currentColor" />
                  <span className="text-sm font-semibold text-charcoal">{food.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-xl mb-2 text-charcoal line-clamp-2">
                  {food.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {food.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-burgundy">
                    {formatPrice(food.price)}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {food.preparationTime}min
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(food.id, -1)}
                      disabled={!quantities[food.id]}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-sm font-semibold">
                      {quantities[food.id] || 0}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(food.id, 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full btn-premium rounded-xl py-3 text-base font-semibold"
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

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">No dishes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
