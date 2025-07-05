
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
      fetchWalletTransactions();
    } else {
      setProfile(null);
      setAddresses([]);
      setWalletTransactions([]);
      setLoading(false);
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

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    // Placeholder - implement when addresses table is created
    setAddresses([]);
  };

  const fetchWalletTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wallet transactions:', error);
      } else {
        setWalletTransactions(data || []);
      }
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } else {
        toast.success('Profile updated successfully!');
        await fetchProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
      return null;
    }
  };

  const addMoney = async (amount: number, reference: string, method: string) => {
    if (!user) return;

    try {
      // This would typically be handled by a secure backend function
      // For now, we'll create a placeholder transaction
      const { error } = await supabase
        .from('wallet_transactions')
        .insert([
          {
            user_id: user.id,
            amount: amount,
            type: 'credit',
            reference: reference,
            description: `Added money via ${method}`
          }
        ]);

      if (error) {
        throw error;
      }

      toast.success(`₦${amount.toLocaleString()} added to wallet!`);
      await fetchWalletTransactions();
    } catch (error) {
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
