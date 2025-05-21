
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { authenticateWithPi, createPiPayment } from "@/services/piPaymentService";
import { useUser } from "@/context/UserContext";

export function usePiPayment() {
  const { toast } = useToast();
  const { user, refreshUserData } = useUser();
  const [processingPayment, setProcessingPayment] = useState(false);

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

  const handleSubscribe = async (plan: string, billingCycle: string) => {
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

  return {
    processingPayment,
    handlePiLogin,
    handleSubscribe
  };
}
