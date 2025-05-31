
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface Battle {
  id: string;
  player1_id: string;
  player2_id: string | null;
  game_type: string;
  status: string;
  winner_id: string | null;
  player1_score: number;
  player2_score: number;
  room_code: string | null;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

export const useBattles = () => {
  const { user } = useUser();
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchBattles();
      setupRealtimeSubscription();
    } else {
      setBattles([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBattles = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('battles')
        .select('*')
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBattles(data || []);
    } catch (err) {
      console.error('Error fetching battles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch battles');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('battles')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'battles' 
        }, 
        (payload) => {
          console.log('Battle update:', payload);
          fetchBattles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const createBattle = async (gameType: string) => {
    if (!user?.id) throw new Error('User not logged in');

    try {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { data, error } = await supabase
        .from('battles')
        .insert([{
          player1_id: user.id,
          game_type: gameType,
          status: 'waiting',
          room_code: roomCode
        }])
        .select()
        .single();

      if (error) throw error;

      setBattles(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating battle:', err);
      throw err;
    }
  };

  const joinBattle = async (roomCode: string) => {
    if (!user?.id) throw new Error('User not logged in');

    try {
      const { data: existingBattle, error: fetchError } = await supabase
        .from('battles')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (fetchError) throw new Error('Battle not found');

      if (existingBattle.player1_id === user.id) {
        throw new Error('Cannot join your own battle');
      }

      const { error: updateError } = await supabase
        .from('battles')
        .update({
          player2_id: user.id,
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('id', existingBattle.id);

      if (updateError) throw updateError;

      const updatedBattle = { ...existingBattle, player2_id: user.id, status: 'active' };
      return updatedBattle;
    } catch (err) {
      console.error('Error joining battle:', err);
      throw err;
    }
  };

  const updateBattleScore = async (battleId: string, playerScore: number, isPlayer1: boolean) => {
    try {
      const updates = isPlayer1 
        ? { player1_score: playerScore }
        : { player2_score: playerScore };

      const { error } = await supabase
        .from('battles')
        .update(updates)
        .eq('id', battleId);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating battle score:', err);
      throw err;
    }
  };

  const completeBattle = async (battleId: string, winnerId: string) => {
    try {
      const { error } = await supabase
        .from('battles')
        .update({
          status: 'completed',
          winner_id: winnerId,
          completed_at: new Date().toISOString()
        })
        .eq('id', battleId);

      if (error) throw error;
    } catch (err) {
      console.error('Error completing battle:', err);
      throw err;
    }
  };

  return {
    battles,
    loading,
    error,
    createBattle,
    joinBattle,
    updateBattleScore,
    completeBattle,
    refetch: fetchBattles
  };
};
