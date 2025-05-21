
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";

interface AnalyticsSectionProps {
  subscription: any;
}

const AnalyticsSection = ({ subscription }: AnalyticsSectionProps) => {
  const { isAdmin } = useUser();
  
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-1">Top Referrers</h3>
                <ol className="list-decimal pl-5 text-sm">
                  <li>Direct visits</li>
                  <li>Instagram</li>
                  <li>Pi Browser</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-1">Visitors by Device</h3>
                <ol className="list-decimal pl-5 text-sm">
                  <li>Mobile (78%)</li>
                  <li>Desktop (18%)</li>
                  <li>Tablet (4%)</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-1">Top Locations</h3>
                <ol className="list-decimal pl-5 text-sm">
                  <li>United States</li>
                  <li>United Kingdom</li>
                  <li>Germany</li>
                </ol>
              </div>
            </div>
            
            <div className="border border-blue-200 p-6 rounded-lg flex justify-center items-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Detailed charts and reports available soon!</p>
                <Button variant="outline">Export Report</Button>
              </div>
            </div>
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
