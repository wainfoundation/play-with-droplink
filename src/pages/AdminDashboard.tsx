
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useFeatureGate } from "@/hooks/useFeatureGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";
import MobilePreview from "@/components/dashboard/MobilePreview";
import PlanStatusHeader from "@/components/dashboard/PlanStatusHeader";
import PlanUpgradeModal from "@/components/dashboard/PlanUpgradeModal";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";
import GoToTop from '@/components/GoToTop';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, profile } = useUser();
  const { plan, limits } = useUserPlan();
  const { hasFeatureAccess, getRequiredPlan } = useFeatureGate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("");
  const [activeSection, setActiveSection] = useState("my-droplink");

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login");
      navigate("/login");
      return;
    }

    // Check if profile exists and onboarding is completed
    if (!profile) {
      console.log("Profile not found");
      return; // Wait for profile to load
    }

    // For now, assume onboarding is completed since we don't have this field in the database
    const onboardingCompleted = true; // TODO: Add onboarding_completed field to user_profiles table

    if (!onboardingCompleted) {
      console.log("Onboarding not completed, redirecting to onboarding");
      toast({
        title: "Complete Your Setup",
        description: "Please complete your profile setup first.",
      });
      navigate("/register/your-information");
      return;
    }

    // Welcome message for completed users
    if (onboardingCompleted) {
      console.log("User authenticated and onboarding completed, showing dashboard");
      toast({
        title: "Welcome to Your Dashboard!",
        description: `Welcome back, ${profile.display_name || profile.username}! Manage your Droplink profile here.`,
      });
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

  // Show loading state while checking authentication and profile
  if (!isLoggedIn || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
      
      <GoToTop />
    </>
  );
};

export default AdminDashboard;
