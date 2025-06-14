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
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
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
    name: 'Jollof Rice & Turkey',
    description: 'Classic jollof rice with succulent turkey pieces',
    price: 2800,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Rice Dishes',
    rating: 4.7,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['turkey', 'rice'],
    isAvailable: true
  },
  {
    id: '4',
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
    id: '13',
    name: 'Fried Rice',
    description: 'Delicious fried rice with mixed vegetables and choice of protein',
    price: 2300,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Rice Dishes',
    rating: 4.6,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: false,
    tags: ['rice', 'fried'],
    isAvailable: true
  },
  {
    id: '14',
    name: 'Coconut Rice',
    description: 'Aromatic coconut rice with a rich, creamy flavor',
    price: 2100,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Rice Dishes',
    rating: 4.5,
    preparationTime: 25,
    isVegetarian: true,
    isSpicy: false,
    tags: ['rice', 'coconut', 'vegetarian'],
    isAvailable: true
  },
  {
    id: '16',
    name: 'Spaghetti Bolognese',
    description: 'Classic spaghetti with rich meat sauce',
    price: 2000,
    image: '/lovable-uploads/e2fda2b1-8589-451c-917b-720b806a4600.png',
    category: 'Pasta',
    rating: 4.4,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: false,
    tags: ['pasta', 'bolognese'],
    isAvailable: true
  },
  {
    id: '17',
    name: 'Vegetarian Pasta',
    description: 'Pasta with fresh vegetables and herbs',
    price: 1800,
    image: '/lovable-uploads/e2fda2b1-8589-451c-917b-720b806a4600.png',
    category: 'Pasta',
    rating: 4.2,
    preparationTime: 20,
    isVegetarian: true,
    isSpicy: false,
    tags: ['pasta', 'vegetarian'],
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
