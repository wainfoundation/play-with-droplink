
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { shopItems, ShopItem } from '@/data/shopItems';
import { usePetEconomy } from './usePetEconomy';

interface LocalInventoryItem {
  itemId: string;
  quantity: number;
  equipped: boolean;
  purchasedAt: number;
}

export const useLocalShop = (characterId: string) => {
  const [inventory, setInventory] = useState<LocalInventoryItem[]>([]);
  const { wallet, spendCoins, addToInventory } = usePetEconomy(characterId);

  // Load inventory from localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem(`shop_inventory_${characterId}`);
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (error) {
        console.log('Error loading shop inventory');
      }
    }
  }, [characterId]);

  // Save inventory to localStorage
  useEffect(() => {
    localStorage.setItem(`shop_inventory_${characterId}`, JSON.stringify(inventory));
  }, [inventory, characterId]);

  const buyItem = useCallback((item: ShopItem) => {
    if (!wallet || wallet.dropletCoins < item.price) {
      toast({
        title: "Not enough coins! 💸",
        description: `You need ${item.price} coins but only have ${wallet?.dropletCoins || 0}`,
        variant: "destructive"
      });
      return false;
    }

    const success = spendCoins(item.price, item.name);
    if (!success) return false;

    // Add to inventory
    setInventory(prev => {
      const existingItem = prev.find(inv => inv.itemId === item.id);
      if (existingItem) {
        return prev.map(inv =>
          inv.itemId === item.id
            ? { ...inv, quantity: inv.quantity + 1 }
            : inv
        );
      } else {
        return [...prev, {
          itemId: item.id,
          quantity: 1,
          equipped: false,
          purchasedAt: Date.now()
        }];
      }
    });

    toast({
      title: `Purchased ${item.name}! 🛒`,
      description: `Added to your inventory`,
      className: "bg-green-50 border-green-200"
    });

    return true;
  }, [wallet, spendCoins]);

  const useItem = useCallback((itemId: string) => {
    const item = shopItems.find(shop => shop.id === itemId);
    const inventoryItem = inventory.find(inv => inv.itemId === itemId);
    
    if (!item || !inventoryItem || inventoryItem.quantity <= 0) {
      toast({
        title: "Item not available",
        description: "You don't have this item in your inventory",
        variant: "destructive"
      });
      return null;
    }

    // Remove from inventory
    setInventory(prev => 
      prev.map(inv =>
        inv.itemId === itemId
          ? { ...inv, quantity: Math.max(0, inv.quantity - 1) }
          : inv
      ).filter(inv => inv.quantity > 0)
    );

    toast({
      title: `Used ${item.name}! ✨`,
      description: "Effects applied to your pet",
      className: "bg-blue-50 border-blue-200"
    });

    return item.effect;
  }, [inventory]);

  const toggleEquip = useCallback((itemId: string, equipped: boolean) => {
    setInventory(prev =>
      prev.map(inv =>
        inv.itemId === itemId
          ? { ...inv, equipped }
          : inv
      )
    );

    const item = shopItems.find(shop => shop.id === itemId);
    toast({
      title: equipped ? "Item equipped" : "Item unequipped",
      description: `${item?.name} ${equipped ? 'equipped' : 'removed'}`,
      className: "bg-blue-50 border-blue-200"
    });

    return true;
  }, []);

  const hasItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(inv => inv.itemId === itemId);
    return item ? item.quantity >= quantity : false;
  }, [inventory]);

  const getInventoryWithItems = useCallback(() => {
    return inventory.map(inv => {
      const shopItem = shopItems.find(shop => shop.id === inv.itemId);
      return {
        ...inv,
        item: shopItem
      };
    }).filter(inv => inv.item);
  }, [inventory]);

  return {
    shopItems,
    inventory: getInventoryWithItems(),
    buyItem,
    useItem,
    toggleEquip,
    hasItem,
    loading: false
  };
};
