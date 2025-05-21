
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { paymentId, transactionId, status } = await req.json();

    if (!paymentId) {
      return new Response(JSON.stringify({ error: "Payment ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
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
