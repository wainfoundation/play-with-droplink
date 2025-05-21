
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export function useAnalyticsData() {
  const { profile } = useUser();
  const [pageViews, setPageViews] = useState(0);
  const [linkClicks, setLinkClicks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  
  useEffect(() => {
    if (profile) {
      // Simulate analytics data
      const randomViews = Math.floor(Math.random() * 1000) + 100;
      const randomClicks = Math.floor(randomViews * (Math.random() * 0.7 + 0.1));
      const randomRate = +(randomClicks / randomViews * 100).toFixed(1);
      
      setPageViews(randomViews);
      setLinkClicks(randomClicks);
      setConversionRate(randomRate);
    }
  }, [profile]);

  return {
    pageViews,
    linkClicks,
    conversionRate
  };
}
