
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';

interface Pet {
  id: string;
  user_id: string;
  pet_name: string;
  character_id: string;
  current_mood: string;
  level: number;
  experience: number;
  experience_to_next: number;
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
  health: number;
  pi_coins: number;
  created_at: string;
  updated_at: string;
}

interface ShopItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  price_coins: number;
  price_pi?: number;
  image_url?: string;
  effect?: any;
  rarity: string;
}

interface InventoryItem {
  id: string;
  item_id: string;
  quantity: number;
  is_equipped: boolean;
  shop_item?: ShopItem;
}

export const usePetSystem = () => {
  const { user } = useAuthSystem();
  const [pet, setPet] = useState<Pet | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize pet data using existing tables
  const initializePet = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Use existing user_pet_data table
      let { data: existingPet, error: petError } = await supabase
        .from('user_pet_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (petError && petError.code === 'PGRST116') {
        // Create new pet using existing structure
        const { data: newPet, error: createError } = await supabase
          .from('user_pet_data')
          .insert([{
            user_id: user.id,
            pet_name: 'My Droplet',
            current_mood: 'happy',
            level: 1,
            experience: 0,
            experience_to_next: 100,
            hunger: 60,
            happiness: 80,
            energy: 85,
            cleanliness: 70,
            pi_coins: 100
          }])
          .select()
          .single();

        if (createError) throw createError;
        setPet({
          id: newPet.id,
          user_id: newPet.user_id,
          pet_name: newPet.pet_name,
          character_id: 'droplet-blue',
          current_mood: newPet.current_mood,
          level: newPet.level,
          experience: newPet.experience,
          experience_to_next: newPet.experience_to_next,
          hunger: newPet.hunger,
          happiness: newPet.happiness,
          energy: newPet.energy,
          cleanliness: newPet.cleanliness,
          health: 100,
          pi_coins: newPet.pi_coins,
          created_at: newPet.created_at,
          updated_at: newPet.updated_at
        });
      } else if (petError) {
        throw petError;
      } else {
        setPet({
          id: existingPet.id,
          user_id: existingPet.user_id,
          pet_name: existingPet.pet_name,
          character_id: 'droplet-blue',
          current_mood: existingPet.current_mood,
          level: existingPet.level,
          experience: existingPet.experience,
          experience_to_next: existingPet.experience_to_next,
          hunger: existingPet.hunger,
          happiness: existingPet.happiness,
          energy: existingPet.energy,
          cleanliness: existingPet.cleanliness,
          health: 100,
          pi_coins: existingPet.pi_coins,
          created_at: existingPet.created_at,
          updated_at: existingPet.updated_at
        });
      }

      // Load inventory using existing user_inventory table
      const { data: inventoryData, error: inventoryError } = await supabase
        .from('user_inventory')
        .select(`
          *,
          shop_item:shop_items(*)
        `)
        .eq('user_id', user.id);

      if (inventoryError) {
        console.warn('Inventory error:', inventoryError);
        setInventory([]);
      } else {
        // Transform the data to match our interface
        const transformedInventory = (inventoryData || []).map(item => ({
          id: item.id,
          item_id: item.item_id,
          quantity: item.quantity,
          is_equipped: item.equipped || false, // Map 'equipped' to 'is_equipped'
          shop_item: item.shop_item
        }));
        setInventory(transformedInventory);
      }

      // Load shop items
      const { data: shopData, error: shopError } = await supabase
        .from('shop_items')
        .select('*')
        .order('category, price_coins');

      if (shopError) {
        console.warn('Shop error:', shopError);
        setShopItems([]);
      } else {
        setShopItems(shopData || []);
      }

    } catch (err) {
      console.error('Error initializing pet:', err);
      setError(err instanceof Error ? err.message : 'Failed to load pet data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Pet care actions
  const feedPet = useCallback(async (foodItemId?: string) => {
    if (!user || !pet) return false;

    try {
      let statsUpdate = { hunger: 25, happiness: 5 };
      let cost = 5;
      let itemName = 'Basic Food';

      if (foodItemId) {
        // Use item from inventory
        const inventoryItem = inventory.find(item => item.item_id === foodItemId);
        if (!inventoryItem || inventoryItem.quantity <= 0) {
          toast({
            title: "Item not available",
            description: "You don't have this item in your inventory",
            variant: "destructive"
          });
          return false;
        }

        if (inventoryItem.shop_item?.effect) {
          statsUpdate = inventoryItem.shop_item.effect;
        }
        cost = 0;
        itemName = inventoryItem.shop_item?.name || 'Food';

        // Remove item from inventory
        if (inventoryItem.quantity === 1) {
          await supabase
            .from('user_inventory')
            .delete()
            .eq('id', inventoryItem.id);
        } else {
          await supabase
            .from('user_inventory')
            .update({ quantity: inventoryItem.quantity - 1 })
            .eq('id', inventoryItem.id);
        }
      } else {
        // Check if user has enough coins
        if (pet.pi_coins < cost) {
          toast({
            title: "Not enough coins! 💰",
            description: `You need ${cost} coins to buy food.`,
            variant: "destructive"
          });
          return false;
        }
      }

      // Update pet stats
      const newStats = {
        hunger: Math.min(100, pet.hunger + statsUpdate.hunger),
        happiness: Math.min(100, pet.happiness + (statsUpdate.happiness || 0)),
        pi_coins: pet.pi_coins - cost,
        experience: pet.experience + 10
      };

      const { data: updatedPet, error } = await supabase
        .from('user_pet_data')
        .update(newStats)
        .eq('id', pet.id)
        .select()
        .single();

      if (error) throw error;
      setPet(prev => prev ? { ...prev, ...newStats } : null);

      toast({
        title: `Yummy! 🍎`,
        description: `${pet.pet_name} enjoyed the ${itemName}!`,
      });

      return true;
    } catch (err) {
      console.error('Error feeding pet:', err);
      toast({
        title: "Error",
        description: "Failed to feed pet",
        variant: "destructive"
      });
      return false;
    }
  }, [user, pet, inventory]);

  const cleanPet = useCallback(async (cleanItemId?: string) => {
    if (!user || !pet) return false;

    try {
      let statsUpdate = { cleanliness: 30, happiness: 5 };
      let cost = 3;
      let itemName = 'Basic Soap';

      if (cleanItemId) {
        const inventoryItem = inventory.find(item => item.item_id === cleanItemId);
        if (!inventoryItem || inventoryItem.quantity <= 0) {
          toast({
            title: "Item not available",
            description: "You don't have this item in your inventory",
            variant: "destructive"
          });
          return false;
        }

        if (inventoryItem.shop_item?.effect) {
          statsUpdate = inventoryItem.shop_item.effect;
        }
        cost = 0;
        itemName = inventoryItem.shop_item?.name || 'Soap';

        // Remove item from inventory
        if (inventoryItem.quantity === 1) {
          await supabase
            .from('user_inventory')
            .delete()
            .eq('id', inventoryItem.id);
        } else {
          await supabase
            .from('user_inventory')
            .update({ quantity: inventoryItem.quantity - 1 })
            .eq('id', inventoryItem.id);
        }
      } else {
        if (pet.pi_coins < cost) {
          toast({
            title: "Not enough coins! 💰",
            description: `You need ${cost} coins for cleaning supplies.`,
            variant: "destructive"
          });
          return false;
        }
      }

      const newStats = {
        cleanliness: Math.min(100, pet.cleanliness + statsUpdate.cleanliness),
        happiness: Math.min(100, pet.happiness + (statsUpdate.happiness || 0)),
        pi_coins: pet.pi_coins - cost,
        experience: pet.experience + 8
      };

      const { data: updatedPet, error } = await supabase
        .from('user_pet_data')
        .update(newStats)
        .eq('id', pet.id)
        .select()
        .single();

      if (error) throw error;
      setPet(prev => prev ? { ...prev, ...newStats } : null);

      toast({
        title: "So clean! ✨",
        description: `${pet.pet_name} is sparkling clean with ${itemName}!`,
      });

      return true;
    } catch (err) {
      console.error('Error cleaning pet:', err);
      toast({
        title: "Error",
        description: "Failed to clean pet",
        variant: "destructive"
      });
      return false;
    }
  }, [user, pet, inventory]);

  const playWithPet = useCallback(async () => {
    if (!user || !pet) return false;

    try {
      const newStats = {
        happiness: Math.min(100, pet.happiness + 25),
        energy: Math.max(0, pet.energy - 10),
        experience: pet.experience + 15
      };

      const { data: updatedPet, error } = await supabase
        .from('user_pet_data')
        .update(newStats)
        .eq('id', pet.id)
        .select()
        .single();

      if (error) throw error;
      setPet(prev => prev ? { ...prev, ...newStats } : null);

      toast({
        title: "So much fun! 🎮",
        description: `${pet.pet_name} loves playing with you!`,
      });

      return true;
    } catch (err) {
      console.error('Error playing with pet:', err);
      return false;
    }
  }, [user, pet]);

  const restPet = useCallback(async () => {
    if (!user || !pet) return false;

    try {
      const newStats = {
        energy: Math.min(100, pet.energy + 50),
        happiness: Math.min(100, pet.happiness + 10),
        experience: pet.experience + 5
      };

      const { data: updatedPet, error } = await supabase
        .from('user_pet_data')
        .update(newStats)
        .eq('id', pet.id)
        .select()
        .single();

      if (error) throw error;
      setPet(prev => prev ? { ...prev, ...newStats } : null);

      toast({
        title: "Sweet dreams! 😴",
        description: `${pet.pet_name} had a refreshing nap!`,
      });

      return true;
    } catch (err) {
      console.error('Error resting pet:', err);
      return false;
    }
  }, [user, pet]);

  const buyItem = useCallback(async (itemId: string) => {
    if (!user || !pet) return false;

    try {
      const item = shopItems.find(i => i.id === itemId);
      if (!item) return false;

      if (pet.pi_coins < item.price_coins) {
        toast({
          title: "Not enough coins! 💰",
          description: `You need ${item.price_coins} coins to buy ${item.name}.`,
          variant: "destructive"
        });
        return false;
      }

      // Deduct coins
      const { error: petError } = await supabase
        .from('user_pet_data')
        .update({ pi_coins: pet.pi_coins - item.price_coins })
        .eq('id', pet.id);

      if (petError) throw petError;

      // Check if item already exists in inventory
      const existingItem = inventory.find(inv => inv.item_id === itemId);
      
      if (existingItem) {
        // Update quantity
        const { error: updateError } = await supabase
          .from('user_inventory')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Add new item to inventory
        const { error: inventoryError } = await supabase
          .from('user_inventory')
          .insert([{
            user_id: user.id,
            item_id: itemId,
            quantity: 1,
            equipped: false
          }]);

        if (inventoryError) throw inventoryError;
      }

      toast({
        title: "Purchase successful! 🛒",
        description: `You bought ${item.name} for ${item.price_coins} coins!`,
      });

      // Refresh data
      await initializePet();
      return true;
    } catch (err) {
      console.error('Error buying item:', err);
      toast({
        title: "Error",
        description: "Failed to purchase item",
        variant: "destructive"
      });
      return false;
    }
  }, [user, pet, shopItems, inventory, initializePet]);

  // Initialize on mount
  useEffect(() => {
    if (user) {
      initializePet();
    }
  }, [user, initializePet]);

  return {
    pet,
    inventory,
    shopItems,
    loading,
    error,
    feedPet,
    cleanPet,
    playWithPet,
    restPet,
    buyItem,
    refreshData: initializePet
  };
};
