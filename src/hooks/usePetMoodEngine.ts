
import { useState, useEffect, useCallback } from 'react';

export interface PetMoodState {
  tiredness: number;      // 0-100 (0 = exhausted, 100 = well rested)
  hunger: number;         // 0-100 (0 = starving, 100 = full)
  cleanliness: number;    // 0-100 (0 = dirty, 100 = clean)
  health: number;         // 0-100 (0 = sick, 100 = healthy)
  energy: number;         // 0-100 (0 = tired, 100 = energetic)
  affection: number;      // 0-100 (0 = lonely, 100 = loved)
  happiness: number;      // 0-100 (calculated from other stats)
  lastUpdated: number;    // timestamp
}

export interface PetPersonality {
  id: string;
  name: string;
  hungerDecayRate: number;
  energyDecayRate: number;
  cleanlinessDecayRate: number;
  affectionDecayRate: number;
  sleepSchedule: { bedtime: number; wakeTime: number };
  favoriteActivity: string;
  happyMessage: string;
  sadMessage: string;
  sickMessage: string;
}

const CHARACTER_PERSONALITIES: { [key: string]: PetPersonality } = {
  'droplet-blue-happy': {
    id: 'droplet-blue-happy',
    name: 'Drop',
    hungerDecayRate: 0.3,
    energyDecayRate: 0.4,
    cleanlinessDecayRate: 0.2,
    affectionDecayRate: 0.3,
    sleepSchedule: { bedtime: 22, wakeTime: 7 },
    favoriteActivity: 'water play',
    happyMessage: "Drop glows and hums peacefully! 💧✨",
    sadMessage: "Drop is slowly fading and getting quiet... 😢",
    sickMessage: "Drop feels under the weather and needs care 🤒"
  },
  'droplet-pink-happy': {
    id: 'droplet-pink-happy',
    name: 'Droplia',
    hungerDecayRate: 0.25,
    energyDecayRate: 0.35,
    cleanlinessDecayRate: 0.4,
    affectionDecayRate: 0.5,
    sleepSchedule: { bedtime: 21, wakeTime: 8 },
    favoriteActivity: 'being petted',
    happyMessage: "Droplia sparkles with joy and giggles! 💖🌸",
    sadMessage: "Droplia looks sad and needs some love... 💔",
    sickMessage: "Droplia isn't feeling well and needs medicine 🌸😷"
  },
  'droplet-green-calm': {
    id: 'droplet-green-calm',
    name: 'Dropzen',
    hungerDecayRate: 0.2,
    energyDecayRate: 0.3,
    cleanlinessDecayRate: 0.25,
    affectionDecayRate: 0.2,
    sleepSchedule: { bedtime: 20, wakeTime: 6 },
    favoriteActivity: 'meditation',
    happyMessage: "Dropzen radiates calm, peaceful energy 🧘‍♂️🌿",
    sadMessage: "Dropzen's zen is disturbed and needs balance...",
    sickMessage: "Dropzen's inner peace is disrupted by illness 🍃🤧"
  }
};

const DEFAULT_MOOD_STATE: PetMoodState = {
  tiredness: 80,
  hunger: 70,
  cleanliness: 85,
  health: 100,
  energy: 75,
  affection: 60,
  happiness: 75,
  lastUpdated: Date.now()
};

