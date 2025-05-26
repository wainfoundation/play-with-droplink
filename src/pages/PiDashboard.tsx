
import React from 'react';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PiNetworkIntegration from '@/components/PiNetworkIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pi, TrendingUp, Users, DollarSign, Globe, Wallet, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PiDashboard = () => {
  const { user, isLoggedIn } = useUser();

  const piStats = [
    {
      icon: Pi,
      label: "Pi Earned",
      value: "1,234π",
      change: "+12.5%",
      positive: true
    },
    {
      icon: Users,
      label: "Pi Network Followers",
      value: "2,456",
      change: "+8.2%",
      positive: true
    },
    {
      icon: TrendingUp,
      label: "Pi Transactions",
      value: "89",
      change: "+23.1%",
      positive: true
    },
    {
      icon: DollarSign,
      label: "Conversion Rate",
      value: "3.4%",
      change: "+0.8%",
      positive: true
    }
  ];

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

        {/* Pi Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {piStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
              {[
                { type: "Payment Received", amount: "+25π", from: "user123", time: "2 hours ago" },
                { type: "Tip Received", amount: "+5π", from: "creator456", time: "4 hours ago" },
                { type: "Product Sale", amount: "+50π", from: "buyer789", time: "1 day ago" },
                { type: "Ad Revenue", amount: "+12π", from: "Pi Ads Network", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">From {activity.from}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{activity.amount}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default PiDashboard;
