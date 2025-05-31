
import React from "react";
import { useUser } from "@/context/UserContext";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Users, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PiDashboard = () => {
  const { user, loading } = useUser(); // Use 'loading' instead of 'isLoading'
  const { isAdmin, adminData, isLoading: adminLoading, error } = useAdminStatus();

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Pi Dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600">Please log in to access the Pi Dashboard.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pi Dashboard - Droplink</title>
        <meta name="description" content="Manage your Pi Network integration and admin features" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pi Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your Pi Network integration and access admin features
            </p>
          </div>

          {/* Admin Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Status</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {isAdmin ? (
                    <Badge variant="default" className="bg-green-500">
                      <Crown className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Regular User</Badge>
                  )}
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pi User ID</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold truncate">{user.id}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Pi Network</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Features */}
          {isAdmin && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Admin Features
                </CardTitle>
                <CardDescription>
                  Access to administrative functions and controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="font-semibold">User Management</div>
                    <div className="text-sm text-gray-600">Manage user accounts and permissions</div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="font-semibold">Platform Analytics</div>
                    <div className="text-sm text-gray-600">View platform usage and statistics</div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="font-semibold">Content Moderation</div>
                    <div className="text-sm text-gray-600">Review and moderate user content</div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="font-semibold">System Settings</div>
                    <div className="text-sm text-gray-600">Configure platform settings</div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pi Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Pi Network Integration</CardTitle>
              <CardDescription>
                Your Pi Network connection and integration status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Pi Authentication</span>
                  <Badge variant="default" className="bg-green-500">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pi Payments</span>
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pi Ads Network</span>
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pi Domain</span>
                  <Badge variant="secondary">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PiDashboard;
