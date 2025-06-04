
import { useUser } from "@/context/UserContext";

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export const useUserPermissions = () => {
  const { 
    isLoggedIn, 
    isAdmin, 
    profile
  } = useUser();

  // Development mode - always premium permissions
  const plan: SubscriptionPlan = 'premium';
  const isSubscriptionActive = true;
  const username = profile?.username || 'dev_user';
  const subscriptionEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now

  // Grant all permissions for development
  const permissions = {
    maxLinks: Infinity,
    maxSocialProfiles: Infinity,
    maxTemplates: Infinity,
    canWithdrawTips: true,
    hasAnalytics: true,
    hasQRCode: true,
    hasAdvancedThemes: true,
    hasCustomDomain: true,
    hasPiDomain: true,
    hasLinkAnimations: true,
    hasScheduling: true,
    hasSEOTools: true,
    hasFileUploads: true,
    hasWhitelabel: true,
    hasDataExport: true,
    hasPrioritySupport: true,
    canUsePiAdNetwork: true,
    canSellWithPiPayments: true,
    showDroplinkBadge: false,
    hasTemplatePreview: true,
    canUseTemplate: () => true,
    hasEmailCapture: true,
    hasAdvancedAnalytics: true,
    hasLocationAnalytics: true,
    hasBrandingRemoval: true,
    hasAPIAccess: true,
    hasMultiLanguage: true,
    hasAdvancedSEO: true,
    hasPasswordProtection: true,
    hasCustomCSS: true,
    hasTeamAccess: true,
    hasAutomations: true,
    hasFullAdminAccess: true,
    hasDeveloperAccess: true
  };

  return {
    isLoggedIn: true,
    plan,
    username,
    subscriptionEnd,
    isSubscriptionActive,
    permissions
  };
};

export default useUserPermissions;
