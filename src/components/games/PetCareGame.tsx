
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
import { usePetData } from '@/hooks/usePetData';
import { useAuth } from '@/hooks/useAuth';
import PiAdBanner from '@/components/PiAdBanner';

interface PetCareGameProps {
  onBack: () => void;
}

const PetCareGame: React.FC<PetCareGameProps> = ({ onBack }) => {
  const { petData, loading, feedPet, cleanPet, putPetToSleep, playWithPet } = usePetData();
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<'main' | 'shop' | 'minigame'>('main');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [showAdBanner, setShowAdBanner] = useState(true);

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

  // Stats decrease over time (only if user is logged in and has pet data)
  useEffect(() => {
    if (!user || !petData) return;

    const interval = setInterval(() => {
      // This will be handled by the backend or a more sophisticated system
      // For now, we'll skip auto-decrease to avoid conflicts with database updates
    }, 30000); // Check every 30 seconds instead of 5

    return () => clearInterval(interval);
  }, [user, petData]);

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

  const handleFeedPet = async () => {
    const success = await feedPet();
    if (success) {
      showFloatingHearts();
    }
  };

  const handleCleanPet = async () => {
    const success = await cleanPet();
    if (success) {
      showFloatingHearts();
    }
  };

  const handlePlayWithPet = async () => {
    const success = await playWithPet();
    if (success) {
      showFloatingHearts();
    }
  };

  const handleSleepPet = async () => {
    await putPetToSleep();
  };

  const renderPet = () => {
    if (!petData) return null;

    // Create character with current mood for rendering
    const characterWithMood = {
      ...selectedCharacter,
      mood: petData.current_mood
    };

    return (
      <div className="relative flex items-center justify-center h-40 md:h-48">
        {/* Pet Character using CharacterRenderer */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <CharacterRenderer character={characterWithMood} size={140} />
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
            {petData.current_mood === 'hungry' && '🍎'}
            {petData.current_mood === 'sleepy' && '💤'}
            {petData.current_mood === 'dirty' && '🧼'}
            {petData.current_mood === 'excited' && '✨'}
            {petData.current_mood === 'happy' && '😊'}
            {petData.current_mood === 'sad' && '😢'}
          </div>
        </div>
      </div>
    );
  };

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to take care of your pet droplet and save your progress!
          </p>
          <Button onClick={onBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-4">Loading your pet...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (!petData) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">
            Something went wrong loading your pet data. Please try again.
          </p>
          <Button onClick={onBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'shop') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">🛍️ Pet Shop</h3>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-yellow-50 rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl mb-2">🍎</div>
                <div className="font-semibold text-sm md:text-base">Apple</div>
                <div className="text-xs text-gray-600">+30 Hunger</div>
                <Button 
                  size="sm" 
                  className="mt-2 w-full text-xs"
                  onClick={handleFeedPet}
                >
                  5π Buy
                </Button>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl mb-2">🧼</div>
                <div className="font-semibold text-sm md:text-base">Soap</div>
                <div className="text-xs text-gray-600">+40 Clean</div>
                <Button 
                  size="sm" 
                  className="mt-2 w-full text-xs"
                  onClick={handleCleanPet}
                >
                  3π Buy
                </Button>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl mb-2">🎀</div>
                <div className="font-semibold text-sm md:text-base">Bow Tie</div>
                <div className="text-xs text-gray-600">Cosmetic</div>
                <Button 
                  size="sm" 
                  className="mt-2 w-full text-xs"
                  disabled
                >
                  10π Soon
                </Button>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl mb-2">🏠</div>
                <div className="font-semibold text-sm md:text-base">New Room</div>
                <div className="text-xs text-gray-600">Decoration</div>
                <Button 
                  size="sm" 
                  className="mt-2 w-full text-xs"
                  disabled
                >
                  50π Soon
                </Button>
              </div>
            </div>
            
            <Button variant="outline" onClick={() => setCurrentScreen('main')} className="w-full">
              Back to {petData.pet_name}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'minigame') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold">🎮 Mini Games</h3>
            <p className="text-gray-600 text-sm">Coming soon! Play fun games to earn extra Pi coins!</p>
            
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
              Back to {petData.pet_name}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Pi Ad Banner */}
      {showAdBanner && (
        <PiAdBanner 
          onClose={() => setShowAdBanner(false)}
          className="mb-4"
        />
      )}

      <Card>
        <CardContent className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{petData.pi_coins}π</span>
            </div>
          </div>

          {/* Pet Info */}
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">{petData.pet_name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">Level {petData.level}</Badge>
              <Badge variant="secondary" className="text-xs capitalize">{petData.current_mood}</Badge>
            </div>
            <Progress value={(petData.experience / petData.experience_to_next) * 100} className="h-2 mt-2" />
            <div className="text-xs text-gray-600 mt-1">
              {petData.experience}/{petData.experience_to_next} XP
            </div>
          </div>

          {/* Pet Display */}
          <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg p-4 mb-6 relative overflow-hidden">
            {/* Room decorations */}
            <div className="absolute top-2 left-2 text-xl md:text-2xl">🪴</div>
            <div className="absolute top-2 right-2 text-xl md:text-2xl">🎈</div>
            <div className="absolute bottom-2 left-2 text-xl md:text-2xl">🧸</div>
            <div className="absolute bottom-2 right-2 text-xl md:text-2xl">⚽</div>
            
            {renderPet()}
          </div>

          {/* Pet Stats */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium">Happiness</span>
              </div>
              <Progress value={petData.happiness} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-500" />
                <span className="text-xs md:text-sm font-medium">Hunger</span>
              </div>
              <Progress value={petData.hunger} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-xs md:text-sm font-medium">Clean</span>
              </div>
              <Progress value={petData.cleanliness} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="text-xs md:text-sm font-medium">Energy</span>
              </div>
              <Progress value={petData.energy} className="h-2" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
            <Button onClick={handleFeedPet} className="flex flex-col gap-1 h-auto py-2 md:py-3 text-xs md:text-sm">
              <Utensils className="w-4 h-4 md:w-5 md:h-5" />
              <span>Feed (5π)</span>
            </Button>
            
            <Button onClick={handleCleanPet} className="flex flex-col gap-1 h-auto py-2 md:py-3 text-xs md:text-sm">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span>Clean (3π)</span>
            </Button>
            
            <Button onClick={handleSleepPet} className="flex flex-col gap-1 h-auto py-2 md:py-3 text-xs md:text-sm">
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
              <span>Sleep</span>
            </Button>
            
            <Button onClick={handlePlayWithPet} className="flex flex-col gap-1 h-auto py-2 md:py-3 text-xs md:text-sm">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <span>Play</span>
            </Button>
          </div>

          {/* Bottom Navigation */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen('shop')}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen('minigame')}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <Gamepad2 className="w-4 h-4" />
              Games
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetCareGame;
