
import { useState, useEffect, useCallback } from 'react';
import { authenticateWithPi, createPiPayment, showRewardedAdAdvanced, isRunningInPiBrowser, initPiNetwork } from '@/utils/pi-sdk';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

interface PaymentRequest {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

interface AdReward {
  amount: number;
  type: 'pi' | 'coins';
  timestamp: number;
}

export const useProductionPi = () => {
  const [piUser, setPiUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializePi = async () => {
      try {
        const inBrowser = isRunningInPiBrowser();
        setIsPiBrowser(inBrowser);
        
        if (inBrowser) {
          const initialized = initPiNetwork();
          setIsInitialized(initialized);
          
          if (!initialized) {
            console.warn('Pi Network SDK failed to initialize');
          }
        }
      } catch (error) {
        console.error('Pi initialization error:', error);
      }
    };

    initializePi();
  }, []);

  const authenticate = useCallback(async () => {
    if (!isPiBrowser || !isInitialized) {
      throw new Error('Pi Browser environment required');
    }

    setLoading(true);
    try {
      const authResult = await authenticateWithPi(['username', 'payments', 'wallet_address']);
      
      if (!authResult || !authResult.user) {
        throw new Error('Authentication failed - no user data received');
      }

      const user: PiUser = {
        uid: authResult.user.uid,
        username: authResult.user.username,
        accessToken: authResult.accessToken
      };

      setPiUser(user);

      // Sync with Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.uid,
          username: user.username,
          pi_wallet_address: user.uid,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.error('Supabase sync error:', error);
        // Don't throw here, authentication was successful
      }

      return user;
    } finally {
      setLoading(false);
    }
  }, [isPiBrowser, isInitialized]);

  const processPayment = useCallback(async (paymentRequest: PaymentRequest) => {
    if (!piUser) {
      throw new Error('User not authenticated');
    }

    return new Promise<{ paymentId: string; transactionId?: string }>((resolve, reject) => {
      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log('Payment ready for approval:', paymentId);
          
          // Record payment in database
          try {
            await supabase.from('pi_payments').insert({
              user_id: piUser.uid,
              payment_id: paymentId,
              amount: paymentRequest.amount,
              memo: paymentRequest.memo,
              status: 'pending_approval',
              metadata: paymentRequest.metadata || {}
            });
          } catch (error) {
            console.error('Error recording payment:', error);
          }
        },
        
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log('Payment completed:', paymentId, txid);
          
          try {
            // Update payment status
            await supabase.from('pi_payments')
              .update({
                status: 'completed',
                transaction_id: txid,
                completed_at: new Date().toISOString()
              })
              .eq('payment_id', paymentId);

            resolve({ paymentId, transactionId: txid });
          } catch (error) {
            console.error('Error updating payment:', error);
            reject(error);
          }
        },
        
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId);
          reject(new Error('Payment cancelled by user'));
        },
        
        onError: (error: Error) => {
          console.error('Payment error:', error);
          reject(error);
        }
      };

      // Initiate payment
      createPiPayment(paymentRequest, callbacks).catch(reject);
    });
  }, [piUser]);

  const showRewardedAd = useCallback(async (): Promise<AdReward> => {
    if (!isPiBrowser || !isInitialized) {
      throw new Error('Pi Browser environment required for ads');
    }

    const adResult = await showRewardedAdAdvanced();
    
    if (!adResult.success) {
      throw new Error(adResult.error || 'Failed to show rewarded ad');
    }

    const reward: AdReward = {
      amount: 0.001, // Base Pi reward for watching ad
      type: 'pi',
      timestamp: Date.now()
    };

    // Record ad reward if user is authenticated
    if (piUser) {
      try {
        await supabase.from('user_wallet').upsert({
          user_id: piUser.uid,
          pi_balance: supabase.rpc('add_pi_balance', {
            p_user_id: piUser.uid,
            p_amount: reward.amount
          }),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      } catch (error) {
        console.error('Error recording ad reward:', error);
      }
    }

    return reward;
  }, [isPiBrowser, isInitialized, piUser]);

  const getWalletBalance = useCallback(async () => {
    if (!piUser) return null;

    try {
      const { data, error } = await supabase
        .from('user_wallet')
        .select('pi_balance, droplet_coins, total_earned')
        .eq('user_id', piUser.uid)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      return null;
    }
  }, [piUser]);

  const signOut = useCallback(() => {
    setPiUser(null);
  }, []);

  return {
    piUser,
    loading,
    isPiBrowser,
    isInitialized,
    authenticate,
    processPayment,
    showRewardedAd,
    getWalletBalance,
    signOut,
    isReady: isPiBrowser && isInitialized
  };
};

export default useProductionPi;
