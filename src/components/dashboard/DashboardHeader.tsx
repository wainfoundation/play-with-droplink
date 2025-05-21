
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardHeaderProps {
  username: string | null;
  subscription: any;
}

const DashboardHeader = ({ username, subscription }: DashboardHeaderProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'pro':
        return 'bg-blue-600 text-white';
      case 'starter':
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
      <div className="flex items-center">
        <div className="bg-primary/10 p-2 rounded-full mr-3">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-600">
            {username ? (
              <>Welcome back, <span className="font-medium">@{username}</span></>
            ) : (
              <Skeleton className="h-4 w-32 bg-gray-200" />
            )}
          </p>
        </div>
      </div>
      
      {subscription ? (
        <div className="mt-4 md:mt-0 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Badge className={`mr-2 ${getPlanBadgeColor(subscription.plan)}`}>
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
      ) : null}
    </div>
  );
};

export default DashboardHeader;
