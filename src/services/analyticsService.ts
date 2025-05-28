
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
 * Track an analytics event using direct database queries
 */
export async function trackEvent(
  userId: string,
  event: AnalyticsEvent
): Promise<boolean> {
  try {
    if (event.link_click && event.link_id) {
      // Get the link to find the owner
      const { data: link } = await supabase
        .from('links')
        .select('user_id, clicks')
        .eq('id', event.link_id)
        .single();

      if (link) {
        // Insert analytics record for link click
        const { error: analyticsError } = await supabase
          .from('analytics')
          .insert({
            user_id: link.user_id,
            link_id: event.link_id,
            link_click: true,
            user_agent: event.user_agent || navigator.userAgent,
            referrer: event.referrer || document.referrer,
            ip_address: null // Will be handled by backend if needed
          });

        if (analyticsError) throw analyticsError;

        // Update click count by incrementing the current value
        const currentClicks = link.clicks || 0;
        const { error: updateError } = await supabase
          .from('links')
          .update({ clicks: currentClicks + 1 })
          .eq('id', event.link_id);

        if (updateError) throw updateError;
      }
    } else if (event.page_view) {
      // Insert page view analytics
      const { error } = await supabase
        .from('analytics')
        .insert({
          user_id: userId,
          page_view: true,
          user_agent: event.user_agent || navigator.userAgent,
          referrer: event.referrer || document.referrer,
          ip_address: null // Will be handled by backend if needed
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

/**
 * Track anonymous page view (for non-logged-in users viewing profiles)
 */
export async function trackAnonymousPageView(profileUserId: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert({
        user_id: profileUserId,
        page_view: true,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        ip_address: null
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error tracking anonymous page view:", error);
    return false;
  }
}
