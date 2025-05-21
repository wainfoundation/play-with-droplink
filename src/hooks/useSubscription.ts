
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
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
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
