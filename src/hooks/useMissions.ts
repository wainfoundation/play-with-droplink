
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';

export interface Mission {
  id: string;
  title: string;
  description: string;
  mission_type: string;
  current_progress: number;
  target_count: number;
  is_completed: boolean;
  reward_claimed: boolean;
  reward_coins: number;
  reward_xp: number;
  difficulty: string;
}

export const useMissions = () => {
  const { user } = useUser();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's daily missions
  const loadMissions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // First generate missions for today if none exist
      await supabase.rpc('generate_daily_missions', { p_user_id: user.id });
      
      // Then fetch user's missions
      const { data, error } = await supabase
        .from('user_missions')
        .select(`
          id,
          current_progress,
          target_count,
          is_completed,
          reward_claimed,
          missions (
            title,
            description,
            mission_type,
            reward_coins,
            reward_xp,
            difficulty
          )
        `)
        .eq('user_id', user.id)
        .eq('assigned_date', new Date().toISOString().split('T')[0]);

      if (error) throw error;

      const formattedMissions = data.map(item => ({
        id: item.id,
        title: item.missions.title,
        description: item.missions.description,
        mission_type: item.missions.mission_type,
        current_progress: item.current_progress,
        target_count: item.target_count,
        is_completed: item.is_completed,
        reward_claimed: item.reward_claimed,
        reward_coins: item.missions.reward_coins,
        reward_xp: item.missions.reward_xp,
        difficulty: item.missions.difficulty
      }));

      setMissions(formattedMissions);
    } catch (error) {
      console.error('Error loading missions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update mission progress
  const updateProgress = async (missionType: string, increment: number = 1) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('update_mission_progress', {
        p_user_id: user.id,
        p_mission_type: missionType,
        p_increment: increment
      });

      if (error) throw error;

      if (data.updated_missions && data.updated_missions.length > 0) {
        // Refresh missions to show updated progress
        await loadMissions();
        
        // Show completion notifications
        data.updated_missions.forEach((mission: any) => {
          if (mission.completed) {
            toast({
              title: "🎉 Mission Complete!",
              description: `${mission.title} - Earn ${mission.reward_coins} coins!`,
              className: "bg-green-50 border-green-200"
            });
          }
        });
      }
    } catch (error) {
      console.error('Error updating mission progress:', error);
    }
  };

  // Claim mission reward
  const claimReward = async (missionId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('claim_mission_reward', {
        p_user_id: user.id,
        p_mission_id: missionId
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "🎁 Reward Claimed!",
          description: `+${data.coins_earned} coins, +${data.xp_earned} XP`,
          className: "bg-yellow-50 border-yellow-200"
        });
        
        // Refresh missions to show claimed status
        await loadMissions();
        return true;
      } else {
        toast({
          title: "Cannot claim reward",
          description: data.error,
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: "Error",
        description: "Failed to claim reward",
        variant: "destructive"
      });
      return false;
    }
  };

  // Load missions on mount and when user changes
  useEffect(() => {
    if (user) {
      loadMissions();
    }
  }, [user]);

  return {
    missions,
    loading,
    updateProgress,
    claimReward,
    refreshMissions: loadMissions
  };
};
