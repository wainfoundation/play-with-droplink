import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import GoToTop from '@/components/GoToTop';

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
  const { permissions } = useUserPermissions();
  
  // Security improvement: Add console log for debugging permission status
  useEffect(() => {
    console.log("Developer page - Access status:", permissions.hasDeveloperAccess);
  }, [permissions.hasDeveloperAccess]);
  
  // Allow all users to access developer portal
  if (!permissions.hasDeveloperAccess) {
    console.log("User does not have developer access, redirecting to home");
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
        {/* Developer Access Banner */}
        <div className="bg-green-100 text-green-800 px-4 py-3 text-center">
          <p className="font-medium">Developer Portal - API Documentation & Integration Tools</p>
        </div>
      
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
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Developers;
