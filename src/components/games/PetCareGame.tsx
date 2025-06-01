
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Utensils, Sparkles, Moon, Gamepad2, ShoppingBag, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [petMood, setPetMood] = useState<'happy' | 'hungry' | 'dirty' | 'sleepy' | 'sad'>('happy');
  const [currentScreen, setCurrentScreen] = useState<'main' | 'shop' | 'minigame'>('main');
  const [petAnimation, setPetAnimation] = useState('idle');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToNext, setExperienceToNext] = useState(100);

  // Pet mood calculation based on stats
  useEffect(() => {
    const { happiness, hunger, cleanliness, energy } = petStats;
    
    if (hunger < 30) {
      setPetMood('hungry');
    } else if (cleanliness < 30) {
      setPetMood('dirty');
    } else if (energy < 30) {
      setPetMood('sleepy');
    } else if (happiness < 40) {
      setPetMood('sad');
    } else {
      setPetMood('happy');
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
      
      setPetAnimation('eating');
      setTimeout(() => setPetAnimation('idle'), 2000);
      
      addExperience(10);
      showFloatingHearts();
      
      toast({
        title: "Yummy! 🍎",
        description: "Your pet loved the food!",
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
      
      setPetAnimation('cleaning');
      setTimeout(() => setPetAnimation('idle'), 2000);
      
      addExperience(8);
      showFloatingHearts();
      
      toast({
        title: "So clean! ✨",
        description: "Your pet is sparkling clean!",
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
    
    setPetAnimation('sleeping');
    setTimeout(() => setPetAnimation('idle'), 3000);
    
    addExperience(5);
    
    toast({
      title: "Sweet dreams! 😴",
      description: "Your pet had a refreshing nap!",
    });
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 10)
    }));
    
    setPetAnimation('playing');
    setTimeout(() => setPetAnimation('idle'), 2000);
    
    addExperience(15);
    showFloatingHearts();
    
    toast({
      title: "So much fun! 🎮",
      description: "Your pet loves playing with you!",
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
          description: `Your pet reached level ${level + 1}! +20π bonus!`,
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

  const getPetEmoji = () => {
    switch (petMood) {
      case 'happy': return '😊';
      case 'hungry': return '😋';
      case 'dirty': return '😅';
      case 'sleepy': return '😴';
      case 'sad': return '😢';
      default: return '😊';
    }
  };

  const getPetAnimationClass = () => {
    switch (petAnimation) {
      case 'eating': return 'animate-bounce';
      case 'cleaning': return 'animate-spin';
      case 'sleeping': return 'animate-pulse';
      case 'playing': return 'animate-bounce';
      default: return 'animate-pulse';
    }
  };

  const renderPet = () => (
    <div className="relative flex items-center justify-center h-48">
      {/* Pet Character */}
      <motion.div
        className={`relative ${getPetAnimationClass()}`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '4px solid white'
          }}
        >
          {getPetEmoji()}
        </div>
        
        {/* Eyes */}
        <div className="absolute top-8 left-8 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full"></div>
        
        {/* Blush */}
        <div className="absolute top-16 left-4 w-4 h-2 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute top-16 right-4 w-4 h-2 bg-pink-300 rounded-full opacity-60"></div>
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
    </div>
  );

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
        Back to Pet
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
        Back to Pet
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

        {/* Pet Level & XP */}
        <div className="text-center mb-4">
          <Badge variant="outline" className="mb-2">Level {level}</Badge>
          <Progress value={(experience / experienceToNext) * 100} className="h-2" />
          <div className="text-xs text-gray-600 mt-1">
            {experience}/{experienceToNext} XP
          </div>
        </div>

        {/* Pet Display */}
        <div className="bg-gradient-to-b from-yellow-100 to-orange-100 rounded-lg p-4 mb-6">
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
