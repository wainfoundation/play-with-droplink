
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Star, Heart, RefreshCw, Clock, Zap, Users, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import SudokuBoard from '@/components/games/sudoku/SudokuBoard';
import SudokuLeaderboard from '@/components/games/sudoku/SudokuLeaderboard';
import SudokuDuelMode from '@/components/games/sudoku/SudokuDuelMode';
import SudokuDailyChallenge from '@/components/games/sudoku/SudokuDailyChallenge';
import { generateSudokuPuzzle, validateSudokuMove, checkSudokuComplete } from '@/utils/sudokuGenerator';

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
}

const SudokuClassicEngine: React.FC<SudokuClassicEngineProps> = ({ onBack, onGameComplete }) => {
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
    mistakes: 0
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'pi'>('light');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      const timer = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.isPlaying, gameState.gameOver]);

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
      selectedCell: null,
      time: 0,
      mistakes: 0,
      lives: 3
    }));

    if (soundEnabled) {
      // Play start sound
      console.log('🎵 Game start sound');
    }

    toast({
      title: `Level ${gameState.level} Started!`,
      description: `Difficulty: ${difficulty.toUpperCase()}`,
    });
  }, [gameState.level, soundEnabled]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState.isPlaying || gameState.gameOver) return;
    
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col }
    }));

    if (soundEnabled) {
      console.log('🎵 Cell select sound');
    }
  };

  const handleNumberInput = (number: number) => {
    if (!gameState.selectedCell || !gameState.isPlaying) return;
    
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
    if (gameState.hints <= 0 || !gameState.selectedCell) {
      toast({
        title: "No Hints Available",
        description: "Watch an ad or pay 1 Pi for more hints!",
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
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">{gameState.score}</span>
        </div>
        <p className="text-xs text-gray-600">Score</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 text-blue-500" />
          <span className="font-semibold">{gameState.level}</span>
        </div>
        <p className="text-xs text-gray-600">Level</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="font-semibold">{gameState.lives}</span>
        </div>
        <p className="text-xs text-gray-600">Lives</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Clock className="w-4 h-4 text-green-500" />
          <span className="font-semibold">{formatTime(gameState.time)}</span>
        </div>
        <p className="text-xs text-gray-600">Time</p>
      </div>
    </div>
  );

  const renderGameControls = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleHint}
        disabled={gameState.hints <= 0}
      >
        <Zap className="w-4 h-4 mr-1" />
        Hint ({gameState.hints})
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setGameState(prev => ({ ...prev, pencilMode: !prev.pencilMode }))}
        className={gameState.pencilMode ? 'bg-blue-100' : ''}
      >
        ✏️ Pencil
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // Undo last move
          toast({ title: "Undo", description: "Last move undone!" });
        }}
      >
        ↶ Undo
      </Button>
    </div>
  );

  const renderNumberPad = () => (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <Button
          key={num}
          variant="outline"
          className="h-12 text-lg font-bold"
          onClick={() => handleNumberInput(num)}
          disabled={!gameState.selectedCell}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        className="h-12 text-lg"
        onClick={() => handleNumberInput(0)}
        disabled={!gameState.selectedCell}
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

  return (
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
        <Tabs value={gameState.gameMode} onValueChange={(value) => 
          setGameState(prev => ({ ...prev, gameMode: value as any }))
        }>
          <TabsList className="grid w-full grid-cols-4">
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
                <SudokuBoard
                  board={gameState.board}
                  selectedCell={gameState.selectedCell}
                  onCellClick={handleCellClick}
                  theme={theme}
                />
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
        <div className="flex justify-center gap-2 mt-6">
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
      </CardContent>
    </Card>
  );
};

export default SudokuClassicEngine;
