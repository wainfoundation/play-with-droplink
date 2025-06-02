import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Sparkles, Zap, Brain, Trophy, ShoppingBag, Home, Users, GamepadIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface DropletStats {
  happiness: number;
  energy: number;
  hunger: number;
  intelligence: number;
  bondLevel: number;
  level: number;
  xp: number;
  piCoins: number;
}

interface DropletCharacter {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accessories: string[];
  stage: 'Baby' | 'Kid' | 'Teen' | 'Adult' | 'Elder';
}

const DROPLET_VARIANTS = [
  { id: 'happy-male', name: 'Bubbles', gender: 'male' as const, accessories: [] },
  { id: 'bow-female', name: 'Splash', gender: 'female' as const, accessories: ['bow'] },
  { id: 'glasses-male', name: 'Smarty', gender: 'male' as const, accessories: ['glasses'] },
  { id: 'hat-male', name: 'Sunny', gender: 'male' as const, accessories: ['hat'] },
  { id: 'medal-male', name: 'Champion', gender: 'male' as const, accessories: ['medal'] },
  { id: 'hair-female', name: 'Flow', gender: 'female' as const, accessories: ['hair'] },
  { id: 'bowtie-male', name: 'Gentleman', gender: 'male' as const, accessories: ['bowtie'] },
  { id: 'sleepy-male', name: 'Dreamy', gender: 'male' as const, accessories: [] },
  { id: 'excited-male', name: 'Spark', gender: 'male' as const, accessories: ['medal'] },
  { id: 'smart-female', name: 'Wise', gender: 'female' as const, accessories: ['glasses'] }
];

const MINI_GAMES = [
  { id: 'droplet-jump', name: 'Droplet Jump', icon: '🏃', description: 'Platform jumping adventure' },
  { id: 'memory-splash', name: 'Memory Splash', icon: '🧠', description: 'Memory card matching game' },
  { id: 'bubble-pop', name: 'Bubble Pop', icon: '🫧', description: 'Timed bubble popping game' }
];

