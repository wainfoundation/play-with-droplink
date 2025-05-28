
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

export function useAnalyticsData() {
  const { profile } = useUser();
  const [pageViews, setPageViews] = useState(0);
  const [linkClicks, setLinkClicks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      if (!profile || !profile.id) {
        setPageViews(0);
        setLinkClicks(0);
        setConversionRate(0);
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch page views
        const { count: viewsCount, error: viewsError } = await supabase
          .from("analytics")
          .select("id", { count: "exact" })
          .eq("user_id", profile.id)
          .eq("page_view", true);
          
        // Fetch link clicks
        const { count: clicksCount, error: clicksError } = await supabase
          .from("analytics")
          .select("id", { count: "exact" })
          .eq("user_id", profile.id)
          .eq("link_click", true);
          
        if (viewsError) {
          console.error("Error fetching page views:", viewsError);
        }
        
        if (clicksError) {
          console.error("Error fetching link clicks:", clicksError);
        }
        
        // Set data with real values from database
        const views = viewsCount !== null ? viewsCount : 0;
        const clicks = clicksCount !== null ? clicksCount : 0;
        const rate = views > 0 ? +(clicks / views * 100).toFixed(1) : 0;
        
        setPageViews(views);
        setLinkClicks(clicks);
        setConversionRate(rate);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        
        // Reset to zero on error
        setPageViews(0);
        setLinkClicks(0);
        setConversionRate(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();

    // Set up real-time subscription for analytics updates
    const channel = supabase
      .channel('analytics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'analytics',
          filter: `user_id=eq.${profile?.id}`
        },
        () => {
          // Refetch data when analytics change
          fetchAnalyticsData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  return {
    pageViews,
    linkClicks,
    conversionRate,
    isLoading
  };
}
