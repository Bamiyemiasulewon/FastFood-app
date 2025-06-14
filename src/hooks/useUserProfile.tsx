import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, Address, WalletTransaction } from '@/types';
import { toast } from 'sonner';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
      fetchWalletTransactions();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Get order count
      const { count: orderCount } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      setProfile({
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        profilePicture: data.avatar_url,
        addresses: [],
        walletBalance: data.wallet_balance || 0,
        totalOrders: orderCount || 0,
        joinDate: new Date(data.created_at),
        dietaryRestrictions: [],
        preferences: {
          notifications: {
            email: true,
            sms: true,
            push: true,
          },
          delivery: {
            preferredTime: '12:00',
            specialInstructions: '',
          },
        },
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    if (!user) return;

    // For now, we'll use a mock address since we don't have an addresses table
    // In production, you'd fetch from a real addresses table
    setAddresses([
      {
        id: '1',
        label: 'Home',
        street: '123 Lagos Street',
        city: 'Lagos',
        state: 'Lagos',
        zipCode: '100001',
        isDefault: true,
      },
    ]);
  };

  const fetchWalletTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const transactions: WalletTransaction[] = data.map(tx => ({
        id: tx.id,
        userId: tx.user_id,
        type: tx.type as 'deposit' | 'purchase' | 'refund' | 'credit' | 'debit',
        amount: tx.amount,
        description: tx.description || '',
        timestamp: new Date(tx.created_at),
        balanceAfter: tx.balance_after || 0,
        reference: tx.reference,
        status: 'completed',
      }));

      setWalletTransactions(transactions);
    } catch (error: any) {
      console.error('Error fetching wallet transactions:', error);
      toast.error('Failed to load wallet transactions');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: updates.firstName,
          last_name: updates.lastName,
          phone: updates.phone,
          avatar_url: updates.profilePicture,
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ profilePicture: data.publicUrl });
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
      return null;
    }
  };

  const addMoney = async (amount: number, reference: string, method?: string) => {
    if (!user) return;

    try {
      // Only credit wallet for verified payments (not pending bank transfers)
      const shouldCreditWallet = method !== 'bank_transfer';
      const newBalance = shouldCreditWallet ? (profile?.walletBalance || 0) + amount : (profile?.walletBalance || 0);

      // Create wallet transaction
      const { error: txError } = await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user.id,
          type: 'credit',
          amount: amount,
          description: method === 'bank_transfer' ? 'Bank transfer - Pending verification' : 'Wallet top-up',
          reference: reference,
          balance_before: profile?.walletBalance || 0,
          balance_after: newBalance,
        });

      if (txError) throw txError;

      // Update profile wallet balance only for verified payments
      if (shouldCreditWallet) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            wallet_balance: newBalance,
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
      }

      // Refresh data
      await fetchProfile();
      await fetchWalletTransactions();

      if (shouldCreditWallet) {
        toast.success(`₦${amount.toLocaleString()} added to wallet!`);
      }
    } catch (error: any) {
      console.error('Error adding money to wallet:', error);
      toast.error('Failed to process wallet transaction');
      throw error;
    }
  };

  return {
    profile,
    addresses,
    walletTransactions,
    loading,
    updateProfile,
    uploadProfilePicture,
    addMoney,
    refreshProfile: fetchProfile,
    refreshTransactions: fetchWalletTransactions,
  };
};
