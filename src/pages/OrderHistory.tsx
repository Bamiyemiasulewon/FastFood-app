
import React, { useState } from 'react';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Package, 
  Clock, 
  MapPin, 
  RefreshCw,
  Eye,
  Repeat,
  Calendar
} from 'lucide-react';
import { Order } from '@/types';

const OrderHistory = () => {
  const {
    orders,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    reorderItems,
    getOrderStatusColor,
    refreshOrders,
  } = useOrderHistory();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-texture flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            Order <span className="text-gradient-premium">History</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your past orders and reorder your favorites
          </p>
        </div>

        {/* Filters */}
        <Card className="card-premium mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search orders by number or food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <Button
                variant="outline"
                onClick={refreshOrders}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card className="card-premium">
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                  ? 'No orders match your current filters'
                  : 'You haven\'t placed any orders yet'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="card-premium">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">#{order.orderNumber}</h3>
                        <Badge className={`${getOrderStatusColor(order.status)} font-medium`}>
                          {formatStatus(order.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.orderDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.deliveryAddress.street}
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Items:</span>
                        <span className="line-clamp-1">
                          {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Amount and Actions */}
                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gradient-premium">
                          ₦{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          via {order.paymentMethod}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - #{selectedOrder?.orderNumber}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Order Status */}
                                <div className="flex justify-between items-center">
                                  <Badge className={`${getOrderStatusColor(selectedOrder.status)} font-medium text-sm px-3 py-1`}>
                                    {formatStatus(selectedOrder.status)}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(selectedOrder.orderDate)}
                                  </span>
                                </div>

                                <Separator />

                                {/* Items */}
                                <div>
                                  <h4 className="font-semibold mb-3">Order Items</h4>
                                  <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                      <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                          {item.image && (
                                            <img 
                                              src={item.image} 
                                              alt={item.name}
                                              className="w-10 h-10 rounded object-cover"
                                            />
                                          )}
                                          <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                              Qty: {item.quantity}
                                            </p>
                                          </div>
                                        </div>
                                        <span className="font-medium">
                                          ₦{(item.price * item.quantity).toLocaleString()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                {/* Delivery Info */}
                                <div>
                                  <h4 className="font-semibold mb-3">Delivery Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Address:</span>
                                      <span>{selectedOrder.deliveryAddress.street}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Phone:</span>
                                      <span>{selectedOrder.customerPhone || 'Not provided'}</span>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Total Breakdown */}
                                <div>
                                  <h4 className="font-semibold mb-3">Order Summary</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Subtotal:</span>
                                      <span>₦{(selectedOrder.totalAmount - (selectedOrder.deliveryFee || 0) - (selectedOrder.taxAmount || 0)).toLocaleString()}</span>
                                    </div>
                                    {selectedOrder.deliveryFee && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery Fee:</span>
                                        <span>₦{selectedOrder.deliveryFee.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {selectedOrder.taxAmount && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax:</span>
                                        <span>₦{selectedOrder.taxAmount.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total:</span>
                                      <span className="text-gradient-premium">₦{selectedOrder.totalAmount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {order.status === 'delivered' && (
                          <Button
                            size="sm"
                            onClick={() => reorderItems(order)}
                            className="gap-2 btn-premium"
                          >
                            <Repeat className="w-4 h-4" />
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
