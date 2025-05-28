
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useFeatureGate } from "@/hooks/useFeatureGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";
import MobilePreview from "@/components/dashboard/MobilePreview";
import PlanStatusHeader from "@/components/dashboard/PlanStatusHeader";
import PlanUpgradeModal from "@/components/dashboard/PlanUpgradeModal";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, profile } = useUser();
  const { plan, limits } = useUserPlan();
  const { hasFeatureAccess, getRequiredPlan, checkFeatureAccess } = useFeatureGate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("");
  const [activeSection, setActiveSection] = useState("my-droplink");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!profile?.onboarding_completed) {
      navigate("/register/your-information");
      return;
    }
  }, [isLoggedIn, profile, navigate]);

  const handleFeatureClick = (feature: string, requiredFeatures: string[]) => {
    // Check if any of the required features are accessible
    const hasAccess = requiredFeatures.some(req => hasFeatureAccess(req));
    
    if (!hasAccess) {
      const requiredPlan = getRequiredPlan(requiredFeatures[0]);
      setUpgradeFeature(requiredFeatures[0]);
      setShowUpgradeModal(true);
      return false;
    }
    
    setActiveSection(feature);
    return true;
  };

  if (!isLoggedIn || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard - Droplink</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={handleFeatureClick}
          plan={plan}
          hasFeatureAccess={hasFeatureAccess}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 overflow-auto">
            <PlanStatusHeader 
              plan={plan} 
              limits={limits}
              onUpgrade={() => navigate("/pricing")}
            />
            
            <DashboardMain 
              activeSection={activeSection}
              plan={plan}
              limits={limits}
              profile={profile}
              hasFeatureAccess={hasFeatureAccess}
              onFeatureClick={handleFeatureClick}
            />
          </div>
          
          {/* Mobile Preview */}
          <MobilePreview profile={profile} />
        </div>
      </div>

      <Footer />

      {/* Upgrade Modal */}
      <PlanUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={upgradeFeature}
        currentPlan={plan}
      />
    </div>
  );
};

export default AdminDashboard;
