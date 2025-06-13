
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem } from '@/types';
import { toast } from 'sonner';

export const useOrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            food_items (
              name,
              image_url
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedOrders: Order[] = data.map(order => ({
        id: order.id,
        userId: order.user_id,
        orderNumber: order.order_number,
        items: order.order_items.map((item: any) => ({
          id: item.id,
          foodId: item.food_item_id,
          name: item.food_items?.name || 'Unknown Item',
          price: item.unit_price,
          quantity: item.quantity,
          specialInstructions: item.special_instructions,
          image: item.food_items?.image_url,
        })),
        status: order.status,
        totalAmount: order.total_amount,
        orderDate: order.created_at,
        estimatedDeliveryTime: order.estimated_delivery_time,
        deliveryAddress: {
          id: '1',
          label: 'Home',
          street: order.delivery_address || 'Not specified',
          city: 'Lagos',
          state: 'Lagos',
          zipCode: '100001',
          isDefault: true,
        },
        paymentMethod: order.payment_provider === 'wallet' ? 'wallet' : 'card',
        customerName: `${user.email}`,
        customerPhone: order.customer_phone,
        specialInstructions: order.special_instructions,
        deliveryFee: order.delivery_fee,
        taxAmount: order.tax_amount,
      }));

      setOrders(formattedOrders);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    const matchesDate = (() => {
      if (dateFilter === 'all') return true;
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          return orderDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const reorderItems = async (order: Order) => {
    try {
      // Add items back to cart
      for (const item of order.items) {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user?.id,
            food_item_id: item.foodId,
            quantity: item.quantity,
            special_instructions: item.specialInstructions,
          });

        if (error) throw error;
      }

      toast.success('Items added to cart! You can modify quantities before ordering.');
    } catch (error: any) {
      console.error('Error reordering items:', error);
      toast.error('Failed to add items to cart');
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'preparing':
        return 'text-orange-600 bg-orange-100';
      case 'ready':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return {
    orders: filteredOrders,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    reorderItems,
    getOrderStatusColor,
    refreshOrders: fetchOrders,
  };
};
