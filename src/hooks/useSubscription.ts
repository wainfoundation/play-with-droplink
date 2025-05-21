
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getUserSubscription } from '@/services/subscriptionService';

export const useSubscription = (user: any) => {
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const subscriptionData = await getUserSubscription(user.id);
      
      // Check if subscription is expired but still marked as active
      if (subscriptionData && subscriptionData.is_active) {
        const expiresAt = new Date(subscriptionData.expires_at);
        const now = new Date();
        
        if (now > expiresAt) {
          console.log("Subscription has expired, updating status in database");
          // Subscription has expired, update the is_active flag
          await supabase
            .from('subscriptions')
            .update({ is_active: false })
            .eq('id', subscriptionData.id);
          
          subscriptionData.is_active = false;
          
          // Notify the user that their subscription has expired
          toast({
            title: "Subscription Expired",
            description: "Your subscription has expired. Some features may be limited.",
            variant: "destructive",
          });
        }
      }
      
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
    
    // Set up an interval to periodically check subscription status
    const checkInterval = setInterval(() => {
      if (user && subscription?.is_active) {
        fetchSubscription();
      }
    }, 60 * 60 * 1000); // Check every hour
    
    return () => clearInterval(checkInterval);
  }, [user]);

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { user_id: user.id }
      });
      
      if (error) throw error;
      
      await fetchSubscription();
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    subscription,
    isLoading,
    cancelSubscription,
    refreshSubscription: fetchSubscription
  };
};
