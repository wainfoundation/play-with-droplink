
import { useState } from 'react';
import { createPiPayment } from '@/utils/pi-payments';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface CoinPack {
  id: string;
  description: string;
  pi_cost: number;
  coins_given: number;
  bonus_percentage: number;
  is_popular?: boolean;
  is_best_value?: boolean;
  savings_percentage?: number;
}

export const usePiPayment = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const buyCoinPack = async (pack: CoinPack) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase coins.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Create payment data
      const paymentData = {
        amount: pack.pi_cost,
        memo: `Buy ${pack.coins_given} Droplet Coins${pack.bonus_percentage > 0 ? ` (+${pack.bonus_percentage}% bonus)` : ''}`,
        metadata: {
          pack_id: pack.id,
          coins: pack.coins_given,
          bonus_percentage: pack.bonus_percentage,
        }
      };

      // Initiate payment via Pi SDK
      const payment = await createPiPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log('Payment ready for approval:', paymentId);
          const { data, error } = await supabase.functions.invoke('pi-payment-verify', {
            body: { 
              paymentData: { 
                ...paymentData, 
                paymentId 
              }, 
              user 
            }
          });
          
          if (error) {
            console.error('Payment verification failed:', error);
            toast({
              title: "Payment Error",
              description: "Unable to verify payment. Please try again.",
              variant: "destructive",
            });
            return false;
          }
          
          return { verified: true };
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log('Payment completed:', paymentId, txid);
          toast({
            title: "Payment Successful!",
            description: `You received ${pack.coins_given + (pack.coins_given * pack.bonus_percentage / 100)} Droplet Coins.`,
          });
        },
        onCancel: (paymentId) => {
          console.log('Payment canceled:', paymentId);
          toast({
            title: "Payment Canceled",
            description: "You canceled the payment.",
          });
        },
        onError: (error) => {
          console.error('Payment error:', error);
          toast({
            title: "Payment Error",
            description: error.message || "Something went wrong with your payment.",
            variant: "destructive",
          });
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error buying coin pack:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchCoinPacks = async (): Promise<CoinPack[]> => {
    try {
      const { data, error } = await supabase
        .from('coin_packs')
        .select('*')
        .order('pi_cost', { ascending: true });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching coin packs:', error);
      return [];
    }
  };

  return {
    buyCoinPack,
    fetchCoinPacks,
    loading
  };
};
