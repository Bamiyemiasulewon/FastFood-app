
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
    id: '3',
    name: 'Vegetarian Jollof Rice',
    description: 'Flavorful jollof rice with mixed vegetables',
    price: 2000,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Rice Dishes',
    rating: 4.5,
    preparationTime: 20,
    isVegetarian: true,
    isSpicy: true,
    tags: ['vegetarian', 'rice'],
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
    id: '5',
    name: 'Catfish Peppersoup',
    description: 'Spicy catfish peppersoup with local spices and fresh vegetables',
    price: 1800,
    image: '/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png',
    category: 'Soups & Stews',
    rating: 4.6,
    preparationTime: 15,
    isVegetarian: false,
    isSpicy: true,
    tags: ['soup', 'catfish', 'traditional'],
    isAvailable: true
  },
  {
    id: '6',
    name: 'Chicken Peppersoup',
    description: 'Traditional chicken peppersoup with aromatic spices',
    price: 2000,
    image: '/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png',
    category: 'Soups & Stews',
    rating: 4.5,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: true,
    tags: ['soup', 'chicken', 'traditional'],
    isAvailable: true
  },
  {
    id: '7',
    name: 'Egusi Soup',
    description: 'Rich and creamy egusi soup with assorted meat',
    price: 2500,
    image: '/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png',
    category: 'Soups & Stews',
    rating: 4.8,
    preparationTime: 45,
    isVegetarian: false,
    isSpicy: false,
    tags: ['soup', 'egusi', 'traditional'],
    isAvailable: true
  },
  {
    id: '8',
    name: 'Grilled Chicken',
    description: 'Perfectly seasoned and grilled chicken',
    price: 3000,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Grilled Items',
    rating: 4.9,
    preparationTime: 30,
    isVegetarian: false,
    isSpicy: false,
    tags: ['grilled', 'chicken'],
    isAvailable: true
  },
  {
    id: '9',
    name: 'Suya',
    description: 'Spicy grilled beef skewers with traditional seasonings',
    price: 1500,
    image: '/lovable-uploads/6ee823c1-f902-483f-9454-7460a2feeaa3.png',
    category: 'Grilled Items',
    rating: 4.7,
    preparationTime: 15,
    isVegetarian: false,
    isSpicy: true,
    tags: ['suya', 'beef', 'spicy'],
    isAvailable: true
  },
  {
    id: '10',
    name: 'Pounded Yam',
    description: 'Smooth and stretchy pounded yam',
    price: 1000,
    image: '/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png',
    category: 'Swallow Foods',
    rating: 4.6,
    preparationTime: 25,
    isVegetarian: true,
    isSpicy: false,
    tags: ['swallow', 'yam'],
    isAvailable: true
  },
  {
    id: '11',
    name: 'Eba',
    description: 'Traditional cassava flour swallow',
    price: 800,
    image: '/lovable-uploads/b7c49647-4983-4f22-9b04-4bf54eab1f7e.png',
    category: 'Swallow Foods',
    rating: 4.4,
    preparationTime: 10,
    isVegetarian: true,
    isSpicy: false,
    tags: ['swallow', 'cassava'],
    isAvailable: true
  },
  {
    id: '12',
    name: 'Zobo Drink',
    description: 'Refreshing hibiscus drink with natural fruits',
    price: 500,
    image: '/lovable-uploads/e2fda2b1-8589-451c-917b-720b806a4600.png',
    category: 'Beverages',
    rating: 4.3,
    preparationTime: 5,
    isVegetarian: true,
    isSpicy: false,
    tags: ['drink', 'refreshing'],
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
