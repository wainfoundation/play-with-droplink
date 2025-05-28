
import React from 'react';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import PiNetworkIntegration from '@/components/PiNetworkIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pi, TrendingUp, Users, DollarSign, Globe, Wallet, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const PiDashboard = () => {
  const { user, isLoggedIn } = useUser();
  const { pageViews, linkClicks, conversionRate, isLoading } = useAnalyticsData();

  const piFeatures = [
    {
      title: "Pi Payments",
      description: "Accept Pi cryptocurrency for products and services",
      status: "Active",
      icon: Wallet
    },
    {
      title: "Pi Domain Integration", 
      description: "Connect your .pi domain to your Droplink profile",
      status: "Available",
      icon: Globe
    },
    {
      title: "Pi Ads Network",
      description: "Monetize your profile with Pi-based advertising",
      status: "Active",
      icon: Zap
    },
    {
      title: "Pi Authentication",
      description: "Secure login using Pi Network credentials",
      status: "Active",
      icon: Pi
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Helmet>
        <title>Pi Network Dashboard - Droplink</title>
        <meta name="description" content="Manage your Pi Network integration, payments, and earnings on Droplink" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pi Network Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage your Pi Network integration and earnings
          </p>
        </div>

        {/* Real Pi Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Page Views
                      </p>
                      <p className="text-2xl font-bold">{pageViews.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        Real-time tracking
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Link Clicks
                      </p>
                      <p className="text-2xl font-bold">{linkClicks.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        Production data
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold">{conversionRate}%</p>
                      <p className="text-sm text-green-600">
                        Live analytics
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Pi Earned
                      </p>
                      <p className="text-2xl font-bold">0π</p>
                      <p className="text-sm text-muted-foreground">
                        Start earning today
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Pi className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Pi Network Integration */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pi Network Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <PiNetworkIntegration showTitle={false} />
            </CardContent>
          </Card>
        </div>

        {/* Pi Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Pi Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {piFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    {feature.title}
                    <Badge 
                      variant={feature.status === "Active" ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {feature.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" className="w-full">
                    {feature.status === "Active" ? "Manage" : "Setup"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Pi Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Pi Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageViews === 0 && linkClicks === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No Pi activity yet. Start using Pi features to see activity here!</p>
                  <p className="text-sm mt-2">All data shown is real production data</p>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-600">
                  <p>Real-time Pi activity tracking is active</p>
                  <p className="text-sm">All data shown is from actual user interactions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
      <GoToTop />
    </div>
  );
};

export default PiDashboard;
