
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment as createPiPaymentSDK, initPiNetwork, PiPaymentData, PaymentCallbacks } from "@/utils/pi-sdk";

// Pi API configuration for production
const PI_API_URL = "https://api.minepi.com";
const PI_API_KEY = import.meta.env.VITE_PI_API_KEY;

// Helper function to call Pi API with server key
const callPiAPI = async (endpoint: string, method: 'GET' | 'POST', body?: any) => {
  const response = await fetch(`${PI_API_URL}/v2${endpoint}`, {
    method,
    headers: {
      'Authorization': `Key ${PI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`Pi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Process payment using production Pi SDK and API
export const processPayment = async (
  paymentData: PiPaymentData, 
  user: any
): Promise<any> => {
  try {
    // Ensure we're in production mode and Pi Browser
    const isProduction = import.meta.env.PROD || import.meta.env.VITE_PI_SANDBOX === 'false';
    if (!isProduction) {
      throw new Error('Production mode required for Pi payments');
    }

    // Initialize Pi SDK
    initPiNetwork();
    
    if (typeof window === 'undefined' || !window.Pi) {
      throw new Error("Pi Browser required for payments");
    }

    const callbacks: PaymentCallbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        
        try {
          // Call Pi API to approve payment
          const approvalResult = await callPiAPI(`/payments/${paymentId}/approve`, 'POST');
          console.log("Payment approved via Pi API:", approvalResult);

          // Update our database
          const { data, error } = await supabase.functions.invoke('pi-payment', {
            body: {
              paymentData: {
                ...paymentData,
                paymentId
              },
              user,
              status: 'approved'
            }
          });
          
          if (error) throw error;
          console.log("Payment approved in database:", data);
        } catch (error) {
          console.error("Error approving payment:", error);
          throw error;
        }
      },
      
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Payment completed:", paymentId, "Transaction ID:", txid);
        
        try {
          // Call Pi API to complete payment
          const completionResult = await callPiAPI(`/payments/${paymentId}/complete`, 'POST', { txid });
          console.log("Payment completed via Pi API:", completionResult);

          // Update our database
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { 
              paymentId, 
              transactionId: txid, 
              status: 'completed',
              sandbox: false
            }
          });
          
          if (error) throw error;
          console.log("Payment completed in database:", data);
          
          toast({
            title: "Payment Successful!",
            description: "Your Pi payment has been processed successfully.",
          });
        } catch (error) {
          console.error("Error completing payment:", error);
          throw error;
        }
      },
      
      onCancel: async (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
        
        try {
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { 
              paymentId, 
              status: 'cancelled' 
            }
          });
          
          if (error) throw error;
          console.log("Payment cancelled in database:", data);
        } catch (error) {
          console.error("Error cancelling payment:", error);
        }
      },
      
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
        toast({
          title: "Payment Error",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      },
    };

    await createPiPaymentSDK(paymentData, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
    throw error;
  }
};

// Export createPiPayment as a named export for compatibility
export const createPiPayment = processPayment;

export default {
  processPayment,
  createPiPayment: processPayment,
};
