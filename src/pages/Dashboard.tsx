
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ShoppingBag, Clock, Star, Plus, MapPin } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();

  const recentOrders = [
    {
      id: '1',
      items: ['Jollof Rice & Chicken', 'Plantain'],
      total: 3200,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '2',
      items: ['Native Rice & Fish', 'Chicken Peppersoup'],
      total: 4800,
      status: 'preparing',
      date: '2024-01-14',
    },
  ];

  const walletBalance = 15500;
  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <MapPin className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm text-gray-600">Lagos, Nigeria</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Manage your orders, wallet, and preferences from your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Wallet</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{formatPrice(walletBalance)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Orders</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Pending</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Points</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">1,240</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl">Recent Orders</CardTitle>
                <CardDescription className="text-base">
                  Your latest food orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 mb-1">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 mb-2 truncate">
                          {order.items.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-lg text-gray-900 mb-1">{formatPrice(order.total)}</p>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/orders">
                    <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 hover:bg-orange-50 transition-all duration-300">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Wallet</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{formatPrice(walletBalance)}</p>
                  <p className="text-sm text-gray-600">Available Balance</p>
                </div>
                <div className="space-y-3">
                  <Link to="/wallet">
                    <Button className="w-full h-12 text-base font-semibold bg-gradient-warm shadow-md hover:shadow-lg transition-all duration-300">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                  </Link>
                  <Link to="/wallet/history">
                    <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 hover:bg-orange-50 transition-all duration-300">
                      Transaction History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/catalog">
                    <Button className="w-full h-12 text-base font-semibold" variant="outline">
                      Browse Menu
                    </Button>
                  </Link>
                  <Link to="/favorites">
                    <Button className="w-full h-12 text-base font-semibold" variant="outline">
                      My Favorites
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button className="w-full h-12 text-base font-semibold" variant="outline">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
