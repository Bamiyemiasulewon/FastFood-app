
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '@/types';
import { toast } from 'sonner';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  addReview: (review: Omit<Review, 'id'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  getReviewsByFood: (foodId: string) => Review[];
  getApprovedReviewsByFood: (foodId: string) => Review[];
  approveReview: (id: string) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      isLoading: false,

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: Date.now().toString(),
          isApproved: false,
        };
        set({ reviews: [...get().reviews, newReview] });
        toast.success('Review submitted for approval!');
      },

      updateReview: (id, updates) => {
        set({
          reviews: get().reviews.map(review =>
            review.id === id ? { ...review, ...updates } : review
          )
        });
        toast.success('Review updated successfully!');
      },

      deleteReview: (id) => {
        set({
          reviews: get().reviews.filter(review => review.id !== id)
        });
        toast.success('Review deleted successfully!');
      },

      getReviewsByFood: (foodId) => {
        return get().reviews.filter(review => review.foodId === foodId);
      },

      getApprovedReviewsByFood: (foodId) => {
        return get().reviews.filter(review => 
          review.foodId === foodId && review.isApproved
        );
      },

      approveReview: (id) => {
        set({
          reviews: get().reviews.map(review =>
            review.id === id ? { ...review, isApproved: true } : review
          )
        });
        toast.success('Review approved!');
      },
    }),
    {
      name: 'review-storage',
    }
  )
);
