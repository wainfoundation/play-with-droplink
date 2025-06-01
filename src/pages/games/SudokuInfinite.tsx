
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Trophy,
  Clock,
  Zap
} from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { toast } from '@/hooks/use-toast';
import { useGameManager } from '@/components/games/GameManager';

const SudokuInfinite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character } = location.state || {};
  const { gameStats, earnPiCoins, addAchievement } = useGameManager();
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'completed'>('menu');
  const [currentPuzzle, setCurrentPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lives, setLives] = useState(3);

  // Generate a simple 4x4 Sudoku puzzle
  const generatePuzzle = useCallback(() => {
    const completedBoard = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3]
    ];

    const puzzle = completedBoard.map(row => [...row]);
    
    // Remove some numbers to create the puzzle
    const cellsToRemove = 6 + Math.floor(Math.random() * 4); // Remove 6-9 cells
    for (let i = 0; i < cellsToRemove; i++) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      puzzle[row][col] = 0;
    }

    return { puzzle, solution: completedBoard };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    const { puzzle, solution: newSolution } = generatePuzzle();
    setCurrentPuzzle(puzzle);
    setSolution(newSolution);
    setGameState('playing');
    setTimeElapsed(0);
    setSelectedCell(null);
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== 'playing' || currentPuzzle[row][col] !== 0) return;
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const { row, col } = selectedCell;
    const newPuzzle = [...currentPuzzle];
    newPuzzle[row][col] = number;
    setCurrentPuzzle(newPuzzle);

    // Check if the number is correct
    if (solution[row][col] === number) {
      setScore(prev => prev + 10);
      
      // Check if puzzle is completed
      const isCompleted = newPuzzle.every((row, i) =>
        row.every((cell, j) => cell === solution[i][j])
      );

      if (isCompleted) {
        completePuzzle();
      }
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          gameOver();
        }
        return newLives;
      });
    }
    
    setSelectedCell(null);
  };

  const completePuzzle = () => {
    setGameState('completed');
    const timeBonus = Math.max(0, 300 - timeElapsed);
    const totalScore = score + timeBonus;
    setScore(totalScore);

    // Earn Pi coins
    earnPiCoins(1, `completing level ${level}`);
    
    // Add achievements
    if (timeElapsed < 60) {
      addAchievement("Speed Solver - Complete a puzzle in under 1 minute!");
    }
    if (level === 1) {
      addAchievement("First Victory - Complete your first Sudoku puzzle!");
    }

    toast({
      title: "Puzzle Completed!",
      description: `Level ${level} completed! Score: ${totalScore}`,
    });
  };

  const gameOver = () => {
    setGameState('completed');
    toast({
      title: "Game Over",
      description: "No lives remaining. Try again!",
      variant: "destructive"
    });
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setLives(3);
    startGame();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <title>Sudoku Infinite - Level {level} | Droplink Games</title>
        <meta name="description" content="Challenge your mind with infinite Sudoku puzzles and earn Pi rewards!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => navigate('/play')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sudoku Infinite
            </h1>
            <Badge variant="secondary">Level {level}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span>Score: {score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>{formatTime(timeElapsed)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>{lives}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {gameState === 'menu' ? (
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">🧩</div>
                      <h2 className="text-2xl font-bold">Infinite Sudoku Challenge!</h2>
                      <p className="text-gray-600">
                        Solve 4x4 Sudoku puzzles and progress through infinite levels!
                        <br />
                        Each row, column, and 2x2 box must contain numbers 1-4.
                      </p>
                      <Button 
                        size="lg"
                        onClick={startGame}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Playing!
                      </Button>
                    </div>
                  ) : gameState === 'completed' ? (
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">{lives > 0 ? '🎉' : '💀'}</div>
                      <h2 className="text-2xl font-bold">
                        {lives > 0 ? 'Level Completed!' : 'Game Over!'}
                      </h2>
                      <p className="text-gray-600">
                        Final Score: {score}
                        <br />
                        Time: {formatTime(timeElapsed)}
                      </p>
                      <div className="flex gap-2 justify-center">
                        {lives > 0 ? (
                          <Button onClick={nextLevel} size="lg">
                            <Zap className="w-4 h-4 mr-2" />
                            Next Level
                          </Button>
                        ) : (
                          <Button onClick={startGame} size="lg">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Try Again
                          </Button>
                        )}
                        <Button variant="outline" onClick={() => setGameState('menu')}>
                          Menu
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Sudoku Grid */}
                      <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto bg-gray-800 p-2 rounded">
                        {currentPuzzle.map((row, rowIndex) =>
                          row.map((cell, colIndex) => (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              className={`
                                w-16 h-16 border border-gray-400 flex items-center justify-center text-lg font-bold
                                ${cell === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-100'}
                                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-200' : ''}
                                ${(rowIndex < 2 && colIndex < 2) || (rowIndex >= 2 && colIndex >= 2) ? 'border-r-2 border-b-2' : ''}
                                ${colIndex === 1 ? 'border-r-2' : ''}
                                ${rowIndex === 1 ? 'border-b-2' : ''}
                              `}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                              disabled={cell !== 0 || gameState !== 'playing'}
                            >
                              {cell || ''}
                            </button>
                          ))
                        )}
                      </div>

                      {/* Number Input Buttons */}
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4].map(number => (
                          <Button
                            key={number}
                            variant="outline"
                            onClick={() => handleNumberInput(number)}
                            disabled={!selectedCell || gameState !== 'playing'}
                            className="w-12 h-12"
                          >
                            {number}
                          </Button>
                        ))}
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center gap-4">
                        {gameState === 'playing' ? (
                          <Button onClick={pauseGame}>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        ) : gameState === 'paused' ? (
                          <Button onClick={resumeGame}>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        ) : null}
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
                    <CardTitle className="text-lg">{character.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <CharacterRenderer character={character} size={80} />
                    </div>
                    <div className="text-sm text-gray-600">
                      {gameState === 'playing' ? '"Think logically, you can do this!"' :
                       gameState === 'paused' ? '"Take your time to think!"' :
                       gameState === 'completed' && lives > 0 ? '"Excellent work! Ready for the next challenge?"' :
                       gameState === 'completed' ? '"Don\'t give up! Try again!"' :
                       '"Ready to challenge your mind?"'}
                    </div>
                  </CardContent>
                </Card>

                {/* Game Stats */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Game Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Level:</span>
                      <Badge variant="outline">{level}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Score:</span>
                      <Badge variant="outline" className="text-yellow-600">
                        {gameStats.totalScore}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pi Coins:</span>
                      <Badge variant="outline" className="text-blue-600">
                        π {gameStats.piCoins}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* How to Play */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">How to Play</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600 space-y-2">
                    <p>• Fill each row with numbers 1-4</p>
                    <p>• Fill each column with numbers 1-4</p>
                    <p>• Fill each 2×2 box with numbers 1-4</p>
                    <p>• No number can repeat in any row, column, or box</p>
                    <p>• Complete puzzles to earn Pi coins!</p>
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
