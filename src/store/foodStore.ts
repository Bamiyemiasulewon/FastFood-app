
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
  // Jollof rice category
  {
    id: '1',
    name: 'Jollof rice and chicken',
    description: 'Aromatic jollof rice with tender grilled chicken',
    price: 2500,
    image: '',
    category: 'Jollof rice',
    rating: 4.8,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['popular', 'chicken', 'rice'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Jollof rice and turkey',
    description: 'Classic jollof rice with succulent turkey pieces',
    price: 2800,
    image: '',
    category: 'Jollof rice',
    rating: 4.7,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['turkey', 'rice'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Jollof rice and beef',
    description: 'Delicious jollof rice with tender beef pieces',
    price: 3000,
    image: '',
    category: 'Jollof rice',
    rating: 4.6,
    preparationTime: 30,
    isVegetarian: false,
    isSpicy: true,
    tags: ['beef', 'rice'],
    isAvailable: true
  },
  {
    id: '35',
    name: 'Jollof rice and fried fish',
    description: 'Aromatic jollof rice with crispy fried fish',
    price: 2700,
    image: '',
    category: 'Jollof rice',
    rating: 4.7,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['fish', 'rice', 'fried'],
    isAvailable: true
  },
  // Fried Rice category
  {
    id: '18',
    name: 'Fried rice and chicken',
    description: 'Perfectly seasoned fried rice with tender chicken pieces',
    price: 2400,
    image: '',
    category: 'Fried Rice',
    rating: 4.6,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: false,
    tags: ['fried rice', 'chicken'],
    isAvailable: true
  },
  {
    id: '19',
    name: 'Fried rice and turkey',
    description: 'Delicious fried rice with succulent turkey pieces',
    price: 2700,
    image: '',
    category: 'Fried Rice',
    rating: 4.5,
    preparationTime: 22,
    isVegetarian: false,
    isSpicy: false,
    tags: ['fried rice', 'turkey'],
    isAvailable: true
  },
  // White Rice category
  {
    id: '37',
    name: 'White rice and chicken',
    description: 'Steamed white rice served with grilled chicken',
    price: 2200,
    image: '',
    category: 'White Rice',
    rating: 4.5,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: false,
    tags: ['white rice', 'chicken'],
    isAvailable: true
  },
  {
    id: '38',
    name: 'White rice and turkey',
    description: 'Steamed white rice served with tender turkey pieces',
    price: 2500,
    image: '',
    category: 'White Rice',
    rating: 4.4,
    preparationTime: 22,
    isVegetarian: false,
    isSpicy: false,
    tags: ['white rice', 'turkey'],
    isAvailable: true
  },
  {
    id: '39',
    name: 'White rice and stewed fried fish',
    description: 'Steamed white rice with delicious stewed fried fish',
    price: 2800,
    image: '',
    category: 'White Rice',
    rating: 4.6,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['white rice', 'fish', 'stewed'],
    isAvailable: true
  },
  {
    id: '43',
    name: 'White rice and egg',
    description: 'Steamed white rice served with fried or boiled egg',
    price: 1500,
    image: '',
    category: 'White Rice',
    rating: 4.2,
    preparationTime: 15,
    isVegetarian: true,
    isSpicy: false,
    tags: ['white rice', 'egg', 'vegetarian'],
    isAvailable: true
  },
  // Native Rice category
  {
    id: '40',
    name: 'Native rice and chicken',
    description: 'Traditional native rice served with grilled chicken',
    price: 2400,
    image: '',
    category: 'Native Rice',
    rating: 4.5,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: false,
    tags: ['native rice', 'chicken'],
    isAvailable: true
  },
  {
    id: '41',
    name: 'Native rice and turkey',
    description: 'Traditional native rice served with tender turkey pieces',
    price: 2700,
    image: '',
    category: 'Native Rice',
    rating: 4.4,
    preparationTime: 27,
    isVegetarian: false,
    isSpicy: false,
    tags: ['native rice', 'turkey'],
    isAvailable: true
  },
  {
    id: '42',
    name: 'Native rice and stewed fried fish',
    description: 'Traditional native rice with delicious stewed fried fish',
    price: 3000,
    image: '',
    category: 'Native Rice',
    rating: 4.6,
    preparationTime: 30,
    isVegetarian: false,
    isSpicy: true,
    tags: ['native rice', 'fish', 'stewed'],
    isAvailable: true
  },
  // Spaghetti category
  {
    id: '4',
    name: 'Spaghetti and chicken',
    description: 'Spicy Nigerian-style spaghetti with grilled chicken',
    price: 2200,
    image: '',
    category: 'Spaghetti',
    rating: 4.7,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: true,
    tags: ['spaghetti', 'chicken', 'spicy'],
    isAvailable: true
  },
  {
    id: '5',
    name: 'Spaghetti and turkey',
    description: 'Nigerian-style spaghetti with succulent turkey pieces',
    price: 2500,
    image: '',
    category: 'Spaghetti',
    rating: 4.5,
    preparationTime: 22,
    isVegetarian: false,
    isSpicy: true,
    tags: ['spaghetti', 'turkey'],
    isAvailable: true
  },
  {
    id: '36',
    name: 'Spaghetti and fried fish',
    description: 'Nigerian-style spaghetti with crispy fried fish',
    price: 2400,
    image: '',
    category: 'Spaghetti',
    rating: 4.6,
    preparationTime: 22,
    isVegetarian: false,
    isSpicy: true,
    tags: ['spaghetti', 'fish', 'fried'],
    isAvailable: true
  },
  // Peppersoup category
  {
    id: '20',
    name: 'Catfish peppersoup',
    description: 'Spicy traditional catfish peppersoup with native spices',
    price: 3500,
    image: '',
    category: 'Peppersoup',
    rating: 4.8,
    preparationTime: 35,
    isVegetarian: false,
    isSpicy: true,
    tags: ['catfish', 'peppersoup', 'traditional'],
    isAvailable: true
  },
  {
    id: '21',
    name: 'Chicken peppersoup',
    description: 'Aromatic chicken peppersoup with traditional herbs',
    price: 2800,
    image: '',
    category: 'Peppersoup',
    rating: 4.7,
    preparationTime: 30,
    isVegetarian: false,
    isSpicy: true,
    tags: ['chicken', 'peppersoup', 'traditional'],
    isAvailable: true
  },
  {
    id: '22',
    name: 'Goat meat peppersoup',
    description: 'Rich and spicy goat meat peppersoup with traditional spices',
    price: 4000,
    image: '',
    category: 'Peppersoup',
    rating: 4.9,
    preparationTime: 45,
    isVegetarian: false,
    isSpicy: true,
    tags: ['goat meat', 'peppersoup', 'traditional'],
    isAvailable: true
  },
  // Protein category (renamed from Proteins)
  {
    id: '23',
    name: 'Egg',
    description: 'Fresh boiled or fried eggs',
    price: 300,
    image: '',
    category: 'Protein',
    rating: 4.3,
    preparationTime: 5,
    isVegetarian: true,
    isSpicy: false,
    tags: ['egg', 'protein', 'vegetarian'],
    isAvailable: true
  },
  {
    id: '24',
    name: 'Chicken',
    description: 'Grilled or fried chicken pieces',
    price: 1500,
    image: '',
    category: 'Protein',
    rating: 4.6,
    preparationTime: 15,
    isVegetarian: false,
    isSpicy: false,
    tags: ['chicken', 'protein', 'grilled'],
    isAvailable: true
  },
  {
    id: '25',
    name: 'Turkey',
    description: 'Tender turkey pieces, grilled to perfection',
    price: 1800,
    image: '',
    category: 'Protein',
    rating: 4.5,
    preparationTime: 18,
    isVegetarian: false,
    isSpicy: false,
    tags: ['turkey', 'protein', 'grilled'],
    isAvailable: true
  },
  {
    id: '26',
    name: 'Stewed fried fish',
    description: 'Deliciously seasoned fried fish in rich tomato stew',
    price: 2200,
    image: '',
    category: 'Protein',
    rating: 4.7,
    preparationTime: 25,
    isVegetarian: false,
    isSpicy: true,
    tags: ['fish', 'protein', 'stewed'],
    isAvailable: true
  },
  // Extras category
  {
    id: '27',
    name: 'White rice',
    description: 'Plain steamed white rice',
    price: 800,
    image: '',
    category: 'Extras',
    rating: 4.2,
    preparationTime: 15,
    isVegetarian: true,
    isSpicy: false,
    tags: ['rice', 'side', 'vegetarian'],
    isAvailable: true
  },
  {
    id: '28',
    name: 'Jollof rice',
    description: 'Traditional Nigerian jollof rice',
    price: 1200,
    image: '',
    category: 'Extras',
    rating: 4.6,
    preparationTime: 20,
    isVegetarian: true,
    isSpicy: true,
    tags: ['rice', 'jollof', 'side'],
    isAvailable: true
  },
  {
    id: '29',
    name: 'Spaghetti',
    description: 'Nigerian-style spicy spaghetti',
    price: 1000,
    image: '',
    category: 'Extras',
    rating: 4.4,
    preparationTime: 18,
    isVegetarian: true,
    isSpicy: true,
    tags: ['pasta', 'side', 'spicy'],
    isAvailable: true
  },
  {
    id: '30',
    name: 'Turkey',
    description: 'Grilled turkey pieces',
    price: 1800,
    image: '',
    category: 'Extras',
    rating: 4.5,
    preparationTime: 18,
    isVegetarian: false,
    isSpicy: false,
    tags: ['turkey', 'protein', 'extra'],
    isAvailable: true
  },
  {
    id: '31',
    name: 'Chicken',
    description: 'Grilled chicken pieces',
    price: 1500,
    image: '',
    category: 'Extras',
    rating: 4.6,
    preparationTime: 15,
    isVegetarian: false,
    isSpicy: false,
    tags: ['chicken', 'protein', 'extra'],
    isAvailable: true
  },
  {
    id: '32',
    name: 'Egg',
    description: 'Boiled or fried egg',
    price: 300,
    image: '',
    category: 'Extras',
    rating: 4.3,
    preparationTime: 5,
    isVegetarian: true,
    isSpicy: false,
    tags: ['egg', 'protein', 'extra'],
    isAvailable: true
  },
  {
    id: '33',
    name: 'Plantain',
    description: 'Sweet fried plantain slices',
    price: 600,
    image: '',
    category: 'Extras',
    rating: 4.7,
    preparationTime: 10,
    isVegetarian: true,
    isSpicy: false,
    tags: ['plantain', 'side', 'sweet'],
    isAvailable: true
  },
  {
    id: '34',
    name: 'Fried Fish',
    description: 'Crispy seasoned fried fish',
    price: 2000,
    image: '',
    category: 'Extras',
    rating: 4.6,
    preparationTime: 20,
    isVegetarian: false,
    isSpicy: false,
    tags: ['fish', 'fried', 'protein'],
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
