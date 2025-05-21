
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewStatsProps {
  pageViews: number;
  linkClicks: number;
  conversionRate: number;
}

const OverviewStats = ({ pageViews, linkClicks, conversionRate }: OverviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Page Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{pageViews}</div>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Link Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{linkClicks}</div>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{conversionRate}%</div>
          <p className="text-xs text-gray-500 mt-1">Clicks per view</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
