
import { useState, useEffect } from 'react';

export type SubscriptionPlan = 'starter' | 'pro' | 'premium' | null;

export const useUserPlan = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<SubscriptionPlan>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('userToken');
    const storedPlan = localStorage.getItem('userPlan') as SubscriptionPlan;
    const storedUsername = localStorage.getItem('piUsername') || localStorage.getItem('username');
    const storedExpiration = localStorage.getItem('subscriptionEnd');
    
    setIsLoggedIn(!!token);
    
    if (storedPlan) {
      setPlan(storedPlan);
    } else if (token) {
      // If logged in but no plan, default to starter
      setPlan('starter');
      localStorage.setItem('userPlan', 'starter');
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    if (storedExpiration) {
      setSubscriptionEnd(new Date(storedExpiration));
    }
    
    setIsLoading(false);
  }, []);

  const updatePlan = (newPlan: SubscriptionPlan) => {
    setPlan(newPlan);
    if (newPlan) {
      localStorage.setItem('userPlan', newPlan);
    } else {
      localStorage.removeItem('userPlan');
    }
  };

  const setSubscriptionEndDate = (date: Date) => {
    setSubscriptionEnd(date);
    localStorage.setItem('subscriptionEnd', date.toISOString());
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isLoading,
    updatePlan,
    setSubscriptionEndDate,
    showAds: plan === 'starter' && isLoggedIn,
  };
};

export default useUserPlan;
