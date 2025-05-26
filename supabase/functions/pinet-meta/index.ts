
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PiNetMetadataDTO {
  title?: string;
  description?: string;
  authors?: null | Author | Array<Author>;
  keywords?: null | string | Array<string>;
  creator?: null | string;
  publisher?: null | string;
  openGraph?: null | OGMetadata;
  twitter?: null | TwitterMetadata;
  icons?: null | string | Array<string>;
}

interface Author {
  url?: string;
  name?: string;
}

interface OGMetadata {
  type: "website" | "profile" | "article";
  title?: string;
  description?: string;
  images?: OGImage | Array<OGImage>;
  locale?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

interface OGImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface TwitterMetadata {
  card: "summary" | "summary_large_image";
  title?: string;
  description?: string;
  images?: TwitterImage | Array<TwitterImage>;
  creator?: string;
}

interface TwitterImage {
  url: string;
  alt?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.searchParams.get('pathname');
    
    if (!pathname) {
      return new Response(
        JSON.stringify({ error: 'pathname parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse the pathname to determine the page type
    const pathSegments = pathname.split('/').filter(Boolean);
    
    let metadata: PiNetMetadataDTO = {
      title: "Droplink - Pi Network Profile Builder",
      description: "Create your professional Pi Network profile with Droplink. Build your digital presence, showcase your content, and connect with the Pi community.",
      keywords: ["Pi Network", "profile builder", "digital presence", "blockchain", "cryptocurrency", "web3"],
      creator: "Droplink Team",
      publisher: "Droplink",
      openGraph: {
        type: "website",
        title: "Droplink - Pi Network Profile Builder",
        description: "Create your professional Pi Network profile with Droplink. Build your digital presence, showcase your content, and connect with the Pi community.",
        images: [{
          url: "https://droplink.space/og-image.png",
          width: 1200,
          height: 630,
          alt: "Droplink - Pi Network Profile Builder"
        }],
        locale: "en_US"
      },
      twitter: {
        card: "summary_large_image",
        title: "Droplink - Pi Network Profile Builder",
        description: "Create your professional Pi Network profile with Droplink. Build your digital presence, showcase your content, and connect with the Pi community.",
        images: [{
          url: "https://droplink.space/og-image.png",
          alt: "Droplink - Pi Network Profile Builder"
        }]
      }
    };

    // Handle demo page
    if (pathSegments[0] === 'demo') {
      metadata = {
        title: "Droplink Demo - Try Our Link in Bio Tool",
        description: "See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience.",
        keywords: ["Pi Network", "demo", "link in bio", "profile builder", "droplink"],
        creator: "Droplink Team",
        publisher: "Droplink",
        openGraph: {
          type: "website",
          title: "Droplink Demo - Try Our Link in Bio Tool",
          description: "See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience.",
          images: [{
            url: "https://droplink.space/demo-preview.png",
            width: 1200,
            height: 630,
            alt: "Droplink Demo Preview"
          }],
          locale: "en_US"
        },
        twitter: {
          card: "summary_large_image",
          title: "Droplink Demo - Try Our Link in Bio Tool",
          description: "See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience.",
          images: [{
            url: "https://droplink.space/demo-preview.png",
            alt: "Droplink Demo Preview"
          }]
        }
      };
    }
    
    // Handle developers page
    else if (pathSegments[0] === 'developers') {
      metadata = {
        title: "Droplink Developer Platform - API Documentation",
        description: "Access the Droplink.space API to integrate Pi Network payments and user data into your applications. Complete developer documentation and SDKs.",
        keywords: ["Pi Network", "API", "developer", "documentation", "SDK", "integration"],
        creator: "Droplink Team",
        publisher: "Droplink",
        openGraph: {
          type: "website",
          title: "Droplink Developer Platform - API Documentation",
          description: "Access the Droplink.space API to integrate Pi Network payments and user data into your applications. Complete developer documentation and SDKs.",
          images: [{
            url: "https://droplink.space/developer-og.png",
            width: 1200,
            height: 630,
            alt: "Droplink Developer Platform"
          }],
          locale: "en_US"
        },
        twitter: {
          card: "summary_large_image",
          title: "Droplink Developer Platform - API Documentation",
          description: "Access the Droplink.space API to integrate Pi Network payments and user data into your applications. Complete developer documentation and SDKs.",
          images: [{
            url: "https://droplink.space/developer-og.png",
            alt: "Droplink Developer Platform"
          }]
        }
      };
    }

    // Handle profile pages (/@username or /profile/username)
    else if (pathSegments.length >= 1 && (pathSegments[0].startsWith('@') || pathSegments[0] === 'profile')) {
      let username = '';
      
      if (pathSegments[0].startsWith('@')) {
        username = pathSegments[0].substring(1); // Remove @ symbol
      } else if (pathSegments[0] === 'profile' && pathSegments[1]) {
        username = pathSegments[1];
      }

      if (username) {
        // Fetch user profile data
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('username, display_name, bio, avatar_url')
          .eq('username', username)
          .maybeSingle();

        if (!error && profile) {
          const displayName = profile.display_name || `@${profile.username}`;
          const description = profile.bio || `Check out ${profile.username}'s profile on Droplink`;
          const avatarUrl = profile.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.username}`;
          
          metadata = {
            title: `${displayName} | Droplink`,
            description,
            keywords: ["Pi Network", "profile", profile.username, "droplink"],
            creator: profile.username,
            publisher: "Droplink",
            openGraph: {
              type: "profile",
              title: `${displayName} | Droplink`,
              description,
              username: profile.username,
              firstName: profile.display_name?.split(' ')[0],
              lastName: profile.display_name?.split(' ').slice(1).join(' '),
              images: [{
                url: avatarUrl,
                width: 400,
                height: 400,
                alt: `${displayName}'s profile picture`
              }],
              locale: "en_US"
            },
            twitter: {
              card: "summary",
              title: `${displayName} | Droplink`,
              description,
              creator: `@${profile.username}`,
              images: [{
                url: avatarUrl,
                alt: `${displayName}'s profile picture`
              }]
            }
          };
        }
      }
    }
    
