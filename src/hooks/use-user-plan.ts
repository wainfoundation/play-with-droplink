
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

  // Enhanced feature limitations for free plan to encourage upgrades
  const limits = {
    maxLinks: plan === 'free' ? 3 : Infinity, // Reduced from unlimited to 3
    maxSocialProfiles: plan === 'free' ? 2 : Infinity, // Reduced from unlimited to 2
    maxTemplates: plan === 'free' ? 1 : plan === 'starter' ? 5 : plan === 'pro' ? 15 : Infinity,
    canWithdrawTips: plan !== 'free',
    hasAnalytics: plan !== 'free',
    hasQRCode: plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: plan !== 'free',
    hasCustomDomain: plan !== 'free',
    hasPiDomain: plan !== 'free', // .pi domain only for paid plans
    hasLinkAnimations: plan === 'pro' || plan === 'premium',
    hasScheduling: plan === 'pro' || plan === 'premium',
    hasSEOTools: plan === 'pro' || plan === 'premium',
    hasFileUploads: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    canUsePiAdNetwork: plan === 'free' || plan === 'starter',
    showDroplinkBadge: plan === 'free', // Badge only shown on free accounts
    hasTemplatePreview: true, // All users can preview templates
    canUseTemplate: (templateTier: string) => {
      if (plan === 'free') return templateTier === 'free';
      if (plan === 'starter') return ['free', 'starter'].includes(templateTier);
      if (plan === 'pro') return ['free', 'starter', 'pro'].includes(templateTier);
      return true; // Premium can use all templates
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
    hasAutomations: plan === 'premium'
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
