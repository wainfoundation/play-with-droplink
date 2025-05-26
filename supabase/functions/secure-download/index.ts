
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const url = new URL(req.url);
    const orderId = url.searchParams.get('order_id');
    const token = url.searchParams.get('token');

    if (!orderId || !token) {
      return new Response(JSON.stringify({ error: "Missing order_id or token" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Verify the order and token
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        digital_products (*)
      `)
      .eq('id', orderId)
      .eq('access_token', token)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Invalid download link" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if user can still download using the database function
    const { data: canDownload, error: checkError } = await supabaseClient
      .rpc('can_download_product', { order_id_param: orderId });

    if (checkError || !canDownload) {
      return new Response(JSON.stringify({ error: "Download limit exceeded or link expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    // Log the download
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    await supabaseClient
      .from('download_logs')
      .insert({
        order_id: orderId,
        product_id: order.product_id,
        user_id: order.buyer_id,
        ip_address: clientIP,
        user_agent: userAgent
      });

    // Update download count
    await supabaseClient
      .from('orders')
      .update({ download_count: (order.download_count || 0) + 1 })
      .eq('id', orderId);

    // Get the file from storage and return it
    const { data: fileData, error: fileError } = await supabaseClient.storage
      .from('digital-products')
      .download(order.digital_products.file_url);

    if (fileError || !fileData) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Return the file with appropriate headers
    return new Response(fileData, {
      headers: {
        ...corsHeaders,
        'Content-Type': order.digital_products.file_type || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${order.digital_products.title}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
