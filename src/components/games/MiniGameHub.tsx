
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Trophy, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { toast } from '@/hooks/use-toast';

interface MiniGame {
  id: string;
  name: string;
  description: string;
  emoji: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  playTime: number; // seconds
}

const miniGames: MiniGame[] = [
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Match pairs of cards to earn coins!',
    emoji: '🧠',
    reward: 3,
    difficulty: 'easy',
    playTime: 60
  },
  {
    id: 'fruit-catch',
    name: 'Fruit Catch',
    description: 'Catch falling fruits for your pet!',
    emoji: '🍎',
    reward: 5,
    difficulty: 'medium',
    playTime: 45
  },
  {
    id: 'bubble-pop',
    name: 'Bubble Pop',
    description: 'Pop bubbles to clean your pet!',
    emoji: '🫧',
    reward: 4,
    difficulty: 'easy',
    playTime: 30
  },
  {
    id: 'puzzle-solver',
    name: 'Puzzle Solver',
    description: 'Solve puzzles to boost pet happiness!',
    emoji: '🧩',
    reward: 7,
    difficulty: 'hard',
    playTime: 90
  }
];

interface MiniGameHubProps {
  onBack: () => void;
}

const MiniGameHub: React.FC<MiniGameHubProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addCoins } = useWallet();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const playGame = (game: MiniGame) => {
    setSelectedGame(game);
    setIsPlaying(true);
    
    // Simulate game play
    setTimeout(() => {
      setIsPlaying(false);
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        addCoins(game.reward, 'minigame');
        toast({
          title: "Game Complete!",
          description: `You earned ${game.reward} coins playing ${game.name}!`,
          className: "bg-green-50 border-green-200"
        });
      } else {
        toast({
          title: "Try Again!",
          description: `Better luck next time with ${game.name}!`,
          variant: "destructive"
        });
      }
      setSelectedGame(null);
    }, game.playTime * 1000);
  };

  if (isPlaying && selectedGame) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">{selectedGame.emoji}</div>
          <h2 className="text-3xl font-bold mb-4">Playing {selectedGame.name}</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Game in progress...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
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
          <p className="text-gray-600">Play games to earn coins and XP!</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {miniGames.map(game => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{game.emoji}</div>
                <CardTitle className="text-xl">{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">{game.description}</p>
                
                <div className="flex justify-center gap-2">
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {game.reward} coins
                  </Badge>
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  Play time: {game.playTime}s
                </div>
                
                <Button
                  onClick={() => playGame(game)}
                  className="w-full"
                  disabled={isPlaying}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>How Mini Games Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="font-semibold mb-1">Play Games</h3>
              <p className="text-sm text-gray-600">Choose from various mini-games</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold mb-1">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Get coins and XP for completing games</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🛍️</div>
              <h3 className="font-semibold mb-1">Buy Items</h3>
              <p className="text-sm text-gray-600">Use coins to buy items for your pet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniGameHub;
