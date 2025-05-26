
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import { createPiPayment } from '@/services/piPaymentService';

interface StickerEffect {
  id: string;
  name: string;
  animation_url: string;
  price_pi: number;
  description: string;
  category: 'sticker' | 'profile_effect' | 'animation';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UserSticker {
  id: string;
  user_id: string;
  sticker_id: string;
  unlocked_at: string;
  sticker: StickerEffect;
}

export const useStickers = () => {
  const { user } = useUser();
  const [stickers, setStickers] = useState<StickerEffect[]>([]);
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  // Fetch all available stickers
  const fetchStickers = async () => {
    try {
      const { data, error } = await supabase
        .from('stickers_effects')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedStickers = (data || []).map(sticker => ({
        ...sticker,
        category: sticker.category as 'sticker' | 'profile_effect' | 'animation'
      }));
      
      setStickers(typedStickers);
    } catch (error) {
      console.error('Error fetching stickers:', error);
      toast({
        title: "Error",
        description: "Failed to load stickers catalog",
        variant: "destructive",
      });
    }
  };

  // Fetch user's owned stickers
  const fetchUserStickers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stickers')
        .select(`
          *,
          sticker:stickers_effects(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedUserStickers = (data || []).map(userSticker => ({
        ...userSticker,
        sticker: {
          ...userSticker.sticker,
          category: userSticker.sticker.category as 'sticker' | 'profile_effect' | 'animation'
        }
      }));
      
      setUserStickers(typedUserStickers);
    } catch (error) {
      console.error('Error fetching user stickers:', error);
    }
  };

  // Purchase a sticker with Pi payment
  const purchaseSticker = async (sticker: StickerEffect) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase stickers",
        variant: "destructive",
      });
      return;
    }

    // Check if already owned
    const alreadyOwned = userStickers.some(us => us.sticker_id === sticker.id);
    if (alreadyOwned) {
      toast({
        title: "Already Owned",
        description: "You already own this sticker",
        variant: "destructive",
      });
      return;
    }

    setPurchasing(sticker.id);

    try {
      const paymentData = {
        amount: sticker.price_pi,
        memo: `Purchase ${sticker.name} sticker`,
        metadata: {
          type: 'sticker_purchase',
          sticker_id: sticker.id,
          sticker_name: sticker.name
        }
      };

      await createPiPayment(paymentData, user);

      toast({
        title: "Processing Purchase",
        description: "Follow the Pi payment flow to complete your purchase",
      });

    } catch (error) {
      console.error('Sticker purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  // Check if user owns a specific sticker
  const ownsSticker = (stickerId: string) => {
    return userStickers.some(us => us.sticker_id === stickerId);
  };

  // Update active stickers on profile
  const updateActiveStickers = async (activeStickerIds: string[]) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ active_sticker_ids: activeStickerIds })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your active stickers have been updated",
      });
    } catch (error) {
      console.error('Error updating active stickers:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStickers();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserStickers();
    } else {
      setUserStickers([]);
    }
  }, [user]);

  useEffect(() => {
    setLoading(false);
  }, [stickers]);

  return {
    stickers,
    userStickers,
    loading,
    purchasing,
    purchaseSticker,
    ownsSticker,
    updateActiveStickers,
    refetchUserStickers: fetchUserStickers
  };
};
