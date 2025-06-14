import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, MapPin, Smartphone, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Easy Ordering",
      description: "Order your favorite Nigerian dishes with just a few taps"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Delivery",
      description: "Fast delivery to your doorstep in 30 minutes or less"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Track your order from kitchen to your door"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Food",
      description: "Authentic Nigerian cuisine made with fresh ingredients"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Food Background */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20 overflow-hidden">
        {/* Background Food Images */}
        <div className="absolute inset-0 opacity-20">
          <div className="flex h-full">
            <div className="flex-1 bg-cover bg-center" style={{backgroundImage: 'url(/lovable-uploads/1b359bf1-1387-4e57-bfda-027bd90b3fb4.png)'}}></div>
            <div className="flex-1 bg-cover bg-center" style={{backgroundImage: 'url(/lovable-uploads/bf6e29a5-e1c7-4579-b5a6-65094d831a22.png)'}}></div>
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Authentic Nigerian Cuisine
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience the rich flavors of our restaurant delivered fresh to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/catalog">Order Now</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white font-semibold shadow-lg"
                    asChild
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5" />
                      My Dashboard
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/catalog">View Menu</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Pallette n' Drapes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a food delivery service. We're your gateway to authentic Nigerian flavors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Dishes
            </h2>
            <p className="text-xl text-gray-600">
              Taste the favorites that keep our customers coming back
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Jollof Rice & Chicken",
                image: "/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png",
                price: "₦2,500",
                rating: 4.8
              },
              {
                name: "Jollof Spaghetti & Chicken",
                image: "/lovable-uploads/bf6e29a5-e1c7-4579-b5a6-65094d831a22.png",
                price: "₦2,200",
                rating: 4.7
              },
              {
                name: "Catfish Peppersoup",
                image: "/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png",
                price: "₦1,800",
                rating: 4.6
              }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">{dish.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{dish.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/catalog">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to taste authentic Nigerian cuisine?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily meals.
          </p>
          {!user && (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">Sign Up Now</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
