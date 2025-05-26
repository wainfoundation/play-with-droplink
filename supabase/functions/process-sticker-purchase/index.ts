
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

    const { paymentId, transactionId, userId, stickerId } = await req.json();

    // Validate request data
    if (!paymentId || !userId || !stickerId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if sticker exists
    const { data: sticker, error: stickerError } = await supabaseClient
      .from('stickers_effects')
      .select('*')
      .eq('id', stickerId)
      .eq('is_active', true)
      .single();

    if (stickerError || !sticker) {
      return new Response(JSON.stringify({ error: "Sticker not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if user already owns this sticker
    const { data: existingOwnership } = await supabaseClient
      .from('user_stickers')
      .select('id')
      .eq('user_id', userId)
      .eq('sticker_id', stickerId)
      .maybeSingle();

    if (existingOwnership) {
      return new Response(JSON.stringify({ error: "User already owns this sticker" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Grant sticker ownership
    const { data: userSticker, error: ownershipError } = await supabaseClient
      .from('user_stickers')
      .insert({
        user_id: userId,
        sticker_id: stickerId,
        pi_payment_id: paymentId,
        pi_transaction_id: transactionId
      })
      .select()
      .single();

    if (ownershipError) {
      return new Response(JSON.stringify({ error: `Failed to grant ownership: ${ownershipError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      userSticker,
      message: "Sticker purchased successfully!"
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
