import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Users, Settings, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useUser } from "@/context/UserContext";
import GoToTop from '@/components/GoToTop';

const Admin = () => {
  const { isLoading: userLoading } = useUser();
  const { isAdmin, isLoading: adminLoading, error } = useAdminStatus();
  const isLoading = userLoading || adminLoading;
  
  // If still loading, show loading state
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <Helmet>
        <title>Admin Portal - Droplink</title>
        <meta name="description" content="Admin management portal for Droplink.space" />
      </Helmet>
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/developers" className="flex items-center gap-2">
                  <Code size={16} />
                  Developer Portal
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Users size={20} className="text-primary" />
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Manage user accounts, roles, and permissions.</p>
                <Button variant="outline" size="sm">Access User Management</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Code size={20} className="text-primary" />
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Review and moderate user-generated content.</p>
                <Button variant="outline" size="sm">Review Content</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Settings size={20} className="text-primary" />
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Configure global application settings.</p>
                <Button variant="outline" size="sm">Configure Settings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">View detailed platform analytics and reports.</p>
                <Button variant="outline" size="sm">View Analytics</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This admin portal is under development. More features coming soon.</p>
              <div className="flex gap-2">
                <Button size="sm">Update System</Button>
                <Button size="sm" variant="outline">Run Maintenance</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <GoToTop />
    </>
  );
};

export default Admin;
