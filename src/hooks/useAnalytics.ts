
import { useState, useEffect } from 'react';
import { getAnalyticsData, getLinkAnalytics, AnalyticsData, LinkAnalytics } from '@/services/analyticsService';

export const useAnalytics = (userId: string) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [linkAnalytics, setLinkAnalytics] = useState<LinkAnalytics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (period: string = '30d') => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [analytics, links] = await Promise.all([
        getAnalyticsData(userId, period),
        getLinkAnalytics(userId, period)
      ]);
      
      setAnalyticsData(analytics);
      setLinkAnalytics(links);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [userId]);

  return {
    analyticsData,
    linkAnalytics,
    loading,
    error,
    refetch: fetchAnalytics
  };
};
