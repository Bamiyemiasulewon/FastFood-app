
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, MapPin, Truck } from 'lucide-react';

export default function Landing() {
  const featuredFoods = [
    {
      id: '1',
      name: 'Jollof Rice & Chicken',
      price: 2500,
      image: '/placeholder.svg',
      rating: 4.8,
      preparationTime: 25,
      description: 'Aromatic jollof rice with tender grilled chicken'
    },
    {
      id: '2',
      name: 'Jollof Spaghetti',
      price: 2200,
      image: '/placeholder.svg',
      rating: 4.7,
      preparationTime: 20,
      description: 'Spicy jollof spaghetti with mixed vegetables'
    },
    {
      id: '3',
      name: 'Native Rice & Fish',
      price: 3000,
      image: '/placeholder.svg',
      rating: 4.9,
      preparationTime: 30,
      description: 'Traditional native rice with fresh fish'
    },
    {
      id: '4',
      name: 'Chicken Peppersoup',
      price: 1800,
      image: '/placeholder.svg',
      rating: 4.6,
      preparationTime: 15,
      description: 'Spicy chicken peppersoup with local spices'
    }
  ];

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Delicious Nigerian Food</span>
              <br />
              <span className="text-gray-800">Delivered to You</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the authentic taste of Lagos with our carefully prepared local dishes. 
              Fresh ingredients, traditional recipes, and fast delivery across Lagos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-warm shadow-lg hover:shadow-xl transition-all duration-300">
                  Order Now
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-2 hover:bg-orange-50 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Location Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-orange-100">
              <MapPin className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Serving Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Pallette n' Drapes?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick delivery across Lagos Island, Victoria Island, Lekki, and Mainland areas
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality Food</h3>
              <p className="text-gray-600 leading-relaxed">
                Authentic Nigerian dishes prepared with fresh, local ingredients
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Always Fresh</h3>
              <p className="text-gray-600 leading-relaxed">
                Prepared to order and delivered hot to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Popular Nigerian Dishes
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most loved local delicacies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFoods.map((food) => (
              <Card key={food.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 relative overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-xs font-semibold">{food.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{food.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{food.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary">{formatPrice(food.price)}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {food.preparationTime}min
                    </div>
                  </div>
                  
                  <Button className="w-full h-10 bg-gradient-warm hover:shadow-md transition-all duration-300">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-warm text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Taste Lagos?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-orange-100">
            Join thousands of food lovers enjoying authentic Nigerian cuisine delivered fast
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold bg-white text-primary hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
