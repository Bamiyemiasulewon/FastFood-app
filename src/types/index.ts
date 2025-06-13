
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

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  addresses: Address[];
  walletBalance: number;
  totalOrders: number;
  joinDate: Date;
  dietaryRestrictions?: string[];
  preferences?: UserPreferences;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  delivery: {
    preferredTime: string;
    specialInstructions: string;
  };
}

export interface WalletBalance {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'purchase' | 'refund' | 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  balanceAfter: number;
  reference?: string;
  status: 'pending' | 'completed' | 'failed';
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

export interface OrderItem {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  estimatedDeliveryTime?: string;
  deliveryAddress: Address;
  paymentMethod: 'wallet' | 'card' | 'cash';
  customerName: string;
  customerPhone?: string;
  specialInstructions?: string;
  deliveryFee?: number;
  taxAmount?: number;
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
  type: 'order_status' | 'new_order' | 'review' | 'general' | 'wallet';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  orderId?: string;
  data?: any;
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
