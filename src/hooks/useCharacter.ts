
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { CharacterCustomization, CharacterStats } from '@/components/character/types';
import { useToast } from '@/components/ui/use-toast';

export const useCharacter = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const [character, setCharacter] = useState<CharacterCustomization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load character from database
  const loadCharacter = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_characters')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const characterData: CharacterCustomization = {
          id: data.id,
          name: data.name,
          color: data.color,
          background: data.background,
          accessories: Array.isArray(data.accessories) ? data.accessories as string[] : [],
          stats: (data.stats as CharacterStats) || { happiness: 80, hunger: 60, cleanliness: 70, energy: 85 },
          tutorial_completed: data.tutorial_completed || false,
          unlocked_rooms: Array.isArray(data.unlocked_rooms) ? data.unlocked_rooms as string[] : ['bedroom'],
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setCharacter(characterData);
      }
    } catch (error) {
      console.error('Error loading character:', error);
      setError('Failed to load character');
    } finally {
      setLoading(false);
    }
  };

  // Save character to database
  const saveCharacter = async (characterData: Partial<CharacterCustomization>) => {
    if (!user?.id) return false;

    try {
      const updateData = {
        user_id: user.id,
        name: characterData.name,
        color: characterData.color,
        background: characterData.background,
        accessories: characterData.accessories || [],
        stats: characterData.stats || { happiness: 80, hunger: 60, cleanliness: 70, energy: 85 },
        tutorial_completed: characterData.tutorial_completed,
        unlocked_rooms: characterData.unlocked_rooms || ['bedroom'],
        updated_at: new Date().toISOString()
      };

      if (character) {
        // Update existing character
        const { error } = await supabase
          .from('user_characters')
          .update(updateData)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new character
        const { data, error } = await supabase
          .from('user_characters')
          .insert({
            ...updateData,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        const newCharacter: CharacterCustomization = {
          id: data.id,
          name: data.name,
          color: data.color,
          background: data.background,
          accessories: Array.isArray(data.accessories) ? data.accessories as string[] : [],
          stats: (data.stats as CharacterStats) || { happiness: 80, hunger: 60, cleanliness: 70, energy: 85 },
          tutorial_completed: data.tutorial_completed || false,
          unlocked_rooms: Array.isArray(data.unlocked_rooms) ? data.unlocked_rooms as string[] : ['bedroom'],
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setCharacter(newCharacter);
        return true;
      }

      // Reload character after save
      await loadCharacter();
      return true;
    } catch (error) {
      console.error('Error saving character:', error);
      toast({
        title: "Error",
        description: "Failed to save character data.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Update character stats
  const updateStats = async (newStats: CharacterStats) => {
    if (!character) return false;

    const updatedCharacter = {
      ...character,
      stats: newStats
    };

    setCharacter(updatedCharacter);
    return await saveCharacter(updatedCharacter);
  };

  // Complete tutorial
  const completeTutorial = async () => {
    if (!character) return false;

    const updatedCharacter = {
      ...character,
      tutorial_completed: true,
      unlocked_rooms: ['bedroom', 'kitchen', 'bathroom']
    };

    setCharacter(updatedCharacter);
    return await saveCharacter(updatedCharacter);
  };

  // Unlock room
  const unlockRoom = async (room: string) => {
    if (!character) return false;

    const updatedRooms = [...character.unlocked_rooms];
    if (!updatedRooms.includes(room)) {
      updatedRooms.push(room);
    }

    const updatedCharacter = {
      ...character,
      unlocked_rooms: updatedRooms
    };

    setCharacter(updatedCharacter);
    return await saveCharacter(updatedCharacter);
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadCharacter();
    } else {
      setCharacter(null);
      setLoading(false);
    }
  }, [user?.id, isLoggedIn]);

  return {
    character,
    loading,
    error,
    saveCharacter,
    updateStats,
    completeTutorial,
    unlockRoom,
    refetch: loadCharacter
  };
};
