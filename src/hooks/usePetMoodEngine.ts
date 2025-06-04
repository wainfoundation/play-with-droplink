
import { useState, useEffect, useCallback } from 'react';

export interface MoodState {
  hunger: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  social: number;
  health: number;
  tiredness: number;
  affection: number;
}

interface PetPersonality {
  name: string;
  favoriteActivity: string;
  sleepSchedule: {
    bedtime: number;
    wakeTime: number;
  };
  needDecayRates: {
    hunger: number;
    energy: number;
    cleanliness: number;
    social: number;
  };
}

export const usePetMoodEngine = (characterId: string) => {
  const [moodState, setMoodState] = useState<MoodState>({
    hunger: 80,
    energy: 85,
    happiness: 75,
    cleanliness: 90,
    social: 70,
    health: 95,
    tiredness: 20,
    affection: 80,
  });

  const [currentMessage, setCurrentMessage] = useState("Hello! I'm happy to see you!");
  const [isAsleep, setIsAsleep] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Pet personality based on character
  const personality: PetPersonality = {
    name: 'Droplet',
    favoriteActivity: 'playing',
    sleepSchedule: {
      bedtime: 21, // 9 PM
      wakeTime: 7,  // 7 AM
    },
    needDecayRates: {
      hunger: 0.5,
      energy: 0.3,
      cleanliness: 0.2,
      social: 0.4,
    },
  };

  // Get current mood based on stats
  const getCurrentMood = useCallback(() => {
    const { hunger, energy, happiness, cleanliness, health, social } = moodState;
    
    if (health < 30) return 'sick';
    if (energy < 25) return 'sleepy';
    if (hunger < 25) return 'hungry';
    if (cleanliness < 30) return 'dirty';
    if (social < 30) return 'lonely';
    if (happiness > 85) return 'excited';
    if (happiness < 40) return 'sad';
    return 'happy';
  }, [moodState]);

  // Generate contextual messages
  const generateMessage = useCallback(() => {
    const mood = getCurrentMood();
    const hour = new Date().getHours();
    
    const messages = {
      sick: ["I don't feel well...", "Could you help me feel better?", "I need some medicine..."],
      hungry: ["I'm getting hungry!", "Could you feed me something?", "My tummy is rumbling!"],
      sleepy: ["I'm feeling sleepy...", "Maybe it's time for a nap?", "Yawn... so tired..."],
      dirty: ["I could use a bath!", "I'm feeling a bit messy...", "Time for some cleaning!"],
      lonely: ["I miss having company...", "Want to chat with me?", "It's been quiet lately..."],
      excited: ["This is so much fun!", "I'm feeling great!", "Let's play together!"],
      sad: ["I'm feeling down...", "Could you cheer me up?", "Things feel a bit gloomy..."],
      happy: hour < 12 ? "Good morning! Ready for a new day?" : 
             hour < 18 ? "What shall we do today?" : 
             "Having a wonderful day!"
    };

    const moodMessages = messages[mood as keyof typeof messages] || messages.happy;
    return Array.isArray(moodMessages) 
      ? moodMessages[Math.floor(Math.random() * moodMessages.length)]
      : moodMessages;
  }, [getCurrentMood]);

  // Check if it's sleep time
  const isSleepTime = useCallback(() => {
    const hour = new Date().getHours();
    return hour >= personality.sleepSchedule.bedtime || hour < personality.sleepSchedule.wakeTime;
  }, [personality.sleepSchedule]);

  // Stat decay based on time and activity
  useEffect(() => {
    const decayInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = (now - lastInteraction) / (1000 * 60); // minutes
      
      setMoodState(prev => {
        const newState = { ...prev };
        
        // Natural decay rates (per minute)
        if (!isAsleep) {
          newState.hunger = Math.max(0, prev.hunger - personality.needDecayRates.hunger);
          newState.energy = Math.max(0, prev.energy - personality.needDecayRates.energy);
          newState.cleanliness = Math.max(0, prev.cleanliness - personality.needDecayRates.cleanliness);
          newState.social = Math.max(0, prev.social - personality.needDecayRates.social);
          newState.tiredness = Math.min(100, prev.tiredness + 0.3);
        } else {
          // Recovery during sleep
          newState.energy = Math.min(100, prev.energy + 2);
          newState.tiredness = Math.max(0, prev.tiredness - 2);
        }

        // Health is affected by other stats
        const avgCare = (newState.hunger + newState.cleanliness + newState.happiness) / 3;
        if (avgCare < 40) {
          newState.health = Math.max(0, prev.health - 0.5);
        } else if (avgCare > 70) {
          newState.health = Math.min(100, prev.health + 0.2);
        }

        // Happiness is affected by other needs
        const needsSatisfied = (newState.hunger + newState.energy + newState.cleanliness + newState.social) / 4;
        newState.happiness = Math.max(0, Math.min(100, needsSatisfied * 0.8 + newState.affection * 0.2));

        return newState;
      });
    }, 60000); // Every minute

    return () => clearInterval(decayInterval);
  }, [lastInteraction, isAsleep, personality.needDecayRates]);

  // Update message periodically
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(generateMessage());
    }, 30000); // Every 30 seconds

    return () => clearInterval(messageInterval);
  }, [generateMessage]);

  // Check sleep schedule
  useEffect(() => {
    const sleepCheck = setInterval(() => {
      setIsAsleep(isSleepTime() && moodState.tiredness > 60);
    }, 60000); // Check every minute

    return () => clearInterval(sleepCheck);
  }, [isSleepTime, moodState.tiredness]);

  // Pet care actions
  const actions = {
    feedPet: () => {
      setMoodState(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 25),
        happiness: Math.min(100, prev.happiness + 10),
        affection: Math.min(100, prev.affection + 5),
      }));
      setLastInteraction(Date.now());
      setCurrentMessage("Yummy! Thank you for feeding me!");
    },

    playWithPet: () => {
      if (moodState.energy > 20) {
        setMoodState(prev => ({
          ...prev,
          happiness: Math.min(100, prev.happiness + 20),
          social: Math.min(100, prev.social + 15),
          energy: Math.max(0, prev.energy - 10),
          affection: Math.min(100, prev.affection + 10),
        }));
        setLastInteraction(Date.now());
        setCurrentMessage("This is so much fun! I love playing with you!");
      } else {
        setCurrentMessage("I'm too tired to play right now...");
      }
    },

    bathePet: () => {
      setMoodState(prev => ({
        ...prev,
        cleanliness: Math.min(100, prev.cleanliness + 30),
        happiness: Math.min(100, prev.happiness + 5),
        health: Math.min(100, prev.health + 5),
      }));
      setLastInteraction(Date.now());
      setCurrentMessage("Ahh, that feels so refreshing!");
    },

    petCharacter: () => {
      setMoodState(prev => ({
        ...prev,
        affection: Math.min(100, prev.affection + 15),
        happiness: Math.min(100, prev.happiness + 10),
        social: Math.min(100, prev.social + 10),
      }));
      setLastInteraction(Date.now());
      setCurrentMessage("I love your gentle touch! ❤️");
    },

    sleepPet: () => {
      setIsAsleep(true);
      setMoodState(prev => ({
        ...prev,
        energy: Math.min(100, prev.energy + 30),
        tiredness: Math.max(0, prev.tiredness - 40),
      }));
      setLastInteraction(Date.now());
      setCurrentMessage("Goodnight! 💤");
    },

    giveMedicine: () => {
      setMoodState(prev => ({
        ...prev,
        health: Math.min(100, prev.health + 40),
        happiness: Math.min(100, prev.happiness + 5),
      }));
      setLastInteraction(Date.now());
      setCurrentMessage("Thank you! I feel much better now!");
    },
  };

  return {
    moodState,
    currentMessage,
    isAsleep,
    personality,
    getCurrentMood: getCurrentMood(),
    actions,
  };
};
