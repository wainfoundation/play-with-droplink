
import { supabase } from '@/integrations/supabase/client';
import { createPiPayment } from '@/utils/pi-payments';
import { showRewardedAdAdvanced } from '@/utils/pi-ads';
import { toast } from '@/hooks/use-toast';

export interface GamePurchase {
  id: string;
  user_id: string;
  game_id: string;
  purchase_method: 'payment' | 'ad_reward' | 'subscription';
  pi_amount?: number;
  created_at: string;
}

export class GameService {
  // Fetch user's unlocked games
  static async fetchUnlockedGames(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('purchased_games')
        .select('game_id')
        .eq('user_id', userId);

      if (error) throw error;
      return data?.map(item => item.game_id) || [];
    } catch (error) {
      console.error('Error fetching unlocked games:', error);
      return [];
    }
  }

  // Purchase game with Pi
  static async purchaseGameWithPi(gameId: string, gameName: string, price: number, userId: string): Promise<boolean> {
    try {
      const paymentData = {
        amount: price,
        memo: `Unlock ${gameName}`,
        metadata: { gameId, userId, type: 'game_purchase' }
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log('Payment ready for approval:', paymentId);
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          // Record the purchase in database
          const { error } = await supabase
            .from('purchased_games')
            .insert({
              user_id: userId,
              game_id: gameId,
              payment_id: paymentId
            });

          if (error) {
            console.error('Error recording purchase:', error);
            throw error;
          }

          toast({
            title: "Purchase Successful!",
            description: `${gameName} has been unlocked!`,
          });
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId);
          toast({
            title: "Payment Cancelled",
            description: "Your purchase was cancelled.",
            variant: "destructive",
          });
        },
        onError: (error: Error) => {
          console.error('Payment error:', error);
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment.",
            variant: "destructive",
          });
        }
      };

      await createPiPayment(paymentData, callbacks);
      return true;
    } catch (error) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase Failed",
        description: "Unable to process your purchase. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }

  // Unlock game with rewarded ad
  static async unlockGameWithAd(gameId: string, gameName: string, userId: string): Promise<boolean> {
    try {
      const adResult = await showRewardedAdAdvanced();
      
      if (adResult.result === 'AD_REWARDED') {
        // Record the ad-based unlock
        const { error } = await supabase
          .from('purchased_games')
          .insert({
            user_id: userId,
            game_id: gameId
          });

        if (error) throw error;

        toast({
          title: "Game Unlocked!",
          description: `${gameName} has been unlocked with ad reward!`,
        });
        
        return true;
      } else {
        toast({
          title: "Ad Not Completed",
          description: "Please watch the full ad to unlock the game.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Ad unlock failed:', error);
      toast({
        title: "Unlock Failed",
        description: "Unable to unlock with ad. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }

  // Check if user can access game
  static canAccessGame(game: any, isPremium: boolean, unlockedGames: string[]): boolean {
    // Premium users can access all games
    if (isPremium) return true;
    
    // Free games are accessible to everyone
    if (game.is_free) return true;
    
    // Check if game is individually purchased
    return unlockedGames.includes(game.id);
  }

  // Get access method for a game
  static getAccessMethod(game: any, isPremium: boolean, unlockedGames: string[], isLoggedIn: boolean): string {
    if (this.canAccessGame(game, isPremium, unlockedGames)) {
      return 'play';
    }
    
    if (!isLoggedIn) {
      return 'login_required';
    }
    
    if (isPremium) {
      return 'play';
    }
    
    return 'purchase_required';
  }
}