const MyPetDroplet: React.FC = () => {
  const [selectedDroplet, setSelectedDroplet] = useState<DropletCharacter>(
    { ...DROPLET_VARIANTS[0], stage: 'Kid' }
  );
  const [stats, setStats] = useState<DropletStats>({
    happiness: 85,
    energy: 70,
    hunger: 60,
    intelligence: 45,
    bondLevel: 3,
    level: 5,
    xp: 250,
    piCoins: 150
  });
  const [currentView, setCurrentView] = useState<'care' | 'games' | 'shop' | 'room' | 'social'>('care');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

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

  const handleCareAction = (action: string) => {
    const newStats = { ...stats };
    let message = '';
    
    switch (action) {
      case 'feed':
        newStats.hunger = Math.min(100, newStats.hunger + 25);
        newStats.happiness = Math.min(100, newStats.happiness + 10);
        newStats.xp += 5;
        newStats.piCoins += 2;
        message = `${selectedDroplet.name} loved the meal! 🍎`;
        break;
      case 'clean':
        newStats.energy = Math.min(100, newStats.energy + 20);
        newStats.happiness = Math.min(100, newStats.happiness + 15);
        newStats.xp += 5;
        newStats.piCoins += 2;
        message = `${selectedDroplet.name} feels fresh and clean! ✨`;
        break;
      case 'play':
        newStats.happiness = Math.min(100, newStats.happiness + 30);
        newStats.energy = Math.max(0, newStats.energy - 10);
        newStats.bondLevel = Math.min(10, newStats.bondLevel + 0.1);
        newStats.xp += 10;
        newStats.piCoins += 3;
        message = `${selectedDroplet.name} had so much fun playing! 🎮`;
        break;
      case 'teach':
        newStats.intelligence = Math.min(100, newStats.intelligence + 15);
        newStats.energy = Math.max(0, newStats.energy - 5);
        newStats.xp += 8;
        newStats.piCoins += 2;
        message = `${selectedDroplet.name} learned something new! 📚`;
        break;
    }
    
    setStats(newStats);
    showFloatingHearts();
    toast({ title: message });
  };

  const playMiniGame = (gameId: string) => {
    const game = MINI_GAMES.find(g => g.id === gameId);
    const newStats = { ...stats };
    newStats.happiness = Math.min(100, newStats.happiness + 20);
    newStats.intelligence = Math.min(100, newStats.intelligence + 10);
    newStats.xp += 15;
    newStats.piCoins += 5;
    
    setStats(newStats);
    showFloatingHearts();
    toast({ 
      title: `${game?.name} completed!`, 
      description: `${selectedDroplet.name} earned 5 PiCoins and XP!` 
    });
  };

  const renderDropletAvatar = () => (
    <div className="relative flex items-center justify-center h-48">
      <motion.div
        animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Main Droplet Body - Water Drop Shape */}
        <div className="relative">
          <svg width="120" height="150" viewBox="0 0 120 150" className="drop-shadow-lg">
            {/* Gradient Definition */}
            <defs>
              <radialGradient id="dropletGradient" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="50%" stopColor="#4FC3F7" />
                <stop offset="100%" stopColor="#29B6F6" />
              </radialGradient>
              <radialGradient id="highlightGradient" cx="0.5" cy="0.5" r="0.6">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </radialGradient>
            </defs>
            
            {/* Main Water Drop Shape */}
            <path
              d="M60 10 C40 35, 25 60, 25 90 C25 115, 40 130, 60 130 C80 130, 95 115, 95 90 C95 60, 80 35, 60 10 Z"
              fill="url(#dropletGradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            
            {/* Main Highlight */}
            <ellipse
              cx="45"
              cy="50"
              rx="12"
              ry="18"
              fill="url(#highlightGradient)"
            />
            
            {/* Smaller Highlight */}
            <ellipse
              cx="50"
              cy="40"
              rx="4"
              ry="6"
              fill="rgba(255,255,255,0.9)"
            />
          </svg>
          
          {/* Eyes */}
          <div className="absolute top-12 left-8 flex gap-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 bg-blue-900 rounded-full relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 bg-blue-900 rounded-full relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Mouth */}
          <div className="absolute top-20 left-12">
            <div className="w-10 h-6 bg-gradient-to-b from-red-400 to-red-500 rounded-full border-2 border-red-600 shadow-sm"></div>
          </div>
          
          {/* Blush Marks */}
          <div className="absolute top-16 left-4">
            <div className="w-4 h-3 bg-pink-300 rounded-full opacity-70"></div>
          </div>
          <div className="absolute top-16 right-4">
            <div className="w-4 h-3 bg-pink-300 rounded-full opacity-70"></div>
          </div>
          
          {/* Accessories based on selected droplet */}
          {selectedDroplet.accessories.includes('bow') && (
            <div className="absolute -top-2 left-10">
              <div className="w-10 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded transform rotate-12 shadow-lg border-2 border-red-600"></div>
              <div className="absolute top-1 left-3 w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          )}
          
          {selectedDroplet.accessories.includes('glasses') && (
            <div className="absolute top-10 left-6">
              <div className="w-24 h-10 border-4 border-blue-800 rounded-full bg-transparent shadow-lg">
                <div className="absolute left-2 top-1 w-7 h-6 border-2 border-blue-800 rounded-full bg-white/20"></div>
                <div className="absolute right-2 top-1 w-7 h-6 border-2 border-blue-800 rounded-full bg-white/20"></div>
              </div>
            </div>
          )}
          
          {selectedDroplet.accessories.includes('hat') && (
            <div className="absolute -top-6 left-6">
              <div className="w-20 h-12 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full border-4 border-orange-600 shadow-lg"></div>
              <div className="absolute top-8 left-2 w-16 h-4 bg-orange-600 rounded-full"></div>
            </div>
          )}
          
          {selectedDroplet.accessories.includes('medal') && (
            <div className="absolute top-24 left-12">
              <div className="w-10 h-10 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full border-4 border-yellow-600 shadow-lg flex items-center justify-center">
                <span className="text-yellow-800 font-bold text-lg">π</span>
              </div>
              <div className="absolute -top-2 left-4 w-2 h-4 bg-red-500 transform -rotate-12"></div>
            </div>
          )}
          
          {selectedDroplet.accessories.includes('hair') && (
            <div className="absolute -top-4 left-8">
              <div className="w-16 h-8 bg-gradient-to-b from-purple-300 to-purple-400 rounded-t-full border-2 border-purple-500 shadow-lg"></div>
              <div className="absolute top-2 left-2 w-3 h-6 bg-purple-400 rounded transform -rotate-12"></div>
              <div className="absolute top-2 right-2 w-3 h-6 bg-purple-400 rounded transform rotate-12"></div>
            </div>
          )}
          
          {selectedDroplet.accessories.includes('bowtie') && (
            <div className="absolute top-28 left-11">
              <div className="w-8 h-4 bg-gradient-to-r from-purple-500 to-purple-600 transform rotate-45 shadow-lg"></div>
              <div className="absolute top-0 left-1 w-6 h-4 bg-gradient-to-r from-purple-600 to-purple-700 transform -rotate-45"></div>
              <div className="absolute top-1 left-2 w-4 h-2 bg-purple-800 rounded-full"></div>
            </div>
          )}
        </div>
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

  const renderCareView = () => (
    <div className="space-y-6">
      {/* Droplet Display */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-cyan-600">{selectedDroplet.name}</h2>
            <Badge variant="secondary" className="mt-1">
              Level {stats.level} {selectedDroplet.stage}
            </Badge>
          </div>
          {renderDropletAvatar()}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Pet Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                Happiness
              </span>
              <span>{stats.happiness}/100</span>
            </div>
            <Progress value={stats.happiness} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                Energy
              </span>
              <span>{stats.energy}/100</span>
            </div>
            <Progress value={stats.energy} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Utensils className="w-4 h-4 text-green-500" />
                Hunger
              </span>
              <span>{stats.hunger}/100</span>
            </div>
            <Progress value={stats.hunger} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Brain className="w-4 h-4 text-purple-500" />
                Intelligence
              </span>
              <span>{stats.intelligence}/100</span>
            </div>
            <Progress value={stats.intelligence} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Bond Level
              </span>
              <span>{stats.bondLevel.toFixed(1)}/10</span>
            </div>
            <Progress value={stats.bondLevel * 10} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Care Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Take Care</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => handleCareAction('feed')}
              className="h-16 flex flex-col gap-2 bg-green-500 hover:bg-green-600"
            >
              <Utensils className="w-6 h-6" />
              <span>Feed</span>
            </Button>
            <Button 
              onClick={() => handleCareAction('clean')}
              className="h-16 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Sparkles className="w-6 h-6" />
              <span>Clean</span>
            </Button>
            <Button 
              onClick={() => handleCareAction('play')}
              className="h-16 flex flex-col gap-2 bg-pink-500 hover:bg-pink-600"
            >
              <GamepadIcon className="w-6 h-6" />
              <span>Play</span>
            </Button>
            <Button 
              onClick={() => handleCareAction('teach')}
              className="h-16 flex flex-col gap-2 bg-purple-500 hover:bg-purple-600"
            >
              <Brain className="w-6 h-6" />
              <span>Teach</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGamesView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GamepadIcon className="w-5 h-5" />
            Mini Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {MINI_GAMES.map(game => (
              <Card key={game.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{game.icon}</span>
                    <div>
                      <h3 className="font-semibold">{game.name}</h3>
                      <p className="text-sm text-gray-600">{game.description}</p>
                    </div>
                  </div>
                  <Button onClick={() => playMiniGame(game.id)} size="sm">
                    Play
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderShopView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Pi Shop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Shop Coming Soon!</h3>
            <p className="text-gray-500">
              Buy accessories, furniture, and special items for your Droplet
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>My Pet Droplet - Care for Your Virtual Water Spirit</title>
        <meta name="description" content="Raise and bond with your very own Droplet! A cute virtual pet game with mini-games, customization, and Pi rewards." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
              My Pet Droplet
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                <span className="text-yellow-600 font-semibold">π {stats.piCoins}</span>
              </div>
              <div className="flex items-center gap-1 bg-purple-100 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span className="text-purple-600 font-semibold">XP {stats.xp}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'care', label: 'Pet Care', icon: Heart },
              { id: 'games', label: 'Mini Games', icon: GamepadIcon },
              { id: 'shop', label: 'Pi Shop', icon: ShoppingBag },
              { id: 'room', label: 'Leveling', icon: Home },
              { id: 'social', label: 'Social', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentView === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView(id as any)}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'care' && renderCareView()}
              {currentView === 'games' && renderGamesView()}
              {currentView === 'shop' && renderShopView()}
              {(currentView === 'room' || currentView === 'social') && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Coming Soon!</h3>
                    <p className="text-gray-500">
                      {currentView === 'room' ? 'Room decoration and leveling system' : 'Social features and multiplayer mode'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default MyPetDroplet;
