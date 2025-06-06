
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (data: AuthFormData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user: User = {
            id: '1',
            email: data.email,
            firstName: 'John',
            lastName: 'Doe',
            createdAt: new Date().toISOString(),
          };
          
          set({ user, isLoading: false });
          toast.success('Successfully logged in!');
        } catch (error) {
          set({ isLoading: false });
          toast.error('Login failed. Please try again.');
          throw error;
        }
      },

      signup: async (data: AuthFormData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user: User = {
            id: '1',
            email: data.email,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone,
            createdAt: new Date().toISOString(),
          };
          
          set({ user, isLoading: false });
          toast.success('Account created successfully!');
        } catch (error) {
          set({ isLoading: false });
          toast.error('Signup failed. Please try again.');
          throw error;
        }
      },

      logout: () => {
        set({ user: null });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
