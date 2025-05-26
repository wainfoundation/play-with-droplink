
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

interface CustomSticker {
  id: string;
  user_id: string;
  name: string;
  description: string;
  base_image_url: string;
  overlay_text: string;
  text_color: string;
  text_size: number;
  text_position: string;
  background_effect: string;
  animation_type: string;
  is_public: boolean;
  price_pi: number;
  created_at: string;
}

export const useCustomStickers = () => {
  const { user } = useUser();
  const [customStickers, setCustomStickers] = useState<CustomSticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomStickers();
  }, [user]);

  const fetchCustomStickers = async () => {
    try {
      let query = supabase.from('custom_stickers').select('*');
      
      if (user) {
        // Get user's own stickers + public stickers
        query = query.or(`user_id.eq.${user.id},is_public.eq.true`);
      } else {
        // Only public stickers for non-authenticated users
        query = query.eq('is_public', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCustomStickers(data || []);
    } catch (error) {
      console.error('Error fetching custom stickers:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStickers = () => {
    fetchCustomStickers();
  };

  return {
    customStickers,
    loading,
    refreshStickers
  };
};
