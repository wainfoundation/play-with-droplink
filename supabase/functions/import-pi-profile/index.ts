
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse request body to get username
    const { username } = await req.json();
    
    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Importing Pi profile for username: ${username}`);

    // Scrape Pi profile
    const profileUrl = `https://profiles.pinet.com/profiles/@${username}`;
    
    let profileResponse;
    try {
      profileResponse = await fetch(profileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Pi profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!profileResponse.ok) {
      console.error(`Pi profile not found: ${profileResponse.status}`);
      return new Response(
        JSON.stringify({ error: 'Pi profile not found or not public' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await profileResponse.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (!doc) {
      return new Response(
        JSON.stringify({ error: 'Failed to parse profile page' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract profile data
    let avatar = '';
    let bio = '';
    const links: Array<{ title: string; url: string }> = [];

    // Try different selectors for avatar
    const avatarImg = doc.querySelector('img[class*="avatar"]') || 
                      doc.querySelector('img[class*="profile"]') ||
                      doc.querySelector('.profile-picture img') ||
                      doc.querySelector('.avatar img');
    
    if (avatarImg) {
      const src = avatarImg.getAttribute('src');
      if (src) {
        avatar = src.startsWith('http') ? src : `https://profiles.pinet.com${src}`;
      }
    }

    // Try different selectors for bio
    const bioElement = doc.querySelector('.bio') ||
                       doc.querySelector('[class*="bio"]') ||
                       doc.querySelector('.description') ||
                       doc.querySelector('[class*="description"]');
    
    if (bioElement) {
      bio = bioElement.textContent?.trim() || '';
    }

    // Extract external links
    const linkElements = doc.querySelectorAll('a[href^="http"]');
    linkElements.forEach((linkEl) => {
      const href = linkEl.getAttribute('href');
      const text = linkEl.textContent?.trim();
      
      if (href && text && !href.includes('profiles.pinet.com')) {
        links.push({
          title: text,
          url: href
        });
      }
    });

    console.log(`Extracted: avatar=${!!avatar}, bio=${bio.length} chars, links=${links.length}`);

    // Record the import attempt
    const { error: insertError } = await supabase
      .from('pi_profile_imports')
      .insert({
        user_id: user.id,
        pi_username: username,
        import_status: 'success',
        avatar_url: avatar,
        bio: bio,
        links_count: links.length
      });

    if (insertError) {
      console.error('Failed to record import:', insertError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          avatar,
          bio,
          links,
          username
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
