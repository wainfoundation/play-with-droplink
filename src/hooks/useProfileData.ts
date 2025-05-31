
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface ProfileData {
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
}

export const useProfileData = (username?: string) => {
  const { user } = useUser();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (targetUsername?: string) => {
    try {
      setLoading(true);
      setError(null);

      const profileUsername = targetUsername || username;
      
      if (!profileUsername) {
        throw new Error('Username is required');
      }

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', profileUsername)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          throw new Error('Profile not found');
        }
        throw profileError;
      }

      if (!profileData) {
        throw new Error('Profile not found');
      }

      setProfile(profileData);

      // Fetch user links
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profileData.id)
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (linksError) {
        console.error('Error fetching links:', linksError);
        setLinks([]);
      } else {
        setLinks(linksData || []);
      }

      // TODO: Fetch analytics when analytics table is available
      console.log('Analytics fetching not yet implemented - table does not exist');

      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    try {
      if (!profile) return false;

      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  useEffect(() => {
    if (username || user?.profile?.username) {
      fetchProfile(username || user?.profile?.username);
    }
  }, [username, user?.profile?.username]);

  return {
    profile,
    links,
    loading,
    error,
    fetchProfile,
    updateProfile,
    refetch: () => fetchProfile(username)
  };
};