    // Handle store pages
    else if (pathSegments[0] === 'store') {
      if (pathSegments[1]) {
        // Individual product page
        const productId = pathSegments[1];
        
        const { data: product, error } = await supabase
          .from('digital_products')
          .select(`
            title, description, price, currency, image_url,
            user_profiles!digital_products_user_id_fkey(username, display_name)
          `)
          .eq('id', productId)
          .eq('is_active', true)
          .maybeSingle();

        if (!error && product) {
          const creator = product.user_profiles?.display_name || product.user_profiles?.username || 'Unknown';
          
          metadata = {
            title: `${product.title} | Droplink Store`,
            description: product.description || `${product.title} - Available on Droplink Store`,
            keywords: ["Pi Network", "digital product", "store", product.title],
            creator,
            publisher: "Droplink",
            openGraph: {
              type: "article",
              title: `${product.title} | Droplink Store`,
              description: product.description || `${product.title} - Available on Droplink Store`,
              images: product.image_url ? [{
                url: product.image_url,
                width: 600,
                height: 400,
                alt: product.title
              }] : undefined,
              locale: "en_US"
            },
            twitter: {
              card: "summary_large_image",
              title: `${product.title} | Droplink Store`,
              description: product.description || `${product.title} - Available on Droplink Store`,
              images: product.image_url ? [{
                url: product.image_url,
                alt: product.title
              }] : undefined
            }
          };
        }
      } else {
        // Store homepage
        metadata.title = "Droplink Store - Digital Products on Pi Network";
        metadata.description = "Discover and purchase digital products using Pi Network. Support creators and find unique content on Droplink Store.";
        metadata.openGraph!.title = "Droplink Store - Digital Products on Pi Network";
        metadata.openGraph!.description = "Discover and purchase digital products using Pi Network. Support creators and find unique content on Droplink Store.";
        metadata.twitter!.title = "Droplink Store - Digital Products on Pi Network";
        metadata.twitter!.description = "Discover and purchase digital products using Pi Network. Support creators and find unique content on Droplink Store.";
      }
    }

    console.log('Generated metadata for pathname:', pathname, metadata);

    return new Response(
      JSON.stringify(metadata),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error generating metadata:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
