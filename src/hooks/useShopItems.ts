
import { useState, useEffect } from 'react';
import { usePiPayment } from '@/hooks/usePiPayment';
import { useWallet } from '@/hooks/useWallet';
import { shopItems, ShopItem } from '@/data/shopItems';
import { toast } from '@/hooks/use-toast';

export interface CoinPack {
  id: string;
  coins_given: number;
  pi_cost: number;
  bonus_percentage: number;
  description: string;
  is_active: boolean;
}

export interface InventoryItem {
  id: string;
  item_id: string;
  quantity: number;
  equipped: boolean;
  item?: ShopItem;
}

export const useShopItems = () => {
  const [coinPacks, setCoinPacks] = useState<CoinPack[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { createPayment } = usePiPayment();
  const { addCoins } = useWallet();

  // Mock coin packs data - in real app this would come from Supabase
  useEffect(() => {
    const mockCoinPacks: CoinPack[] = [
      {
        id: 'cp_small',
        coins_given: 10,
        pi_cost: 1,
        bonus_percentage: 0,
        description: 'Starter Pack',
        is_active: true
      },
      {
        id: 'cp_medium',
        coins_given: 100,
        pi_cost: 10,
        bonus_percentage: 10,
        description: 'Popular Pack',
        is_active: true
      },
      {
        id: 'cp_large',
        coins_given: 300,
        pi_cost: 25,
        bonus_percentage: 20,
        description: 'Value Pack',
        is_active: true
      },
      {
        id: 'cp_premium',
        coins_given: 1000,
        pi_cost: 75,
        bonus_percentage: 35,
        description: 'Premium Pack',
        is_active: true
      }
    ];
    setCoinPacks(mockCoinPacks);

    // Mock inventory data
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        item_id: 'apple',
        quantity: 3,
        equipped: false,
        item: shopItems.find(item => item.id === 'apple')
      },
      {
        id: '2',
        item_id: 'ball',
        quantity: 1,
        equipped: true,
        item: shopItems.find(item => item.id === 'ball')
      }
    ];
    setInventory(mockInventory);
  }, []);

  const buyCoinPack = async (pack: CoinPack) => {
    setLoading(true);
    try {
      await createPayment({
        amount: pack.pi_cost,
        memo: `Purchase ${pack.description}`,
        metadata: { 
          type: 'coin_pack',
          packId: pack.id,
          coins: pack.coins_given,
          bonus: pack.bonus_percentage
        }
      });

      // In a real implementation, coins would be added after payment verification
      // For now, simulate successful purchase
      const totalCoins = pack.coins_given + Math.floor(pack.coins_given * pack.bonus_percentage / 100);
      addCoins(totalCoins, `Purchased ${pack.description}`);
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const useItem = async (itemId: string) => {
    const inventoryItem = inventory.find(item => item.item_id === itemId);
    if (!inventoryItem || inventoryItem.quantity <= 0) {
      toast({
        title: "Item not available",
        description: "You don't have this item in your inventory",
        variant: "destructive"
      });
      return null;
    }

    // Update inventory
    setInventory(prev => 
      prev.map(item => 
        item.item_id === itemId 
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0)
    );

    const shopItem = shopItems.find(item => item.id === itemId);
    if (shopItem) {
      toast({
        title: `Used ${shopItem.name}!`,
        description: "Item effects applied",
        className: "bg-green-50 border-green-200"
      });
      return shopItem.effect;
    }
    return null;
  };

  const toggleEquip = async (itemId: string, equipped: boolean) => {
    setInventory(prev =>
      prev.map(item =>
        item.item_id === itemId
          ? { ...item, equipped }
          : item
      )
    );

    const shopItem = shopItems.find(item => item.id === itemId);
    toast({
      title: equipped ? "Item equipped" : "Item unequipped",
      description: `${shopItem?.name} ${equipped ? 'equipped' : 'unequipped'}`,
      className: "bg-blue-50 border-blue-200"
    });
  };

  const getInventoryByCategory = (category: string) => {
    return inventory.filter(item => {
      if (!item.item) return false;
      return item.item.category === category;
    });
  };

  return {
    coinPacks,
    inventory,
    buyCoinPack,
    useItem,
    toggleEquip,
    getInventoryByCategory,
    loading
  };
};
