
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Parse the request body
    const { userId, paymentId, subscriptionData } = await req.json();

    if (!userId || !subscriptionData) {
      throw new Error("Missing required fields");
    }

    // Verify the payment status (in a real implementation, you would call the Pi API)
    // For now, we'll just create the subscription directly

    // Calculate expiration date
    const expiresAt = new Date();
    if (subscriptionData.billingCycle === 'annual') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Create the subscription in the database
    const { data: subscription, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan: subscriptionData.plan,
        payment_id: paymentId,
        amount: subscriptionData.amount,
        is_active: true,
        expires_at: expiresAt.toISOString(),
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (subscriptionError) {
      throw subscriptionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription: subscription
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
