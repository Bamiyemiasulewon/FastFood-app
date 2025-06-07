
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, MapPin, Truck, ChefHat, Award } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export default function Landing() {
  const featuredFoods = [
    {
      id: '1',
      name: 'Jollof Rice & Chicken',
      price: 2500,
      image: '/lovable-uploads/65d14216-f2ea-4ef3-b985-911443e4b1df.png',
      rating: 4.8,
      preparationTime: 25,
      description: 'Aromatic jollof rice with tender grilled chicken'
    },
    {
      id: '2',
      name: 'Jollof Rice & Turkey',
      price: 3200,
      image: '/lovable-uploads/bda71da5-6763-48c0-8724-34990552d3a6.png',
      rating: 4.9,
      preparationTime: 30,
      description: 'Rich jollof rice with succulent turkey pieces'
    },
    {
      id: '3',
      name: 'Jollof Spaghetti & Chicken',
      price: 2200,
      image: '/lovable-uploads/eeb22afc-b937-41da-a72c-e61c256806b5.png',
      rating: 4.7,
      preparationTime: 20,
      description: 'Spicy jollof spaghetti with grilled chicken'
    },
    {
      id: '4',
      name: 'Chicken Peppersoup',
      price: 1800,
      image: '/lovable-uploads/193ddcee-7c74-4d44-915f-1ca31e4cfe04.png',
      rating: 4.6,
      preparationTime: 15,
      description: 'Spicy chicken peppersoup with local spices'
    }
  ];

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-texture">
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/65d14216-f2ea-4ef3-b985-911443e4b1df.png"
            alt="Elegant Nigerian Jollof Rice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy/60 via-burgundy/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="mb-6 animate-fade-in">
              <Logo size="lg" />
            </div>
            
            <h1 className="font-display text-responsive-xl font-bold mb-6 text-cream animate-slide-up">
              Delicious Nigerian Food
              <br />
              <span className="text-gold">Delivered to You</span>
            </h1>
            
            <p className="text-responsive-base text-cream/90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Experience the authentic taste of Lagos with our carefully prepared local dishes. 
              Fresh ingredients, traditional recipes, and fast delivery across Lagos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/catalog" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full sm:w-auto btn-premium text-lg px-8 py-4">
                  Order Now
                </Button>
              </Link>
              <Link to="/signup" className="flex-1 sm:flex-none">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Location Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-gold/30 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <MapPin className="w-5 h-5 text-gold mr-2" />
              <span className="text-cream font-medium">Serving Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-charcoal">
              Why Choose <span className="text-gradient-premium">Pallette n' Drapes?</span>
            </h2>
            <p className="text-lg text-muted-foreground">Culinary artistry meets exceptional service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 card-premium rounded-2xl group">
              <div className="w-20 h-20 bg-gradient-burgundy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:glow-gold transition-all duration-300">
                <Truck className="w-10 h-10 text-cream" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-charcoal">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quick delivery across Lagos Island, Victoria Island, Lekki, and Mainland areas
              </p>
            </div>
            
            <div className="text-center p-8 card-premium rounded-2xl group">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:glow-gold transition-all duration-300">
                <ChefHat className="w-10 h-10 text-charcoal" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-charcoal">Quality Food</h3>
              <p className="text-muted-foreground leading-relaxed">
                Authentic Nigerian dishes prepared with fresh, local ingredients
              </p>
            </div>
            
            <div className="text-center p-8 card-premium rounded-2xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-sage to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:glow-gold transition-all duration-300">
                <Award className="w-10 h-10 text-charcoal" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4 text-charcoal">Always Fresh</h3>
              <p className="text-muted-foreground leading-relaxed">
                Prepared to order and delivered hot to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16 sm:py-20 bg-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-charcoal">
              Popular <span className="text-gradient-premium">Nigerian Dishes</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most loved local delicacies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFoods.map((food, index) => (
              <Card key={food.id} className="overflow-hidden card-premium rounded-2xl group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-square bg-gradient-to-br from-cream to-muted relative overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center shadow-lg">
                    <Star className="w-4 h-4 text-gold mr-1" fill="currentColor" />
                    <span className="text-sm font-semibold text-charcoal">{food.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-xl mb-3 text-charcoal line-clamp-2">{food.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{food.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl font-bold text-burgundy">{formatPrice(food.price)}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {food.preparationTime}min
                    </div>
                  </div>
                  
                  <Button className="w-full btn-premium rounded-xl py-3 text-base font-semibold">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream transition-all duration-300 rounded-xl">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
