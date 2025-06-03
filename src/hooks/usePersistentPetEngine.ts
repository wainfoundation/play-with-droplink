
import { useState, useEffect, useCallback } from 'react';
import { useAuthSystem } from './useAuthSystem';

interface PetMoodState {
  happiness: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  health: number;
  mood: string;
}

export const usePersistentPetEngine = () => {
  const { user, petStats, updatePetStats, addXP } = useAuthSystem();
  const [moodState, setMoodState] = useState<PetMoodState>({
    happiness: 80,
    hunger: 60,
    energy: 85,
    cleanliness: 70,
    health: 90,
    mood: 'happy'
  });
  const [currentMessage, setCurrentMessage] = useState<string>('');

  // Sync with database stats
  useEffect(() => {
    if (petStats) {
      setMoodState({
        happiness: petStats.happiness,
        hunger: petStats.hunger,
        energy: petStats.energy,
        cleanliness: petStats.cleanliness,
        health: petStats.health,
        mood: petStats.mood
      });
    }
  }, [petStats]);

  const calculateMood = useCallback((stats: PetMoodState) => {
    const avg = (stats.happiness + stats.hunger + stats.energy + stats.cleanliness + stats.health) / 5;
    
    if (avg >= 80) return 'very_happy';
    if (avg >= 60) return 'happy';
    if (avg >= 40) return 'neutral';
    if (avg >= 20) return 'sad';
    return 'very_sad';
  }, []);

  const updateStats = async (updates: Partial<PetMoodState>) => {
    const newStats = { ...moodState, ...updates };
    const newMood = calculateMood(newStats);
    
    setMoodState({ ...newStats, mood: newMood });
    
    if (user) {
      try {
        await updatePetStats({ ...newStats, mood: newMood });
      } catch (error) {
        console.error('Failed to save pet stats:', error);
      }
    }
  };

  const feedPet = async () => {
    const hungerIncrease = Math.min(100, moodState.hunger + 25);
    const happinessIncrease = Math.min(100, moodState.happiness + 10);
    
    await updateStats({
      hunger: hungerIncrease,
      happiness: happinessIncrease
    });
    
    setCurrentMessage("Yummy! That was delicious! 🍎");
    
    // Add XP for feeding
    if (user) {
      await addXP(5, 'feed_pet', 'Fed the pet');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  const playWithPet = async () => {
    const happinessIncrease = Math.min(100, moodState.happiness + 20);
    const energyDecrease = Math.max(0, moodState.energy - 10);
    
    await updateStats({
      happiness: happinessIncrease,
      energy: energyDecrease
    });
    
    setCurrentMessage("That was so much fun! Let's play again! 🎾");
    
    // Add XP for playing
    if (user) {
      await addXP(8, 'play_with_pet', 'Played with the pet');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  const sleepPet = async () => {
    const energyIncrease = Math.min(100, moodState.energy + 30);
    const happinessIncrease = Math.min(100, moodState.happiness + 5);
    
    await updateStats({
      energy: energyIncrease,
      happiness: happinessIncrease
    });
    
    setCurrentMessage("Zzz... That was a great nap! 😴");
    
    // Add XP for sleeping
    if (user) {
      await addXP(3, 'sleep_pet', 'Pet took a nap');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  const bathePet = async () => {
    const cleanlinessIncrease = Math.min(100, moodState.cleanliness + 30);
    const happinessIncrease = Math.min(100, moodState.happiness + 10);
    
    await updateStats({
      cleanliness: cleanlinessIncrease,
      happiness: happinessIncrease
    });
    
    setCurrentMessage("So fresh and clean! I feel amazing! 🛁");
    
    // Add XP for bathing
    if (user) {
      await addXP(6, 'bathe_pet', 'Gave the pet a bath');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  const giveMedicine = async () => {
    const healthIncrease = Math.min(100, moodState.health + 25);
    const happinessIncrease = Math.min(100, moodState.happiness + 5);
    
    await updateStats({
      health: healthIncrease,
      happiness: happinessIncrease
    });
    
    setCurrentMessage("Thank you! I feel much better now! 💊");
    
    // Add XP for medicine
    if (user) {
      await addXP(7, 'give_medicine', 'Gave the pet medicine');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  const petCharacter = async () => {
    const happinessIncrease = Math.min(100, moodState.happiness + 15);
    
    await updateStats({
      happiness: happinessIncrease
    });
    
    setCurrentMessage("I love you too! That feels wonderful! 💝");
    
    // Add XP for petting
    if (user) {
      await addXP(4, 'pet_character', 'Pet the character');
    }
    
    setTimeout(() => setCurrentMessage(''), 3000);
  };

  return {
    moodState,
    currentMessage,
    actions: {
      feedPet,
      playWithPet,
      sleepPet,
      bathePet,
      giveMedicine,
      petCharacter
    }
  };
};
