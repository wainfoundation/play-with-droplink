
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

    const { tipData, piPaymentId, txId, status = 'completed' } = await req.json();

    // Validate request data
    if (!tipData || !tipData.from || !tipData.to || !tipData.amount) {
      return new Response(JSON.stringify({ error: "Invalid tip data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get user IDs from usernames
    const { data: fromUser } = await supabaseClient
      .from('user_profiles')
      .select('id')
      .eq('username', tipData.from)
      .single();

    const { data: toUser } = await supabaseClient
      .from('user_profiles')
      .select('id')
      .eq('username', tipData.to)
      .single();

    if (!fromUser || !toUser) {
      return new Response(JSON.stringify({ error: "Users not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Create or update tip record
    const tipRecord = {
      from_user_id: fromUser.id,
      to_user_id: toUser.id,
      amount: tipData.amount,
      pi_payment_id: piPaymentId,
      pi_transaction_id: txId,
      memo: tipData.memo || `Tip to @${tipData.to} via Droplink`,
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
      metadata: {
        source: 'droplink',
        ...tipData.metadata
      }
    };

    const { data: tip, error: tipError } = await supabaseClient
      .from('tips')
      .upsert(tipRecord, { onConflict: 'pi_payment_id' })
      .select()
      .single();

    if (tipError) {
      return new Response(JSON.stringify({ error: `Tip recording failed: ${tipError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      tip: tip,
      message: "Tip recorded successfully"
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
