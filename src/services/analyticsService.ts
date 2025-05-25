
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
 * Track an analytics event using the new database functions
 */
export async function trackEvent(
  userId: string,
  event: AnalyticsEvent
): Promise<boolean> {
  try {
    if (event.link_click && event.link_id) {
      // Use the track_link_click function
      const { error } = await supabase.rpc('track_link_click', {
        link_id_param: event.link_id,
        user_agent_param: event.user_agent || navigator.userAgent,
        ip_address_param: null, // Will be handled server-side
        referrer_param: event.referrer || document.referrer
      });
      
      if (error) throw error;
    } else if (event.page_view) {
      // Use the track_page_view function
      const { error } = await supabase.rpc('track_page_view', {
        profile_user_id: userId,
        user_agent_param: event.user_agent || navigator.userAgent,
        ip_address_param: null, // Will be handled server-side
        referrer_param: event.referrer || document.referrer
      });
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking event:", error);
    return false;
  }
}

/**
 * Track a page view
 */
export async function trackPageView(userId: string, path: string): Promise<boolean> {
  return trackEvent(userId, {
    page_view: true,
    custom_data: { path }
  });
}

/**
 * Track a link click
 */
export async function trackLinkClick(userId: string, linkId: string): Promise<boolean> {
  return trackEvent(userId, {
    link_click: true,
    link_id: linkId
  });
}
