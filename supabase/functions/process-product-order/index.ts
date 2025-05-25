
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

    const { orderId, paymentId, transactionId, status } = await req.json();

    console.log("Processing product order:", { orderId, paymentId, transactionId, status });

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get the order details
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        digital_products (*)
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: `Order not found: ${orderError?.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Update order with payment information
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (paymentId) updateData.pi_payment_id = paymentId;
    if (transactionId) updateData.pi_transaction_id = transactionId;
    if (status) updateData.status = status;

    // If payment is completed, set up download link and expiration
    if (status === 'completed') {
      updateData.download_link = order.digital_products?.file_url;
      updateData.download_expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

      // Update product download count
      if (order.digital_products?.id) {
        await supabaseClient
          .from('digital_products')
          .update({ 
            download_count: (order.digital_products.download_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', order.digital_products.id);
      }
    }

    const { data: updatedOrder, error: updateError } = await supabaseClient
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) {
      return new Response(JSON.stringify({ error: `Failed to update order: ${updateError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Order processed successfully:", updatedOrder);

    return new Response(JSON.stringify({ 
      success: true,
      order: updatedOrder,
      message: `Order ${status || 'updated'} successfully`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error processing product order:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
