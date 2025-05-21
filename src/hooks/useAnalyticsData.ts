
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
        
        // Set data with real values
        const views = viewsCount !== null ? viewsCount : 0;
        const clicks = clicksCount !== null ? clicksCount : 0;
        const rate = views > 0 ? +(clicks / views * 100).toFixed(1) : 0;
        
        setPageViews(views);
        setLinkClicks(clicks);
        setConversionRate(rate);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        
        // In case of error, set default values
        setPageViews(0);
        setLinkClicks(0);
        setConversionRate(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [profile]);

  return {
    pageViews,
    linkClicks,
    conversionRate,
    isLoading
  };
}
