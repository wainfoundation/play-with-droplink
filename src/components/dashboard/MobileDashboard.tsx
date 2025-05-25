
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Link as LinkIcon, 
  Eye, 
  MousePointer, 
  DollarSign, 
  Share,
  Plus,
  Settings,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

interface MobileDashboardProps {
  username: string;
  subscription: any;
  stats: {
    pageViews: number;
    linkClicks: number;
    conversionRate: number;
  };
}

const MobileDashboard = ({ username, subscription, stats }: MobileDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Page Views</p>
                <p className="text-2xl font-bold text-blue-900">{stats.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Link Clicks</p>
                <p className="text-2xl font-bold text-green-900">{stats.linkClicks.toLocaleString()}</p>
              </div>
              <MousePointer className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Conversion</p>
                <p className="text-2xl font-bold text-purple-900">{stats.conversionRate}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Revenue</p>
                <p className="text-2xl font-bold text-orange-900">12.5π</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Link */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">Your Profile URL</p>
              <p className="text-sm text-gray-600 truncate">droplink.gg/{username}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/${username}`}>
                  <Eye className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="sm" variant="outline">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex flex-col items-center justify-center bg-gradient-hero hover:bg-secondary">
          <Plus className="w-5 h-5 mb-1" />
          <span className="text-sm">Add Link</span>
        </Button>
        
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
          <Settings className="w-5 h-5 mb-1" />
          <span className="text-sm">Settings</span>
        </Button>
      </div>

      {/* Subscription Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="bg-gradient-hero text-white mb-2">
                {subscription?.plan || 'Free'} Plan
              </Badge>
              <p className="text-sm text-gray-600">
                {subscription?.expires_at 
                  ? `Expires ${new Date(subscription.expires_at).toLocaleDateString()}`
                  : 'Free plan features'
                }
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/pricing">
              {subscription?.plan ? 'Manage Plan' : 'Upgrade Now'}
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Profile viewed 23 times</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MousePointer className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Link clicked 8 times</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Received 2.5π tip</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;
