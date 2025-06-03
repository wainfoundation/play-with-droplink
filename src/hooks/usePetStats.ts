
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';

interface PetStats {
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

export const usePetStats = () => {
  const [petStats, setPetStats] = useState<PetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthSystem();

  useEffect(() => {
    if (user) {
      loadPetStats();
      // Set up real-time updates
      const subscription = supabase
        .channel('pet_stats_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'pet_stats',
          filter: `user_id=eq.${user.id}`
        }, (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setPetStats(payload.new as PetStats);
          }
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const loadPetStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pet_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPetStats(data);
      } else {
        // Create initial pet stats
        const { data: newStats, error: createError } = await supabase
          .from('pet_stats')
          .insert({
            user_id: user.id,
            character_id: 'droplet-blue',
            hunger: 60,
            energy: 85,
            cleanliness: 70,
            happiness: 80,
            health: 90,
            mood: 'happy'
          })
          .select()
          .single();

        if (createError) throw createError;
        setPetStats(newStats);
      }
    } catch (error) {
      console.error('Error loading pet stats:', error);
      toast({
        title: "Error",
        description: "Failed to load pet stats",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStat = async (statName: keyof Pick<PetStats, 'hunger' | 'energy' | 'cleanliness' | 'happiness' | 'health'>, value: number) => {
    if (!petStats || !user) return;

    const newValue = Math.min(100, Math.max(0, petStats[statName] + value));
    
    try {
      const { error } = await supabase
        .from('pet_stats')
        .update({ 
          [statName]: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state immediately
      setPetStats(prev => prev ? {
        ...prev,
        [statName]: newValue,
        updated_at: new Date().toISOString()
      } : null);

      toast({
        title: "Pet Care",
        description: `${statName.charAt(0).toUpperCase() + statName.slice(1)} ${value > 0 ? 'increased' : 'decreased'} by ${Math.abs(value)}!`,
        className: "bg-green-50 border-green-200"
      });
    } catch (error) {
      console.error('Error updating pet stat:', error);
      toast({
        title: "Error",
        description: "Failed to update pet stats",
        variant: "destructive"
      });
    }
  };

  const updateMood = async (mood: string) => {
    if (!petStats || !user) return;

    try {
      const { error } = await supabase
        .from('pet_stats')
        .update({ 
          mood,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setPetStats(prev => prev ? {
        ...prev,
        mood,
        updated_at: new Date().toISOString()
      } : null);
    } catch (error) {
      console.error('Error updating pet mood:', error);
    }
  };

  return {
    petStats,
    loading,
    updateStat,
    updateMood,
    refreshStats: loadPetStats
  };
};
