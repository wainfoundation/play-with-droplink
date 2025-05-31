
import { useUser } from '@/context/UserContext';
import { useSubscription } from '@/hooks/useSubscription';

export type SubscriptionPlan = 'free' | 'premium';

export const useUserPlan = () => {
  const { 
    isLoggedIn, 
    isLoading, 
    profile, 
    isAdmin
  } = useUser();

  const { subscription, loading: subscriptionLoading } = useSubscription();

  // Check if subscription is active and not expired
  const isSubscriptionActive = subscription?.is_active && 
    subscription?.expires_at && 
    new Date() < new Date(subscription.expires_at);

  // Determine user plan
  let plan: SubscriptionPlan = 'free';
  if (isAdmin) {
    plan = 'premium'; // Admin users get premium
  } else if (isSubscriptionActive) {
    plan = 'premium'; // Active subscription gets premium
  }
  
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const username = profile?.username || null;

  // Premium users don't see ads and can access all games
  const showAds = plan === 'free';
  const canAccessAllGames = plan === 'premium';

  const limits = {
    // Premium users get unlimited access, free users are limited
    maxLinks: plan === 'free' ? 1 : Infinity,
    maxSocialProfiles: plan === 'free' ? 1 : Infinity,
    maxTemplates: plan === 'free' ? 1 : Infinity,
    canWithdrawTips: plan === 'premium',
    hasAnalytics: plan === 'premium',
    hasAdvancedAnalytics: plan === 'premium',
    hasQRCode: plan === 'premium',
    hasAdvancedThemes: plan === 'premium',
    hasCustomDomain: plan === 'premium',
    hasPiDomain: plan === 'premium',
    hasLinkAnimations: plan === 'premium',
    hasScheduling: plan === 'premium',
    hasSEOTools: plan === 'premium',
    hasFileUploads: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    hasEmailSupport: plan === 'premium',
    hasCommunitySupport: true,
    canUsePiAdNetwork: plan === 'free', // Only free users see Pi ads
    showDroplinkBadge: plan === 'free', // Badge required on free accounts
    hasTemplatePreview: true,
    canUseTemplate: () => true,
    hasEmailCapture: plan === 'premium',
    hasLocationAnalytics: plan === 'premium',
    hasBrandingRemoval: plan === 'premium',
    hasAPIAccess: plan === 'premium',
    hasMultiLanguage: plan === 'premium',
    hasAdvancedSEO: plan === 'premium',
    hasPasswordProtection: plan === 'premium',
    hasCustomCSS: plan === 'premium',
    hasTeamAccess: plan === 'premium',
    hasAutomations: plan === 'premium',
    hasDigitalStore: plan === 'premium',
    hasBookingSystem: plan === 'premium',
    hasGroupAccess: plan === 'premium',
    hasMultiFactorAuth: plan === 'premium',
    hasCustomButtonStyles: plan === 'premium',
    hasSpotlightLinks: plan === 'premium',
    hasPerformanceAnalytics: plan === 'premium',
    hasEmailPhoneCollection: plan === 'premium',
    hasCommunityRewards: plan === 'premium',
    hasTailoredOnboarding: plan === 'premium',
    hasHistoricalInsights: plan === 'premium',
    hasAdvancedPiPayments: plan === 'premium',
    hasCommunityContributorStatus: plan === 'premium',
    // Gaming specific limits
    canAccessAllGames: canAccessAllGames,
    showGameAds: showAds
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isLoading: isLoading || subscriptionLoading,
    showAds,
    canAccessAllGames,
    limits,
    isSubscriptionActive
  };
};

export default useUserPlan;
