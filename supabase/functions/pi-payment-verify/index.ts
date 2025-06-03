
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

    const { paymentData, user } = await req.json();

    // Validate request data
    if (!paymentData || !user || !user.id) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Record the payment in the database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('pi_payments')
      .insert({
        user_id: user.id,
        amount: paymentData.amount,
        payment_id: paymentData.paymentId,
        status: 'pending',
        memo: paymentData.memo,
        metadata: paymentData.metadata || {}
      })
      .select('*')
      .single();

    if (paymentError) {
      return new Response(JSON.stringify({ error: `Payment recording failed: ${paymentError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Process the coin purchase
    const { data: result, error: coinError } = await supabaseClient
      .rpc('buy_coin_pack_enhanced', { 
        p_user_id: user.id, 
        p_pack_id: paymentData.metadata?.pack_id 
      });

    if (coinError) {
      return new Response(JSON.stringify({ error: `Coin purchase failed: ${coinError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      payment: payment,
      coins: result.coins_received,
      message: "Payment processed successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
