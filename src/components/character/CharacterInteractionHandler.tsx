
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CharacterCustomization, CharacterStats } from './types';
import { sounds } from '@/utils/sounds';

interface CharacterInteractionHandlerProps {
  character: CharacterCustomization;
  soundEnabled: boolean;
  updateStats: (stats: CharacterStats) => Promise<boolean>;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  onInteraction: (type: string) => Promise<void>;
}

export const useCharacterInteractionHandler = ({
  character,
  soundEnabled,
  updateStats,
  setCoins
}: Omit<CharacterInteractionHandlerProps, 'onInteraction'>) => {
  const { toast } = useToast();

  const handleCharacterInteraction = async (type: string) => {
    if (!character) return;

    let newStats = { ...character.stats };
    let coinsEarned = 0;

    // Update stats based on interaction
    if (type === 'feed') {
      newStats.hunger = Math.min(100, newStats.hunger + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 10);
      coinsEarned = 10;
    } else if (type === 'play') {
      newStats.happiness = Math.min(100, newStats.happiness + 20);
      newStats.energy = Math.max(0, newStats.energy - 10);
      coinsEarned = 15;
    } else if (type === 'clean') {
      newStats.cleanliness = Math.min(100, newStats.cleanliness + 30);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 8;
    } else if (type === 'sleep') {
      newStats.energy = Math.min(100, newStats.energy + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 5;
    }

    await updateStats(newStats);
    setCoins(prev => prev + coinsEarned);

    if (soundEnabled) sounds.powerup();
    
    toast({
      title: "Great!",
      description: `Your ${character.name} enjoyed ${type}ing! +${coinsEarned} coins`,
    });
  };

  return { handleCharacterInteraction };
};
