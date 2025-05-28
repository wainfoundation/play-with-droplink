
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Link2, 
  Users, 
  TrendingUp, 
  Settings, 
  Globe, 
  QrCode,
  Calendar,
  ShoppingBag,
  DollarSign,
  Instagram,
  MessageSquare,
  Scissors,
  Plus,
  ExternalLink,
  Edit,
  Trash2
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const Admin = () => {
  const { user, profile } = useUser();
  const { permissions, plan } = useUserPermissions();
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "My Droplink", icon: Link2, description: "Manage your links and profile" },
    { id: "shop", label: "My Shop", icon: ShoppingBag, description: "Digital products and sales", premium: true },
    { id: "earn", label: "Earn", icon: DollarSign, description: "Pi tips and earnings" },
    { id: "audience", label: "Audience", icon: Users, description: "Email capture and contacts", premium: true },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "Traffic and performance insights", premium: true },
    { id: "tools", label: "Tools", icon: Settings, description: "QR codes, SEO, and more" },
    { id: "planner", label: "Social Planner", icon: Calendar, description: "Schedule your content", premium: true },
    { id: "instagram", label: "Instagram Auto-Reply", icon: Instagram, description: "Automated responses", premium: true },
    { id: "shortener", label: "Link Shortener", icon: Scissors, description: "Create short links" }
  ];

  const mockLinks = [
    { id: 1, title: "YouTube Channel", url: "https://youtube.com/@user", clicks: 245, active: true },
    { id: 2, title: "Instagram Profile", url: "https://instagram.com/user", clicks: 189, active: true },
    { id: 3, title: "Personal Website", url: "https://mywebsite.com", clicks: 167, active: true },
  ];

  const mockStats = {
    totalClicks: 601,
    totalLinks: 3,
    totalEarnings: "12.5π",
    monthlyGrowth: "+23%"
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-3xl font-bold">{mockStats.totalClicks}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Links</p>
                <p className="text-3xl font-bold">{mockStats.totalLinks}</p>
              </div>
              <Link2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pi Earnings</p>
                <p className="text-3xl font-bold">{mockStats.totalEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <p className="text-3xl font-bold text-green-600">{mockStats.monthlyGrowth}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Plus className="w-6 h-6" />
              Add New Link
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <QrCode className="w-6 h-6" />
              Generate QR Code
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Globe className="w-6 h-6" />
              View Live Page
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Your Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">{link.title}</h4>
                    <p className="text-sm text-gray-600">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{link.clicks}</p>
                    <p className="text-xs text-gray-500">clicks</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPremiumFeature = (featureName: string) => (
    <Card className="h-full">
      <CardContent className="p-8 text-center">
        <div className="opacity-50">
          <Settings className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">{featureName}</h3>
          <p className="text-gray-600 mb-4">
            This feature is available with {plan === 'free' ? 'paid' : 'higher tier'} plans.
          </p>
          <Badge variant="outline" className="mb-4">
            {plan === 'free' ? 'Starter+' : plan === 'starter' ? 'Pro+' : 'Premium Only'}
          </Badge>
        </div>
        <Button className="w-full">
          Upgrade Plan
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard - Droplink</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-600">@{profile?.username || 'username'}</p>
            <Badge className="mt-2">
              {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
            </Badge>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isPremium = item.premium && plan === 'free';
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-primary text-white' 
                      : isPremium
                        ? 'text-gray-400 hover:text-gray-500'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  disabled={isPremium}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.label}</span>
                      {isPremium && <Badge variant="outline" className="text-xs">Pro</Badge>}
                    </div>
                    <p className="text-xs opacity-75">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "shop" && (plan === 'free' ? renderPremiumFeature("My Shop") : renderDashboard())}
          {activeTab === "earn" && renderDashboard()}
          {activeTab === "audience" && (plan === 'free' ? renderPremiumFeature("Audience") : renderDashboard())}
          {activeTab === "analytics" && (plan === 'free' ? renderPremiumFeature("Analytics") : renderDashboard())}
          {activeTab === "tools" && renderDashboard()}
          {activeTab === "planner" && (plan === 'free' ? renderPremiumFeature("Social Planner") : renderDashboard())}
          {activeTab === "instagram" && (plan === 'free' ? renderPremiumFeature("Instagram Auto-Reply") : renderDashboard())}
          {activeTab === "shortener" && renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
