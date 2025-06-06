
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '@/types';
import { toast } from 'sonner';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
        };
        set({ orders: [...get().orders, newOrder] });
        toast.success('Order placed successfully!');
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        });
        toast.success(`Order status updated to ${status}`);
      },

      deleteOrder: (orderId) => {
        set({
          orders: get().orders.filter(order => order.id !== orderId)
        });
        toast.success('Order deleted successfully!');
      },

      getOrdersByUser: (userId) => {
        return get().orders.filter(order => order.userId === userId);
      },

      getAllOrders: () => {
        return get().orders;
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
