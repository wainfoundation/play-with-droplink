
import { toast } from '@/hooks/use-toast';
import { showRewardedAdAdvanced, showInterstitialAdAdvanced } from '@/utils/pi-sdk';

export interface GameReward {
  type: 'pi_coins' | 'lives' | 'boosts' | 'hints';
  amount: number;
  description: string;
}

export class GameRewardService {
  private static instance: GameRewardService;
  
  static getInstance(): GameRewardService {
    if (!GameRewardService.instance) {
      GameRewardService.instance = new GameRewardService();
    }
    return GameRewardService.instance;
  }

  // Watch rewarded ad for game rewards
  async watchRewardedAd(reward: GameReward): Promise<GameReward | null> {
    try {
      const result = await showRewardedAdAdvanced();
      
      if (result.success) {
        toast({
          title: "Reward Earned!",
          description: `You earned ${reward.amount} ${reward.type.replace('_', ' ')}!`,
        });
        return reward;
      } else {
        toast({
          title: "Ad Failed",
          description: "Unable to show ad. Please try again later.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      toast({
        title: "Ad Error",
        description: "There was an error showing the ad.",
        variant: "destructive"
      });
      return null;
    }
  }

  // Show interstitial ad between game levels
  async showLevelCompleteAd(): Promise<boolean> {
    try {
      return await showInterstitialAdAdvanced();
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  }

  // Calculate game completion rewards
  calculateGameRewards(score: number, level: number, timeSpent: number): GameReward[] {
    const rewards: GameReward[] = [];
    
    // Base Pi coin reward based on score
    const piCoins = Math.floor(score / 1000);
    if (piCoins > 0) {
      rewards.push({
        type: 'pi_coins',
        amount: piCoins,
        description: `Score milestone reached`
      });
    }

    // Level completion bonus
    if (level > 0 && level % 5 === 0) {
      rewards.push({
        type: 'pi_coins',
        amount: level / 5,
        description: `Level ${level} completion bonus`
      });
    }

    // Time-based endurance reward
    const enduranceMinutes = Math.floor(timeSpent / 60000); // Convert ms to minutes
    if (enduranceMinutes >= 10) {
      rewards.push({
        type: 'pi_coins',
        amount: Math.floor(enduranceMinutes / 10),
        description: `Endurance bonus for ${enduranceMinutes} minutes`
      });
    }

    return rewards;
  }

  // Daily login rewards
  getDailyReward(): GameReward | null {
    const lastLogin = localStorage.getItem('last-daily-reward');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      localStorage.setItem('last-daily-reward', today);
      return {
        type: 'pi_coins',
        amount: 1,
        description: 'Daily login bonus'
      };
    }
    
    return null;
  }

  // Achievement-based rewards
  getAchievementReward(achievementType: string): GameReward | null {
    const rewardMap: Record<string, GameReward> = {
      'first_game': {
        type: 'pi_coins',
        amount: 5,
        description: 'Welcome bonus for your first game!'
      },
      'score_1000': {
        type: 'lives',
        amount: 3,
        description: 'Reached 1000 points!'
      },
      'level_10': {
        type: 'boosts',
        amount: 5,
        description: 'Reached level 10!'
      },
      'endurance_30min': {
        type: 'pi_coins',
        amount: 10,
        description: 'Played for 30 minutes straight!'
      }
    };

    return rewardMap[achievementType] || null;
  }

  // Power-up pricing in Pi coins
  getPowerUpPrice(powerUpType: string): number {
    const priceMap: Record<string, number> = {
      'extra_life': 1,
      'hint': 0.5,
      'boost': 0.3,
      'time_freeze': 1.5,
      'double_score': 2,
      'shield': 1
    };

    return priceMap[powerUpType] || 1;
  }
}

// Export singleton instance
export const gameRewardService = GameRewardService.getInstance();

// Export convenience functions
export const watchAdForReward = (reward: GameReward) => gameRewardService.watchRewardedAd(reward);
export const showGameAd = () => gameRewardService.showLevelCompleteAd();
export const calculateRewards = (score: number, level: number, time: number) => 
  gameRewardService.calculateGameRewards(score, level, time);

export default gameRewardService;
