
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AnalyticsSectionProps {
  subscription: any;
}

const AnalyticsSection = ({ subscription }: AnalyticsSectionProps) => {
  const { isAdmin } = useUser();
  const { pageViews, linkClicks, conversionRate, isLoading } = useAnalyticsData();
  
  // Check if user has pro/premium features (either through subscription or admin status)
  const hasProFeatures = isAdmin || (subscription && (subscription.plan === "pro" || subscription.plan === "premium"));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Insights</CardTitle>
        <CardDescription>
          {hasProFeatures
            ? "Track detailed performance metrics of your page and links" 
            : "Upgrade to Pro or Premium to access detailed analytics"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasProFeatures ? (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-1">Page Views</h3>
                    <p className="text-2xl font-bold">{pageViews.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-1">Link Clicks</h3>
                    <p className="text-2xl font-bold">{linkClicks.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-1">Conversion Rate</h3>
                    <p className="text-2xl font-bold">{conversionRate}%</p>
                  </div>
                </div>
                
                <div className="border border-blue-200 p-6 rounded-lg flex justify-center items-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Real-time analytics tracking active</p>
                    <Button variant="outline">Export Report</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="font-medium mb-2">Premium Feature</h3>
            <p className="text-gray-600 mb-4">Detailed analytics are available on Pro and Premium plans</p>
            <Link to="/pricing">
              <Button className="bg-gradient-hero hover:bg-secondary">
                Upgrade Now
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
