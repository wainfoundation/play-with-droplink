
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getUserProfile } from '@/services/subscriptionService';

export const useUserProfile = (user: any) => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const profileData = await getUserProfile(user.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Error",
        description: "Failed to load your profile information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const updateProfile = async (data: any) => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => ({ ...prev, ...data }));
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    isLoading,
    updateProfile,
    refreshProfile: fetchUserProfile
  };
};
