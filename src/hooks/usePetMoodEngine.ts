
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface MoodState {
  happiness: number;
  hunger: number;
  energy: number;
  cleanliness: number;
  health: number;
  affection: number;
  tiredness: number;
}

export interface PetPersonality {
  name: string;
  favoriteActivity: string;
  moodModifiers: {
    happiness: number;
    energy: number;
    social: number;
  };
  sleepSchedule: {
    bedtime: number;
    wakeTime: number;
  };
}

export interface PetMoodState extends MoodState {
  personality: PetPersonality;
}

const initialMoodState: MoodState = {
  happiness: 70,
  hunger: 80,
  energy: 75,
  cleanliness: 85,
  health: 90,
  affection: 60,
  tiredness: 20
};

const defaultPersonality: PetPersonality = {
  name: 'Friendly Pet',
  favoriteActivity: 'playing with toys',
  moodModifiers: {
    happiness: 1.0,
    energy: 1.0,
    social: 1.0
  },
  sleepSchedule: {
    bedtime: 22,
    wakeTime: 7
  }
};

export const usePetMoodEngine = (characterId: string) => {
  const [moodState, setMoodState] = useState<MoodState>(initialMoodState);
  const [personality] = useState<PetPersonality>(defaultPersonality);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Load mood state from localStorage
  useEffect(() => {
    const savedMood = localStorage.getItem(`pet_mood_${characterId}`);
    if (savedMood) {
      try {
        setMoodState(JSON.parse(savedMood));
      } catch (error) {
        console.log('Error loading mood state');
      }
    }
  }, [characterId]);

  // Save mood state to localStorage
  useEffect(() => {
    localStorage.setItem(`pet_mood_${characterId}`, JSON.stringify(moodState));
  }, [moodState, characterId]);

  // Generate contextual messages based on mood
  useEffect(() => {
    const generateMessage = () => {
      const { happiness, hunger, energy, cleanliness, health, tiredness } = moodState;
      
      if (health < 30) return "I don't feel very well... 🤒";
      if (hunger < 25) return "I'm so hungry! Can we eat something? 🍎";
      if (tiredness > 80) return "I'm getting really sleepy... 😴";
      if (cleanliness < 25) return "I feel dirty! Can we take a bath? 🛁";
      if (energy < 25) return "I'm too tired to play right now... 😴";
      if (happiness > 85) return "I'm so happy! This is the best day ever! 😊";
      if (happiness < 30) return "I'm feeling a bit sad... 😢";
      if (energy > 80) return "I'm full of energy! Let's play! 🎾";
      
      return "I'm doing okay! Thanks for taking care of me! 😊";
    };

    setCurrentMessage(generateMessage());
  }, [moodState]);

  // Mood decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodState(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 0.5),
        energy: Math.max(0, prev.energy - 0.3),
        cleanliness: Math.max(0, prev.cleanliness - 0.2),
        happiness: Math.max(0, prev.happiness - 0.1),
        tiredness: Math.min(100, prev.tiredness + 0.4)
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const updateMood = useCallback((changes: Partial<MoodState>, message: string) => {
    setIsAnimating(true);
    setMoodState(prev => {
      const newState = { ...prev };
      Object.entries(changes).forEach(([key, value]) => {
        if (typeof value === 'number') {
          newState[key as keyof MoodState] = Math.max(0, Math.min(100, prev[key as keyof MoodState] + value));
        }
      });
      return newState;
    });

    toast({
      title: message,
      description: "Your pet's mood has changed!",
      className: "bg-green-50 border-green-200"
    });

    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  const actions = {
    feedPet: useCallback(() => {
      updateMood({ hunger: 30, happiness: 10, energy: 5 }, "Fed your pet! 🍎");
    }, [updateMood]),

    playWithPet: useCallback(() => {
      updateMood({ happiness: 20, energy: -10, affection: 15, tiredness: 10 }, "Played with your pet! 🎾");
    }, [updateMood]),

    sleepPet: useCallback(() => {
      updateMood({ energy: 40, tiredness: -50, health: 10 }, "Your pet had a good rest! 😴");
    }, [updateMood]),

    bathePet: useCallback(() => {
      updateMood({ cleanliness: 40, happiness: 5, health: 5 }, "Bath time was fun! 🛁");
    }, [updateMood]),

    giveMedicine: useCallback(() => {
      updateMood({ health: 30, happiness: -5, energy: 5 }, "Medicine helped your pet feel better! 💊");
    }, [updateMood]),

    petCharacter: useCallback(() => {
      updateMood({ happiness: 15, affection: 20 }, "Your pet loves the attention! 💖");
    }, [updateMood])
  };

  return {
    moodState,
    personality,
    currentMessage,
    isAnimating,
    actions
  };
};
