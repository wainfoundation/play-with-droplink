
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import { 
  BarChart3, 
  Link as LinkIcon, 
  Store, 
  DollarSign, 
  Users, 
  Settings, 
  Calendar,
  MessageSquare,
  Scissors,
  QrCode,
  Crown,
  ExternalLink
} from 'lucide-react';
import AdminLinksManager from '@/components/admin/AdminLinksManager';
import AdminProfilePreview from '@/components/admin/AdminProfilePreview';
import AdminAnalytics from '@/components/admin/AdminAnalytics';

const AdminDashboard = () => {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState('links');

  if (!profile) {
    return <div>Loading...</div>;
  }

  const sidebarItems = [
    { id: 'links', label: 'My Droplink', icon: <LinkIcon className="w-4 h-4" />, available: true },
    { id: 'shop', label: 'My Shop', icon: <Store className="w-4 h-4" />, available: profile.plan === 'pro' || profile.plan === 'premium' },
    { id: 'earn', label: 'Earn', icon: <DollarSign className="w-4 h-4" />, available: true },
    { id: 'audience', label: 'Audience', icon: <Users className="w-4 h-4" />, available: profile.plan !== 'free' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, available: profile.plan !== 'free' },
    { id: 'tools', label: 'Tools', icon: <Settings className="w-4 h-4" />, available: true },
    { id: 'social', label: 'Social Planner', icon: <Calendar className="w-4 h-4" />, available: profile.plan === 'pro' || profile.plan === 'premium' },
    { id: 'auto-reply', label: 'Instagram Auto-Reply', icon: <MessageSquare className="w-4 h-4" />, available: profile.plan === 'premium' },
    { id: 'shortener', label: 'Link Shortener', icon: <Scissors className="w-4 h-4" />, available: profile.plan !== 'free' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Droplink</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={profile.plan === 'free' ? 'secondary' : 'default'}>
                {profile.plan?.toUpperCase()}
              </Badge>
              {profile.plan === 'free' && (
                <Button variant="outline" size="sm" className="text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Upgrade
                </Button>
              )}
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${!item.available ? 'opacity-50' : ''}`}
                    onClick={() => item.available && setActiveTab(item.id)}
                    disabled={!item.available}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {!item.available && <Crown className="w-3 h-3 ml-auto" />}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Content Area */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sidebarItems.find(item => item.id === activeTab)?.label}
                  </h2>
                  <p className="text-gray-600">
                    Manage your Droplink profile and settings
                  </p>
                </div>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </Button>
              </div>
            </div>

            {activeTab === 'links' && <AdminLinksManager />}
            {activeTab === 'analytics' && <AdminAnalytics />}
            {activeTab === 'shop' && (
              <Card>
                <CardHeader>
                  <CardTitle>Digital Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Sell digital products and services to your audience.</p>
                  <Button>Add Product</Button>
                </CardContent>
              </Card>
            )}
            {activeTab === 'earn' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earning Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-900">0π</div>
                        <div className="text-sm text-green-700">Tips Received</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">0π</div>
                        <div className="text-sm text-blue-700">Product Sales</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-900">0π</div>
                        <div className="text-sm text-purple-700">Total Earned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5" />
                      QR Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Generate QR codes for your profile.</p>
                    <Button variant="outline">Generate QR Code</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Optimize your profile for search engines.</p>
                    <Button variant="outline">Configure SEO</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Profile Preview Panel */}
          <div className="w-80 border-l bg-white">
            <AdminProfilePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
