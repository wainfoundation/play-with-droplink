
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSubscription } from "@/hooks/useSubscription";

export type SubscriptionPlan = "starter" | "pro" | "premium" | "free" | null;

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

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: authLoading, isAdmin, isLoggedIn, signOut } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile, refreshProfile } = useUserProfile(user);
  const { subscription, isLoading: subscriptionLoading, cancelSubscription, refreshSubscription } = useSubscription(user);
  
  // Overall loading state
  const isLoading = authLoading || profileLoading || subscriptionLoading;
  
  // Only show ads if user is logged in, not an admin, and either doesn't have a subscription or has a starter plan
  const showAds = isLoggedIn && !isAdmin && (!subscription || subscription?.plan === "starter");

  const refreshUserData = useCallback(async () => {
    await Promise.all([
      refreshProfile(),
      refreshSubscription()
    ]);
  }, [refreshProfile, refreshSubscription]);

  const value: UserContextType = {
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
