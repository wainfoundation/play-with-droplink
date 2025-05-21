
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { ShieldCheck } from "lucide-react";

interface QuickActionsProps {
  subscription: any;
  profile: any;
  navigate: Function;
  setConfirmCancelOpen: (open: boolean) => void;
}

const QuickActions = ({ subscription, profile, navigate, setConfirmCancelOpen }: QuickActionsProps) => {
  const { isAdmin } = useUser();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="bg-primary hover:bg-primary/90">
            Add New Link
          </Button>
          <Button variant="outline">
            Edit Profile
          </Button>
          <Button variant="outline" onClick={() => navigate(`/u/${profile.username}`)}>
            View My Page
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          {isAdmin ? (
            <>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <CardTitle>Admin Account</CardTitle>
              </div>
              <CardDescription>
                All premium features are unlocked
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Current Plan: {subscription ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) : "Free"}</CardTitle>
              <CardDescription>
                {subscription ? (
                  <span>Your subscription renews on {formatDate(subscription.expires_at)}</span>
                ) : (
                  "You are currently using the free version."
                )}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {!subscription && !isAdmin && (
            <div className="text-sm mb-4">
              <p>Upgrade to access premium features like:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Custom themes</li>
                <li>Analytics</li>
                <li>Pi payments</li>
              </ul>
            </div>
          )}
          {isAdmin && (
            <div className="text-sm mb-4">
              <p className="text-green-600 font-medium">Admin features:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Full access to all premium features</li>
                <li>Test all subscription plans</li>
                <li>No payments required</li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {isAdmin ? (
            <Link to="/admin" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Go to Admin Portal
              </Button>
            </Link>
          ) : subscription ? (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setConfirmCancelOpen(true)}
            >
              Manage Subscription
            </Button>
          ) : (
            <Link to="/pricing" className="w-full">
              <Button className="w-full bg-gradient-hero hover:bg-secondary">
                Upgrade Now
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuickActions;
