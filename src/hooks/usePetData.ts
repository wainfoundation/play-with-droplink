
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface PetStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
}

interface UserPetData {
  id: string;
  user_id: string;
  pet_name: string;
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
  pi_coins: number;
  level: number;
  experience: number;
  experience_to_next: number;
  current_mood: string;
  last_played: string;
  created_at: string;
  updated_at: string;
}

interface PetAction {
  action_type: string;
  pi_coins_spent: number;
  experience_gained: number;
}

export const usePetData = () => {
  const [petData, setPetData] = useState<UserPetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load user's pet data
  const loadPetData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_pet_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No pet data exists, create initial data
        const initialData = {
          user_id: user.id,
          pet_name: 'My Droplet',
          happiness: 80,
          hunger: 60,
          cleanliness: 70,
          energy: 85,
          pi_coins: 100,
          level: 1,
          experience: 0,
          experience_to_next: 100,
          current_mood: 'happy'
        };

        const { data: newData, error: insertError } = await supabase
          .from('user_pet_data')
          .insert([initialData])
          .select()
          .single();

        if (insertError) throw insertError;
        setPetData(newData);
      } else if (error) {
        throw error;
      } else {
        setPetData(data);
      }
    } catch (err) {
      console.error('Error loading pet data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load pet data');
    } finally {
      setLoading(false);
    }
  };

  // Update pet stats
  const updatePetStats = async (updates: Partial<UserPetData>) => {
    if (!user || !petData) return;

    try {
      const { data, error } = await supabase
        .from('user_pet_data')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setPetData(data);
      return data;
    } catch (err) {
      console.error('Error updating pet stats:', err);
      toast({
        title: "Error",
        description: "Failed to update pet data",
        variant: "destructive"
      });
    }
  };

  // Record pet action for analytics
  const recordPetAction = async (action: PetAction) => {
    if (!user) return;

    try {
      await supabase
        .from('pet_actions')
        .insert([{
          user_id: user.id,
          ...action
        }]);
    } catch (err) {
      console.error('Error recording pet action:', err);
    }
  };

  // Calculate mood based on stats
  const calculateMood = (stats: PetStats): string => {
    const { happiness, hunger, cleanliness, energy } = stats;
    
    if (hunger < 30) return 'hungry';
    if (cleanliness < 30) return 'dirty';
    if (energy < 30) return 'sleepy';
    if (happiness < 40) return 'sad';
    if (happiness > 80) return 'excited';
    return 'happy';
  };

  // Pet care actions
  const feedPet = async () => {
    if (!petData || petData.pi_coins < 5) {
      toast({
        title: "Not enough Pi coins! 💰",
        description: "You need 5π to buy food.",
        variant: "destructive"
      });
      return false;
    }

    const newStats = {
      hunger: Math.min(100, petData.hunger + 30),
      happiness: Math.min(100, petData.happiness + 10),
      pi_coins: petData.pi_coins - 5,
      experience: petData.experience + 10
    };

    const mood = calculateMood({
      happiness: newStats.happiness,
      hunger: newStats.hunger,
      cleanliness: petData.cleanliness,
      energy: petData.energy
    });

    await updatePetStats({ ...newStats, current_mood: mood });
    await recordPetAction({
      action_type: 'feed',
      pi_coins_spent: 5,
      experience_gained: 10
    });

    toast({
      title: "Yummy! 🍎",
      description: `${petData.pet_name} loved the food!`,
    });

    return true;
  };

  const cleanPet = async () => {
    if (!petData || petData.pi_coins < 3) {
      toast({
        title: "Not enough Pi coins! 💰",
        description: "You need 3π for cleaning supplies.",
        variant: "destructive"
      });
      return false;
    }

    const newStats = {
      cleanliness: Math.min(100, petData.cleanliness + 40),
      happiness: Math.min(100, petData.happiness + 15),
      pi_coins: petData.pi_coins - 3,
      experience: petData.experience + 8
    };

    const mood = calculateMood({
      happiness: newStats.happiness,
      hunger: petData.hunger,
      cleanliness: newStats.cleanliness,
      energy: petData.energy
    });

    await updatePetStats({ ...newStats, current_mood: mood });
    await recordPetAction({
      action_type: 'clean',
      pi_coins_spent: 3,
      experience_gained: 8
    });

    toast({
      title: "So clean! ✨",
      description: `${petData.pet_name} is sparkling clean!`,
    });

    return true;
  };

  const putPetToSleep = async () => {
    if (!petData) return false;

    const newStats = {
      energy: Math.min(100, petData.energy + 50),
      happiness: Math.min(100, petData.happiness + 10),
      experience: petData.experience + 5
    };

    const mood = calculateMood({
      happiness: newStats.happiness,
      hunger: petData.hunger,
      cleanliness: petData.cleanliness,
      energy: newStats.energy
    });

    await updatePetStats({ ...newStats, current_mood: mood });
    await recordPetAction({
      action_type: 'sleep',
      pi_coins_spent: 0,
      experience_gained: 5
    });

    toast({
      title: "Sweet dreams! 😴",
      description: `${petData.pet_name} had a refreshing nap!`,
    });

    return true;
  };

  const playWithPet = async () => {
    if (!petData) return false;

    const newStats = {
      happiness: Math.min(100, petData.happiness + 25),
      energy: Math.max(0, petData.energy - 10),
      experience: petData.experience + 15
    };

    const mood = calculateMood({
      happiness: newStats.happiness,
      hunger: petData.hunger,
      cleanliness: petData.cleanliness,
      energy: newStats.energy
    });

    await updatePetStats({ ...newStats, current_mood: mood });
    await recordPetAction({
      action_type: 'play',
      pi_coins_spent: 0,
      experience_gained: 15
    });

    toast({
      title: "So much fun! 🎮",
      description: `${petData.pet_name} loves playing with you!`,
    });

    return true;
  };

  useEffect(() => {
    loadPetData();
  }, [user]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!petData || !user) return;

    const interval = setInterval(async () => {
      await supabase
        .from('user_pet_data')
        .update({ last_played: new Date().toISOString() })
        .eq('user_id', user.id);
    }, 30000);

    return () => clearInterval(interval);
  }, [petData, user]);

  return {
    petData,
    loading,
    error,
    updatePetStats,
    feedPet,
    cleanPet,
    putPetToSleep,
    playWithPet,
    recordPetAction,
    refreshPetData: loadPetData
  };
};
