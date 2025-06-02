
import { useCallback } from 'react';
import { usePetMoodEngine } from './usePetMoodEngine';
import { useWallet } from './useWallet';
import { useInventory } from './useInventory';
import { shopItems, ShopItem } from '@/data/shopItems';
import { petLevelChart } from '@/data/petLevels';
import { toast } from '@/hooks/use-toast';

export const usePetEconomy = (characterId: string) => {
  const { moodState, actions: moodActions } = usePetMoodEngine(characterId);
  const { wallet, addCoins, spendCoins, claimDailyCoins, canClaimDailyCoins } = useWallet();
  const { inventory, useItem, hasItem } = useInventory();

  // Calculate pet level based on mood happiness and care
  const calculatePetLevel = useCallback(() => {
    const totalCare = moodState.happiness + moodState.health + moodState.affection;
    const level = Math.min(Math.floor(totalCare / 30), 10);
    return Math.max(0, level);
  }, [moodState]);

  const petLevel = calculatePetLevel();
  const levelInfo = petLevelChart[petLevel] || petLevelChart[0];

  // Use shop item on pet
  const useShopItem = useCallback((itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || !hasItem(itemId)) {
      toast({
        title: "Item not available",
        description: "You don't have this item in your inventory",
        variant: "destructive"
      });
      return false;
    }

    const success = useItem(itemId);
    if (!success) return false;

    // Apply item effects to pet
    let effectApplied = false;
    if (item.effect.hunger) {
      moodActions.feedPet();
      effectApplied = true;
    }
    if (item.effect.cleanliness) {
      moodActions.bathePet();
      effectApplied = true;
    }
    if (item.effect.energy) {
      moodActions.playWithPet();
      effectApplied = true;
    }
    if (item.effect.health) {
      moodActions.giveMedicine();
      effectApplied = true;
    }
    if (item.effect.affection) {
      moodActions.petCharacter();
      effectApplied = true;
    }
    if (item.effect.happiness) {
      moodActions.petCharacter();
      effectApplied = true;
    }

    if (effectApplied) {
      toast({
        title: `Used ${item.name}!`,
        description: `Your pet feels the effects of ${item.name}`,
        className: "bg-green-50 border-green-200"
      });
    }

    return true;
  }, [hasItem, useItem, moodActions]);

  // Claim daily coins based on pet level
  const claimDailyReward = useCallback(() => {
    if (!canClaimDailyCoins()) {
      toast({
        title: "Already claimed today",
        description: "You can claim daily coins once every 24 hours",
        variant: "destructive"
      });
      return false;
    }

    const coinsEarned = claimDailyCoins(petLevel);
    if (coinsEarned) {
      toast({
        title: "Daily reward claimed!",
        description: `Your Level ${petLevel} pet earned you ${coinsEarned} coins!`,
        className: "bg-green-50 border-green-200"
      });
      return true;
    }
    return false;
  }, [canClaimDailyCoins, claimDailyCoins, petLevel]);

  // Watch ad for coin reward
  const watchAdForCoins = useCallback(() => {
    addCoins(1, 'ad');
    toast({
      title: "Ad reward claimed!",
      description: "You earned 1 Droplet Coin for watching an ad!",
      className: "bg-green-50 border-green-200"
    });
  }, [addCoins]);

  // Get items by category from inventory
  const getInventoryByCategory = useCallback((category: string) => {
    return inventory
      .map(invItem => {
        const shopItem = shopItems.find(s => s.id === invItem.itemId);
        return shopItem && shopItem.category === category 
          ? { ...shopItem, quantity: invItem.quantity }
          : null;
      })
      .filter(Boolean);
  }, [inventory]);

  return {
    moodState,
    moodActions,
    wallet,
    inventory,
    petLevel,
    levelInfo,
    useShopItem,
    claimDailyReward,
    watchAdForCoins,
    canClaimDailyCoins: canClaimDailyCoins(),
    getInventoryByCategory,
    hasItem
  };
};
