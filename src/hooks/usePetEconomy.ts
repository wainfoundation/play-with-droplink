
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface Wallet {
  dropletCoins: number;
  totalEarned: number;
  lastClaimTime: number;
}

interface InventoryItem {
  itemId: string;
  quantity: number;
  purchasedAt: number;
}

export const usePetEconomy = (characterId: string) => {
  const [wallet, setWallet] = useState<Wallet>({
    dropletCoins: 100,
    totalEarned: 100,
    lastClaimTime: 0
  });

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Load wallet from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem(`pet_wallet_${characterId}`);
    const savedInventory = localStorage.getItem(`pet_inventory_${characterId}`);
    
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet));
      } catch (error) {
        console.log('Error loading wallet');
      }
    }

    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (error) {
        console.log('Error loading inventory');
      }
    }
  }, [characterId]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`pet_wallet_${characterId}`, JSON.stringify(wallet));
  }, [wallet, characterId]);

  useEffect(() => {
    localStorage.setItem(`pet_inventory_${characterId}`, JSON.stringify(inventory));
  }, [inventory, characterId]);

  const addCoins = useCallback((amount: number, source: string = 'manual') => {
    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins + amount,
      totalEarned: prev.totalEarned + amount
    }));

    toast({
      title: `Earned ${amount} coins! 💰`,
      description: `Source: ${source}`,
      className: "bg-yellow-50 border-yellow-200"
    });
  }, []);

  const spendCoins = useCallback((amount: number, item: string) => {
    if (wallet.dropletCoins < amount) {
      toast({
        title: "Not enough coins! 💸",
        description: `You need ${amount} coins but only have ${wallet.dropletCoins}`,
        variant: "destructive"
      });
      return false;
    }

    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins - amount
    }));

    toast({
      title: `Purchased ${item}! 🛒`,
      description: `Spent ${amount} coins`,
      className: "bg-green-50 border-green-200"
    });

    return true;
  }, [wallet.dropletCoins]);

  const claimDailyCoins = useCallback((petLevel: number = 1) => {
    const now = Date.now();
    const lastClaim = wallet.lastClaimTime;
    const timeDiff = now - lastClaim;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay) {
      const hoursLeft = Math.ceil((oneDay - timeDiff) / (60 * 60 * 1000));
      toast({
        title: "Daily reward already claimed! ⏰",
        description: `Come back in ${hoursLeft} hours`,
        variant: "destructive"
      });
      return 0;
    }

    const baseReward = 50;
    const levelBonus = petLevel * 10;
    const totalReward = baseReward + levelBonus;

    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins + totalReward,
      totalEarned: prev.totalEarned + totalReward,
      lastClaimTime: now
    }));

    toast({
      title: `Daily reward claimed! 🎁`,
      description: `Earned ${totalReward} coins (Level ${petLevel} bonus: +${levelBonus})`,
      className: "bg-green-50 border-green-200"
    });

    return totalReward;
  }, [wallet.lastClaimTime]);

  const canClaimDailyCoins = useCallback(() => {
    const now = Date.now();
    const lastClaim = wallet.lastClaimTime;
    const timeDiff = now - lastClaim;
    const oneDay = 24 * 60 * 60 * 1000;
    return timeDiff >= oneDay;
  }, [wallet.lastClaimTime]);

  const addToInventory = useCallback((itemId: string, quantity: number = 1) => {
    setInventory(prev => {
      const existingItem = prev.find(item => item.itemId === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          itemId,
          quantity,
          purchasedAt: Date.now()
        }];
      }
    });
  }, []);

  const removeFromInventory = useCallback((itemId: string, quantity: number = 1) => {
    setInventory(prev => {
      return prev.map(item => {
        if (item.itemId === itemId) {
          const newQuantity = Math.max(0, item.quantity - quantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  const hasItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(inv => inv.itemId === itemId);
    return item ? item.quantity >= quantity : false;
  }, [inventory]);

  return {
    wallet,
    inventory,
    addCoins,
    spendCoins,
    claimDailyCoins,
    canClaimDailyCoins,
    addToInventory,
    removeFromInventory,
    hasItem
  };
};
