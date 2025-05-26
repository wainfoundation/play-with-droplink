
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserSticker {
  id: string;
  sticker_id: string;
  stickers_effects: {
    id: string;
    name: string;
    animation_url: string;
    category: string;
  };
}

export const useProfileStickers = (userId: string, activeStickers: string[] = []) => {
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(activeStickers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStickers();
  }, [userId]);

  useEffect(() => {
    setSelectedStickers(activeStickers);
  }, [activeStickers]);

  const fetchUserStickers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stickers')
        .select(`
          id,
          sticker_id,
          stickers_effects (
            id,
            name,
            animation_url,
            category
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;
      setUserStickers(data || []);
    } catch (error) {
      console.error('Error fetching user stickers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActiveStickers = async (stickers: string[]) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ active_sticker_ids: stickers })
        .eq('id', userId);

      if (error) throw error;
      setSelectedStickers(stickers);
    } catch (error) {
      console.error('Error updating active stickers:', error);
    }
  };

  const toggleSticker = (stickerId: string) => {
    const newSelection = selectedStickers.includes(stickerId)
      ? selectedStickers.filter(id => id !== stickerId)
      : [...selectedStickers, stickerId];
    
    setSelectedStickers(newSelection);
  };

  const saveChanges = () => {
    updateActiveStickers(selectedStickers);
  };

  const clearAll = () => {
    setSelectedStickers([]);
  };

  const displayStickers = userStickers.filter(us => 
    selectedStickers.includes(us.sticker_id)
  );

  return {
    userStickers,
    selectedStickers,
    loading,
    displayStickers,
    toggleSticker,
    saveChanges,
    clearAll
  };
};
