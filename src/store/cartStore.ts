
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Food } from '@/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  addItem: (food: Food, quantity?: number) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (food: Food, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.food.id === food.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.food.id === food.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { food, quantity }],
          });
        }
        
        toast.success(`${food.name} added to cart`);
      },

      removeItem: (foodId: string) => {
        const { items } = get();
        const item = items.find(item => item.food.id === foodId);
        
        set({
          items: items.filter(item => item.food.id !== foodId),
        });
        
        if (item) {
          toast.success(`${item.food.name} removed from cart`);
        }
      },

      updateQuantity: (foodId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(foodId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.food.id === foodId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.food.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
