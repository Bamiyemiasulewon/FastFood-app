
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Clock, 
  Star, 
  Gift,
  MapPin,
  Sparkles,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoyaltyProgram } from '@/components/loyalty/LoyaltyProgram';
import { ReservationSystem } from '@/components/reservations/ReservationSystem';
import { AIRecommendations } from '@/components/recommendations/AIRecommendations';

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-texture flex items-center justify-center">
        <Card className="card-premium w-full max-w-md">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access your dashboard
            </p>
            <Link to="/login">
              <Button className="btn-premium">Login Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Browse Menu',
      description: 'Explore our delicious Nigerian dishes',
      icon: <ShoppingCart className="w-6 h-6" />,
      link: '/catalog',
      color: 'bg-burgundy'
    },
    {
      title: 'Order History',
      description: 'View your past orders and reorder favorites',
      icon: <Clock className="w-6 h-6" />,
      link: '/orders',
      color: 'bg-gold'
    },
    {
      title: 'Make Reservation',
      description: 'Book a table for dining in',
      icon: <Users className="w-6 h-6" />,
      link: '#reservations',
      color: 'bg-sage'
    },
    {
      title: 'Track Order',
      description: 'Follow your order in real-time',
      icon: <MapPin className="w-6 h-6" />,
      link: '/tracking-demo',
      color: 'bg-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-texture py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            Welcome back, <span className="text-gradient-premium">{user.firstName}!</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready for your next culinary adventure?
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="card-premium group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-charcoal">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - AI Recommendations */}
          <div className="lg:col-span-2 space-y-8">
            <AIRecommendations />
            
            {/* Recent Activity */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-charcoal">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity to show</p>
                  <p className="text-sm">Start by placing your first order!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Loyalty Program */}
          <div className="space-y-8">
            <LoyaltyProgram />
            
            {/* Quick Stats */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-charcoal">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Favorite Dish</span>
                  <span className="text-sm text-charcoal">Not set</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="text-sm text-charcoal">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reservation Section */}
        <div id="reservations" className="mt-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Make a <span className="text-gradient-premium">Reservation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Reserve your table for an unforgettable dining experience
            </p>
          </div>
          <ReservationSystem />
        </div>
      </div>
    </div>
  );
}
