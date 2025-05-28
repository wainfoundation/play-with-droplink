
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useUserPlan } from "@/hooks/use-user-plan";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link as LinkIcon, 
  Store, 
  PieChart, 
  Settings, 
  Palette, 
  Crown, 
  Lock,
  Calendar,
  Users,
  MessageSquare,
  Scissors,
  Zap,
  Pi
} from "lucide-react";
import LinksSection from "@/components/dashboard/LinksSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import PlanUpgradeModal from "@/components/dashboard/PlanUpgradeModal";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, profile, subscription } = useUser();
  const { plan, limits } = useUserPlan();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Check if onboarding is completed
    if (!profile?.onboarding_completed) {
      navigate("/register/your-information");
      return;
    }
  }, [isLoggedIn, profile, navigate]);

  const handleFeatureGate = (feature: string, requiredPlan: string) => {
    if (!hasFeatureAccess(feature)) {
      setUpgradeFeature(feature);
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };

  const hasFeatureAccess = (feature: string) => {
    const featureMap: Record<string, boolean> = {
      'product_sales': limits.hasDigitalStore,
      'analytics': limits.hasAnalytics,
      'seo_tools': limits.hasSEOTools,
      'scheduling': limits.hasScheduling,
      'team_access': limits.hasTeamAccess,
      'social_planner': limits.hasAutomations,
      'instagram_reply': limits.hasAutomations,
      'link_shortener': limits.hasAdvancedSEO,
      'custom_css': limits.hasCustomCSS
    };
    return featureMap[feature] || false;
  };

  const getPlanBadgeColor = () => {
    switch (plan) {
      case 'premium': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'pro': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'starter': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const navigationItems = [
    {
      id: 'droplink',
      title: 'My Droplink',
      icon: LinkIcon,
      accessible: true,
      description: 'Manage your profile and links'
    },
    {
      id: 'shop',
      title: 'My Shop',
      icon: Store,
      accessible: hasFeatureAccess('product_sales'),
      description: 'Sell digital products with Pi payments'
    },
    {
      id: 'pi-tips',
      title: 'Earn with Pi Tips',
      icon: Pi,
      accessible: plan !== 'free',
      description: 'Receive Pi cryptocurrency tips'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: PieChart,
      accessible: hasFeatureAccess('analytics'),
      description: 'Track your audience and performance'
    },
    {
      id: 'tools',
      title: 'Tools',
      icon: Settings,
      accessible: plan === 'pro' || plan === 'premium',
      description: 'SEO, scheduling, and advanced features'
    },
    {
      id: 'social-planner',
      title: 'Social Planner',
      icon: Calendar,
      accessible: hasFeatureAccess('social_planner'),
      description: 'Schedule and plan your content'
    },
    {
      id: 'instagram-reply',
      title: 'Instagram Auto-Reply',
      icon: MessageSquare,
      accessible: hasFeatureAccess('instagram_reply'),
      description: 'Automated Instagram responses'
    },
    {
      id: 'link-shortener',
      title: 'Link Shortener',
      icon: Scissors,
      accessible: hasFeatureAccess('link_shortener'),
      description: 'Create short branded links'
    },
    {
      id: 'team',
      title: 'Team Access',
      icon: Users,
      accessible: hasFeatureAccess('team_access'),
      description: 'Collaborate with your team'
    }
  ];

  const planFeatures = {
    free: ['1 Link', 'Pi Ad Network', '3 Basic Templates', 'Community Support'],
    starter: ['Unlimited Links', '33+ Templates', '.pi Domain', 'Pi Tips', 'Basic Analytics', 'Email Support'],
    pro: ['Everything in Starter', '66+ Templates', 'Digital Product Sales', 'Advanced Analytics', 'SEO Tools', 'Link Scheduling', 'Email/Phone Capture'],
    premium: ['Everything in Pro', '99+ Templates', 'Custom CSS', 'API Access', 'White-label Branding', 'Team Access', 'Social Planner', 'Instagram Auto-Reply']
  };

  if (!isLoggedIn || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Helmet>
        <title>Admin Dashboard - Droplink</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Plan Status Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {profile.display_name || profile.username}!
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your Droplink profile and grow your audience
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={`${getPlanBadgeColor()} text-white px-4 py-2 text-sm`}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                  </Badge>
                  {subscription?.amount && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {subscription.amount}π/month
                    </p>
                  )}
                </div>
              </div>
              
              {/* Plan Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {planFeatures[plan as keyof typeof planFeatures]?.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-green-600">
                    <Zap className="w-3 h-3 mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
              
              {plan !== 'premium' && (
                <Button 
                  onClick={() => navigate("/pricing")}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {navigationItems.map((item) => (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                !item.accessible 
                  ? 'opacity-60 bg-gray-50' 
                  : 'hover:scale-105'
              }`}
              onClick={() => {
                if (!item.accessible) {
                  handleFeatureGate(item.id, 'upgrade');
                } else {
                  // Handle navigation based on item
                  if (item.id === 'pi-tips') {
                    navigate('/pi-dashboard');
                  }
                  // Add other navigation logic here
                }
              }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.accessible 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1">{item.title}</span>
                  {!item.accessible && <Lock className="w-4 h-4 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {!item.accessible && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUpgradeModal(true);
                    }}
                  >
                    Upgrade to Unlock
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="links">My Links</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Links</span>
                      <Badge variant="secondary">{profile.total_clicks || 0}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Plan</span>
                      <Badge>{plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Profile URL</span>
                      <a 
                        href={`https://droplink.space/@${profile.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @{profile.username}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    No recent activity to show
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="links">
            <LinksSection />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsSection subscription={subscription} />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Settings panel coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <PlanUpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={upgradeFeature}
          currentPlan={plan}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
