
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Truck } from 'lucide-react';

const featuredFoods = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    rating: 4.8,
    preparationTime: 25,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella and basil',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    rating: 4.6,
    preparationTime: 20,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan and croutons',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
    rating: 4.5,
    preparationTime: 10,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-warm text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Delicious Food,<br />
              <span className="text-amber-200">Delivered Fresh</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-amber-100">
              Experience the finest flavors from our kitchen to your table. 
              Fast delivery, fresh ingredients, unforgettable taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                  Order Now
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                >
                  Join Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Pallette n' Drapes?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional food experiences with every order
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  Only the finest ingredients and expert preparation for every dish
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Service</h3>
                <p className="text-gray-600">
                  Fast preparation and delivery without compromising on quality
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fresh Delivery</h3>
                <p className="text-gray-600">
                  Hot, fresh food delivered right to your doorstep in record time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Dishes
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and chef-recommended dishes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map((food) => (
              <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{food.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
                  <p className="text-gray-600 mb-4">{food.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">${food.price}</span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{food.preparationTime} min</span>
                    </div>
                  </div>
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg" variant="outline">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-warm text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Join thousands of food lovers who trust Pallette n' Drapes for their daily meals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                Create Account
              </Button>
            </Link>
            <Link to="/catalog">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
