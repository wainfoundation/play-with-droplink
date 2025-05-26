
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  links: Link[];
  active_sticker_ids: string[];
}

export const useProfileData = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        if (!username) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();
        
        if (profileError || !profileData) {
          setError("User profile not found");
          setLoading(false);
          return;
        }
        
        // Fetch links data
        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        if (linksError) {
          console.error("Failed to fetch links:", linksError);
        }
        
        // Register page view in analytics
        if (profileData.id) {
          await supabase
            .from('analytics')
            .insert({
              user_id: profileData.id,
              page_view: true,
              referrer: document.referrer,
              user_agent: navigator.userAgent,
            })
            .select();
        }
        
        // Process links to categorize them
        const processedLinks = linksData ? linksData.map(link => {
          let type: "featured" | "social" | "regular" | undefined = undefined;
          
          // Check if it's a social link
          if (
            link.url.includes('instagram.com') ||
            link.url.includes('twitter.com') ||
            link.url.includes('facebook.com') ||
            link.url.includes('linkedin.com') ||
            link.url.includes('youtube.com') ||
            link.icon.toLowerCase() === 'instagram' ||
            link.icon.toLowerCase() === 'twitter' ||
            link.icon.toLowerCase() === 'facebook' ||
            link.icon.toLowerCase() === 'linkedin' ||
            link.icon.toLowerCase() === 'youtube'
          ) {
            type = "social";
          } 
          else if (linksData.indexOf(link) < 2) {
            type = "featured";
          }
          else {
            type = "regular";
          }
          
          return { ...link, type };
        }) : [];
        
        // Default links if none found
        const defaultLinks = [
          { id: 'default-1', title: "Tip in Pi", url: "#tip-in-pi", icon: "💰", clicks: 0 },
        ];
        
        // Ensure active_sticker_ids is always a string array
        let activeStickerIds: string[] = [];
        if (profileData.active_sticker_ids) {
          if (Array.isArray(profileData.active_sticker_ids)) {
            activeStickerIds = profileData.active_sticker_ids
              .filter((id): id is string => typeof id === 'string');
          } else if (typeof profileData.active_sticker_ids === 'string') {
            try {
              const parsed = JSON.parse(profileData.active_sticker_ids);
              if (Array.isArray(parsed)) {
                activeStickerIds = parsed.filter((id): id is string => typeof id === 'string');
              }
            } catch {
              activeStickerIds = [];
            }
          }
        }
        
        setProfileData({
          ...profileData,
          active_sticker_ids: activeStickerIds,
          links: processedLinks && processedLinks.length > 0 ? processedLinks : defaultLinks,
        });
        
        setLoading(false);
        
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [username]);

  const handleLinkClick = async (link: Link) => {
    if (profileData?.id) {
      try {
        await supabase
          .from('links')
          .update({ clicks: link.clicks + 1 })
          .eq('id', link.id)
          .select();
        
        await supabase
          .from('analytics')
          .insert({
            user_id: profileData.id,
            link_id: link.id,
            link_click: true,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          })
          .select();
          
        window.open(link.url, '_blank');
      } catch (err) {
        console.error("Failed to register link click:", err);
      }
    }
  };

  return {
    loading,
    error,
    profileData,
    handleLinkClick
  };
};
