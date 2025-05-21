
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authenticateWithPi, createPiPayment } from "@/services/piPaymentService";
import { useUser } from "@/context/UserContext";
import ConfirmationDialog from "@/components/ConfirmationDialog";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewStats from "@/components/dashboard/OverviewStats";
import QuickActions from "@/components/dashboard/QuickActions";
import LinksSection from "@/components/dashboard/LinksSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import SubscriptionManagement from "@/components/dashboard/SubscriptionManagement";
import LoginPrompt from "@/components/dashboard/LoginPrompt";

const Dashboard = () => {
  const { toast } = useToast();
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
  const [processingPayment, setProcessingPayment] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  
  // Analytics data (simulated)
  const [pageViews, setPageViews] = useState(0);
  const [linkClicks, setLinkClicks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    if (isLoggedIn && profile) {
      // Simulate analytics data
      const randomViews = Math.floor(Math.random() * 1000) + 100;
      const randomClicks = Math.floor(randomViews * (Math.random() * 0.7 + 0.1));
      const randomRate = +(randomClicks / randomViews * 100).toFixed(1);
      
      setPageViews(randomViews);
      setLinkClicks(randomClicks);
      setConversionRate(randomRate);
    }
  }, [isLoading, isLoggedIn, profile, navigate]);
  
  const handlePiLogin = async () => {
    try {
      const auth = await authenticateWithPi(["username", "payments"]);
      if (auth) {
        refreshUserData();
        
        toast({
          title: "Logged in successfully",
          description: `Welcome, ${auth.user.username || "User"}!`,
        });
      }
    } catch (error) {
      console.error("Pi authentication failed:", error);
      toast({
        title: "Authentication failed",
        description: "Could not log in with Pi Network",
        variant: "destructive",
      });
    }
  };
  
  const handleSubscribe = async (plan: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe",
        variant: "destructive", 
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Plan pricing based on tier and billing cycle
      const planPrices = {
        starter: { monthly: 10, annual: 8 },
        pro: { monthly: 15, annual: 12 },
        premium: { monthly: 22, annual: 18 }
      };
      
      // Calculate amount based on plan and billing cycle
      const planName = plan.toLowerCase();
      let amount = 0;
      
      if (planName === "starter") {
        amount = billingCycle === 'annual' ? planPrices.starter.annual * 12 : planPrices.starter.monthly;
      } else if (planName === "pro") {
        amount = billingCycle === 'annual' ? planPrices.pro.annual * 12 : planPrices.pro.monthly;
      } else if (planName === "premium") {
        amount = billingCycle === 'annual' ? planPrices.premium.annual * 12 : planPrices.premium.monthly;
      }
      
      // Calculate expiration date
      const expireDate = new Date();
      if (billingCycle === 'annual') {
        expireDate.setFullYear(expireDate.getFullYear() + 1);
      } else {
        expireDate.setMonth(expireDate.getMonth() + 1);
      }
      
      // Create payment through Pi Network
      const paymentData = {
        amount,
        memo: `${plan} Plan Subscription (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
        metadata: {
          isSubscription: true,
          plan: planName,
          duration: billingCycle,
          expiresAt: expireDate.toISOString()
        }
      };
      
      await createPiPayment(paymentData, user);
      
      // The payment flow will be handled by callbacks in piPaymentService
      toast({
        title: "Payment Processing",
        description: "Follow the Pi payment flow to complete your subscription",
      });
      
      // After a successful payment, refresh user data to get updated subscription
      setTimeout(() => {
        refreshUserData();
      }, 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };
  
  const handleCancelSubscriptionConfirm = async () => {
    const success = await cancelSubscription();
    if (success) {
      setConfirmCancelOpen(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-primary">Loading dashboard...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
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
                    handleSubscribe={handleSubscribe}
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
      
      {/* Confirmation Dialog for Subscription Cancellation */}
      <ConfirmationDialog
        open={confirmCancelOpen}
        onOpenChange={setConfirmCancelOpen}
        title="Cancel Subscription?"
        description="Are you sure you want to cancel your subscription? You won't be refunded for the current billing period and will need to subscribe again to regain premium access in the future."
        confirmText="Yes, Cancel Subscription"
        cancelText="No, Keep Subscription"
        onConfirm={handleCancelSubscriptionConfirm}
        variant="destructive"
      />
    </div>
  );
};

export default Dashboard;
