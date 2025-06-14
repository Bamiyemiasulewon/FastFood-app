
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, loading, updateCartItem, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">Sign In Required</h2>
            <p className="text-slate-600 mb-6">Please sign in to view your cart</p>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/catalog">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Menu
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          </div>

          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Your cart is empty</h2>
              <p className="text-slate-600 mb-6">Add some delicious items from our menu</p>
              <Button asChild>
                <Link to="/catalog">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/catalog">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
              <p className="text-slate-600">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Food Image */}
                    <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item.food_items?.image_url ? (
                        <img
                          src={item.food_items.image_url}
                          alt={item.food_items?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-slate-500" />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900">{item.food_items?.name}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2">{item.food_items?.description}</p>
                      <p className="font-bold text-emerald-600 mt-2">{formatPrice(item.food_items?.price || 0)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-900">
                        {formatPrice((item.food_items?.price || 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                {totalPrice < 5000 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm">
                      Add {formatPrice(5000 - totalPrice)} more for free delivery!
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold text-lg text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Button variant="ghost" asChild className="text-emerald-600">
                    <Link to="/catalog">Add more items</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
