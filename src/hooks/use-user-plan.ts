
import { useUser } from '@/context/UserContext';

export type SubscriptionPlan = 'starter' | 'pro' | 'premium' | null;

export const useUserPlan = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isLoading, 
    profile, 
    showAds,
    isAdmin
  } = useUser();

  // Admin users get premium privileges
  // Regular users map from the subscription data if available
  let plan: SubscriptionPlan = 'starter';
  
  if (isAdmin) {
    plan = 'premium'; // Admin users get premium plan by default
  } else if (subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const username = profile?.username || null;

  const updatePlan = () => {
    // This is now handled by the UserContext and Supabase
    console.warn('updatePlan is deprecated. Plans are managed through Pi payments.');
  };

  const setSubscriptionEndDate = () => {
    // This is now handled by the UserContext and Supabase
    console.warn('setSubscriptionEndDate is deprecated. Subscription dates are managed through Pi payments.');
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isLoading,
    updatePlan,
    setSubscriptionEndDate,
    showAds,
  };
};

export default useUserPlan;
