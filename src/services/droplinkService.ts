
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Droplink {
  id: string;
  user_id: string;
  type: 'invite' | 'level' | 'challenge';
  game_id?: string;
  level?: number;
  score?: number;
  link: string;
  created_at: string;
}

export class DroplinkService {
  // Generate a unique droplink
  static async createDroplink(type: 'invite' | 'level' | 'challenge', data: {
    userId: string;
    gameId?: string;
    level?: number;
    score?: number;
  }): Promise<string | null> {
    try {
      const uniqueId = Math.random().toString(36).substring(2, 10);
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/droplink/${uniqueId}`;

      const { error } = await supabase
        .from('droplinks')
        .insert({
          user_id: data.userId,
          type,
          game_id: data.gameId,
          level: data.level,
          score: data.score,
          link,
          unique_id: uniqueId
        });

      if (error) throw error;

      // Copy to clipboard
      await navigator.clipboard.writeText(link);
      
      toast({
        title: "Droplink Created! 🚀",
        description: "Link copied to clipboard. Share with friends!",
      });

      return link;
    } catch (error) {
      console.error('Error creating droplink:', error);
      toast({
        title: "Failed to create droplink",
        description: "Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }

  // Handle droplink redemption
  static async redeemDroplink(uniqueId: string): Promise<{
    type: string;
    gameId?: string;
    level?: number;
    score?: number;
    success: boolean;
  } | null> {
    try {
      const { data, error } = await supabase
        .from('droplinks')
        .select('*')
        .eq('unique_id', uniqueId)
        .single();

      if (error || !data) {
        throw new Error('Invalid droplink');
      }

      // Reward the original user if it's an invite
      if (data.type === 'invite') {
        await this.rewardInviter(data.user_id);
      }

      return {
        type: data.type,
        gameId: data.game_id,
        level: data.level,
        score: data.score,
        success: true
      };
    } catch (error) {
      console.error('Error redeeming droplink:', error);
      return null;
    }
  }

  // Reward the user who created an invite droplink
  private static async rewardInviter(userId: string): Promise<void> {
    try {
      // Add a life to the inviter's account
      const { error } = await supabase.rpc('add_user_life', { 
        user_id: userId as any 
      });
      if (error) throw error;

      toast({
        title: "Friend Joined! 🎉",
        description: "You earned a bonus life for inviting a friend!",
      });
    } catch (error) {
      console.error('Error rewarding inviter:', error);
    }
  }
}
