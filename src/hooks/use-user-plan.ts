
import { useUser } from '@/context/UserContext';
import { planPricing } from '@/hooks/usePiPayment';

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

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
  let plan: SubscriptionPlan = 'free'; // Default to free instead of starter
  
  if (isAdmin) {
    plan = 'premium'; // Admin users get premium plan by default
  } else if (subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const username = profile?.username || null;

  // Get the raw pricing information
  const pricing = planPricing;

  // Feature limitations for free plan
  const limits = {
    maxLinks: plan === 'free' ? 1 : Infinity,
    maxSocialProfiles: plan === 'free' ? 1 : Infinity,
    canWithdrawTips: plan !== 'free',
    hasAnalytics: plan !== 'free',
    hasQRCode: plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: plan !== 'free',
    hasCustomDomain: plan !== 'free',
    hasLinkAnimations: plan === 'pro' || plan === 'premium',
    hasScheduling: plan === 'pro' || plan === 'premium',
    hasSEOTools: plan === 'pro' || plan === 'premium',
    hasFileUploads: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    canUsePiAdNetwork: plan === 'free' || plan === 'starter'
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isLoading,
    pricing,
    showAds,
    limits
  };
};

export default useUserPlan;
