
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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

interface Subscription {
  plan: string;
  is_active: boolean;
  expires_at: string;
}

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  isLoading: boolean; // Alias for loading
  showAds: boolean;
  isAdmin: boolean;
  subscription: Subscription | null;
  refreshUserData: () => Promise<void>;
  signOut: () => Promise<void>;
  setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return;
      }

      setProfile(data);
      
      // Set admin status based on profile or other criteria
      if (data?.plan === 'admin' || data?.username === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setSubscription(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Determine showAds based on plan
  const showAds = profile?.plan === 'free' || !profile?.plan;

  const value = {
    user,
    profile,
    isLoggedIn: !!user,
    loading,
    isLoading: loading, // Alias for loading
    showAds,
    isAdmin,
    subscription,
    refreshUserData,
    signOut,
    setIsAdmin
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
