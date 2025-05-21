import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { useAdminStatus } from "@/hooks/useAdminStatus";

// Import developer components
import AdminBanner from "@/components/developers/AdminBanner";
import HeroSection from "@/components/developers/HeroSection";
import ApiDocsSection from "@/components/developers/ApiDocsSection";
import WebhooksSection from "@/components/developers/WebhooksSection";
import PiIntegrationSection from "@/components/developers/PiIntegrationSection";
import SdksSection from "@/components/developers/SdksSection";
import GetStartedSection from "@/components/developers/GetStartedSection";
import DevCTASection from "@/components/developers/DevCTASection";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("api");
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();
  
  // Security improvement: Add console log for debugging permission status
  useEffect(() => {
    console.log("Developer page - Admin access status:", isAdmin);
  }, [isAdmin]);
  
  // Check if user has admin access to view developer portal
  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If not an admin, redirect to home page
  if (!isAdmin) {
    console.log("User does not have admin access, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  // Handler function for tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Developers - Droplink.space API Documentation</title>
        <meta name="description" content="Access the Droplink.space API to integrate Pi Network payments and user data into your applications." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Admin Notice Banner */}
        <AdminBanner />
      
        {/* Hero Section */}
        <HeroSection />
        
        {/* API Overview */}
        <ApiDocsSection activeTab={activeTab} setActiveTab={handleTabChange} />
        
        {/* Other sections - These will be rendered based on active tab */}
        {activeTab === "webhooks" && <WebhooksSection />}
        {activeTab === "pi-integration" && <PiIntegrationSection />}
        {activeTab === "sdks" && <SdksSection />}
        
        {/* Get Started */}
        <GetStartedSection />
        
        {/* Call to Action */}
        <DevCTASection />
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Developers;
