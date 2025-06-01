
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  pi_domain?: string;
  custom_domain?: string;
  plan?: string;
  pi_wallet_address?: string;
  total_score?: number;
  games_played?: number;
  created_at?: string;
  updated_at?: string;
}

interface UserContextType {
  user: UserProfile | null;
  profile: UserProfile | null; // Added profile alias
  isLoggedIn: boolean;
  loading: boolean;
  isAdmin: boolean; // Added isAdmin
  showAds: boolean; // Added showAds
  subscription: any; // Added subscription
  isLoading: boolean; // Added isLoading alias
  refreshUser: () => Promise<void>;
  refreshUserData: () => Promise<void>; // Added refreshUserData alias
  setIsAdmin: (isAdmin: boolean) => void; // Added setIsAdmin
  signOut: () => Promise<void>; // Added signOut
}

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  isLoggedIn: false,
  loading: true,
  isAdmin: false,
  showAds: true,
  subscription: null,
  isLoading: true,
  refreshUser: async () => {},
  refreshUserData: async () => {},
  setIsAdmin: () => {},
  signOut: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        setUser(profile);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  // Calculate showAds based on user plan
  const showAds = user?.plan === 'free' || !user?.plan;

  useEffect(() => {
    refreshUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await refreshUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        profile: user, // profile is an alias for user
        isLoggedIn: !!user, 
        loading,
        isAdmin,
        showAds,
        subscription: null, // placeholder for subscription
        isLoading: loading, // isLoading is an alias for loading
        refreshUser,
        refreshUserData: refreshUser, // refreshUserData is an alias for refreshUser
        setIsAdmin,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
