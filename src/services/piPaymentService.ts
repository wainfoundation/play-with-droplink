
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

// Get environment variables using Vite's import.meta.env
const PI_API_KEY = import.meta.env.VITE_PI_API_KEY;
const PI_SANDBOX = import.meta.env.DEV;

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
      identifier: `payment-${Date.now()}`,
      memo: paymentData.memo,
      metadata: paymentData.metadata || {},
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        
        try {
          const response = await fetch('/api/pi-sdk/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              paymentId, 
              paymentData: payment,
              signature: 'generated_signature_here'
            })
          });
          
          if (!response.ok) throw new Error('Payment verification failed');
          const data = await response.json();
          console.log("Payment verified on server:", data);
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Payment completed:", paymentId, "Transaction ID:", txid);
        
        try {
          const response = await fetch('/api/pi-sdk/complete-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              paymentId, 
              transactionId: txid, 
              status: 'completed' 
            })
          });
          
          if (!response.ok) throw new Error('Payment completion failed');
          const data = await response.json();
          console.log("Payment completed on server:", data);
        } catch (error) {
          console.error("Error completing payment:", error);
        }
      },
      onCancel: async (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
        
        try {
          const response = await fetch('/api/pi-sdk/complete-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              paymentId, 
              status: 'cancelled' 
            })
          });
          
          if (!response.ok) throw new Error('Payment cancellation failed');
          const data = await response.json();
          console.log("Payment cancelled on server:", data);
        } catch (error) {
          console.error("Error cancelling payment:", error);
        }
      },
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
      },
    };

    return await window.Pi.createPayment(payment, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
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
