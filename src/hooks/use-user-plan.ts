
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
  let plan: SubscriptionPlan = 'free'; // Default to free
  
  if (isAdmin) {
    plan = 'premium'; // Admin users get premium plan by default
  } else if (subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const username = profile?.username || null;

  // Get the raw pricing information
  const pricing = planPricing;

  // Updated limitations with stricter free plan restrictions
  const limits = {
    maxLinks: plan === 'free' ? 1 : Infinity, // Free plan limited to 1 link only
    maxSocialProfiles: plan === 'free' ? 1 : Infinity, // Free plan limited to 1 social profile
    maxTemplates: plan === 'free' ? 1 : plan === 'starter' ? 20 : plan === 'pro' ? 50 : 100,
    canWithdrawTips: plan !== 'free', // Only paid plans can withdraw tips
    hasAnalytics: plan !== 'free', // Only paid plans have analytics
    hasAdvancedAnalytics: plan === 'pro' || plan === 'premium',
    hasQRCode: plan === 'starter' || plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: plan === 'starter' || plan === 'pro' || plan === 'premium',
    hasCustomDomain: plan !== 'free',
    hasPiDomain: plan !== 'free', // .pi domain only for paid plans - FREE CANNOT INTEGRATE
    hasLinkAnimations: plan === 'starter' || plan === 'pro' || plan === 'premium',
    hasScheduling: plan === 'pro' || plan === 'premium',
    hasSEOTools: plan === 'pro' || plan === 'premium',
    hasFileUploads: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    hasEmailSupport: plan === 'starter' || plan === 'pro' || plan === 'premium',
    hasCommunitySupport: true, // All plans have community support
    canUsePiAdNetwork: plan === 'free' || plan === 'starter', // Pi ads for free and starter
    showDroplinkBadge: plan === 'free', // Badge REQUIRED on free accounts
    hasTemplatePreview: true, // All users can preview all templates
    canUseTemplate: (templateTier: string) => {
      if (plan === 'free') return templateTier === 'free';
      if (plan === 'starter') return ['free', 'starter'].includes(templateTier);
      if (plan === 'pro') return ['free', 'starter', 'pro'].includes(templateTier);
      return true; // Premium can use all templates
    },
    hasEmailCapture: plan === 'pro' || plan === 'premium',
    hasLocationAnalytics: plan === 'pro' || plan === 'premium',
    hasBrandingRemoval: plan === 'premium',
    hasAPIAccess: plan === 'premium',
    hasMultiLanguage: plan === 'pro' || plan === 'premium',
    hasAdvancedSEO: plan === 'pro' || plan === 'premium',
    hasPasswordProtection: plan === 'pro' || plan === 'premium',
    hasCustomCSS: plan === 'premium',
    hasTeamAccess: plan === 'premium',
    hasAutomations: plan === 'premium',
    hasDigitalStore: plan === 'premium',
    hasBookingSystem: plan === 'premium',
    hasGroupAccess: plan === 'pro' || plan === 'premium',
    // Additional features from pricing page
    hasMultiFactorAuth: plan === 'pro' || plan === 'premium',
    hasCustomButtonStyles: plan === 'starter' || plan === 'pro' || plan === 'premium',
    hasSpotlightLinks: plan === 'pro' || plan === 'premium',
    hasPerformanceAnalytics: plan === 'pro' || plan === 'premium',
    hasEmailPhoneCollection: plan === 'pro' || plan === 'premium',
    hasCommunityRewards: plan === 'pro' || plan === 'premium',
    hasTailoredOnboarding: plan === 'premium',
    hasHistoricalInsights: plan === 'premium',
    hasAdvancedPiPayments: plan === 'premium',
    hasCommunityContributorStatus: plan === 'premium'
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
