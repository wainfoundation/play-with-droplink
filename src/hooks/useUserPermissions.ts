
import { useUser } from "@/context/UserContext";

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export const useUserPermissions = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isAdmin, 
    profile
  } = useUser();

  // Admin users get premium privileges
  // Regular users map from the subscription data if available
  let plan: SubscriptionPlan = 'free'; // Default to free
  
  if (isAdmin) {
    plan = 'premium'; // Admin users get premium plan by default
  } else if (subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  // Check if subscription is expired
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const isSubscriptionActive = subscription?.is_active && 
    subscriptionEnd && new Date() < subscriptionEnd;
  
  // If subscription is expired but still marked as active, treat as free plan
  if (!isSubscriptionActive && plan !== 'free' && !isAdmin) {
    plan = 'free';
    console.log('Subscription expired but still marked as active. Treating as free plan.');
  }
  
  const username = profile?.username || null;

  // Feature limitations based on plan
  const permissions = {
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
    canUsePiAdNetwork: plan !== 'free',
    canSellWithPiPayments: plan === 'premium',
    // New additional permissions for monitoring in admin
    hasFullAdminAccess: isAdmin
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isSubscriptionActive,
    permissions
  };
};

export default useUserPermissions;
