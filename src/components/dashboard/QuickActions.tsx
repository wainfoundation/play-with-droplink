
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface QuickActionsProps {
  subscription: any;
  profile: any;
  navigate: Function;
  setConfirmCancelOpen: (open: boolean) => void;
}

const QuickActions = ({ subscription, profile, navigate, setConfirmCancelOpen }: QuickActionsProps) => {
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
          <CardTitle>Current Plan: {subscription ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) : "Free"}</CardTitle>
          <CardDescription>
            {subscription ? (
              <span>Your subscription renews on {formatDate(subscription.expires_at)}</span>
            ) : (
              "You are currently using the free version."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!subscription && (
            <div className="text-sm mb-4">
              <p>Upgrade to access premium features like:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Custom themes</li>
                <li>Analytics</li>
                <li>Pi payments</li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {subscription ? (
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
