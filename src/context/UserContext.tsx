
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { getUserProfile, getUserSubscription } from "@/services/subscriptionService";

export type SubscriptionPlan = "starter" | "pro" | "premium" | null;

interface UserContextType {
  user: any;
  profile: any;
  subscription: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  showAds: boolean;
  isAdmin: boolean;
  refreshUserData: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  cancelSubscription: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Admin emails - add your email here
const ADMIN_EMAILS = ["admin@pidrop.dev"];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const isLoggedIn = !!user;
  // Only show ads if user is logged in, not an admin, and either doesn't have a subscription or has a starter plan
  const showAds = isLoggedIn && !isAdmin && (!subscription || subscription.plan === "starter");

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          setIsAdmin(ADMIN_EMAILS.includes(session.user.email || ''));
          
          // Only fetch additional data after the synchronous state update
          setTimeout(() => {
            fetchUserData(session.user);
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session?.user?.id);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        setIsAdmin(ADMIN_EMAILS.includes(session.user.email || ''));
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
      
      // Fetch user profile using the service
      const profileData = await getUserProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
      
      // Fetch active subscription using the service  
      const subscriptionData = await getUserSubscription(user.id);
      if (subscriptionData) {
        setSubscription(subscriptionData);
      }
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
    isAdmin,
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
