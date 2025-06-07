
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthFormData } from '@/types';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (data: AuthFormData) => Promise<void>;
  signup: (data: AuthFormData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Simulated user database
const mockUsers: Record<string, { user: User; password: string }> = {
  'admin@pallettendrapes.com': {
    user: {
      id: 'admin-1',
      email: 'admin@pallettendrapes.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      walletBalance: 0,
    },
    password: 'admin123'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (data: AuthFormData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user exists in mock database
          const userRecord = mockUsers[data.email];
          
          if (!userRecord || userRecord.password !== data.password) {
            throw new Error('Invalid credentials');
          }
          
          set({ user: userRecord.user, isLoading: false });
          toast.success(`Welcome back, ${userRecord.user.firstName}!`);
        } catch (error) {
          set({ isLoading: false });
          toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
          throw error;
        }
      },

      signup: async (data: AuthFormData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          if (mockUsers[data.email]) {
            throw new Error('User already exists');
          }
          
          const newUser: User = {
            id: Date.now().toString(),
            email: data.email,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone,
            role: 'user',
            createdAt: new Date().toISOString(),
            walletBalance: 0,
          };
          
          // Add to mock database
          mockUsers[data.email] = {
            user: newUser,
            password: data.password
          };
          
          set({ user: newUser, isLoading: false });
          toast.success(`Welcome to Pallette n' Drapes, ${newUser.firstName}!`);
        } catch (error) {
          set({ isLoading: false });
          toast.error(error instanceof Error ? error.message : 'Signup failed. Please try again.');
          throw error;
        }
      },

      logout: () => {
        set({ user: null });
        toast.success('Logged out successfully');
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          
          // Update mock database
          if (mockUsers[currentUser.email]) {
            mockUsers[currentUser.email].user = updatedUser;
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
