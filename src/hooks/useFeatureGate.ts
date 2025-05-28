
import { useUserPlan } from "@/hooks/use-user-plan";

export const useFeatureGate = () => {
  const { plan, limits } = useUserPlan();

  const hasFeatureAccess = (feature: string): boolean => {
    const featureMap: Record<string, boolean> = {
      'unlimited_links': limits.maxLinks === Infinity,
      'product_sales': limits.hasDigitalStore,
      'analytics': limits.hasAnalytics,
      'advanced_analytics': limits.hasAdvancedAnalytics,
      'seo_tools': limits.hasSEOTools,
      'scheduling': limits.hasScheduling,
      'team_access': limits.hasTeamAccess,
      'social_planner': limits.hasAutomations,
      'instagram_reply': limits.hasAutomations,
      'link_shortener': limits.hasAdvancedSEO,
      'custom_css': limits.hasCustomCSS,
      'api_access': limits.hasAPIAccess,
      'whitelabel': limits.hasBrandingRemoval,
      'pi_domain': limits.hasPiDomain,
      'pi_tips': limits.canWithdrawTips,
      'qr_codes': limits.hasQRCode,
      'custom_themes': limits.hasAdvancedThemes,
      'email_capture': limits.hasEmailCapture,
      'location_analytics': limits.hasLocationAnalytics,
      'password_protection': limits.hasPasswordProtection,
      'file_uploads': limits.hasFileUploads,
      'multi_language': limits.hasMultiLanguage,
      'priority_support': limits.hasPrioritySupport
    };

    return featureMap[feature] || false;
  };

  const getRequiredPlan = (feature: string): string => {
    const featurePlanMap: Record<string, string> = {
      'unlimited_links': 'starter',
      'product_sales': 'pro',
      'analytics': 'starter',
      'advanced_analytics': 'pro',
      'seo_tools': 'pro',
      'scheduling': 'pro',
      'team_access': 'premium',
      'social_planner': 'premium',
      'instagram_reply': 'premium',
      'link_shortener': 'pro',
      'custom_css': 'premium',
      'api_access': 'premium',
      'whitelabel': 'premium',
      'pi_domain': 'starter',
      'pi_tips': 'starter',
      'qr_codes': 'starter',
      'custom_themes': 'starter',
      'email_capture': 'pro',
      'location_analytics': 'pro',
      'password_protection': 'pro',
      'file_uploads': 'premium',
      'multi_language': 'pro',
      'priority_support': 'premium'
    };

    return featurePlanMap[feature] || 'premium';
  };

  const checkFeatureAccess = (feature: string): { hasAccess: boolean; requiredPlan?: string } => {
    const hasAccess = hasFeatureAccess(feature);
    
    if (!hasAccess) {
      return {
        hasAccess: false,
        requiredPlan: getRequiredPlan(feature)
      };
    }

    return { hasAccess: true };
  };

  return {
    hasFeatureAccess,
    getRequiredPlan,
    checkFeatureAccess,
    currentPlan: plan,
    limits
  };
};
