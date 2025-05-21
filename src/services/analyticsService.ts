
import { supabase } from "@/integrations/supabase/client";

type AnalyticsEvent = {
  page_view?: boolean;
  link_click?: boolean;
  link_id?: string;
  referrer?: string;
  user_agent?: string;
  custom_data?: any;
};

/**
 * Track an analytics event
 * @param userId - The user ID
 * @param event - The event data
 * @returns True if successful, false if failed
 */
export async function trackEvent(
  userId: string,
  event: AnalyticsEvent
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert({
        user_id: userId,
        ...event,
        user_agent: event.user_agent || navigator.userAgent,
        referrer: event.referrer || document.referrer
      });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking event:", error);
    return false;
  }
}

/**
 * Track a page view
 * @param userId - The user ID
 * @param path - The page path
 * @returns True if successful, false if failed
 */
export async function trackPageView(userId: string, path: string): Promise<boolean> {
  return trackEvent(userId, {
    page_view: true,
    custom_data: { path }
  });
}

/**
 * Track a link click
 * @param userId - The user ID
 * @param linkId - The link ID
 * @returns True if successful, false if failed
 */
export async function trackLinkClick(userId: string, linkId: string): Promise<boolean> {
  return trackEvent(userId, {
    link_click: true,
    link_id: linkId
  });
}
