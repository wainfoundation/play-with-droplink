
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.7";

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
    const { piUserId, username } = await req.json();
    
    if (!piUserId) {
      return new Response(
        JSON.stringify({ error: "Pi user ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if user is in the admin list
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('pi_user_id', piUserId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error("Database error:", error);
      throw error;
    }

    // If username is provided, update the username in admin_users table
    if (username && data) {
      await supabaseAdmin
        .from('admin_users')
        .update({ username: username })
        .eq('pi_user_id', piUserId);
    }

    // If the user is not found in the admin_users table but is "Wain2020", add them as admin
    if (!data && username === "Wain2020") {
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('admin_users')
        .insert({
          pi_user_id: piUserId,
          username: username
        })
        .select()
        .single();
      
      if (insertError) {
        console.error("Error adding admin user:", insertError);
      } else {
        console.log("Added new admin user:", username);
        return new Response(
          JSON.stringify({ 
            isAdmin: true,
            adminData: insertData
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        isAdmin: !!data,
        adminData: data || null
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error checking admin status:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
