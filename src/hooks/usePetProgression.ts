
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useMissionProgress } from './useMissionProgress';

export type EvolutionStage = 'baby' | 'teen' | 'adult' | 'elder';

interface PetProgression {
  level: number;
  xp: number;
  xpToNext: number;
  evolutionStage: EvolutionStage;
  unlockedFeatures: string[];
  dailyCoinBonus: number;
}

interface LevelReward {
  level: number;
  requiredXP: number;
  dailyCoinBonus: number;
  unlocks: string[];
  evolutionStage?: EvolutionStage;
}

const LEVEL_REWARDS: LevelReward[] = [
  { level: 0, requiredXP: 0, dailyCoinBonus: 1, unlocks: ['Base stats', 'Free starter items'] },
  { level: 1, requiredXP: 50, dailyCoinBonus: 2, unlocks: ['+1 Item Slot', 'Minor mood stability'] },
  { level: 2, requiredXP: 100, dailyCoinBonus: 3, unlocks: ['Food Booster'] },
  { level: 3, requiredXP: 200, dailyCoinBonus: 4, unlocks: ['Bedroom Skin 1'] },
  { level: 4, requiredXP: 350, dailyCoinBonus: 5, unlocks: ['Bath Turbo Soap'] },
  { level: 5, requiredXP: 500, dailyCoinBonus: 6, unlocks: ['Pet skin upgrade 1', '+2 Energy Recovery'] },
  { level: 6, requiredXP: 700, dailyCoinBonus: 7, unlocks: ['XP boost +5%'] },
  { level: 7, requiredXP: 1000, dailyCoinBonus: 8, unlocks: ['Nature Room'] },
  { level: 8, requiredXP: 1500, dailyCoinBonus: 9, unlocks: ['Mini-game: Jump & Catch'] },
  { level: 9, requiredXP: 2100, dailyCoinBonus: 10, unlocks: ['Lucky Box'] },
  { level: 10, requiredXP: 3000, dailyCoinBonus: 12, unlocks: ['Evolution: Teen Droplet'], evolutionStage: 'teen' },
  { level: 25, requiredXP: 15000, dailyCoinBonus: 20, unlocks: ['Evolution: Adult Droplet', 'Better stats'], evolutionStage: 'adult' },
  { level: 50, requiredXP: 50000, dailyCoinBonus: 30, unlocks: ['Evolution: Elder Droplet', 'Special Badge'], evolutionStage: 'elder' }
];

const XP_REWARDS = {
  feeding: 5,
  bathing: 5,
  sleeping: 4,
  playing: 6,
  healing: 5,
  petting: 2,
  watchingAd: 3,
  dailyTask: 10,
  weeklyMission: 50,
  premiumPurchase: 20,
  seasonalEvent: 100
};

export const usePetProgression = () => {
  const missionProgress = useMissionProgress();
  const [progression, setProgression] = useState<PetProgression>({
    level: 1,
    xp: 0,
    xpToNext: 50,
    evolutionStage: 'baby',
    unlockedFeatures: ['Base stats', 'Free starter items'],
    dailyCoinBonus: 1
  });

  // Load progression from localStorage
  useEffect(() => {
    const savedProgression = localStorage.getItem('petProgression');
    if (savedProgression) {
      try {
        const parsed = JSON.parse(savedProgression);
        setProgression(parsed);
      } catch (error) {
        console.log('Error loading progression, using defaults');
      }
    }
  }, []);

  // Save progression to localStorage
  useEffect(() => {
    localStorage.setItem('petProgression', JSON.stringify(progression));
  }, [progression]);

  const calculateXPThreshold = useCallback((level: number): number => {
    const reward = LEVEL_REWARDS.find(r => r.level === level);
    return reward?.requiredXP || Math.floor(50 * Math.pow(1.5, level - 1));
  }, []);

  const getEvolutionStage = useCallback((level: number): EvolutionStage => {
    if (level >= 50) return 'elder';
    if (level >= 25) return 'adult';
    if (level >= 10) return 'teen';
    return 'baby';
  }, []);

  const addXP = useCallback((amount: number, activity: string) => {
    setProgression(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let leveledUp = false;
      const newUnlockedFeatures = [...prev.unlockedFeatures];

      // Check for level ups
      while (true) {
        const xpNeeded = calculateXPThreshold(newLevel + 1);
        if (newXP >= xpNeeded) {
          newXP -= xpNeeded;
          newLevel += 1;
          leveledUp = true;

          // Add unlocked features for this level
          const levelReward = LEVEL_REWARDS.find(r => r.level === newLevel);
          if (levelReward) {
            newUnlockedFeatures.push(...levelReward.unlocks);
          }
        } else {
          break;
        }
      }

      const newEvolutionStage = getEvolutionStage(newLevel);
      const xpToNext = calculateXPThreshold(newLevel + 1) - newXP;
      const dailyCoinBonus = 1 + Math.floor(newLevel / 1.5);

      // Show notifications
      if (leveledUp) {
        const oldStage = prev.evolutionStage;
        const evolved = newEvolutionStage !== oldStage;
        
        toast({
          title: evolved ? "🎉 Evolution!" : "🌟 Level Up!",
          description: evolved 
            ? `Your droplet evolved to ${newEvolutionStage} stage! Level ${newLevel}`
            : `Congratulations! You reached level ${newLevel}`,
          className: "bg-yellow-50 border-yellow-200"
        });
      }

      return {
        level: newLevel,
        xp: newXP,
        xpToNext,
        evolutionStage: newEvolutionStage,
        unlockedFeatures: [...new Set(newUnlockedFeatures)],
        dailyCoinBonus
      };
    });

    return `Gained ${amount} XP from ${activity}!`;
  }, [calculateXPThreshold, getEvolutionStage]);

  // Pet care activities with mission tracking
  const petCareActivities = {
    feed: () => {
      missionProgress.trackFeedAction();
      return addXP(XP_REWARDS.feeding, 'feeding');
    },
    bathe: () => {
      missionProgress.trackCleanAction();
      return addXP(XP_REWARDS.bathing, 'bathing');
    },
    sleep: () => {
      missionProgress.trackSleepAction();
      return addXP(XP_REWARDS.sleeping, 'sleeping');
    },
    play: () => {
      missionProgress.trackPlayAction();
      return addXP(XP_REWARDS.playing, 'playing');
    },
    heal: () => addXP(XP_REWARDS.healing, 'healing'),
    pet: () => addXP(XP_REWARDS.petting, 'petting'),
    watchAd: () => addXP(XP_REWARDS.watchingAd, 'watching ad'),
    dailyTask: () => addXP(XP_REWARDS.dailyTask, 'daily task'),
    weeklyMission: () => addXP(XP_REWARDS.weeklyMission, 'weekly mission'),
    premiumPurchase: () => addXP(XP_REWARDS.premiumPurchase, 'premium purchase'),
    seasonalEvent: () => addXP(XP_REWARDS.seasonalEvent, 'seasonal event'),
    miniGame: () => {
      missionProgress.trackMiniGameAction();
      return addXP(XP_REWARDS.playing * 2, 'mini-game');
    }
  };

  return {
    progression,
    petCareActivities,
    addXP,
    XP_REWARDS,
    LEVEL_REWARDS
  };
};
