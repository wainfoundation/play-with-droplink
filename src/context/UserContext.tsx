
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type SubscriptionPlan = "starter" | "pro" | "premium" | null;

interface UserContextType {
  user: any;
  profile: any;
  subscription: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  showAds: boolean;
  refreshUserData: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  cancelSubscription: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isLoggedIn = !!user;
  const showAds = isLoggedIn && (!subscription || subscription.plan === "starter");

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Only fetch additional data after the synchronous state update
          setTimeout(() => {
            fetchUserData(session.user);
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
          setIsLoading(false);
        }
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (user: any) => {
    try {
      setIsLoading(true);
      console.log("Fetching user data for:", user.id);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      setProfile(profileData);
      console.log("Profile data:", profileData);

      // Fetch active subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (subscriptionError) {
        console.error("Error fetching subscription:", subscriptionError);
        throw subscriptionError;
      }

      setSubscription(subscriptionData);
      console.log("Subscription data:", subscriptionData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your profile information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSubscription(null);
      
      // Clear all local storage items related to authentication
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPlan');
      localStorage.removeItem('piUsername');
      localStorage.removeItem('piUserId');
      localStorage.removeItem('piAccessToken');
      localStorage.removeItem('subscriptionEnd');
      
      console.log("User signed out successfully");
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

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

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { user_id: user.id }
      });
      
      if (error) throw error;
      
      await refreshUserData();
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    user,
    profile,
    subscription,
    isLoading,
    isLoggedIn,
    showAds,
    refreshUserData,
    signOut,
    updateProfile,
    cancelSubscription
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
