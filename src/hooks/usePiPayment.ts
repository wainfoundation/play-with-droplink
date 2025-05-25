
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";

// Define consistent pricing across the application
export const planPricing = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

export function usePiPayment() {
  const { toast } = useToast();
  const { user, refreshUserData } = useUser();
  const [processingPayment, setProcessingPayment] = useState(false);

  const handlePiLogin = async () => {
    // Bypass Pi login for testing
    toast({
      title: "Pi Login Bypassed",
      description: "Pi authentication is disabled for testing",
    });
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
      // Simulate payment processing for testing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful (Test Mode)",
        description: `${plan} plan subscription activated for testing`,
      });
      
      // Simulate successful subscription by refreshing user data
      setTimeout(() => {
        refreshUserData();
      }, 1000);
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
    handleSubscribe,
    planPricing
  };
}
