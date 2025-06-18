import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Food Items Hook
export const useFoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      // TODO: Replace with API call to Rust backend
      // Example: const response = await fetch(`${API_URL}/food-items`)
      setFoodItems([]); // Placeholder
    } catch (error: any) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to load food items');
    } finally {
      setLoading(false);
    }
  };

  return { foodItems, loading, refetch: fetchFoodItems };
};

// Cart Hook
export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // TODO: Fetch cart items from backend
      setCartItems([]); // Placeholder
    }
  }, [user]);

  const addToCart = async (foodItemId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      // TODO: Replace with API call to add item to cart
      setCartItems([]); // Placeholder
      toast.success('Item added to cart');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      // TODO: Replace with API call to update cart item
      setCartItems([]); // Placeholder
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      // TODO: Replace with API call to remove item from cart
      setCartItems([]); // Placeholder
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      // TODO: Replace with API call to clear cart
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => 
      total + (item.food_items?.price || 0) * item.quantity, 0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
  };

  return {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    refetch: () => {}
  };
};

// Orders Hook
export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // TODO: Fetch orders from backend
      setOrders([]); // Placeholder
    }
  }, [user]);

  const createOrder = async (orderData: any) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // TODO: Replace with API call to create order
      setOrders([]); // Placeholder

      toast.success('Order created successfully!');
      return { data: null, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return { data: null, error };
    }
  };

  return {
    orders,
    loading,
    createOrder,
    refetch: () => {}
  };
};
