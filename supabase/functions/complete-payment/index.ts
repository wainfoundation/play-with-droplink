
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Pi Network API endpoints
const PI_API_URL = "https://api.minepi.com";
const PI_SANDBOX_API_URL = "https://api.testnet.minepi.com";

// Function to validate a payment with Pi Network
async function validatePiPayment(paymentId: string, txid: string, isSandbox: boolean = true) {
  try {
    const apiUrl = isSandbox ? PI_SANDBOX_API_URL : PI_API_URL;
    const url = `${apiUrl}/v2/payments/${paymentId}`;
    
    // Get Pi API Key from environment
    const piApiKey = Deno.env.get("PI_API_KEY") || "";
    
    if (!piApiKey) {
      console.error("PI_API_KEY not configured in environment variables");
      return { success: false, error: "Missing PI_API_KEY configuration" };
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Key ${piApiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Pi API validation failed:", errorData);
      return { success: false, error: `Pi API validation failed: ${response.status} ${errorData}` };
    }
    
    const paymentData = await response.json();
    
    // Validate payment details
    if (paymentData.status !== "completed" || paymentData.transaction?.txid !== txid) {
      return { 
        success: false, 
        error: "Payment validation failed: Status or transaction ID mismatch" 
      };
    }
    
    return { success: true, data: paymentData };
  } catch (error) {
    console.error("Error validating payment with Pi Network:", error);
    return { success: false, error: `Validation error: ${error.message}` };
  }
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { paymentId, transactionId, status, sandbox = true } = await req.json();

    if (!paymentId) {
      return new Response(JSON.stringify({ error: "Payment ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // When transaction ID is provided and status is completed, validate with Pi API
    if (transactionId && status === 'completed') {
      const validation = await validatePiPayment(paymentId, transactionId, sandbox);
      
      if (!validation.success) {
        console.error("Payment validation failed:", validation.error);
        // Still update our status but mark it as pending verification
        await supabaseClient
          .from('payments')
          .update({ 
            status: 'pending_verification',
            pi_transaction_id: transactionId,
            verification_error: validation.error,
            updated_at: new Date().toISOString()
          })
          .eq('pi_payment_id', paymentId);
          
        return new Response(JSON.stringify({ error: `Payment verification failed: ${validation.error}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      
      console.log("Payment successfully verified with Pi Network");
    }

    // Update payment status
    const { data: payment, error: updateError } = await supabaseClient
      .from('payments')
      .update({ 
        status: status || 'completed',
        pi_transaction_id: transactionId,
        updated_at: new Date().toISOString()
      })
      .eq('pi_payment_id', paymentId)
      .select()
      .single();

    if (updateError) {
      return new Response(JSON.stringify({ error: `Payment update failed: ${updateError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // If the payment is related to a subscription, ensure the subscription is active
    if (payment.subscription_id) {
      await supabaseClient
        .from('subscriptions')
        .update({ 
          is_active: status === 'completed', 
          updated_at: new Date().toISOString() 
        })
        .eq('id', payment.subscription_id);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      payment: payment,
      message: "Payment status updated successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
