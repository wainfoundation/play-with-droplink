
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';

export interface PetStats {
  id: string;
  user_id: string;
  character_id: string;
  hunger: number;
  energy: number;
  cleanliness: number;
  happiness: number;
  health: number;
  mood: string;
  last_decay: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name?: string;
  selected_character_id?: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  bio?: string;
  level: number;
  xp: number;
  selected_room: string;
}

export interface InventoryItem {
  id: string;
  user_id: string;
  item_id: string;
  quantity: number;
  equipped: boolean;
  shop_item?: {
    id: string;
    name: string;
    description?: string;
    category: string;
    price_coins: number;
    effect: any;
  };
}

export const useGameData = () => {
  const { user } = useAuthSystem();
  const [petStats, setPetStats] = useState<PetStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState('bedroom');

  // Load user data
  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (profile) {
        setUserProfile(profile);
        setCurrentRoom(profile.selected_room || 'bedroom');
      }

      // Load pet stats
      const { data: stats, error: statsError } = await supabase
        .from('pet_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError) throw statsError;
      if (stats) {
        setPetStats(stats);
      }

      // Load inventory with shop item details
      const { data: inventoryData, error: inventoryError } = await supabase
        .from('user_inventory')
        .select(`
          *,
          shop_item:shop_items(*)
        `)
        .eq('user_id', user.id);

      if (inventoryError) throw inventoryError;
      setInventory(inventoryData || []);

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load game data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Use item from inventory
  const useItem = async (itemId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('use_item', {
        p_user_id: user.id,
        p_item_id: itemId
      });

      if (error) throw error;

      if (data) {
        await loadUserData(); // Refresh data
        toast({
          title: "Item Used!",
          description: `Applied effects: ${JSON.stringify(data)}`,
          className: "bg-green-50 border-green-200"
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: "Failed to use item",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Error using item:', error);
      toast({
        title: "Error",
        description: "Failed to use item",
        variant: "destructive"
      });
      return false;
    }
  };

  // Buy item from shop
  const buyItem = async (itemId: string, quantity: number = 1) => {
    if (!user) return false;

    try {
      // Get item price first
      const { data: itemData, error: itemError } = await supabase
        .from('shop_items')
        .select('price_coins')
        .eq('id', itemId)
        .single();

      if (itemError) throw itemError;

      const { data, error } = await supabase.rpc('buy_shop_item', {
        p_user_id: user.id,
        p_item_id: itemId,
        p_price_coins: itemData.price_coins
      });

      if (error) throw error;

      await loadUserData(); // Refresh data
      toast({
        title: "Purchase Successful!",
        description: `Purchased ${quantity}x ${itemId}`,
        className: "bg-green-50 border-green-200"
      });
      return true;
    } catch (error) {
      console.error('Error buying item:', error);
      toast({
        title: "Error",
        description: "Failed to purchase item",
        variant: "destructive"
      });
      return false;
    }
  };

  // Change room
  const changeRoom = async (room: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ selected_room: room, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      setCurrentRoom(room);
      setUserProfile(prev => prev ? { ...prev, selected_room: room } : null);
    } catch (error) {
      console.error('Error changing room:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const statsSubscription = supabase
      .channel('pet_stats_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pet_stats',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setPetStats(payload.new as PetStats);
        }
      })
      .subscribe();

    const profileSubscription = supabase
      .channel('profile_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_profiles',
        filter: `id=eq.${user.id}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setUserProfile(payload.new as UserProfile);
        }
      })
      .subscribe();

    return () => {
      statsSubscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }, [user]);

  // Load data on mount
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  return {
    petStats,
    userProfile,
    inventory,
    loading,
    currentRoom,
    useItem,
    buyItem,
    changeRoom,
    refreshData: loadUserData
  };
};
