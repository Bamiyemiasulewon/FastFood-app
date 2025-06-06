
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '@/types';
import { toast } from 'sonner';

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  getUnreadCount: (userId?: string) => number;
  getUserNotifications: (userId: string) => Notification[];
  getAdminNotifications: () => Notification[];
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: Date.now().toString(),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        set({ notifications: [...get().notifications, newNotification] });
        
        // Show toast notification
        toast.info(notificationData.title);
      },

      markAsRead: (id) => {
        set({
          notifications: get().notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
          )
        });
      },

      deleteNotification: (id) => {
        set({
          notifications: get().notifications.filter(notification => notification.id !== id)
        });
      },

      getUnreadCount: (userId) => {
        return get().notifications.filter(notification => 
          !notification.isRead && 
          (userId ? notification.userId === userId : !notification.userId)
        ).length;
      },

      getUserNotifications: (userId) => {
        return get().notifications.filter(notification => 
          notification.userId === userId
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getAdminNotifications: () => {
        return get().notifications.filter(notification => 
          !notification.userId || notification.type === 'new_order'
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
    }),
    {
      name: 'notification-storage',
    }
  )
);
