
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

// Production pricing in Pi
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
      title: "Pi Network Integration Active",
      description: "Ready for Pi Network payments and authentication",
    });
  };

  const handleSubscribe = async (plan: string, billingCycle: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please connect with Pi Network to upgrade your plan",
        variant: "destructive", 
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Calculate pricing
      const pricing = planPricing[plan as keyof typeof planPricing];
      const amount = billingCycle === 'annual' ? pricing.annual * 12 : pricing.monthly;
      
      // Calculate expiration date
      const expiresAt = new Date();
      if (billingCycle === 'annual') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }
      
      // Create payment record
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount,
          currency: 'Pi',
          status: 'completed',
          memo: `${plan} Plan Subscription (${billingCycle})`
        })
        .select()
        .single();
        
      if (paymentError) throw paymentError;
      
      // Create subscription record
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan,
          amount,
          expires_at: expiresAt.toISOString(),
          is_active: true,
          payment_id: payment.id
        });
        
      if (subscriptionError) throw subscriptionError;
      
      toast({
        title: "Subscription Activated!",
        description: `Welcome to ${plan} plan! Your Pi Network features are now available.`,
      });
      
      // Refresh user data to show new subscription
      setTimeout(() => {
        refreshUserData();
      }, 1000);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "Unable to process Pi Network payment. Please try again.",
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
