
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserWelcomeSectionProps {
  username: string;
  userPlan: string | null;
  subscriptionEnd: Date | null;
}

const UserWelcomeSection = ({ username, userPlan, subscriptionEnd }: UserWelcomeSectionProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="mt-8 p-4 bg-gradient-hero text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Welcome, @{username}!</h2>
      {userPlan && (
        <>
          <p className="mt-2">Your current plan: <span className="font-bold">{userPlan}</span></p>
          {subscriptionEnd && (
            <p className="text-sm mt-1">Renews on: {formatDate(subscriptionEnd)}</p>
          )}
        </>
      )}
      {!userPlan && (
        <div className="mt-3">
          <p className="mb-2">You're currently on the Free plan</p>
          <Link to="/pricing">
            <Button className="bg-white text-primary hover:bg-opacity-90">
              Upgrade Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserWelcomeSection;
