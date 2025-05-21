
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewStats from "@/components/dashboard/OverviewStats";
import QuickActions from "@/components/dashboard/QuickActions";
import LinksSection from "@/components/dashboard/LinksSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import SubscriptionManagement from "@/components/dashboard/SubscriptionManagement";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import SubscriptionDialog from "@/components/dashboard/SubscriptionDialog";

// Import custom hooks
import { usePiPayment } from "@/hooks/usePiPayment";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    user, 
    profile, 
    subscription, 
    isLoading, 
    isLoggedIn,
    refreshUserData,
    cancelSubscription
  } = useUser();
  
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  
  const { pageViews, linkClicks, conversionRate } = useAnalyticsData();
  const { processingPayment, handlePiLogin, handleSubscribe } = usePiPayment();
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, navigate]);
  
  const handleCancelSubscriptionConfirm = async () => {
    const success = await cancelSubscription();
    if (success) {
      setConfirmCancelOpen(false);
    }
  };
  
  if (isLoading) {
    return <DashboardLoading />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {isLoggedIn && profile ? (
            <>
              <DashboardHeader 
                username={profile.username} 
                subscription={subscription} 
              />
              
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="links">My Links</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <OverviewStats 
                    pageViews={pageViews} 
                    linkClicks={linkClicks} 
                    conversionRate={conversionRate} 
                  />
                  
                  <QuickActions 
                    subscription={subscription}
                    profile={profile}
                    navigate={navigate}
                    setConfirmCancelOpen={setConfirmCancelOpen}
                  />
                </TabsContent>
                
                <TabsContent value="links">
                  <LinksSection />
                </TabsContent>
                
                <TabsContent value="analytics">
                  <AnalyticsSection subscription={subscription} />
                </TabsContent>
                
                <TabsContent value="subscription">
                  <SubscriptionManagement 
                    subscription={subscription}
                    handleSubscribe={(plan: string) => handleSubscribe(plan, billingCycle)}
                    processingPayment={processingPayment}
                    setConfirmCancelOpen={setConfirmCancelOpen}
                  />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <LoginPrompt handlePiLogin={handlePiLogin} />
          )}
        </div>
      </main>
      <Footer />
      
      {/* Subscription Cancellation Dialog */}
      <SubscriptionDialog 
        confirmCancelOpen={confirmCancelOpen}
        setConfirmCancelOpen={setConfirmCancelOpen}
        handleCancelSubscriptionConfirm={handleCancelSubscriptionConfirm}
      />
    </div>
  );
};

export default Dashboard;
