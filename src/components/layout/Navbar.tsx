
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useSupabaseData";
import { NotificationBell } from "@/components/notifications/NotificationBell";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "2348104555490"; // Nigeria country code + number
    const message = "Hello! I'm interested in ordering from Pallette n' Drapes.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const cartItemsCount = user ? getTotalItems() : 0;

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Pallette n' Drapes
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Menu
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Orders
                </Link>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-green-600/10 border-green-500/30 text-green-700 hover:bg-green-600/20 hover:text-green-700"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
                
                <Link
                  to="/wallet"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Wallet
                </Link>
                
                <NotificationBell />
                
                <Link to="/cart" className="relative p-2">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-2 py-1 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/catalog"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/orders"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleWhatsAppContact();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  Contact Us
                </button>
                <Link
                  to="/wallet"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Wallet
                </Link>
                <Link
                  to="/cart"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Cart ({cartItemsCount})
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
