
import { supabase } from "@/integrations/supabase/client";

export interface PaymentData {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

export interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => Promise<void>;
  onReadyForServerCompletion: (paymentId: string, txid: string) => Promise<void>;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

const PI_API_KEY = "ldtwy98n3q6f8uvxvoxvnidgiklu21ndbfn5ltqpnfxcftbocc9ujxrcfiwcwkj6";

// Initialize Pi SDK
export const initPiNetwork = (): boolean => {
  try {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: import.meta.env.DEV });
      console.log("Pi SDK initialized with sandbox mode:", import.meta.env.DEV);
      return true;
    }
    console.error("Pi SDK not found. Make sure to include the Pi SDK script.");
    return false;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments"]
): Promise<any> => {
  try {
    if (!window.Pi) {
      console.error("Pi SDK not initialized");
      return null;
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = async (payment: any) => {
      console.log("Incomplete payment found:", payment);
      // Handle incomplete payment
    };

    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Authentication successful:", auth);
    return auth;
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};

// Create a payment with Pi
export const createPiPayment = async (
  paymentData: PaymentData,
  user: any
): Promise<any> => {
  try {
    if (!window.Pi) {
      console.error("Pi SDK not initialized");
      return null;
    }

    const identifier = `payment-${Date.now()}`;
    
    const payment = {
      amount: paymentData.amount,
      identifier,
      memo: paymentData.memo,
      metadata: paymentData.metadata || {},
    };

    const callbacks: PaymentCallbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        
        // Record the payment in our database
        await supabase.functions.invoke('pi-payment', {
          body: { 
            paymentData: {
              ...paymentData,
              paymentId
            }, 
            user 
          }
        });
      },
      
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Payment ready for completion:", paymentId, "Transaction ID:", txid);
        
        // Complete the payment in our database
        await supabase.functions.invoke('complete-payment', {
          body: { 
            paymentId,
            transactionId: txid,
            status: 'completed'
          }
        });
      },
      
      onCancel: (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
        
        // Update the payment status in our database
        supabase.functions.invoke('complete-payment', {
          body: { 
            paymentId,
            status: 'cancelled'
          }
        });
      },
      
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
        
        if (payment?.paymentId) {
          supabase.functions.invoke('complete-payment', {
            body: { 
              paymentId: payment.paymentId,
              status: 'failed'
            }
          });
        }
      },
    };

    return await window.Pi.createPayment(payment, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
    return null;
  }
};

export default {
  initPiNetwork,
  authenticateWithPi,
  createPiPayment,
};
