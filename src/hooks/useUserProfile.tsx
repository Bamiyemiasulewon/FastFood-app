import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
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
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // TODO: Replace with API call to Rust backend
      setProfile(null); // Placeholder
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    // TODO: Replace with API call
    setAddresses([]); // Placeholder
  };

  const fetchWalletTransactions = async () => {
    // TODO: Replace with API call
    setWalletTransactions([]); // Placeholder
  };

  const updateProfile = async (updates) => {
    if (!user) return;

    try {
      // TODO: Replace with API call to update profile
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const uploadProfilePicture = async (file) => {
    if (!user) return null;

    try {
      // TODO: Replace with API call to upload profile picture
      return null; // Placeholder
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
      return null;
    }
  };

  const addMoney = async (amount, reference, method) => {
    if (!user) return;

    try {
      // TODO: Replace with API call to add money
      toast.success(`₦${amount.toLocaleString()} added to wallet!`);
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
