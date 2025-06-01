import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Star, Heart, RefreshCw, Clock, Zap, Users, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SudokuBoard from '@/components/games/sudoku/SudokuBoard';
import SudokuLeaderboard from '@/components/games/sudoku/SudokuLeaderboard';
import SudokuDuelMode from '@/components/games/sudoku/SudokuDuelMode';
import SudokuDailyChallenge from '@/components/games/sudoku/SudokuDailyChallenge';
import HintsModal from '@/components/games/sudoku/HintsModal';
import { generateSudokuPuzzle, validateSudokuMove, checkSudokuComplete } from '@/utils/sudokuGenerator';
import { usePiPayment } from '@/hooks/usePiPayment';

interface SudokuClassicEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

interface GameState {
  board: number[][];
  solution: number[][];
  level: number;
  lives: number;
  score: number;
  time: number;
  hints: number;
  gameMode: 'infinite' | 'daily' | 'duel';
  isPlaying: boolean;
  gameOver: boolean;
  selectedCell: { row: number; col: number } | null;
  pencilMode: boolean;
  mistakes: number;
  gameBlocked: boolean;
}

const SudokuClassicEngine: React.FC<SudokuClassicEngineProps> = ({ onBack, onGameComplete }) => {
  const isMobile = useIsMobile();
  
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    solution: [],
    level: 1,
    lives: 3,
    score: 0,
    time: 0,
    hints: 3,
    gameMode: 'infinite',
    isPlaying: false,
    gameOver: false,
    selectedCell: null,
    pencilMode: false,
    mistakes: 0,
    gameBlocked: false
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'pi'>('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHintsModal, setShowHintsModal] = useState(false);
  const { createPayment, loading: paymentLoading } = usePiPayment();

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && !gameState.gameBlocked) {
      const timer = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.isPlaying, gameState.gameOver, gameState.gameBlocked]);

  // Load saved game on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('sudoku-classic-save');
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        setGameState(prev => ({ ...prev, ...parsed, isPlaying: false }));
      } catch (error) {
        console.error('Failed to load saved game:', error);
      }
    }
  }, []);

  // Auto-save game state
  useEffect(() => {
    if (gameState.board.length > 0) {
      localStorage.setItem('sudoku-classic-save', JSON.stringify({
        board: gameState.board,
        solution: gameState.solution,
        level: gameState.level,
        score: gameState.score,
        time: gameState.time,
        hints: gameState.hints
      }));
    }
  }, [gameState.board, gameState.level, gameState.score, gameState.time, gameState.hints]);

  const getDifficultyLevel = (level: number): 'easy' | 'medium' | 'hard' | 'expert' | 'insane' => {
    if (level <= 10) return 'easy';
    if (level <= 50) return 'medium';
    if (level <= 200) return 'hard';
    if (level <= 1000) return 'expert';
    return 'insane';
  };

  const startNewGame = useCallback(() => {
    const difficulty = getDifficultyLevel(gameState.level);
    const { puzzle, solution } = generateSudokuPuzzle(difficulty);
    
    setGameState(prev => ({
      ...prev,
      board: puzzle,
      solution: solution,
      isPlaying: true,
      gameOver: false,
      gameBlocked: false,
      selectedCell: null,
      time: 0,
      mistakes: 0,
      lives: 3
    }));

    if (soundEnabled) {
      console.log('🎵 Game start sound');
    }

    toast({
      title: `Level ${gameState.level} Started!`,
      description: `Difficulty: ${difficulty.toUpperCase()}`,
    });
  }, [gameState.level, soundEnabled]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState.isPlaying || gameState.gameOver || gameState.gameBlocked) return;
    
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col }
    }));

    if (soundEnabled) {
      console.log('🎵 Cell select sound');
    }
  };

  const handleNumberInput = (number: number) => {
    if (!gameState.selectedCell || !gameState.isPlaying || gameState.gameBlocked) return;
    
    const { row, col } = gameState.selectedCell;
    
    // Check if cell is editable (was originally empty)
    const originalPuzzle = generateSudokuPuzzle(getDifficultyLevel(gameState.level)).puzzle;
    if (originalPuzzle[row][col] !== 0) return;

    const newBoard = [...gameState.board];
    newBoard[row][col] = number;

    // Validate move
    const isValid = validateSudokuMove(newBoard, row, col, number);
    
    if (!isValid) {
      setGameState(prev => {
        const newLives = prev.lives - 1;
        const newMistakes = prev.mistakes + 1;
        
        if (newLives <= 0) {
          return {
            ...prev,
            gameOver: true,
            isPlaying: false,
            mistakes: newMistakes
          };
        }
        
        return {
          ...prev,
          lives: newLives,
          mistakes: newMistakes
        };
      });

      if (soundEnabled) {
        console.log('🎵 Error sound');
      }

      toast({
        title: "Incorrect Move!",
        description: `Lives remaining: ${gameState.lives - 1}`,
        variant: "destructive",
      });

      return;
    }

    // Valid move
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      score: prev.score + 10
    }));

    if (soundEnabled) {
      console.log('🎵 Success sound');
    }

    // Check if puzzle is complete
    if (checkSudokuComplete(newBoard)) {
      const levelBonus = gameState.level * 100;
      const timeBonus = Math.max(0, 300 - gameState.time) * 2;
      const totalScore = gameState.score + levelBonus + timeBonus;

      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        score: totalScore,
        level: prev.level + 1
      }));

      onGameComplete(totalScore);

      toast({
        title: "Level Complete! 🎉",
        description: `Score: ${totalScore} | Next: Level ${gameState.level + 1}`,
      });

      // Auto-start next level after 2 seconds
      setTimeout(() => {
        startNewGame();
      }, 2000);
    }
  };

  const handleHint = () => {
    if (gameState.hints <= 0) {
      // Block the game and show hints modal
      setGameState(prev => ({ ...prev, gameBlocked: true }));
      setShowHintsModal(true);
      return;
    }

    if (!gameState.selectedCell) {
      toast({
        title: "Select a Cell",
        description: "Please select a cell first to get a hint.",
        variant: "destructive",
      });
      return;
    }

    const { row, col } = gameState.selectedCell;
    const correctNumber = gameState.solution[row][col];
    
    const newBoard = [...gameState.board];
    newBoard[row][col] = correctNumber;

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      hints: prev.hints - 1,
      score: prev.score + 5
    }));

    toast({
      title: "Hint Used!",
      description: `Hints remaining: ${gameState.hints - 1}`,
    });
  };

  const handleWatchAd = () => {
    // Grant 3 hints after watching ad
    setGameState(prev => ({
      ...prev,
      hints: prev.hints + 3,
      gameBlocked: false
    }));
    
    setShowHintsModal(false);
    
    toast({
      title: "Ad Reward Received!",
      description: "You got 3 more hints! Thanks for watching.",
    });
  };

  const handlePayPi = async () => {
    try {
      await createPayment({
        amount: 1,
        memo: "Sudoku Hints - 3 hints purchase",
        metadata: { type: "sudoku_hints", hints: 3 }
      });

      // Grant 3 hints after payment
      setGameState(prev => ({
        ...prev,
        hints: prev.hints + 3,
        gameBlocked: false
      }));
      
      setShowHintsModal(false);
      
      toast({
        title: "Payment Successful!",
        description: "You got 3 more hints! Happy gaming!",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRetryWithAd = () => {
    // Simulate watching an ad
    toast({
      title: "Watching Ad...",
      description: "Get ready to retry!",
    });

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        lives: 3,
        gameOver: false,
        gameBlocked: false,
        isPlaying: true,
        mistakes: 0
      }));

      toast({
        title: "Lives Restored!",
        description: "Thanks for watching the ad. Good luck!",
      });
    }, 3000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderGameStats = () => (
    <div className={`grid grid-cols-4 gap-${isMobile ? '2' : '4'} mb-${isMobile ? '4' : '6'}`}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Trophy className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} text-yellow-500`} />
          <span className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{gameState.score}</span>
        </div>
        <p className="text-xs text-gray-600">Score</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Star className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} text-blue-500`} />
          <span className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{gameState.level}</span>
        </div>
        <p className="text-xs text-gray-600">Level</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Heart className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} text-red-500`} />
          <span className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{gameState.lives}</span>
        </div>
        <p className="text-xs text-gray-600">Lives</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Clock className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} text-green-500`} />
          <span className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{formatTime(gameState.time)}</span>
        </div>
        <p className="text-xs text-gray-600">Time</p>
      </div>
    </div>
  );

  const renderGameControls = () => (
    <div className={`flex flex-wrap gap-2 mb-${isMobile ? '3' : '4'}`}>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "sm"}
        onClick={handleHint}
        disabled={gameState.gameBlocked}
        className={gameState.hints <= 0 ? 'border-red-300 text-red-600' : ''}
      >
        <Zap className="w-4 h-4 mr-1" />
        Hint ({gameState.hints})
      </Button>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "sm"}
        onClick={() => setGameState(prev => ({ ...prev, pencilMode: !prev.pencilMode }))}
        className={gameState.pencilMode ? 'bg-blue-100' : ''}
        disabled={gameState.gameBlocked}
      >
        ✏️ Pencil
      </Button>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "sm"}
        onClick={() => {
          toast({ title: "Undo", description: "Last move undone!" });
        }}
        disabled={gameState.gameBlocked}
      >
        ↶ Undo
      </Button>
    </div>
  );

  const renderNumberPad = () => (
    <div className={`grid grid-cols-5 gap-${isMobile ? '1' : '2'} mt-4`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <Button
          key={num}
          variant="outline"
          className={`h-${isMobile ? '10' : '12'} text-lg font-bold`}
          onClick={() => handleNumberInput(num)}
          disabled={!gameState.selectedCell || gameState.gameBlocked}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        className={`h-${isMobile ? '10' : '12'} text-lg`}
        onClick={() => handleNumberInput(0)}
        disabled={!gameState.selectedCell || gameState.gameBlocked}
      >
        Clear
      </Button>
    </div>
  );

  const renderGameOverScreen = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">💔</div>
      <h3 className="text-xl font-bold mb-2">Game Over!</h3>
      <p className="text-gray-600 mb-2">Level: {gameState.level}</p>
      <p className="text-gray-600 mb-2">Score: {gameState.score}</p>
      <p className="text-gray-600 mb-6">Mistakes: {gameState.mistakes}</p>
      <div className="flex gap-2 justify-center">
        <Button onClick={handleRetryWithAd} variant="outline">
          📺 Retry with Ad
        </Button>
        <Button onClick={() => {
          setGameState(prev => ({ ...prev, level: 1 }));
          startNewGame();
        }}>
          <RefreshCw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>
    </div>
  );

  const renderStartScreen = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🧩</div>
      <h3 className="text-xl font-bold mb-2">Sudoku Classic</h3>
      <p className="text-gray-600 mb-2">Level {gameState.level}</p>
      <p className="text-gray-600 mb-6">Difficulty: {getDifficultyLevel(gameState.level).toUpperCase()}</p>
      <Button onClick={startNewGame} size="lg">
        {gameState.board.length > 0 ? 'Continue Game' : 'Start Game'}
      </Button>
    </div>
  );

  const renderMainContent = () => (
    <div className={isMobile ? 'p-2' : ''}>
      {gameState.gameBlocked && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-center font-medium">
            ⚠️ Game Paused - You need more hints to continue!
          </p>
        </div>
      )}

      <Tabs value={gameState.gameMode} onValueChange={(value) => 
        setGameState(prev => ({ ...prev, gameMode: value as any }))
      }>
        <TabsList className={`grid w-full grid-cols-4 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="infinite">♾️ Infinite</TabsTrigger>
          <TabsTrigger value="daily">📅 Daily</TabsTrigger>
          <TabsTrigger value="leaderboard">🏆 Ranks</TabsTrigger>
          <TabsTrigger value="duel">⚔️ Duel</TabsTrigger>
        </TabsList>

        <TabsContent value="infinite">
          {renderGameStats()}
          
          {!gameState.isPlaying && !gameState.gameOver && renderStartScreen()}
          {gameState.gameOver && renderGameOverScreen()}
          
          {gameState.isPlaying && (
            <>
              {renderGameControls()}
              <div className="flex justify-center mb-4">
                <SudokuBoard
                  board={gameState.board}
                  selectedCell={gameState.selectedCell}
                  onCellClick={handleCellClick}
                  theme={theme}
                />
              </div>
              {renderNumberPad()}
            </>
          )}
        </TabsContent>

        <TabsContent value="daily">
          <SudokuDailyChallenge />
        </TabsContent>

        <TabsContent value="leaderboard">
          <SudokuLeaderboard />
        </TabsContent>

        <TabsContent value="duel">
          <SudokuDuelMode />
        </TabsContent>
      </Tabs>

      {/* Theme Selector */}
      <div className={`flex justify-center gap-2 mt-${isMobile ? '4' : '6'}`}>
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('light')}
        >
          ☀️ Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('dark')}
        >
          🌙 Dark
        </Button>
        <Button
          variant={theme === 'pi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('pi')}
        >
          π Pi Style
        </Button>
      </div>
    </div>
  );

  // Mobile full screen layout
  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="text-lg">🧩</div>
                <span className="font-semibold text-sm">Sudoku Classic</span>
              </div>
              <Badge variant="outline" className="text-xs">{getDifficultyLevel(gameState.level)}</Badge>
            </div>

            {/* Mobile Game Content */}
            <div className="flex-1 overflow-auto">
              {renderMainContent()}
            </div>
          </div>
        </div>

        <HintsModal
          isOpen={showHintsModal}
          onClose={() => {
            setShowHintsModal(false);
            // If user closes without choosing, exit game
            setGameState(prev => ({ 
              ...prev, 
              isPlaying: false, 
              gameOver: true, 
              gameBlocked: false 
            }));
          }}
          onWatchAd={handleWatchAd}
          onPayPi={handlePayPi}
          isLoading={paymentLoading}
        />
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle className="flex items-center gap-2">
              <div className="text-2xl">🧩</div>
              Sudoku Classic
            </CardTitle>
            <Badge variant="outline">{getDifficultyLevel(gameState.level)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderMainContent()}
        </CardContent>
      </Card>

      <HintsModal
        isOpen={showHintsModal}
        onClose={() => {
          setShowHintsModal(false);
          // If user closes without choosing, exit game
          setGameState(prev => ({ 
            ...prev, 
            isPlaying: false, 
            gameOver: true, 
            gameBlocked: false 
          }));
        }}
        onWatchAd={handleWatchAd}
        onPayPi={handlePayPi}
        isLoading={paymentLoading}
      />
    </>
  );
};

export default SudokuClassicEngine;
