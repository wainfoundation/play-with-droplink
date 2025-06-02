
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface ShopItem {
  id: string;
  category: string;
  name: string;
  effect: Record<string, number>;
  price_coins: number;
  image_url?: string;
  description: string;
  rarity: string;
}

export interface CoinPack {
  id: string;
  pi_cost: number;
  coins_given: number;
  description: string;
  bonus_percentage: number;
}

export interface InventoryItem {
  id: string;
  item_id: string;
  quantity: number;
  equipped: boolean;
  item?: ShopItem;
}

export const useShopItems = () => {
  const { user } = useAuth();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [coinPacks, setCoinPacks] = useState<CoinPack[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load shop items
  const loadShopItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shop_items')
        .select('*')
        .order('category', { ascending: true })
        .order('price_coins', { ascending: true });
      
      if (error) throw error;
      
      // Convert Supabase data to our ShopItem interface
      const convertedItems: ShopItem[] = (data || []).map(item => ({
        id: item.id,
        category: item.category,
        name: item.name,
        effect: (item.effect as Record<string, number>) || {},
        price_coins: item.price_coins,
        image_url: item.image_url || undefined,
        description: item.description || '',
        rarity: item.rarity || 'common'
      }));
      
      setShopItems(convertedItems);
    } catch (error) {
      console.error('Error loading shop items:', error);
    }
  }, []);

  // Load coin packs
  const loadCoinPacks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('coin_packs')
        .select('*')
        .order('pi_cost', { ascending: true });
      
      if (error) throw error;
      setCoinPacks(data || []);
    } catch (error) {
      console.error('Error loading coin packs:', error);
    }
  }, []);

  // Load user inventory
  const loadInventory = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_inventory')
        .select(`
          id,
          item_id,
          quantity,
          equipped,
          shop_items (*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Convert Supabase data to our InventoryItem interface
      const inventoryWithItems: InventoryItem[] = (data || []).map(item => ({
        id: item.id,
        item_id: item.item_id,
        quantity: item.quantity,
        equipped: item.equipped,
        item: item.shop_items ? {
          id: item.shop_items.id,
          category: item.shop_items.category,
          name: item.shop_items.name,
          effect: (item.shop_items.effect as Record<string, number>) || {},
          price_coins: item.shop_items.price_coins,
          image_url: item.shop_items.image_url || undefined,
          description: item.shop_items.description || '',
          rarity: item.shop_items.rarity || 'common'
        } : undefined
      }));
      
      setInventory(inventoryWithItems);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  }, [user]);

  // Buy shop item
  const buyItem = useCallback(async (item: ShopItem) => {
    if (!user) return false;
    
    try {
      await supabase.rpc('buy_shop_item', {
        p_user_id: user.id,
        p_item_id: item.id,
        p_price_coins: item.price_coins
      });

      // Refresh inventory
      await loadInventory();
      
      toast({
        title: "Item purchased!",
        description: `You bought ${item.name} for ${item.price_coins} coins`,
        className: "bg-green-50 border-green-200"
      });

      return true;
    } catch (error: any) {
      console.error('Error buying item:', error);
      toast({
        title: "Purchase failed",
        description: error.message || "Not enough coins",
        variant: "destructive"
      });
      return false;
    }
  }, [user, loadInventory]);

  // Use item from inventory
  const useItem = useCallback(async (itemId: string) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase.rpc('use_item', {
        p_user_id: user.id,
        p_item_id: itemId
      });

      if (error) throw error;

      // Refresh inventory
      await loadInventory();
      
      const item = shopItems.find(s => s.id === itemId);
      toast({
        title: "Item used!",
        description: `${item?.name} has been applied to your pet`,
        className: "bg-green-50 border-green-200"
      });

      return data; // Returns the effect object
    } catch (error: any) {
      console.error('Error using item:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to use item",
        variant: "destructive"
      });
      return null;
    }
  }, [user, loadInventory, shopItems]);

  // Toggle equip status
  const toggleEquip = useCallback(async (itemId: string, currentlyEquipped: boolean) => {
    if (!user) return false;
    
    try {
      await supabase.rpc('toggle_equip_item', {
        p_user_id: user.id,
        p_item_id: itemId,
        p_equip: !currentlyEquipped
      });

      // Refresh inventory
      await loadInventory();
      
      const item = shopItems.find(s => s.id === itemId);
      toast({
        title: currentlyEquipped ? "Item unequipped" : "Item equipped",
        description: `${item?.name} ${currentlyEquipped ? 'removed' : 'equipped'}`,
        className: "bg-blue-50 border-blue-200"
      });

      return true;
    } catch (error: any) {
      console.error('Error toggling equip:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update equipment",
        variant: "destructive"
      });
      return false;
    }
  }, [user, loadInventory, shopItems]);

  // Buy coin pack with Pi
  const buyCoinPack = useCallback(async (pack: CoinPack) => {
    if (!user) return false;
    
    try {
      // This would integrate with Pi payment in real implementation
      // For now, simulate successful payment
      await supabase.rpc('buy_coin_pack', {
        p_user_id: user.id,
        p_pack_id: pack.id,
        p_pi_cost: pack.pi_cost,
        p_coins_given: pack.coins_given
      });

      toast({
        title: "Coins purchased!",
        description: `You received ${pack.coins_given} coins for ${pack.pi_cost} Pi`,
        className: "bg-green-50 border-green-200"
      });

      return true;
    } catch (error: any) {
      console.error('Error buying coin pack:', error);
      toast({
        title: "Purchase failed",
        description: error.message || "Payment failed",
        variant: "destructive"
      });
      return false;
    }
  }, [user]);

  // Get items by category
  const getItemsByCategory = useCallback((category: string) => {
    return shopItems.filter(item => item.category === category);
  }, [shopItems]);

  // Get inventory by category
  const getInventoryByCategory = useCallback((category: string) => {
    return inventory.filter(item => item.item?.category === category);
  }, [inventory]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        loadShopItems(),
        loadCoinPacks(),
        loadInventory()
      ]);
      setLoading(false);
    };

    initializeData();
  }, [loadShopItems, loadCoinPacks, loadInventory]);

  return {
    shopItems,
    coinPacks,
    inventory,
    loading,
    buyItem,
    useItem,
    toggleEquip,
    buyCoinPack,
    getItemsByCategory,
    getInventoryByCategory,
    refreshData: () => Promise.all([loadInventory()])
  };
};
