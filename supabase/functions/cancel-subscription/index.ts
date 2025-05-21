
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

    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Update subscription to inactive
    const { data, error: updateError } = await supabaseClient
      .from('subscriptions')
      .update({ 
        is_active: false, 
        updated_at: new Date().toISOString() 
      })
      .eq('user_id', user_id)
      .eq('is_active', true)
      .select();

    if (updateError) {
      console.error("Subscription cancellation failed:", updateError.message);
      return new Response(JSON.stringify({ error: `Subscription cancellation failed: ${updateError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Log cancellation for accounting/auditing
    await supabaseClient
      .from('analytics')
      .insert({
        user_id,
        page_view: false,
        link_click: false,
        referrer: "subscription_cancellation",
        custom_data: { action: "cancellation", subscription_id: data?.[0]?.id }
      });

    console.log(`Subscription cancelled successfully for user: ${user_id}`);
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Subscription cancelled successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in cancel-subscription function:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
