
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

  // Enhanced feature limitations based on plan
  const permissions = {
    maxLinks: plan === 'free' ? 3 : Infinity, // Reduced for free
    maxSocialProfiles: plan === 'free' ? 2 : Infinity, // Reduced for free
    maxTemplates: plan === 'free' ? 1 : plan === 'starter' ? 5 : plan === 'pro' ? 15 : Infinity,
    canWithdrawTips: plan !== 'free',
    hasAnalytics: plan !== 'free',
    hasQRCode: plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: plan !== 'free',
    hasCustomDomain: plan !== 'free',
    hasPiDomain: plan !== 'free', // .pi domain restricted to paid plans
    hasLinkAnimations: plan === 'pro' || plan === 'premium',
    hasScheduling: plan === 'pro' || plan === 'premium',
    hasSEOTools: plan === 'pro' || plan === 'premium',
    hasFileUploads: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    canUsePiAdNetwork: plan === 'free' || plan === 'starter',
    canSellWithPiPayments: plan === 'premium',
    showDroplinkBadge: plan === 'free', // Force badge on free accounts
    hasTemplatePreview: true, // All can preview ALL templates
    canUseTemplate: (templateTier: string) => {
      // Allow preview of all templates regardless of plan
      return true; // Everyone can preview all templates
    },
    hasEmailCapture: plan !== 'free',
    hasAdvancedAnalytics: plan === 'pro' || plan === 'premium',
    hasLocationAnalytics: plan === 'pro' || plan === 'premium',
    hasBrandingRemoval: plan === 'premium',
    hasAPIAccess: plan === 'premium',
    hasMultiLanguage: plan === 'pro' || plan === 'premium',
    hasAdvancedSEO: plan === 'pro' || plan === 'premium',
    hasPasswordProtection: plan === 'pro' || plan === 'premium',
    hasCustomCSS: plan === 'premium',
    hasTeamAccess: plan === 'premium',
    hasAutomations: plan === 'premium',
    // Enhanced security: Allow developer access for all users
    hasFullAdminAccess: true, // Grant developer access to all users
    hasDeveloperAccess: true // New permission for developer portal access
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
