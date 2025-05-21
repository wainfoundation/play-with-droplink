
import { useUser } from "@/context/UserContext";

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export const useUserPermissions = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isAdmin, 
    profile
  } = useUser();

  // Enhanced security: Strict check for admin status with additional validation
  let plan: SubscriptionPlan = 'free'; // Default to free
  
  if (isLoggedIn && isAdmin && profile?.id) {
    plan = 'premium'; // Admin users get premium plan by default
    console.log("Admin privileges granted to authenticated admin user");
  } else if (isLoggedIn && subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  // Improved security: More strict check for subscription validity
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const isSubscriptionActive = isLoggedIn && subscription?.is_active && 
    subscriptionEnd && new Date() < subscriptionEnd;
  
  // Double check for subscription validity
  if (!isSubscriptionActive && plan !== 'free' && !(isLoggedIn && isAdmin && profile?.id)) {
    plan = 'free';
    console.log('Subscription invalid or expired. Treating as free plan.');
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
    canUsePiAdNetwork: plan === 'free' || plan === 'starter',
    canSellWithPiPayments: plan === 'premium',
    // Enhanced security: Require profile ID validation for full admin access
    hasFullAdminAccess: isLoggedIn && isAdmin && !!profile?.id
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
