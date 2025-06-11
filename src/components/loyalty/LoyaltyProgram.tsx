
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Crown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const LoyaltyProgram: React.FC = () => {
  const { user } = useAuthStore();
  
  // Mock loyalty data - in real app, this would come from API
  const loyaltyData = {
    points: 750,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 250,
    totalOrdersThisMonth: 8,
    lifetimeOrders: 45,
    rewardsAvailable: [
      { id: 1, name: '10% Off Next Order', points: 100, available: true },
      { id: 2, name: 'Free Chicken Peppersoup', points: 200, available: true },
      { id: 3, name: 'Free Delivery', points: 150, available: true },
      { id: 4, name: '₦500 Off Order', points: 500, available: true },
      { id: 5, name: 'VIP Table Reservation', points: 1000, available: false }
    ]
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return <Gift className="w-5 h-5 text-amber-600" />;
      case 'Silver': return <Star className="w-5 h-5 text-gray-500" />;
      case 'Gold': return <Trophy className="w-5 h-5 text-gold" />;
      case 'Platinum': return <Crown className="w-5 h-5 text-purple-600" />;
      default: return <Gift className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-100 text-amber-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = ((loyaltyData.points % 1000) / 1000) * 100;

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Loyalty Status Card */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-charcoal">
            {getTierIcon(loyaltyData.tier)}
            <span className="font-display">Loyalty Program</span>
            <Badge className={`${getTierColor(loyaltyData.tier)} font-semibold`}>
              {loyaltyData.tier} Member
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Points Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-burgundy mb-2">
              {loyaltyData.points.toLocaleString()}
            </div>
            <p className="text-muted-foreground">Reward Points</p>
          </div>

          {/* Progress to Next Tier */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to {loyaltyData.nextTier}</span>
              <span className="text-muted-foreground">
                {loyaltyData.pointsToNextTier} points needed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-cream rounded-lg">
              <div className="text-2xl font-bold text-charcoal">
                {loyaltyData.totalOrdersThisMonth}
              </div>
              <p className="text-sm text-muted-foreground">Orders This Month</p>
            </div>
            <div className="text-center p-4 bg-cream rounded-lg">
              <div className="text-2xl font-bold text-charcoal">
                {loyaltyData.lifetimeOrders}
              </div>
              <p className="text-sm text-muted-foreground">Lifetime Orders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-display text-charcoal">Available Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loyaltyData.rewardsAvailable.map((reward) => (
              <div
                key={reward.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  reward.available 
                    ? 'border-gold/20 bg-gold/5 hover:bg-gold/10' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Gift className={`w-5 h-5 ${reward.available ? 'text-gold' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${reward.available ? 'text-charcoal' : 'text-gray-500'}`}>
                      {reward.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {reward.points} points
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={reward.available ? "default" : "secondary"}
                  className={reward.available ? 'bg-burgundy hover:bg-burgundy/90' : ''}
                >
                  {reward.available ? 'Redeem' : 'Locked'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
