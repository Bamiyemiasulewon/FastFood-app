import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  user: any;
  session: any;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement auth state logic with Rust backend
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    // TODO: Implement sign up with backend
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // TODO: Implement sign in with backend
    return { error: null };
  };

  const signOut = async () => {
    // TODO: Implement sign out with backend
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (updates: any) => {
    // TODO: Implement profile update with backend
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
