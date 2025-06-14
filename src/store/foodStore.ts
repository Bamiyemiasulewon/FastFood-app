import { create } from 'zustand';
import { Food } from '@/types';
import { toast } from 'sonner';

interface FoodState {
  foods: Food[];
  isLoading: boolean;
  addFood: (food: Omit<Food, 'id'>) => void;
  updateFood: (id: string, updates: Partial<Food>) => void;
  deleteFood: (id: string) => void;
  toggleAvailability: (id: string) => void;
  setFoods: (foods: Food[]) => void;
}

const initialFoods: Food[] = [
  {
    id: '1',
    name: 'Jollof Rice & Chicken',
    description: 'Aromatic jollof rice with tender grilled chicken',
    price: 2500,
    image: '/lovable-uploads/e4bf75af-1bc3-4b03-927b-c35f95968a5e.png',
    category: 'Rice Dishes',
    rating: 4.8,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['popular', 'chicken', 'rice'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Native rice',
    description: 'Rich native rice with succulent turkey pieces',
    price: 3200,
    image: '/lovable-uploads/bda71da5-6763-48c0-8724-34990552d3a6.png',
    category: 'Rice Dishes',
    rating: 4.9,
    preparationTime: 30,
    isVegetarian: false,
    isSpicy: true,
    tags: ['premium', 'turkey', 'rice'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Jollof Spaghetti & Chicken',
    description: 'Spicy jollof spaghetti with grilled chicken',
    price: 2200,
    image: '/lovable-uploads/e2fda2b1-8589-451c-917b-720b806a4600.png',
    category: 'Pasta',
    rating: 4.7,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: true,
    tags: ['spaghetti', 'chicken', 'spicy'],
    isAvailable: true
  },
  {
    id: '4',
    name: 'Catfish Peppersoup',
    description: 'Spicy catfish peppersoup with local spices and fresh vegetables',
    price: 1800,
    image: '/lovable-uploads/33bf7c67-2963-49fe-aee1-1035f9f37e7e.png',
    category: 'Soups',
    rating: 4.6,
    preparationTime: 15,
    isVegetarian: false,
    isSpicy: true,
    tags: ['soup', 'catfish', 'traditional'],
    isAvailable: true
  }
];

export const useFoodStore = create<FoodState>((set, get) => ({
  foods: initialFoods,
  isLoading: false,

  addFood: (foodData) => {
    const newFood: Food = {
      ...foodData,
      id: Date.now().toString(),
      isAvailable: true,
    };
    set({ foods: [...get().foods, newFood] });
    toast.success('Food item added successfully!');
  },

  updateFood: (id, updates) => {
    set({
      foods: get().foods.map(food =>
        food.id === id ? { ...food, ...updates } : food
      )
    });
    toast.success('Food item updated successfully!');
  },

  deleteFood: (id) => {
    set({
      foods: get().foods.filter(food => food.id !== id)
    });
    toast.success('Food item deleted successfully!');
  },

  toggleAvailability: (id) => {
    set({
      foods: get().foods.map(food =>
        food.id === id ? { ...food, isAvailable: !food.isAvailable } : food
      )
    });
    const food = get().foods.find(f => f.id === id);
    toast.success(`${food?.name} is now ${food?.isAvailable ? 'unavailable' : 'available'}`);
  },

  setFoods: (foods) => set({ foods }),
}));
