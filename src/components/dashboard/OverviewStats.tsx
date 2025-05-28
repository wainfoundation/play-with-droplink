
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MousePointer, TrendingUp } from "lucide-react";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface OverviewStatsProps {
  pageViews?: number;
  linkClicks?: number;
  conversionRate?: number;
}

const OverviewStats = ({ 
  pageViews: propPageViews, 
  linkClicks: propLinkClicks, 
  conversionRate: propConversionRate 
}: OverviewStatsProps) => {
  const { 
    pageViews, 
    linkClicks, 
    conversionRate, 
    isLoading 
  } = useAnalyticsData();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>Your profile performance at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Your profile performance at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{pageViews.toLocaleString()}</div>
            <div className="text-sm text-blue-700">Page Views</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <MousePointer className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">{linkClicks.toLocaleString()}</div>
            <div className="text-sm text-green-700">Link Clicks</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{conversionRate}%</div>
            <div className="text-sm text-purple-700">Conversion Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewStats;
