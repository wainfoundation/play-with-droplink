
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import CatchTheFruitGame from './CatchTheFruitGame';

interface MiniGameHubEnhancedProps {
  onBack: () => void;
}

const MiniGameHubEnhanced: React.FC<MiniGameHubEnhancedProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const availableGames = [
    {
      id: 'catch-fruit',
      name: 'Catch the Fruit',
      description: 'Test your reflexes by catching falling fruits!',
      emoji: '🍎',
      type: 'Reflex',
      difficulty: 'Easy',
      rewards: 'Coins + Mood',
      component: CatchTheFruitGame
    }
  ];

  const comingSoonGames = [
    {
      id: 'clean-up',
      name: 'Clean Up Time',
      description: 'Drag soap and shampoo to clean your pet!',
      emoji: '🧼',
      type: 'Drag & Drop',
      difficulty: 'Medium',
      rewards: 'Hygiene + Energy'
    },
    {
      id: 'memory-match',
      name: 'Memory Match',
      description: 'Flip cards to find matching pairs!',
      emoji: '🧠',
      type: 'Puzzle',
      difficulty: 'Medium',
      rewards: 'XP + Coins'
    },
    {
      id: 'pet-quiz',
      name: 'Pet Quiz',
      description: 'Answer pet-themed trivia questions!',
      emoji: '❓',
      type: 'Trivia',
      difficulty: 'Easy',
      rewards: 'XP + Coins'
    },
    {
      id: 'daily-spin',
      name: 'Daily Spin',
      description: 'Spin the wheel for daily rewards!',
      emoji: '🎰',
      type: 'Luck',
      difficulty: 'Easy',
      rewards: 'Random'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedGame) {
    const game = availableGames.find(g => g.id === selectedGame);
    if (game?.component) {
      const GameComponent = game.component;
      return <GameComponent />;
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center gap-2 justify-center">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Mini Games
          </h1>
          <p className="text-gray-600">Play games to earn coins and boost your pet's stats!</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Available Games */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          Available Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGames.map(game => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedGame(game.id)}>
                <CardHeader className="text-center">
                  <div className="text-6xl mb-2">{game.emoji}</div>
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center min-h-[3rem]">{game.description}</p>
                  
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Badge variant="outline">{game.type}</Badge>
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Rewards:</div>
                    <div className="text-sm font-medium text-green-600">{game.rewards}</div>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming Soon Games */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-600">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonGames.map(game => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full opacity-75">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{game.emoji}</div>
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-center text-sm min-h-[2.5rem]">{game.description}</p>
                  
                  <div className="flex justify-center gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">{game.type}</Badge>
                    <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Rewards:</div>
                    <div className="text-xs font-medium text-green-600">{game.rewards}</div>
                  </div>
                  
                  <Button disabled className="w-full" size="sm">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>How Mini Games Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-semibold mb-2">Play Games</h3>
              <p className="text-sm text-gray-600">Choose from various mini-games to challenge yourself</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Get coins, XP, and boost your pet's mood and stats</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🛍️</div>
              <h3 className="font-semibold mb-2">Buy Items</h3>
              <p className="text-sm text-gray-600">Use earned coins to purchase items for your pet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniGameHubEnhanced;
