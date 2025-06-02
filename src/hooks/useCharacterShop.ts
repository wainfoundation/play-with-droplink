
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Character {
  id: string;
  name: string;
  base_price_coins: number;
  skin_image_url?: string;
  description: string;
  color: string;
  gender: string;
  is_starter: boolean;
}

export interface UserWallet {
  droplet_coins: number;
  pi_balance: number;
  last_coin_claim: string;
  total_earned: number;
}

export const useCharacterShop = () => {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [ownedCharacters, setOwnedCharacters] = useState<string[]>([]);
  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load all characters
  const loadCharacters = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('is_starter', { ascending: false })
        .order('base_price_coins');
      
      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  }, []);

  // Load user's owned characters
  const loadOwnedCharacters = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_owned_characters')
        .select('character_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setOwnedCharacters(data?.map(item => item.character_id) || []);
    } catch (error) {
      console.error('Error loading owned characters:', error);
    }
  }, [user]);

  // Load user wallet
  const loadWallet = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_wallet')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code === 'PGRST116') {
        // Create wallet if it doesn't exist
        const { data: newWallet, error: createError } = await supabase
          .from('user_wallet')
          .insert([{ user_id: user.id, droplet_coins: 50 }])
          .select()
          .single();
        
        if (createError) throw createError;
        setWallet(newWallet);
      } else if (error) {
        throw error;
      } else {
        setWallet(data);
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    }
  }, [user]);

  // Load selected character
  const loadSelectedCharacter = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('selected_character_id')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setSelectedCharacterId(data?.selected_character_id || null);
    } catch (error) {
      console.error('Error loading selected character:', error);
    }
  }, [user]);

  // Buy character
  const buyCharacter = useCallback(async (characterId: string, price: number) => {
    if (!user || !wallet) return false;
    
    if (wallet.droplet_coins < price) {
      toast({
        title: "Not enough coins",
        description: "You need more Droplet Coins to buy this character",
        variant: "destructive"
      });
      return false;
    }

    try {
      await supabase.rpc('buy_character', {
        p_user_id: user.id,
        p_character_id: characterId,
        p_price: price
      });

      // Refresh data
      await loadWallet();
      await loadOwnedCharacters();
      await loadSelectedCharacter();

      toast({
        title: "Character purchased!",
        description: "Your new character has been added to your collection",
        className: "bg-green-50 border-green-200"
      });

      return true;
    } catch (error) {
      console.error('Error buying character:', error);
      toast({
        title: "Purchase failed",
        description: "There was an error purchasing the character",
        variant: "destructive"
      });
      return false;
    }
  }, [user, wallet, loadWallet, loadOwnedCharacters, loadSelectedCharacter]);

  // Select character
  const selectCharacter = useCallback(async (characterId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ selected_character_id: characterId })
        .eq('id', user.id);

      if (error) throw error;
      
      setSelectedCharacterId(characterId);
      toast({
        title: "Character selected!",
        description: "Your active character has been changed",
        className: "bg-green-50 border-green-200"
      });

      return true;
    } catch (error) {
      console.error('Error selecting character:', error);
      toast({
        title: "Selection failed",
        description: "There was an error selecting the character",
        variant: "destructive"
      });
      return false;
    }
  }, [user]);

  // Add coins (for Pi purchases/ads)
  const addCoins = useCallback(async (amount: number) => {
    if (!user) return false;

    try {
      await supabase.rpc('add_droplet_coins', {
        p_user_id: user.id,
        p_coins_to_add: amount
      });

      await loadWallet();
      return true;
    } catch (error) {
      console.error('Error adding coins:', error);
      return false;
    }
  }, [user, loadWallet]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        loadCharacters(),
        loadOwnedCharacters(),
        loadWallet(),
        loadSelectedCharacter()
      ]);
      setLoading(false);
    };

    if (user) {
      initializeData();
    } else {
      loadCharacters();
      setLoading(false);
    }
  }, [user, loadCharacters, loadOwnedCharacters, loadWallet, loadSelectedCharacter]);

  return {
    characters,
    ownedCharacters,
    wallet,
    selectedCharacterId,
    loading,
    buyCharacter,
    selectCharacter,
    addCoins,
    refreshData: () => Promise.all([loadWallet(), loadOwnedCharacters()])
  };
};
