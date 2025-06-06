
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, X, MapPin } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-warm rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient">Pallette n' Drapes</span>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3 mr-1" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold text-gradient">P&D</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/catalog" 
              className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-lg ${
                location.pathname === '/catalog' ? 'text-primary bg-orange-50' : 'text-gray-600'
              }`}
            >
              Menu
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search foods..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 text-sm bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 hover:bg-orange-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 h-10 px-4 rounded-xl">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user.firstName}</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="h-10 px-4 rounded-xl border-2">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="h-10 px-4 rounded-xl bg-gradient-warm shadow-md">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden h-10 w-10 rounded-xl"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              <Link 
                to="/catalog" 
                className="text-base font-medium text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Menu
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-3 pt-2 border-t border-gray-100">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start h-12 text-base rounded-xl">
                      <User className="w-4 h-4 mr-3" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout} className="w-full h-12 text-base rounded-xl border-2">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-3 pt-2 border-t border-gray-100">
                  <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full h-12 text-base rounded-xl">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full h-12 text-base rounded-xl bg-gradient-warm shadow-md">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
