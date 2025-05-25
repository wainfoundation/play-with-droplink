
import { User, Crown, Shield } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface DashboardHeaderProps {
  username: string;
  subscription?: any;
}

const DashboardHeader = ({ username, subscription }: DashboardHeaderProps) => {
  const { isAdmin } = useUser();
  
  const getPlanIcon = () => {
    if (isAdmin) return <Shield className="h-4 w-4 text-yellow-500" />;
    if (subscription?.plan === 'premium') return <Crown className="h-4 w-4 text-purple-500" />;
    return <User className="h-4 w-4 text-gray-500" />;
  };

  const getPlanLabel = () => {
    if (isAdmin) return "Admin";
    return subscription?.plan ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) : "Free";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your Droplink profile and track your performance
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          {getPlanIcon()}
          <span className="text-sm font-medium text-gray-700">
            {getPlanLabel()} Plan
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