export const usePetMoodEngine = (characterId: string) => {
  const [moodState, setMoodState] = useState<PetMoodState>(DEFAULT_MOOD_STATE);
  const [personality, setPersonality] = useState<PetPersonality | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  // Load mood state from localStorage
  useEffect(() => {
    const savedMood = localStorage.getItem(`petMood_${characterId}`);
    if (savedMood) {
      try {
        const parsed = JSON.parse(savedMood);
        setMoodState(parsed);
      } catch (error) {
        console.log('Error loading mood state, using default');
      }
    }

    const charPersonality = CHARACTER_PERSONALITIES[characterId] || CHARACTER_PERSONALITIES['droplet-blue-happy'];
    setPersonality(charPersonality);
  }, [characterId]);

  // Save mood state to localStorage
  const saveMoodState = useCallback((newState: PetMoodState) => {
    localStorage.setItem(`petMood_${characterId}`, JSON.stringify(newState));
    setMoodState(newState);
  }, [characterId]);

  // Calculate happiness based on other stats
  const calculateHappiness = useCallback((state: PetMoodState): number => {
    const avgStats = (state.hunger + state.energy + state.cleanliness + state.affection + state.health + state.tiredness) / 6;
    return Math.max(0, Math.min(100, avgStats));
  }, []);

  // Apply time-based decay
  const applyTimeDecay = useCallback(() => {
    if (!personality) return;

    const now = Date.now();
    const timeDiff = now - moodState.lastUpdated;
    const hoursElapsed = timeDiff / (1000 * 60 * 60); // Convert to hours

    if (hoursElapsed < 0.1) return; // Don't update if less than 6 minutes have passed

    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= personality.sleepSchedule.bedtime || currentHour <= personality.sleepSchedule.wakeTime;

    setMoodState(prevState => {
      const newState = {
        ...prevState,
        hunger: Math.max(0, prevState.hunger - (personality.hungerDecayRate * hoursElapsed)),
        energy: Math.max(0, prevState.energy - (personality.energyDecayRate * hoursElapsed)),
        cleanliness: Math.max(0, prevState.cleanliness - (personality.cleanlinessDecayRate * hoursElapsed)),
        affection: Math.max(0, prevState.affection - (personality.affectionDecayRate * hoursElapsed)),
        tiredness: isNightTime ? 
          Math.min(100, prevState.tiredness + (0.5 * hoursElapsed)) : 
          Math.max(0, prevState.tiredness - (0.2 * hoursElapsed)),
        health: prevState.hunger < 20 || prevState.cleanliness < 20 ? 
          Math.max(0, prevState.health - (0.1 * hoursElapsed)) : 
          Math.min(100, prevState.health + (0.1 * hoursElapsed)),
        lastUpdated: now
      };

      newState.happiness = calculateHappiness(newState);
      
      // Save to localStorage
      localStorage.setItem(`petMood_${characterId}`, JSON.stringify(newState));
      
      return newState;
    });
  }, [moodState, personality, calculateHappiness, characterId]);

  // Pet care actions
  const feedPet = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        hunger: Math.min(100, prevState.hunger + 25),
        happiness: Math.min(100, prevState.happiness + 10),
        affection: Math.min(100, prevState.affection + 5),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("Yummy! Your pet feels much better! 🍎✨");
  }, [calculateHappiness, saveMoodState]);

  const playWithPet = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        energy: Math.min(100, prevState.energy + 20),
        affection: Math.min(100, prevState.affection + 15),
        tiredness: Math.max(0, prevState.tiredness - 10),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("So much fun! Your pet is energized! 🎮⚡");
  }, [calculateHappiness, saveMoodState]);

  const bathePet = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        cleanliness: Math.min(100, prevState.cleanliness + 30),
        happiness: Math.min(100, prevState.happiness + 8),
        health: Math.min(100, prevState.health + 5),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("Squeaky clean! Your pet feels refreshed! 🛁✨");
  }, [calculateHappiness, saveMoodState]);

  const petCharacter = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        affection: Math.min(100, prevState.affection + 20),
        happiness: Math.min(100, prevState.happiness + 12),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("Your pet feels so loved! 💖🥰");
  }, [calculateHappiness, saveMoodState]);

  const sleepPet = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        tiredness: Math.min(100, prevState.tiredness + 40),
        energy: Math.min(100, prevState.energy + 15),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("Sweet dreams! Your pet is well rested! 😴💤");
  }, [calculateHappiness, saveMoodState]);

  const giveMedicine = useCallback(() => {
    setMoodState(prevState => {
      const newState = {
        ...prevState,
        health: Math.min(100, prevState.health + 50),
        happiness: Math.min(100, prevState.happiness + 5),
        lastUpdated: Date.now()
      };
      newState.happiness = calculateHappiness(newState);
      saveMoodState(newState);
      return newState;
    });
    setCurrentMessage("Feeling much better! Health restored! 💊💚");
  }, [calculateHappiness, saveMoodState]);

  // Get current mood message
  const getCurrentMoodMessage = useCallback(() => {
    if (!personality) return '';
    
    if (moodState.health < 30) return personality.sickMessage;
    if (moodState.happiness > 80) return personality.happyMessage;
    if (moodState.happiness < 30) return personality.sadMessage;
    
    return `${personality.name} is doing okay! 😊`;
  }, [moodState, personality]);

  // Auto-update mood every minute
  useEffect(() => {
    const interval = setInterval(applyTimeDecay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [applyTimeDecay]);

  // Initial time decay check on mount
  useEffect(() => {
    applyTimeDecay();
  }, [personality]);

  // Clear current message after 3 seconds
  useEffect(() => {
    if (currentMessage) {
      const timer = setTimeout(() => setCurrentMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentMessage]);

  return {
    moodState,
    personality,
    currentMessage: currentMessage || getCurrentMoodMessage(),
    actions: {
      feedPet,
      playWithPet,
      bathePet,
      petCharacter,
      sleepPet,
      giveMedicine
    }
  };
};
