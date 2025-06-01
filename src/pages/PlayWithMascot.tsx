import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Trophy, Clock, Star, Heart, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import GameEngine from '@/components/games/GameEngine';
import PetCareGame from '@/components/games/PetCareGame';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';

const games = [
  {
    id: 'block-connect',
    name: 'Block Connect',
    category: 'puzzle',
    difficulty: 'easy',
    description: 'Connect matching blocks to clear the board in this addictive puzzle game!',
    emoji: '🧱',
    color: 'from-blue-400 to-purple-500',
    features: ['Puzzle', 'Logic', 'Strategy', 'Relaxing'],
    estimatedTime: '5-10 min',
    isNew: true
  },
  {
    id: 'color-merge',
    name: 'Color Merge',
    category: 'puzzle',
    difficulty: 'medium',
    description: 'Merge tiles of the same color to clear the board and score points!',
    emoji: '🎨',
    color: 'from-red-400 to-yellow-500',
    features: ['Matching', 'Strategy', 'Quick Thinking'],
    estimatedTime: '3-7 min',
    isNew: true
  },
  {
    id: 'sudoku-classic',
    name: 'Sudoku Classic',
    category: 'puzzle',
    difficulty: 'hard',
    description: 'Test your logic skills with this classic number puzzle game!',
    emoji: '🔢',
    color: 'from-green-400 to-blue-500',
    features: ['Logic', 'Numbers', 'Brain Training'],
    estimatedTime: '10-20 min',
    isNew: false
  },
  {
    id: 'click-mania',
    name: 'Click Mania',
    category: 'action',
    difficulty: 'easy',
    description: 'Click as fast as you can to score points before the time runs out!',
    emoji: '👆',
    color: 'from-pink-500 to-red-500',
    features: ['Action', 'Speed', 'Clicking'],
    estimatedTime: '1-3 min',
    isNew: false
  },
  {
    id: 'trivia-time',
    name: 'Trivia Time',
    category: 'trivia',
    difficulty: 'medium',
    description: 'Test your knowledge with fun trivia questions and earn rewards!',
    emoji: '❓',
    color: 'from-yellow-400 to-green-500',
    features: ['Trivia', 'Knowledge', 'Questions'],
    estimatedTime: '5-10 min',
    isNew: false
  },
  {
    id: 'creative-canvas',
    name: 'Creative Canvas',
    category: 'creative',
    difficulty: 'easy',
    description: 'Unleash your creativity and create beautiful artwork on your own canvas!',
    emoji: '🎨',
    color: 'from-purple-500 to-pink-500',
    features: ['Creative', 'Drawing', 'Art'],
    estimatedTime: '∞',
    isNew: false
  },
  {
    id: 'infinite-runner',
    name: 'Infinite Runner',
    category: 'infinite',
    difficulty: 'medium',
    description: 'Run as far as you can and avoid obstacles in this endless runner game!',
    emoji: '🏃',
    color: 'from-blue-500 to-green-500',
    features: ['Infinite', 'Running', 'Obstacles'],
    estimatedTime: '∞',
    isNew: false
  },
  {
    id: 'pet-care',
    name: 'My Pet Droplet',
    category: 'pet-care',
    difficulty: 'easy',
    description: 'Take care of your adorable pet droplet! Feed, clean, play, and watch it grow.',
    emoji: '🐾',
    color: 'from-pink-400 to-purple-600',
    features: ['Pet Care', 'Pi Shop', 'Mini Games', 'Leveling'],
    estimatedTime: '∞',
    isNew: true
  }
];

interface PlayWithMascotProps {}

const PlayWithMascot: React.FC<PlayWithMascotProps> = () => {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [showPetCare, setShowPetCare] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    highScore: 0,
    timeSpent: 0
  });

  const isMobile = useIsMobile();

  const handleGameSelect = (game: any) => {
    if (game.id === 'pet-care') {
      setShowPetCare(true);
    } else {
      setSelectedGame(game);
    }
  };

  const handleGameComplete = (score: number) => {
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score,
      highScore: Math.max(prev.highScore, score)
    }));

    toast({
      title: "Game Complete! 🎉",
      description: `You scored ${score} points!`,
    });
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setShowPetCare(false);
  };

  if (showPetCare) {
    return (
      <>
        <Helmet>
          <title>My Pet Droplet - Play with Droplink</title>
          <meta name="description" content="Take care of your adorable pet droplet in this cute pet care game!" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
          <PetCareGame onBack={handleBackToGames} />
        </div>
      </>
    );
  }

  if (selectedGame) {
    return (
      <>
        <Helmet>
          <title>{selectedGame.name} - Play with Droplink</title>
          <meta name="description" content={`Play ${selectedGame.name} - ${selectedGame.description}`} />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
          <GameEngine 
            game={selectedGame} 
            onBack={handleBackToGames}
            onGameComplete={handleGameComplete}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play with Droplink - Your Pi Gaming Hub</title>
        <meta name="description" content="Play amazing games with your Droplink character companion and earn rewards!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <CharacterRenderer character={selectedCharacter} size={80} />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Play with Droplink
                </h1>
                <p className="text-gray-600 mt-2">Choose your adventure and have fun!</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="font-bold text-xl">{gameStats.gamesPlayed}</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="font-bold text-xl">{gameStats.highScore}</div>
                <div className="text-sm text-gray-600">High Score</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="font-bold text-xl">{gameStats.totalScore}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="font-bold text-xl">{Math.floor(gameStats.timeSpent / 60)}m</div>
                <div className="text-sm text-gray-600">Time Played</div>
              </CardContent>
            </Card>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${game.color}`}>
                        {game.emoji}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {game.isNew && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            NEW
                          </Badge>
                        )}
                        <Badge variant="outline">{game.category}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {game.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {game.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {game.features.map((feature: string) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{game.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (game.difficulty === 'easy' ? 1 : game.difficulty === 'medium' ? 2 : 3)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full group-hover:scale-105 transition-transform"
                        onClick={() => handleGameSelect(game)}
                      >
                        {game.id === 'pet-care' ? (
                          <>
                            <Heart className="w-4 h-4 mr-2" />
                            Take Care
                          </>
                        ) : (
                          <>
                            <Gamepad2 className="w-4 h-4 mr-2" />
                            Play Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Special Pet Care Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">🐾</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">New: My Pet Droplet!</h3>
                    <p className="text-gray-600 mb-3">
                      Experience the joy of pet care with your very own adorable droplet companion! 
                      Feed, clean, play, and watch your pet grow with love and care.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-pink-500">Pet Care</Badge>
                      <Badge className="bg-purple-500">Pi Shop</Badge>
                      <Badge className="bg-blue-500">Mini Games</Badge>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    onClick={() => handleGameSelect({ id: 'pet-care' })}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Caring
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PlayWithMascot;
