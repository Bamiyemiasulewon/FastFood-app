
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Access denied. Please sign in.');
      navigate('/auth');
      return;
    }

    // For now, we'll check if user email contains 'admin' - you can improve this later
    const isAdmin = user.email?.includes('admin') || user.user_metadata?.role === 'admin';
    
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const isAdmin = user.email?.includes('admin') || user.user_metadata?.role === 'admin';
  
  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
