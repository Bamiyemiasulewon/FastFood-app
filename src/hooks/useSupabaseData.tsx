
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase
        .from('food_items')
        .select(`
          *,
          food_categories (
            name,
            description
          )
        `)
        .eq('is_available', true)
        .order('name');

      if (error) {
        throw error;
      }

      setFoodItems(data || []);
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
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          food_items (
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setCartItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodItemId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          food_item_id: foodItemId,
          quantity: quantity
        });

      if (error) {
        throw error;
      }

      toast.success('Item added to cart');
      await fetchCartItems();
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

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) {
        throw error;
      }

      await fetchCartItems();
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) {
        throw error;
      }

      toast.success('Item removed from cart');
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

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
    refetch: fetchCartItems
  };
};

// Orders Hook
export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            food_items (
              name,
              price,
              image_url
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: any) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast.success('Order created successfully!');
      await fetchOrders();
      return { data, error: null };
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
    refetch: fetchOrders
  };
};
