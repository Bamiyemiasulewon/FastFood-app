
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  CheckCircle, 
  Circle,
  Truck,
  ChefHat,
  Package
} from 'lucide-react';

interface OrderTrackingProps {
  orderId: string;
  onClose?: () => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState(0);

  const orderStatuses = [
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, time: '2:30 PM' },
    { id: 'preparing', label: 'Preparing', icon: ChefHat, time: '2:35 PM' },
    { id: 'ready', label: 'Ready for Pickup', icon: Package, time: '2:55 PM' },
    { id: 'picked_up', label: 'Picked Up', icon: Truck, time: '3:05 PM' },
    { id: 'en_route', label: 'En Route', icon: MapPin, time: '3:10 PM' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, time: 'Estimated: 3:25 PM' }
  ];

  const riderInfo = {
    name: 'Ahmed Ibrahim',
    phone: '+234 801 234 5678',
    rating: 4.8,
    estimatedArrival: '3:25 PM'
  };

  const orderDetails = {
    items: [
      { name: 'Jollof Rice & Chicken', quantity: 1, price: 2500 },
      { name: 'Chicken Peppersoup', quantity: 1, price: 1800 }
    ],
    total: 4300,
    deliveryAddress: 'Victoria Island, Lagos'
  };

  // Simulate real-time progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prev => (prev < orderStatuses.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Order Header */}
      <Card className="card-premium">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-display text-xl text-charcoal">
                Order #{orderId}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated delivery: {riderInfo.estimatedArrival}
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-gradient-gold text-charcoal font-semibold"
            >
              {orderStatuses[currentStatus]?.label}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Live Map Placeholder */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="aspect-video bg-gradient-to-br from-sage/20 to-accent/20 rounded-xl border-2 border-dashed border-sage/30 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-sage mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Live map tracking would appear here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Requires backend integration)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Progress */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-display text-lg text-charcoal">Order Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderStatuses.map((status, index) => {
              const Icon = status.icon;
              const isCompleted = index <= currentStatus;
              const isCurrent = index === currentStatus;
              
              return (
                <div key={status.id} className="flex items-center space-x-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted ? 'bg-gradient-burgundy text-cream' : 'bg-muted text-muted-foreground'}
                    ${isCurrent ? 'ring-4 ring-gold/30 glow-gold' : ''}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCompleted ? 'text-charcoal' : 'text-muted-foreground'}`}>
                      {status.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{status.time}</p>
                  </div>
                  {isCurrent && (
                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rider Information */}
      {currentStatus >= 3 && (
        <Card className="card-premium animate-slide-down">
          <CardHeader>
            <CardTitle className="font-display text-lg text-charcoal">Your Rider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-burgundy rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-cream" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-charcoal">{riderInfo.name}</p>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                  <span className="text-sm text-muted-foreground">{riderInfo.rating}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-burgundy text-burgundy hover:bg-burgundy hover:text-cream"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-display text-lg text-charcoal">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm">{item.quantity}x {item.name}</span>
                <span className="text-sm font-medium">₦{item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-burgundy">₦{orderDetails.total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-3">
              <MapPin className="w-4 h-4 mr-2" />
              {orderDetails.deliveryAddress}
            </div>
          </div>
        </CardContent>
      </Card>

      {onClose && (
        <Button 
          variant="outline" 
          onClick={onClose}
          className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-cream"
        >
          Close Tracking
        </Button>
      )}
    </div>
  );
};
