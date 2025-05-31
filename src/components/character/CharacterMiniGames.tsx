
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CharacterCustomization } from './types';

interface MiniGame {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewardRange: [number, number];
  unlockLevel: number;
}

interface CharacterMiniGamesProps {
  character: CharacterCustomization;
  onGameComplete: (score: number) => void;
}

const CharacterMiniGames: React.FC<CharacterMiniGamesProps> = ({
  character,
  onGameComplete
}) => {
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  const miniGames: MiniGame[] = [
    { 
      id: 'bubble-pop', 
      name: 'Bubble Pop', 
      icon: '🫧', 
      description: 'Pop colorful bubbles!',
      difficulty: 'easy',
      rewardRange: [10, 30],
      unlockLevel: 1
    },
    { 
      id: 'memory-match', 
      name: 'Memory Match', 
      icon: '🧠', 
      description: 'Match the cards!',
      difficulty: 'medium',
      rewardRange: [20, 50],
      unlockLevel: 2
    },
    { 
      id: 'color-splash', 
      name: 'Color Splash', 
      icon: '🎨', 
      description: 'Mix and match colors!',
      difficulty: 'easy',
      rewardRange: [15, 35],
      unlockLevel: 1
    },
    { 
      id: 'puzzle-master', 
      name: 'Puzzle Master', 
      icon: '🧩', 
      description: 'Solve challenging puzzles!',
      difficulty: 'hard',
      rewardRange: [30, 70],
      unlockLevel: 3
    },
    { 
      id: 'rhythm-dance', 
      name: 'Rhythm Dance', 
      icon: '💃', 
      description: 'Dance to the beat!',
      difficulty: 'medium',
      rewardRange: [25, 55],
      unlockLevel: 2
    },
    { 
      id: 'treasure-hunt', 
      name: 'Treasure Hunt', 
      icon: '🗺️', 
      description: 'Find hidden treasures!',
      difficulty: 'hard',
      rewardRange: [40, 80],
      unlockLevel: 3
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-200 text-green-800';
      case 'medium': return 'bg-yellow-200 text-yellow-800';
      case 'hard': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const playGame = (game: MiniGame) => {
    setPlayingGame(game.id);
    
    // Simulate game play with random result
    setTimeout(() => {
      const score = Math.floor(
        Math.random() * (game.rewardRange[1] - game.rewardRange[0] + 1) + game.rewardRange[0]
      );
      onGameComplete(score);
      setPlayingGame(null);
    }, 2000 + Math.random() * 3000); // 2-5 seconds
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎮 Mini Games
          </CardTitle>
          <p className="text-sm text-gray-600">
            Play fun games to earn coins for your character!
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miniGames.map((game) => {
          const isPlaying = playingGame === game.id;
          const isUnlocked = character.tutorial_completed; // For now, all unlock after tutorial

          return (
            <Card 
              key={game.id}
              className={`transition-all hover:shadow-md ${!isUnlocked ? 'opacity-75' : ''}`}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">{game.icon}</div>
                  
                  <div>
                    <h3 className="font-bold text-lg">{game.name}</h3>
                    <p className="text-sm text-gray-600">{game.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      💰 {game.rewardRange[0]}-{game.rewardRange[1]}
                    </Badge>
                  </div>
                  
                  {isPlaying ? (
                    <div className="space-y-2">
                      <div className="animate-spin text-2xl">🎮</div>
                      <p className="text-sm text-blue-600">Playing...</p>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => playGame(game)}
                      disabled={!isUnlocked || isPlaying}
                    >
                      {!isUnlocked ? 'Complete Tutorial First' : 'Play Game'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!character.tutorial_completed && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-yellow-700">
                Complete the tutorial to unlock all mini games!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CharacterMiniGames;
