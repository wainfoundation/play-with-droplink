
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewStats from "@/components/dashboard/OverviewStats";
import LinksSection from "@/components/dashboard/LinksSection";
import ProductsSection from "@/components/dashboard/ProductsSection";
import GroupsSection from "@/components/dashboard/GroupsSection";
import ProfileUrlDisplay from "@/components/dashboard/ProfileUrlDisplay";
import QuickActions from "@/components/dashboard/QuickActions";
import SubscriptionManagement from "@/components/dashboard/SubscriptionManagement";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePiPayment } from "@/hooks/usePiPayment";

const Dashboard = () => {
  const { isLoggedIn, isLoading, profile, user, subscription } = useUser();
  const navigate = useNavigate();
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { handleSubscribe: piHandleSubscribe } = usePiPayment();

  const handlePiLogin = () => {
    navigate('/login');
  };

  const handleSubscribe = async (plan: string) => {
    setProcessingPayment(true);
    try {
      await piHandleSubscribe(plan, 'monthly'); // Default to monthly billing
      console.log('Subscribe clicked for plan:', plan);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isLoggedIn) {
    return <LoginPrompt handlePiLogin={handlePiLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader 
            username={profile?.username || user?.email || 'User'}
            subscription={subscription}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              <OverviewStats 
                pageViews={1234}
                linkClicks={567}
                conversionRate={12.5}
              />
              <LinksSection />
              <ProductsSection />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileUrlDisplay 
                profileUrl={`https://droplink.gg/${profile?.username || 'user'}`}
                username={profile?.username || 'user'}
              />
              <QuickActions 
                subscription={subscription}
                profile={profile}
                navigate={navigate}
                setConfirmCancelOpen={setConfirmCancelOpen}
              />
              <GroupsSection />
              <SubscriptionManagement 
                subscription={subscription}
                handleSubscribe={handleSubscribe}
                processingPayment={processingPayment}
                setConfirmCancelOpen={setConfirmCancelOpen}
              />
              <AnalyticsSection subscription={subscription} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
