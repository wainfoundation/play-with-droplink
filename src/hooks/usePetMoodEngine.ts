
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface MoodState {
  happiness: number;
  health: number;
  energy: number;
  hunger: number;
  cleanliness: number;
  affection: number;
}

interface PetMessage {
  text: string;
  timestamp: number;
}

export const usePetMoodEngine = (characterId: string) => {
  const [moodState, setMoodState] = useState<MoodState>({
    happiness: 80,
    health: 85,
    energy: 70,
    hunger: 60,
    cleanliness: 75,
    affection: 90
  });

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`pet_mood_${characterId}`);
    if (savedState) {
      try {
        setMoodState(JSON.parse(savedState));
      } catch (error) {
        console.log('Error loading pet mood state');
      }
    }
  }, [characterId]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`pet_mood_${characterId}`, JSON.stringify(moodState));
  }, [moodState, characterId]);

  // Generate mood messages
  const generateMessage = useCallback((action: string, stats: MoodState) => {
    const messages: { [key: string]: string[] } = {
      feed: [
        "Yummy! That was delicious! 🍎",
        "Thank you for the tasty food! 😋",
        "I feel so much better now! 🌟"
      ],
      play: [
        "That was so much fun! 🎾",
        "I love playing with you! 😊",
        "Let's play again soon! 🎮"
      ],
      sleep: [
        "Zzz... I feel so refreshed! 😴",
        "That nap was perfect! 💤",
        "I'm full of energy now! ⚡"
      ],
      bathe: [
        "I'm so clean and fresh! 🛁",
        "Splish splash! I love bath time! ✨",
        "I feel squeaky clean! 🧼"
      ],
      medicine: [
        "I'm feeling much better! 💊",
        "Thank you for taking care of me! ❤️",
        "The medicine worked! 🏥"
      ],
      pet: [
        "I love your gentle touch! 💝",
        "That feels so nice! 🥰",
        "You're the best! 💖"
      ]
    };

    const actionMessages = messages[action] || ["I'm happy!"];
    return actionMessages[Math.floor(Math.random() * actionMessages.length)];
  }, []);

  // Pet care actions
  const feedPet = useCallback(() => {
    if (moodState.hunger >= 95) {
      toast({
        title: "I'm too full! 🤢",
        description: "Maybe later when I'm hungrier!",
        variant: "destructive"
      });
      return;
    }

    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 10),
      energy: Math.min(100, prev.energy + 5)
    }));

    const message = generateMessage('feed', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Fed your pet! 🍎",
      description: message,
      className: "bg-green-50 border-green-200"
    });
  }, [moodState, generateMessage]);

  const playWithPet = useCallback(() => {
    if (moodState.energy <= 15) {
      toast({
        title: "Too tired to play! 😴",
        description: "Let me rest first!",
        variant: "destructive"
      });
      return;
    }

    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
      affection: Math.min(100, prev.affection + 10)
    }));

    const message = generateMessage('play', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Played with your pet! 🎾",
      description: message,
      className: "bg-blue-50 border-blue-200"
    });
  }, [moodState, generateMessage]);

  const sleepPet = useCallback(() => {
    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
      happiness: Math.min(100, prev.happiness + 10),
      health: Math.min(100, prev.health + 5)
    }));

    const message = generateMessage('sleep', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Pet is sleeping! 😴",
      description: message,
      className: "bg-purple-50 border-purple-200"
    });
  }, [moodState, generateMessage]);

  const bathePet = useCallback(() => {
    if (moodState.cleanliness >= 95) {
      toast({
        title: "I'm already clean! ✨",
        description: "No need for a bath right now!",
        variant: "destructive"
      });
      return;
    }

    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      cleanliness: Math.min(100, prev.cleanliness + 35),
      happiness: Math.min(100, prev.happiness + 15),
      health: Math.min(100, prev.health + 10)
    }));

    const message = generateMessage('bathe', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Bathed your pet! 🛁",
      description: message,
      className: "bg-cyan-50 border-cyan-200"
    });
  }, [moodState, generateMessage]);

  const giveMedicine = useCallback(() => {
    if (moodState.health >= 95) {
      toast({
        title: "I'm perfectly healthy! 💪",
        description: "No medicine needed right now!",
        variant: "destructive"
      });
      return;
    }

    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 25),
      happiness: Math.max(0, prev.happiness - 5) // Medicine tastes bad!
    }));

    const message = generateMessage('medicine', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Gave medicine! 💊",
      description: message,
      className: "bg-red-50 border-red-200"
    });
  }, [moodState, generateMessage]);

  const petCharacter = useCallback(() => {
    setIsAnimating(true);
    setMoodState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      affection: Math.min(100, prev.affection + 20)
    }));

    const message = generateMessage('pet', moodState);
    setCurrentMessage(message);
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentMessage('');
    }, 3000);

    toast({
      title: "Pet loves your attention! 💝",
      description: message,
      className: "bg-pink-50 border-pink-200"
    });
  }, [moodState, generateMessage]);

  // Auto-decay stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodState(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        energy: Math.max(0, prev.energy - 0.5),
        cleanliness: Math.max(0, prev.cleanliness - 0.3),
        happiness: Math.max(0, prev.happiness - 0.2)
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    moodState,
    currentMessage,
    isAnimating,
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
