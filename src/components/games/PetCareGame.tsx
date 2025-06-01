
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
      <div className="w-full max-w-md mx-auto">
        <Card className="border-none bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Shop Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border-4 border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                  🛍️ Pet Shop
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-yellow-300/80 backdrop-blur-sm rounded-full px-3 py-1 border-3 border-yellow-400">
                <Coins className="w-4 h-4 text-yellow-700" />
                <span className="font-bold text-yellow-800">{petData.pi_coins}π</span>
              </div>
            </div>
            
            {/* Shop Items Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-red-200 to-orange-200 rounded-3xl p-4 text-center border-4 border-red-300 shadow-lg"
              >
                <div className="text-4xl mb-2">🍎</div>
                <div className="font-bold text-red-800 text-lg">Apple</div>
                <div className="text-xs text-red-600 mb-3">+30 Hunger</div>
                <Button 
                  size="sm" 
                  className="w-full bg-red-500 hover:bg-red-600 border-2 border-red-700 rounded-full font-bold text-white shadow-lg"
                  onClick={handleFeedPet}
                >
                  5π Buy
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl p-4 text-center border-4 border-blue-300 shadow-lg"
              >
                <div className="text-4xl mb-2">🧼</div>
                <div className="font-bold text-blue-800 text-lg">Soap</div>
                <div className="text-xs text-blue-600 mb-3">+40 Clean</div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-full font-bold text-white shadow-lg"
                  onClick={handleCleanPet}
                >
                  3π Buy
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl p-4 text-center border-4 border-purple-300 shadow-lg"
              >
                <div className="text-4xl mb-2">🎀</div>
                <div className="font-bold text-purple-800 text-lg">Bow Tie</div>
                <div className="text-xs text-purple-600 mb-3">Cosmetic</div>
                <Button 
                  size="sm" 
                  className="w-full bg-purple-400 border-2 border-purple-500 rounded-full font-bold text-white shadow-lg opacity-75"
                  disabled
                >
                  10π Soon
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-200 to-teal-200 rounded-3xl p-4 text-center border-4 border-green-300 shadow-lg"
              >
                <div className="text-4xl mb-2">🏠</div>
                <div className="font-bold text-green-800 text-lg">New Room</div>
                <div className="text-xs text-green-600 mb-3">Decoration</div>
                <Button 
                  size="sm" 
                  className="w-full bg-green-400 border-2 border-green-500 rounded-full font-bold text-white shadow-lg opacity-75"
                  disabled
                >
                  50π Soon
                </Button>
              </motion.div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen('main')} 
              className="w-full bg-white/80 backdrop-blur-sm border-4 border-gray-300 rounded-full font-bold text-gray-700 hover:bg-white shadow-lg"
            >
              Back to {petData.pet_name}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'minigame') {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border-none bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border-4 border-purple-200 shadow-lg inline-block">
                <h3 className="text-2xl font-bold text-purple-800">🎮 Mini Games</h3>
              </div>
              <p className="text-gray-600 text-sm">Coming soon! Play fun games to earn extra Pi coins!</p>
              
              <div className="grid grid-cols-1 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl p-4 border-4 border-pink-300 shadow-lg"
                >
                  <div className="text-4xl mb-2">🧠</div>
                  <div className="font-bold text-pink-800 text-lg">Memory Match</div>
                  <div className="text-sm text-pink-600 mb-3">Match pairs to earn coins</div>
                  <Button size="sm" className="bg-pink-400 border-2 border-pink-500 rounded-full font-bold opacity-75" disabled>
                    Coming Soon
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl p-4 border-4 border-orange-300 shadow-lg"
                >
                  <div className="text-4xl mb-2">👆</div>
                  <div className="font-bold text-orange-800 text-lg">Tap Challenge</div>
                  <div className="text-sm text-orange-600 mb-3">Tap as fast as you can!</div>
                  <Button size="sm" className="bg-orange-400 border-2 border-orange-500 rounded-full font-bold opacity-75" disabled>
                    Coming Soon
                  </Button>
                </motion.div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setCurrentScreen('main')} 
                className="w-full bg-white/80 backdrop-blur-sm border-4 border-gray-300 rounded-full font-bold text-gray-700 hover:bg-white shadow-lg"
              >
                Back to {petData.pet_name}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
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

      <Card className="border-none bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 shadow-2xl overflow-hidden">
        <CardContent className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="bg-white/50 backdrop-blur-sm rounded-full border-2 border-gray-200 hover:bg-white/70">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {/* Shop Button - Top Right */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setCurrentScreen('shop')}
                className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 border-4 border-orange-600 rounded-2xl font-bold text-white shadow-lg px-3 py-2"
              >
                <div className="text-xl mr-1">🏪</div>
                <span className="text-sm">SHOP</span>
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-2 bg-yellow-300/80 backdrop-blur-sm rounded-full px-3 py-1 border-3 border-yellow-400">
              <Coins className="w-4 h-4 text-yellow-700" />
              <span className="font-bold text-yellow-800">{petData.pi_coins}π</span>
            </div>
          </div>

          {/* Pet Info */}
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{petData.pet_name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs bg-white/60 border-2 border-blue-300">Level {petData.level}</Badge>
              <Badge variant="secondary" className="text-xs capitalize bg-white/60 border-2 border-purple-300">{petData.current_mood}</Badge>
            </div>
            <Progress value={(petData.experience / petData.experience_to_next) * 100} className="h-3 mt-2 bg-white/50 border-2 border-gray-200 rounded-full" />
            <div className="text-xs text-gray-600 mt-1 font-semibold">
              {petData.experience}/{petData.experience_to_next} XP
            </div>
          </div>

          {/* Pet Display - Cozy Room Background */}
          <div className="bg-gradient-to-b from-green-200 via-blue-100 to-yellow-100 rounded-3xl p-4 mb-6 relative overflow-hidden border-4 border-green-300 shadow-inner">
            {/* Room Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200"></div>
            
            {/* Window */}
            <div className="absolute top-2 left-2 w-12 h-12 bg-gradient-to-b from-sky-300 to-blue-300 rounded-lg border-4 border-orange-400 shadow-lg">
              <div className="w-full h-full bg-gradient-to-b from-white/30 to-transparent rounded-md flex items-center justify-center">
                <div className="text-xs">☁️</div>
              </div>
            </div>
            
            {/* Hearts floating */}
            <div className="absolute top-1 right-6 text-2xl animate-pulse">💕</div>
            <div className="absolute top-3 right-12 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>💕</div>
            <div className="absolute top-1 right-2 text-lg animate-pulse" style={{ animationDelay: '1s' }}>💕</div>
            
            {/* Floor decorations */}
            <div className="absolute bottom-2 left-2 text-2xl">🧸</div>
            <div className="absolute bottom-2 right-2 text-2xl">⚽</div>
            <div className="absolute bottom-4 left-8 w-6 h-3 bg-orange-400 rounded-full border-2 border-orange-600"></div>
            
            {renderPet()}
          </div>

          {/* Pet Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border-3 border-red-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs md:text-sm font-bold text-red-700">Happiness</span>
              </div>
              <Progress value={petData.happiness} className="h-3 bg-red-100 border-2 border-red-300 rounded-full" />
            </div>
            
            <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border-3 border-green-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-500" />
                <span className="text-xs md:text-sm font-bold text-green-700">Hunger</span>
              </div>
              <Progress value={petData.hunger} className="h-3 bg-green-100 border-2 border-green-300 rounded-full" />
            </div>
            
            <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border-3 border-blue-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-xs md:text-sm font-bold text-blue-700">Clean</span>
              </div>
              <Progress value={petData.cleanliness} className="h-3 bg-blue-100 border-2 border-blue-300 rounded-full" />
            </div>
            
            <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border-3 border-purple-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="text-xs md:text-sm font-bold text-purple-700">Energy</span>
              </div>
              <Progress value={petData.energy} className="h-3 bg-purple-100 border-2 border-purple-300 rounded-full" />
            </div>
          </div>

          {/* Action Buttons - Cartoon Style */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleFeedPet} 
                className="flex flex-col gap-1 h-auto py-3 text-xs bg-gradient-to-b from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 border-4 border-red-500 rounded-2xl font-bold text-white shadow-lg"
              >
                <div className="text-2xl">🍔</div>
                <span className="text-xs font-bold">FEED</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleCleanPet} 
                className="flex flex-col gap-1 h-auto py-3 text-xs bg-gradient-to-b from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 border-4 border-orange-500 rounded-2xl font-bold text-white shadow-lg"
              >
                <div className="text-2xl">🧽</div>
                <span className="text-xs font-bold">CLEAN</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleSleepPet} 
                className="flex flex-col gap-1 h-auto py-3 text-xs bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 border-4 border-blue-500 rounded-2xl font-bold text-white shadow-lg"
              >
                <div className="text-2xl">🌙</div>
                <span className="text-xs font-bold">SLEEP</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handlePlayWithPet} 
                className="flex flex-col gap-1 h-auto py-3 text-xs bg-gradient-to-b from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 border-4 border-green-500 rounded-2xl font-bold text-white shadow-lg"
              >
                <div className="text-2xl">🎮</div>
                <span className="text-xs font-bold">PLAY</span>
              </Button>
            </motion.div>
          </div>

          {/* Bottom Navigation */}
          <div className="grid grid-cols-1 gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => setCurrentScreen('minigame')}
                className="flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 border-4 border-green-600 rounded-2xl font-bold text-white shadow-lg py-3"
              >
                <div className="text-2xl">▶️</div>
                <span>Start Playing Mini Games</span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetCareGame;
