
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import OverviewStats from '@/components/dashboard/OverviewStats';

const AdminAnalytics = () => {
  const { pageViews, linkClicks, conversionRate, isLoading } = useAnalyticsData();

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <OverviewStats 
        pageViews={pageViews}
        linkClicks={linkClicks}
        conversionRate={conversionRate}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Detailed activity logs and recent visitors will appear here.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your most clicked links and their performance metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
