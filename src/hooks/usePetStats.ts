
import { useState, useEffect } from 'react';

interface PetStats {
  hunger: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  health: number;
  mood: string;
  level: number;
  xp: number;
  xpToNext: number;
}

export const usePetStats = () => {
  const [petStats, setPetStats] = useState<PetStats>({
    hunger: 80,
    energy: 75,
    happiness: 85,
    cleanliness: 90,
    health: 95,
    mood: 'happy',
    level: 1,
    xp: 0,
    xpToNext: 100,
  });

  const updateStat = (statName: string, change: number) => {
    setPetStats(prev => {
      const newValue = Math.max(0, Math.min(100, prev[statName as keyof PetStats] as number + change));
      const updatedStats = {
        ...prev,
        [statName]: newValue,
      };

      // Award XP for positive care actions
      if (change > 0) {
        updatedStats.xp += Math.floor(change / 5);
      }

      // Level up check
      if (updatedStats.xp >= updatedStats.xpToNext) {
        updatedStats.level += 1;
        updatedStats.xp = 0;
        updatedStats.xpToNext = updatedStats.level * 150;
      }

      // Update mood based on overall stats
      const avgStats = (updatedStats.hunger + updatedStats.energy + updatedStats.happiness + updatedStats.cleanliness + updatedStats.health) / 5;
      
      if (updatedStats.health < 30) {
        updatedStats.mood = 'sick';
      } else if (avgStats >= 85) {
        updatedStats.mood = 'excited';
      } else if (avgStats >= 70) {
        updatedStats.mood = 'happy';
      } else if (avgStats >= 50) {
        updatedStats.mood = 'content';
      } else if (avgStats >= 30) {
        updatedStats.mood = 'sad';
      } else {
        updatedStats.mood = 'sick';
      }

      return updatedStats;
    });
  };

  return {
    petStats,
    updateStat,
  };
};
