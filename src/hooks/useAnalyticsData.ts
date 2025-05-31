
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface AnalyticsData {
  totalClicks: number;
  totalViews: number;
  clicksByDate: Array<{ date: string; clicks: number }>;
  topLinks: Array<{ title: string; clicks: number; url: string }>;
}

export const useAnalyticsData = () => {
  const { user } = useUser();
  const [data, setData] = useState<AnalyticsData>({
    totalClicks: 0,
    totalViews: 0,
    clicksByDate: [],
    topLinks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    if (!user) return;

    try {
      // Use links table data as analytics source
      const { data: links, error } = await supabase
        .from('links')
        .select('title, clicks, url, created_at')
        .eq('user_id', user.id)
        .order('clicks', { ascending: false });

      if (error) throw error;

      const totalClicks = links?.reduce((sum, link) => sum + (link.clicks || 0), 0) || 0;
      const totalViews = totalClicks; // Placeholder - in real analytics, views would be separate

      // Generate mock data for clicks by date (last 7 days)
      const clicksByDate = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString().split('T')[0],
          clicks: Math.floor(Math.random() * 50) // Mock data
        };
      }).reverse();

      const topLinks = links?.slice(0, 5).map(link => ({
        title: link.title,
        clicks: link.clicks || 0,
        url: link.url
      })) || [];

      setData({
        totalClicks,
        totalViews,
        clicksByDate,
        topLinks
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Return data properties directly for backward compatibility
  return {
    data,
    loading,
    isLoading: loading,
    pageViews: data.totalViews,
    linkClicks: data.totalClicks,
    conversionRate: data.totalViews > 0 ? Math.round((data.totalClicks / data.totalViews) * 100) : 0,
    refetch: fetchAnalyticsData
  };
};
