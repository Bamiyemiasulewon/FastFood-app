
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role?: 'user' | 'admin';
  createdAt: string;
  walletBalance?: number;
}

export interface WalletBalance {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  preparationTime: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  tags: string[];
  isAvailable?: boolean;
  inStock?: boolean;
  stockCount?: number;
}

export interface CartItem {
  food: Food;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  estimatedDeliveryTime?: string;
  paymentMethod: 'wallet' | 'card' | 'cash';
  customerName: string;
  customerPhone?: string;
  deliveryAddress?: string;
}

export interface Review {
  id: string;
  userId: string;
  foodId: string;
  orderId: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
  isApproved: boolean;
}

export interface Notification {
  id: string;
  userId?: string;
  type: 'order_status' | 'new_order' | 'review' | 'general';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  orderId?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  rating?: number;
  preparationTime?: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  tags?: string[];
  isAvailable?: boolean;
}
