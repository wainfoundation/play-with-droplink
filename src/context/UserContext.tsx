
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UserContextType {
  user: any;
  profile: any;
  isLoggedIn: boolean;
  loading: boolean;
  isLoading: boolean;
  subscription: any;
  showAds: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setUser(session.user);
      setProfile(profileData);
      
      // Check for subscription data if needed
      // For gaming app, we can set a default subscription state
      setSubscription(null);
    } else {
      setUser(null);
      setProfile(null);
      setSubscription(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Get initial session
    refreshUserData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser(session.user);
          setProfile(profileData);
        } else {
          setUser(null);
          setProfile(null);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSubscription(null);
    setIsAdmin(false);
  };

  // For gaming app, free users see ads, premium users don't
  const showAds = !isAdmin && !subscription;

  const value = {
    user,
    profile,
    isLoggedIn: !!user,
    loading,
    isLoading: loading,
    subscription,
    showAds,
    isAdmin,
    signOut,
    refreshUserData,
    setIsAdmin
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
