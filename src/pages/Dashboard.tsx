
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import PiNetworkIntegration from "@/components/PiNetworkIntegration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePiAuth } from "@/hooks/usePiAuth";
import { Pi, TrendingUp, Users, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useUser();
  const { handlePiLogin } = usePiAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in, staying on dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handlePiLoginWrapper = async () => {
    try {
      await handlePiLogin();
    } catch (error) {
      console.error("Pi login error:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4">
          <LoginPrompt handlePiLogin={handlePiLoginWrapper} />
        </main>
        <Footer />
        <GoToTop />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Links",
      value: "12",
      change: "+2 this week",
      icon: LinkIcon,
      color: "text-blue-600"
    },
    {
      title: "Profile Views",
      value: "1,234",
      change: "+15% this month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Pi Earned",
      value: "456π",
      change: "+25π this week",
      icon: Pi,
      color: "text-purple-600"
    },
    {
      title: "Engagement",
      value: "89%",
      change: "+5% this month",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Welcome back! Here's your Droplink overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`p-3 bg-muted rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pi Network Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pi className="h-5 w-5" />
                Pi Network Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PiNetworkIntegration showTitle={false} compact={true} />
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link to="/pi-dashboard">
                    View Full Pi Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <LinkIcon className="h-4 w-4 mr-2" />
                Add New Link
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View Profile Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Pi className="h-4 w-4 mr-2" />
                Setup Pi Payments
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/templates">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Browse Templates
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New profile view", detail: "Someone viewed your profile", time: "2 minutes ago" },
                { action: "Link clicked", detail: "Instagram link was clicked", time: "1 hour ago" },
                { action: "Pi payment received", detail: "Received 5π from a supporter", time: "3 hours ago" },
                { action: "Profile updated", detail: "You updated your bio", time: "1 day ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Dashboard;
