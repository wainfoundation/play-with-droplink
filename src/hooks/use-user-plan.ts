
import { useUser } from '@/context/UserContext';

export type SubscriptionPlan = 'starter' | 'pro' | 'premium' | null;

export const useUserPlan = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isLoading, 
    profile, 
    showAds
  } = useUser();

  // Map from the subscription data if available
  const plan = subscription?.plan as SubscriptionPlan || 'starter';
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
