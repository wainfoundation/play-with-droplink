
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  pi_wallet_address?: string;
  plan?: string;
  daily_streak?: number;
  last_daily_claim?: string;
  xp?: number;
  level?: number;
  selected_room?: string;
  tutorial_completed?: boolean;
}

interface PetStats {
  id: string;
  user_id: string;
  character_id: string;
  happiness: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  health: number;
  mood: string;
  last_decay: string;
}

export const useAuthSystem = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [petStats, setPetStats] = useState<PetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
              // Fetch user profile and pet stats
              setTimeout(async () => {
                await fetchUserData(session.user.id);
              }, 0);
            } else {
              setProfile(null);
              setPetStats(null);
            }
            setLoading(false);
          }
        );

        // Check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession?.user) {
          await fetchUserData(currentSession.user.id);
        }
        setLoading(false);

        return () => subscription.unsubscribe();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth initialization failed');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch pet stats
      const { data: statsData, error: statsError } = await supabase
        .from('pet_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }
      setPetStats(statsData);

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username,
            display_name: username
          }
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setPetStats(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  };

  const updatePetStats = async (updates: Partial<PetStats>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pet_stats')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setPetStats(data);
      return data;
    } catch (err) {
      console.error('Error updating pet stats:', err);
      throw err;
    }
  };

  const addXP = async (amount: number, actionType: string, description?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('add_xp', {
        p_user_id: user.id,
        p_xp: amount,
        p_action_type: actionType,
        p_description: description
      });

      if (error) throw error;
      
      // Refresh user profile to get updated XP and level
      await fetchUserData(user.id);
      
      return data;
    } catch (err) {
      console.error('Error adding XP:', err);
      throw err;
    }
  };

  const claimDailyReward = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('claim_daily_reward', {
        p_user_id: user.id
      });

      if (error) throw error;
      
      // Refresh user data
      await fetchUserData(user.id);
      
      return data;
    } catch (err) {
      console.error('Error claiming daily reward:', err);
      throw err;
    }
  };

  return {
    user,
    session,
    profile,
    petStats,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updatePetStats,
    addXP,
    claimDailyReward,
    refreshUserData: () => user ? fetchUserData(user.id) : Promise.resolve()
  };
};
