
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ShoppingBag, Clock, Star, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();

  const recentOrders = [
    {
      id: '1',
      items: ['Grilled Salmon', 'Caesar Salad'],
      total: 37.98,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '2',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 22.98,
      status: 'preparing',
      date: '2024-01-14',
    },
  ];

  const walletBalance = 125.50;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Manage your orders, wallet, and preferences from your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-900">${walletBalance.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">1,240</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your latest food orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.items.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
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
                    <Button variant="outline" className="w-full">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary">${walletBalance.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Available Balance</p>
                </div>
                <div className="space-y-3">
                  <Link to="/wallet">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                  </Link>
                  <Link to="/wallet/history">
                    <Button variant="outline" className="w-full">
                      Transaction History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/catalog">
                    <Button className="w-full" variant="outline">
                      Browse Menu
                    </Button>
                  </Link>
                  <Link to="/favorites">
                    <Button className="w-full" variant="outline">
                      My Favorites
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button className="w-full" variant="outline">
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
