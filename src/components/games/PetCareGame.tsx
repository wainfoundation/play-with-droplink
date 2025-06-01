
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Utensils, Sparkles, Moon, Gamepad2, ShoppingBag, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';

interface PetStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
}

interface PetCareGameProps {
  onBack: () => void;
}

const PetCareGame: React.FC<PetCareGameProps> = ({ onBack }) => {
  const [petStats, setPetStats] = useState<PetStats>({
    happiness: 80,
    hunger: 60,
    cleanliness: 70,
    energy: 85
  });
  
  const [piCoins, setPiCoins] = useState(100);
  const [currentScreen, setCurrentScreen] = useState<'main' | 'shop' | 'minigame'>('main');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToNext, setExperienceToNext] = useState(100);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [currentMood, setCurrentMood] = useState('happy');

  // Load selected character from localStorage on component mount
  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        const parsedCharacter = JSON.parse(savedCharacter);
        setSelectedCharacter(parsedCharacter);
      } catch (error) {
        console.log('Error parsing saved character, using default');
      }
    }
  }, []);

  // Pet mood calculation based on stats
  useEffect(() => {
    const { happiness, hunger, cleanliness, energy } = petStats;
    
    if (hunger < 30) {
      setCurrentMood('hungry');
    } else if (cleanliness < 30) {
      setCurrentMood('dirty');
    } else if (energy < 30) {
      setCurrentMood('sleepy');
    } else if (happiness < 40) {
      setCurrentMood('sad');
    } else if (happiness > 80) {
      setCurrentMood('excited');
    } else {
      setCurrentMood('happy');
    }
  }, [petStats]);

  // Stats decrease over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prev => ({
        happiness: Math.max(0, prev.happiness - 0.5),
        hunger: Math.max(0, prev.hunger - 1),
        cleanliness: Math.max(0, prev.cleanliness - 0.3),
        energy: Math.max(0, prev.energy - 0.2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const feedPet = () => {
    if (piCoins >= 5) {
      setPiCoins(prev => prev - 5);
      setPetStats(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 30),
        happiness: Math.min(100, prev.happiness + 10)
      }));
      
      addExperience(10);
      showFloatingHearts();
      
      toast({
        title: "Yummy! 🍎",
        description: `${selectedCharacter.name} loved the food!`,
      });
    } else {
      toast({
        title: "Not enough Pi coins! 💰",
        description: "You need 5π to buy food.",
        variant: "destructive"
      });
    }
  };

  const cleanPet = () => {
    if (piCoins >= 3) {
      setPiCoins(prev => prev - 3);
      setPetStats(prev => ({
        ...prev,
        cleanliness: Math.min(100, prev.cleanliness + 40),
        happiness: Math.min(100, prev.happiness + 15)
      }));
      
      addExperience(8);
      showFloatingHearts();
      
      toast({
        title: "So clean! ✨",
        description: `${selectedCharacter.name} is sparkling clean!`,
      });
    } else {
      toast({
        title: "Not enough Pi coins! 💰",
        description: "You need 3π for cleaning supplies.",
        variant: "destructive"
      });
    }
  };

  const putPetToSleep = () => {
    setPetStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 50),
      happiness: Math.min(100, prev.happiness + 10)
    }));
    
    addExperience(5);
    
    toast({
      title: "Sweet dreams! 😴",
      description: `${selectedCharacter.name} had a refreshing nap!`,
    });
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 10)
    }));
    
    addExperience(15);
    showFloatingHearts();
    
    toast({
      title: "So much fun! 🎮",
      description: `${selectedCharacter.name} loves playing with you!`,
    });
  };

  const addExperience = (amount: number) => {
    setExperience(prev => {
      const newExp = prev + amount;
      if (newExp >= experienceToNext) {
        setLevel(prevLevel => prevLevel + 1);
        setExperienceToNext(prevNext => prevNext + 50);
        setPiCoins(prevCoins => prevCoins + 20);
        
        toast({
          title: "Level Up! 🎉",
          description: `${selectedCharacter.name} reached level ${level + 1}! +20π bonus!`,
        });
        
        return newExp - experienceToNext;
      }
      return newExp;
    });
  };

  const showFloatingHearts = () => {
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 200
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.find(h => h.id === heart.id)));
    }, 2000);
  };

  const renderPet = () => {
    // Create character with current mood for rendering
    const characterWithMood = {
      ...selectedCharacter,
      mood: currentMood
    };

    return (
      <div className="relative flex items-center justify-center h-48">
        {/* Pet Character using CharacterRenderer */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <CharacterRenderer character={characterWithMood} size={160} />
        </motion.div>

        {/* Floating Hearts */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              className="absolute text-red-500 text-xl pointer-events-none"
              style={{ left: heart.x, top: heart.y }}
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -50, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Mood indicator */}
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-primary/20">
          <div className="text-sm">
            {currentMood === 'hungry' && '🍎'}
            {currentMood === 'sleepy' && '💤'}
            {currentMood === 'dirty' && '🧼'}
            {currentMood === 'excited' && '✨'}
            {currentMood === 'happy' && '😊'}
            {currentMood === 'sad' && '😢'}
          </div>
        </div>
      </div>
    );
  };

  const renderShop = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-center mb-4">🛍️ Pet Shop</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🍎</div>
          <div className="font-semibold">Apple</div>
          <div className="text-sm text-gray-600">+30 Hunger</div>
          <Button 
            size="sm" 
            className="mt-2 w-full"
            onClick={feedPet}
          >
            5π Buy
          </Button>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🧼</div>
          <div className="font-semibold">Soap</div>
          <div className="text-sm text-gray-600">+40 Clean</div>
          <Button 
            size="sm" 
            className="mt-2 w-full"
            onClick={cleanPet}
          >
            3π Buy
          </Button>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🎀</div>
          <div className="font-semibold">Bow Tie</div>
          <div className="text-sm text-gray-600">Cosmetic</div>
          <Button 
            size="sm" 
            className="mt-2 w-full"
            disabled
          >
            10π Soon
          </Button>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🏠</div>
          <div className="font-semibold">New Room</div>
          <div className="text-sm text-gray-600">Decoration</div>
          <Button 
            size="sm" 
            className="mt-2 w-full"
            disabled
          >
            50π Soon
          </Button>
        </div>
      </div>
      
      <Button variant="outline" onClick={() => setCurrentScreen('main')} className="w-full">
        Back to {selectedCharacter.name}
      </Button>
    </div>
  );

  const renderMinigame = () => (
    <div className="space-y-4 text-center">
      <h3 className="text-xl font-bold">🎮 Mini Games</h3>
      <p className="text-gray-600">Coming soon! Play fun games to earn extra Pi coins!</p>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-pink-50 rounded-lg p-4">
          <div className="text-3xl mb-2">🧠</div>
          <div className="font-semibold">Memory Match</div>
          <div className="text-sm text-gray-600">Match pairs to earn coins</div>
          <Button size="sm" className="mt-2" disabled>
            Coming Soon
          </Button>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-3xl mb-2">👆</div>
          <div className="font-semibold">Tap Challenge</div>
          <div className="text-sm text-gray-600">Tap as fast as you can!</div>
          <Button size="sm" className="mt-2" disabled>
            Coming Soon
          </Button>
        </div>
      </div>
      
      <Button variant="outline" onClick={() => setCurrentScreen('main')} className="w-full">
        Back to {selectedCharacter.name}
      </Button>
    </div>
  );

  if (currentScreen === 'shop') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          {renderShop()}
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'minigame') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          {renderMinigame()}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{piCoins}π</span>
          </div>
        </div>

        {/* Pet Info */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">Level {level}</Badge>
            <Badge variant="secondary" className="text-xs capitalize">{currentMood}</Badge>
          </div>
          <Progress value={(experience / experienceToNext) * 100} className="h-2 mt-2" />
          <div className="text-xs text-gray-600 mt-1">
            {experience}/{experienceToNext} XP
          </div>
        </div>

        {/* Pet Display */}
        <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg p-4 mb-6 relative overflow-hidden">
          {/* Room decorations */}
          <div className="absolute top-2 left-2 text-2xl">🪴</div>
          <div className="absolute top-2 right-2 text-2xl">🎈</div>
          <div className="absolute bottom-2 left-2 text-2xl">🧸</div>
          <div className="absolute bottom-2 right-2 text-2xl">⚽</div>
          
          {renderPet()}
        </div>

        {/* Pet Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Happiness</span>
            </div>
            <Progress value={petStats.happiness} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Hunger</span>
            </div>
            <Progress value={petStats.hunger} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Clean</span>
            </div>
            <Progress value={petStats.cleanliness} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Energy</span>
            </div>
            <Progress value={petStats.energy} className="h-2" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button onClick={feedPet} className="flex flex-col gap-1 h-auto py-3">
            <Utensils className="w-5 h-5" />
            <span className="text-xs">Feed (5π)</span>
          </Button>
          
          <Button onClick={cleanPet} className="flex flex-col gap-1 h-auto py-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Clean (3π)</span>
          </Button>
          
          <Button onClick={putPetToSleep} className="flex flex-col gap-1 h-auto py-3">
            <Moon className="w-5 h-5" />
            <span className="text-xs">Sleep</span>
          </Button>
          
          <Button onClick={playWithPet} className="flex flex-col gap-1 h-auto py-3">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Play</span>
          </Button>
        </div>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => setCurrentScreen('shop')}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setCurrentScreen('minigame')}
            className="flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            Games
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetCareGame;
