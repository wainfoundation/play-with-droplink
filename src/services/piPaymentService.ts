
// Define interfaces for Pi Network authentication
interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username?: string;
  };
}

interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

// Get environment variables
const PI_API_KEY = "ckta3qej1mjqit2rlqt6nutpw089uynyotj3g9spwqlhrvvggqv7hoe6cn3plgb5";
const PI_SANDBOX = true;

// Initialize Pi SDK
export const initPiNetwork = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: PI_SANDBOX });
      console.log("Pi SDK initialized with sandbox mode:", PI_SANDBOX);
      return true;
    }
    console.warn("Pi SDK not found. This is normal if running server-side or in an environment without the Pi SDK.");
    return false;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments"]
): Promise<PiAuthResult | null> => {
  try {
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    // Make sure SDK is initialized
    initPiNetwork();

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      // Here you would typically handle the incomplete payment
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
  paymentData: {
    amount: number;
    memo: string;
    metadata?: Record<string, any>;
  }, 
  user: any
): Promise<any> => {
  try {
    // Make sure SDK is initialized
    initPiNetwork();
    
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    const payment = {
      amount: paymentData.amount,
      identifier: `payment-${Date.now()}`, // Generate a unique identifier
      memo: paymentData.memo,
      metadata: paymentData.metadata || {},
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        
        // Call our server to record the payment
        try {
          const { data, error } = await supabase.functions.invoke('pi-payment', {
            body: { paymentData: {...payment, paymentId}, user }
          });
          
          if (error) throw error;
          console.log("Payment recorded on server:", data);
        } catch (error) {
          console.error("Error recording payment:", error);
        }
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Payment completed:", paymentId, "Transaction ID:", txid);
        
        // Call our server to complete the payment
        try {
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { paymentId, transactionId: txid, status: 'completed' }
          });
          
          if (error) throw error;
          console.log("Payment completed on server:", data);
          
          // Show success message
          toast({
            title: "Payment Successful",
            description: `Your payment of ${paymentData.amount} Pi has been completed.`,
          });
        } catch (error) {
          console.error("Error completing payment:", error);
        }
      },
      onCancel: async (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
        
        // Call our server to cancel the payment
        try {
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { paymentId, status: 'cancelled' }
          });
          
          if (error) throw error;
          console.log("Payment cancelled on server:", data);
        } catch (error) {
          console.error("Error cancelling payment:", error);
        }
        
        toast({
          title: "Payment Cancelled",
          description: "Your payment has been cancelled.",
          variant: "destructive",
        });
      },
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
        toast({
          title: "Payment Error",
          description: error.message || "An error occurred during payment processing.",
          variant: "destructive",
        });
      },
    };

    // Call Pi Network API to create payment
    return await window.Pi.createPayment(payment, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
    toast({
      title: "Payment Error",
      description: "Failed to create payment.",
      variant: "destructive",
    });
    return null;
  }
};

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default {
  initPiNetwork,
  authenticateWithPi,
  createPiPayment,
};
