
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  pi_wallet_address?: string;
  pi_domain?: string;
  custom_domain?: string;
  plan: string;
  created_at: string;
  updated_at: string;
  games_played: number;
  total_score: number;
  onboarding_completed?: boolean;
  user_metadata?: any;
}

export const useUserProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile({
        ...data,
        onboarding_completed: true, // Default value
        user_metadata: {} // Default value
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return false;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', profile.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
};
