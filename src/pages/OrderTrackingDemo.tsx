
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderTracking } from '@/components/order/OrderTracking';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderTrackingDemo() {
  const [showTracking, setShowTracking] = useState(false);

  if (showTracking) {
    return (
      <div className="min-h-screen bg-texture p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button
            variant="ghost"
            onClick={() => setShowTracking(false)}
            className="mb-6 text-burgundy hover:bg-burgundy/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo
          </Button>
          <OrderTracking 
            orderId="ORD-2024-001" 
            onClose={() => setShowTracking(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            Premium <span className="text-gradient-premium">Order Tracking</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Experience our sophisticated order tracking interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-display text-xl text-charcoal">
                Real-time Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Live order status updates with estimated delivery times and rider information.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-burgundy rounded-full mr-3" />
                  Order confirmation & preparation status
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                  Rider assignment & contact details
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                  Live delivery progress tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-display text-xl text-charcoal">
                Premium Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Elegant design with smooth animations and intuitive interface.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-burgundy rounded-full mr-3" />
                  Beautiful visual progress indicators
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                  Interactive map integration ready
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                  Mobile-first responsive design
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setShowTracking(true)}
            className="btn-premium px-8 py-4 text-lg font-semibold"
          >
            View Live Demo
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Simulated order tracking with real-time progress updates
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy hover:text-cream">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
