import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoToTop from '@/components/GoToTop';
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import PiNetworkIntegration from "@/components/PiNetworkIntegration";
import PiProfileImport from "@/components/profile/PiProfileImport";
import OverviewStats from "@/components/dashboard/OverviewStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePiAuth } from "@/hooks/usePiAuth";
import { Pi, TrendingUp, Users, Link as LinkIcon, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useUser();
  const { handlePiLogin } = usePiAuth();
  const { pageViews, linkClicks } = useAnalyticsData();
  
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Welcome back! Here's your Droplink overview.
            </p>
          </div>

          {/* Real Analytics Overview */}
          <div className="mb-8">
            <OverviewStats />
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pi-network">Pi Network</TabsTrigger>
              <TabsTrigger value="pi-import">Import Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Pi Network Integration */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    {pageViews === 0 && linkClicks === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No activity yet. Start sharing your profile to see analytics here!</p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-600">
                        <p>Real-time activity tracking is now active</p>
                        <p className="text-sm">All data shown is from actual user interactions</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pi-network">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pi className="h-5 w-5" />
                    Pi Network Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PiNetworkIntegration showTitle={false} compact={false} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pi-import">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Import from Pi Network Profile
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Automatically import your Pi Network profile data to enhance your Droplink presence
                    </p>
                  </CardHeader>
                </Card>
                
                <PiProfileImport />
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
        <GoToTop />
      </div>
    </>
  );
};

export default Dashboard;
