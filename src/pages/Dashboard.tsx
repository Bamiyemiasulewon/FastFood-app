
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { useNotificationStore } from '@/store/notificationStore';
import { Package, Clock, Star, Bell, LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { getOrdersByUser } = useOrderStore();
  const { getUserNotifications, getUnreadCount } = useNotificationStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const userOrders = getOrdersByUser(user.id);
  const userNotifications = getUserNotifications(user.id);
  const unreadCount = getUnreadCount(user.id);

  // Calculate stats from actual user data
  const totalOrders = userOrders.length;
  const pendingOrders = userOrders.filter(order => order.status === 'pending').length;
  const completedOrders = userOrders.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-warm rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome, {user.firstName}!
              </h1>
              <p className="text-gray-600">Here's your order summary</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{completedOrders}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notifications</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest food orders</CardDescription>
          </CardHeader>
          <CardContent>
            {userOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet. Start by browsing our menu!</p>
                <Button 
                  onClick={() => navigate('/catalog')}
                  className="mt-4 bg-gradient-warm"
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} items • ₦{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/catalog')}
            className="h-16 text-lg bg-gradient-warm"
          >
            Order Food
          </Button>
          <Button 
            onClick={() => navigate('/orders')}
            variant="outline"
            className="h-16 text-lg border-2"
          >
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
