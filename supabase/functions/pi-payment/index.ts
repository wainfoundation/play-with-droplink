
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

    // Store the payment in the database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        amount: paymentData.amount,
        pi_payment_id: paymentData.paymentId,
        status: 'pending',
        memo: paymentData.memo
      })
      .select('*')
      .single();

    if (paymentError) {
      return new Response(JSON.stringify({ error: `Payment creation failed: ${paymentError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // If this is a subscription payment, create/update the subscription
    if (paymentData.metadata && paymentData.metadata.isSubscription) {
      const plan = paymentData.metadata.plan;
      const duration = paymentData.metadata.duration;
      
      // Calculate expiration date
      const expiresAt = new Date();
      if (duration === 'annual') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      // Check if there's an existing subscription
      const { data: existingSub } = await supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      // Create or update subscription
      if (existingSub) {
        await supabaseClient
          .from('subscriptions')
          .update({
            plan,
            expires_at: expiresAt.toISOString(),
            payment_id: payment.id,
            amount: paymentData.amount,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSub.id);
      } else {
        await supabaseClient
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan,
            expires_at: expiresAt.toISOString(),
            payment_id: payment.id,
            amount: paymentData.amount
          });
      }
    }

    // If this is a tip payment, record the tip
    if (paymentData.metadata && paymentData.metadata.type === 'tip' && paymentData.metadata.recipientId) {
      // Record the tip in a tips table if it exists, or you can just use the payments table
      console.log("Recording tip to user:", paymentData.metadata.recipientId);

      // You can add additional logic here for tips
      // For example, updating recipient's total_tips count if such a field exists
      
      // You can also notify the recipient about the new tip
      // For example, by inserting into a notifications table
    }

    return new Response(JSON.stringify({ 
      success: true, 
      payment: payment,
      message: "Payment recorded successfully"
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
