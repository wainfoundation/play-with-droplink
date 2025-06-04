
import { useState, useEffect } from 'react';

interface PetStats {
  happiness: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  health: number;
  mood: string;
}

export const usePetStats = () => {
  const [petStats, setPetStats] = useState<PetStats>({
    happiness: 80,
    hunger: 60,
    energy: 85,
    cleanliness: 70,
    health: 90,
    mood: 'happy'
  });

  // Calculate mood based on stats
  const calculateMood = (stats: PetStats): string => {
    const { happiness, hunger, energy, cleanliness, health } = stats;
    
    if (health < 30) return 'sick';
    if (hunger < 30) return 'hungry';
    if (energy < 30) return 'sleepy';
    if (cleanliness < 30) return 'dirty';
    if (happiness < 40) return 'sad';
    if (happiness > 80) return 'excited';
    return 'happy';
  };

  const updateStat = (statName: keyof PetStats, value: number) => {
    setPetStats(prev => {
      const newStats = {
        ...prev,
        [statName]: Math.max(0, Math.min(100, value))
      };
      
      // Update mood based on new stats
      const newMood = calculateMood(newStats);
      return { ...newStats, mood: newMood };
    });
  };

  // Auto-decay stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prev => {
        const newStats = {
          ...prev,
          hunger: Math.max(0, prev.hunger - 1),
          energy: Math.max(0, prev.energy - 0.5),
          cleanliness: Math.max(0, prev.cleanliness - 0.5),
          happiness: Math.max(0, prev.happiness - 0.5)
        };
        
        const newMood = calculateMood(newStats);
        return { ...newStats, mood: newMood };
      });
    }, 60000); // Decay every minute

    return () => clearInterval(interval);
  }, []);

  return {
    petStats,
    updateStat
  };
};
