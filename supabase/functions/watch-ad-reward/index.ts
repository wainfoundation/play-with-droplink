
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

    const { user } = await req.json();

    // Validate request data
    if (!user || !user.id) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Process ad reward
    const { data: result, error: rewardError } = await supabaseClient
      .rpc('watch_ad_reward', { p_user_id: user.id });

    if (rewardError) {
      return new Response(JSON.stringify({ error: `Ad reward processing failed: ${rewardError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!result.success) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Cooldown active",
        next_available: result.next_available
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429, // Too Many Requests
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      coins_earned: result.coins_earned,
      message: "Ad reward processed successfully"
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
