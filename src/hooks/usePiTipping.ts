
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi, createPiPayment } from "@/utils/pi-sdk";
import type { PiPaymentData, PaymentCallbacks } from "@/utils/pi-types";

interface TipData {
  recipientId: string;
  recipientUsername: string;
  amount: number;
  message?: string;
}

export function usePiTipping() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  const sendTip = async (tipData: TipData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to send tips",
        variant: "destructive",
      });
      return false;
    }

    setIsProcessing(true);

    try {
      // Authenticate with Pi Network first
      const piAuth = await authenticateWithPi(['username', 'payments']);
      if (!piAuth) {
        throw new Error("Pi Network authentication failed");
      }

      // Create tip record in database first
      const { data: tipRecord, error: tipError } = await supabase
        .from('tips')
        .insert({
          from_user_id: user.id,
          to_user_id: tipData.recipientId,
          amount: tipData.amount,
          memo: tipData.message || `Tip to @${tipData.recipientUsername} via Droplink`,
          status: 'pending'
        })
        .select()
        .single();

      if (tipError) throw tipError;

      // Prepare Pi payment data
      const paymentData: PiPaymentData = {
        amount: tipData.amount,
        memo: tipData.message || `Tip to @${tipData.recipientUsername} via Droplink`,
        metadata: {
          tipId: tipRecord.id,
          type: 'tip',
          from: piAuth.user.username,
          to: tipData.recipientUsername
        }
      };

      // Pi payment callbacks
      const callbacks: PaymentCallbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log("Tip ready for server approval:", paymentId);
          
          // Update tip record with Pi payment ID
          await supabase
            .from('tips')
            .update({ 
              pi_payment_id: paymentId,
              status: 'pending'
            })
            .eq('id', tipRecord.id);
        },
        
        onReadyForServerCompletion: async (paymentId: string, txId: string) => {
          console.log("Tip completed:", paymentId, txId);
          
          // Update tip record as completed
          await supabase
            .from('tips')
            .update({ 
              pi_transaction_id: txId,
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', tipRecord.id);

          toast({
            title: "Tip Sent Successfully! 🎉",
            description: `Your ${tipData.amount} Pi tip was sent to @${tipData.recipientUsername}`,
          });
        },
        
        onCancel: async (paymentId: string) => {
          console.log("Tip cancelled:", paymentId);
          
          // Update tip record as cancelled
          await supabase
            .from('tips')
            .update({ status: 'cancelled' })
            .eq('id', tipRecord.id);

          toast({
            title: "Tip Cancelled",
            description: "Your tip was cancelled",
            variant: "destructive",
          });
        },
        
        onError: async (error: Error) => {
          console.error("Tip error:", error);
          
          // Update tip record as failed
          await supabase
            .from('tips')
            .update({ status: 'failed' })
            .eq('id', tipRecord.id);

          toast({
            title: "Tip Failed",
            description: "There was an error processing your tip. Please try again.",
            variant: "destructive",
          });
        },
      };

      // Create Pi payment
      await createPiPayment(paymentData, callbacks);
      return true;

    } catch (error) {
      console.error("Tip creation failed:", error);
      toast({
        title: "Tip Failed",
        description: error instanceof Error ? error.message : "Failed to send tip",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    sendTip,
    isProcessing
  };
}
