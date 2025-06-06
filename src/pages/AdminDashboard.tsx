
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { useFoodStore } from '@/store/foodStore';
import { Food } from '@/types';
import { Edit, Trash2, Plus, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { foods, updateFood, deleteFood, addFood } = useFoodStore();
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: '',
    image: ''
  });

  // Check admin access
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price.toString(),
      category: food.category,
      preparationTime: food.preparationTime.toString(),
      image: food.image
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const foodData = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      category: formData.category,
      preparationTime: parseInt(formData.preparationTime),
      image: formData.image,
      rating: 4.5,
      isVegetarian: false,
      isSpicy: false,
      tags: []
    };

    if (editingFood) {
      updateFood(editingFood.id, foodData);
    } else {
      addFood(foodData);
    }

    setEditingFood(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      preparationTime: '',
      image: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this food item?')) {
      deleteFood(id);
    }
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-warm rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome, Admin!
              </h1>
              <p className="text-gray-600">Manage your food menu and orders</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Add Food Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-gradient-warm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Food Item</span>
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingFood) && (
          <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</CardTitle>
              <CardDescription>
                {editingFood ? 'Update the food item details' : 'Fill in the details for the new food item'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Food Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter food name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₦) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Rice Dishes, Soups"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="preparationTime">Prep Time (minutes)</Label>
                  <Input
                    id="preparationTime"
                    type="number"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                    placeholder="Enter preparation time"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter food description"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Enter image URL"
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSave} className="bg-gradient-warm">
                  {editingFood ? 'Update' : 'Add'} Food Item
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingFood(null);
                    setShowAddForm(false);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      preparationTime: '',
                      image: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Food Items Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Food Menu Management</CardTitle>
            <CardDescription>
              Manage all food items, prices, and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Prep Time</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foods.map((food) => (
                    <TableRow key={food.id}>
                      <TableCell>
                        <img 
                          src={food.image} 
                          alt={food.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{food.name}</TableCell>
                      <TableCell>{food.category}</TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatPrice(food.price)}
                      </TableCell>
                      <TableCell>{food.preparationTime} min</TableCell>
                      <TableCell>{food.rating}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(food)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(food.id)}
                            className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
