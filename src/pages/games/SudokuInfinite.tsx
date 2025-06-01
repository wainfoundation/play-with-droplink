
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Heart, 
  Zap, 
  HelpCircle, 
  Trophy,
  RefreshCw
} from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { toast } from '@/hooks/use-toast';
import RewardedAdButton from '@/components/RewardedAdButton';
import { usePiPayment } from '@/hooks/usePiPayment';

const SudokuInfinite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character, userStats } = location.state || {};
  const { handleSubscribe } = usePiPayment();
  
  const [gameStats, setGameStats] = useState({
    currentLevel: 1,
    lives: userStats?.lives || 5,
    score: 0,
    hintsUsed: 0,
    timeElapsed: 0,
    piCoins: userStats?.piCoins || 0,
    boosts: userStats?.boosts || 3
  });

  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>([]);

  useEffect(() => {
    // Generate initial Sudoku puzzle
    generateSudokuPuzzle();
  }, []);

  const generateSudokuPuzzle = () => {
    // Simple 9x9 Sudoku board generation (simplified for demo)
    const board = Array(9).fill(null).map(() => Array(9).fill(0));
    // Add some pre-filled numbers
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = Math.floor(Math.random() * 9) + 1;
      if (board[row][col] === 0) {
        board[row][col] = num;
      }
    }
    setSudokuBoard(board);
  };

  const handleBuyLives = async () => {
    try {
      if (gameStats.piCoins >= 1) {
        setGameStats(prev => ({
          ...prev,
          lives: prev.lives + 3,
          piCoins: prev.piCoins - 1
        }));
        toast({
          title: "Lives Purchased!",
          description: "You got 3 additional lives!",
        });
      } else {
        toast({
          title: "Insufficient Pi Coins",
          description: "You need 1 Pi coin to buy lives.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error buying lives:', error);
    }
  };

  const handleBuyHint = async () => {
    try {
      if (gameStats.piCoins >= 0.5) {
        setGameStats(prev => ({
          ...prev,
          piCoins: prev.piCoins - 0.5,
          hintsUsed: prev.hintsUsed + 1
        }));
        toast({
          title: "Hint Purchased!",
          description: "Use your hint wisely!",
        });
      } else {
        toast({
          title: "Insufficient Pi Coins",
          description: "You need 0.5 Pi coins for a hint.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error buying hint:', error);
    }
  };

  const handleAdReward = (reward: any) => {
    setGameStats(prev => ({
      ...prev,
      piCoins: prev.piCoins + reward.amount
    }));
  };

  const handleNextLevel = () => {
    setGameStats(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      score: prev.score + 100 * prev.currentLevel
    }));
    generateSudokuPuzzle();
    setGameState('playing');
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/play')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sudoku Infinite - Level {gameStats.currentLevel} | Droplink Gaming</title>
        <meta name="description" content="Play infinite Sudoku levels with Pi Network rewards and power-ups!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => navigate('/play')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sudoku Infinite - Level {gameStats.currentLevel}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Score: {gameStats.score}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Game Board */}
            <div className="lg:col-span-3">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    Level {gameStats.currentLevel} - Unlimited Sudoku Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {gameState === 'menu' ? (
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">🧩</div>
                      <h2 className="text-2xl font-bold">Ready to Challenge Your Mind?</h2>
                      <p className="text-gray-600">
                        Each level gets progressively harder with unlimited challenges ahead!
                      </p>
                      <Button 
                        size="lg"
                        onClick={() => setGameState('playing')}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Start Level {gameStats.currentLevel}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Sudoku Grid */}
                      <div className="grid grid-cols-9 gap-1 max-w-md mx-auto bg-gray-800 p-2 rounded-lg">
                        {sudokuBoard.map((row, rowIndex) =>
                          row.map((cell, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-blue-50"
                              onClick={() => {
                                // Handle cell click logic here
                                console.log(`Clicked cell: ${rowIndex}, ${colIndex}`);
                              }}
                            >
                              {cell !== 0 ? cell : ''}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => setGameState('paused')}>
                          Pause Game
                        </Button>
                        <Button onClick={handleNextLevel}>
                          Complete Level (Demo)
                        </Button>
                        <Button variant="outline" onClick={generateSudokuPuzzle}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          New Puzzle
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Character Companion */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center">
                      <CharacterRenderer character={character} size={100} />
                    </div>
                    <CardTitle className="text-lg">{character.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-center text-sm text-gray-600">
                      "You're doing amazing! Keep going!"
                    </div>
                  </CardContent>
                </Card>

                {/* Game Stats */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Lives:</span>
                      <Badge variant="outline" className="text-red-600">
                        <Heart className="w-3 h-3 mr-1" />
                        {gameStats.lives}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pi Coins:</span>
                      <Badge variant="outline" className="text-yellow-600">
                        π {gameStats.piCoins}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Boosts:</span>
                      <Badge variant="outline" className="text-blue-600">
                        <Zap className="w-3 h-3 mr-1" />
                        {gameStats.boosts}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hints Used:</span>
                      <Badge variant="outline">
                        <HelpCircle className="w-3 h-3 mr-1" />
                        {gameStats.hintsUsed}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Power-ups Store */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Power-ups</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={handleBuyLives}
                      disabled={gameStats.piCoins < 1}
                    >
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-red-500" />
                        3 Lives
                      </span>
                      <span>1 π</span>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={handleBuyHint}
                      disabled={gameStats.piCoins < 0.5}
                    >
                      <span className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2 text-blue-500" />
                        Hint
                      </span>
                      <span>0.5 π</span>
                    </Button>

                    <RewardedAdButton
                      reward={{ type: "pi", amount: 0.1, description: "Watch ad for Pi coins" }}
                      onAdComplete={handleAdReward}
                      onAdError={(error) => console.error('Ad error:', error)}
                      buttonText="Watch Ad"
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SudokuInfinite;
