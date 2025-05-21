
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserData(session.user);
        } else {
          setProfile(null);
          setSubscription(null);
        }
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
    setIsLoading(true);
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch active subscription
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .maybeSingle();

      setSubscription(subscriptionData);
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
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSubscription(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPlan');
    localStorage.removeItem('piUsername');
    localStorage.removeItem('piUserId');
    localStorage.removeItem('subscriptionEnd');
  };

  const updateProfile = async (data: any) => {
    try {
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
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { user }
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
