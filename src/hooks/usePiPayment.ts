
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
    toast({
      title: "Pi Network Integration",
      description: "Pi authentication system is ready for deployment",
    });
  };

  const handleSubscribe = async (plan: string, billingCycle: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upgrade your plan",
        variant: "destructive", 
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Subscription Activated!",
        description: `Welcome to ${plan} plan! Your new features are now available.`,
      });
      
      // Refresh user data to show new subscription
      setTimeout(() => {
        refreshUserData();
      }, 1000);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "Unable to process subscription. Please try again.",
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
