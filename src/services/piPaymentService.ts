
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment as createPiPaymentSDK, initPiNetwork, PiPaymentData, PaymentCallbacks } from "@/utils/pi-sdk";

// Updated payment service using real Pi SDK
export const processPayment = async (
  paymentData: PiPaymentData, 
  user: any
): Promise<any> => {
  try {
    // Make sure SDK is initialized
    initPiNetwork();
    
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    const callbacks: PaymentCallbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        
        try {
          // Call our Supabase edge function to handle payment approval
          const { data, error } = await supabase.functions.invoke('pi-payment', {
            body: {
              paymentData: {
                ...paymentData,
                paymentId
              },
              user
            }
          });
          
          if (error) throw error;
          console.log("Payment approved on server:", data);
        } catch (error) {
          console.error("Error approving payment:", error);
        }
      },
      
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Payment completed:", paymentId, "Transaction ID:", txid);
        
        try {
          // Call our Supabase edge function to complete payment
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { 
              paymentId, 
              transactionId: txid, 
              status: 'completed' 
            }
          });
          
          if (error) throw error;
          console.log("Payment completed on server:", data);
          
          toast({
            title: "Payment Successful!",
            description: "Your Pi payment has been processed successfully.",
          });
        } catch (error) {
          console.error("Error completing payment:", error);
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
          console.log("Payment cancelled on server:", data);
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
