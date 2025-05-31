
import { useState } from 'react';
import { createPiPayment } from '@/utils/pi-payments';
import { supabase } from '@/integrations/supabase/client';

export interface PaymentData {
  amount: number;
  memo: string;
  metadata?: any;
}

export interface PaymentResult {
  identifier: string;
  payment_id: string;
  transaction_id?: string;
}

export const usePiPayment = () => {
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const createPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
    setLoading(true);
    try {
      const result = await createPiPayment(paymentData);
      return result;
    } catch (error) {
      console.error('Payment creation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approvePayment = async (paymentId: string): Promise<boolean> => {
    try {
      // Implementation for payment approval
      return true;
    } catch (error) {
      console.error('Payment approval failed:', error);
      return false;
    }
  };

  const completePayment = async (paymentId: string): Promise<boolean> => {
    try {
      // Implementation for payment completion
      return true;
    } catch (error) {
      console.error('Payment completion failed:', error);
      return false;
    }
  };

  const handleSubscribe = async (plan: string): Promise<boolean> => {
    setProcessingPayment(true);
    try {
      const planPricing = {
        free: 0,
        starter: 10,
        pro: 15,
        premium: 22
      };

      const amount = planPricing[plan as keyof typeof planPricing] || 0;
      
      if (amount > 0) {
        const paymentData: PaymentData = {
          amount,
          memo: `Droplink ${plan} subscription`,
          metadata: { plan, type: 'subscription' }
        };

        await createPayment(paymentData);
      }
      
      return true;
    } catch (error) {
      console.error('Subscription failed:', error);
      return false;
    } finally {
      setProcessingPayment(false);
    }
  };

  return {
    createPayment,
    approvePayment,
    completePayment,
    handleSubscribe,
    loading,
    processingPayment,
    planPricing: {
      free: 0,
      starter: 10,
      pro: 15,
      premium: 22
    }
  };
};
