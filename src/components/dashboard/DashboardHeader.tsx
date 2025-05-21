
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface DashboardHeaderProps {
  username: string | null;
  subscription: any;
}

const DashboardHeader = ({ username, subscription }: DashboardHeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome back, @{username || "user"}</p>
      </div>
      
      {subscription && (
        <div className="mt-4 md:mt-0 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Badge className="mr-2 bg-primary">
              {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
            </Badge>
            <span className="text-sm text-gray-600">
              {subscription.expires_at && (
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Renews {formatDate(subscription.expires_at)}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
