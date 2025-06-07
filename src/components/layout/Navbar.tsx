
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Logo } from '@/components/ui/logo';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, ShoppingCart, Wallet } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim() || user.email;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-muted sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/catalog"
              className={`font-medium transition-colors hover:text-burgundy ${
                isActive('/catalog') ? 'text-burgundy' : 'text-muted-foreground'
              }`}
            >
              Menu
            </Link>
            {user && (
              <>
                <Link
                  to="/orders"
                  className={`font-medium transition-colors hover:text-burgundy ${
                    isActive('/orders') ? 'text-burgundy' : 'text-muted-foreground'
                  }`}
                >
                  Orders
                </Link>
                <Link
                  to="/wallet"
                  className={`font-medium transition-colors hover:text-burgundy ${
                    isActive('/wallet') ? 'text-burgundy' : 'text-muted-foreground'
                  }`}
                >
                  Wallet
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`font-medium transition-colors hover:text-gold ${
                      isActive('/admin') ? 'text-gold' : 'text-muted-foreground'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </Link>
                
                <NotificationBell />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
                    <div className="px-3 py-2">
                      <p className="font-medium text-charcoal">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wallet" className="flex items-center">
                        <Wallet className="w-4 h-4 mr-2" />
                        Wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-premium px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
