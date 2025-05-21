
import { useUser } from '@/context/UserContext';
import { planPricing } from '@/hooks/usePiPayment';

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

  // Get the raw pricing information
  const pricing = planPricing;

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isLoading,
    pricing,
    showAds,
  };
};

export default useUserPlan;
