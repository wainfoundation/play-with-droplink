
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Clock, Lightbulb, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateSudokuPuzzle, validateSudokuMove, checkSudokuComplete, type Difficulty } from '@/utils/sudokuGenerator';
import SudokuBoard from '@/components/games/sudoku/SudokuBoard';

interface Enhanced9x9SudokuEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const Enhanced9x9SudokuEngine: React.FC<Enhanced9x9SudokuEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed' | 'paused'>('menu');
  const [currentPuzzle, setCurrentPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [originalPuzzle, setOriginalPuzzle] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(3);
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes] = useState(3);
  const [theme, setTheme] = useState<'light' | 'dark' | 'pi'>('light');
  const [showPossibleNumbers, setShowPossibleNumbers] = useState(false);

  const difficultySettings = {
    easy: { name: 'Easy', color: 'bg-green-500', scoreMultiplier: 1 },
    medium: { name: 'Medium', color: 'bg-yellow-500', scoreMultiplier: 1.5 },
    hard: { name: 'Hard', color: 'bg-orange-500', scoreMultiplier: 2 },
    expert: { name: 'Expert', color: 'bg-red-500', scoreMultiplier: 3 },
    insane: { name: 'Insane', color: 'bg-purple-500', scoreMultiplier: 5 }
  };

  const startGame = useCallback((selectedDifficulty: Difficulty = difficulty) => {
    const puzzle = generateSudokuPuzzle(selectedDifficulty);
    setCurrentPuzzle(puzzle.puzzle.map(row => [...row]));
    setSolution(puzzle.solution);
    setOriginalPuzzle(puzzle.puzzle.map(row => [...row]));
    setSelectedCell(null);
    setGameState('playing');
    setTimeElapsed(0);
    setScore(0);
    setHintsUsed(0);
    setMistakes(0);
    setDifficulty(selectedDifficulty);
  }, [difficulty]);

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

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;
    
    // Don't allow selection of originally filled cells
    if (originalPuzzle[row][col] !== 0) return;
    
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const { row, col } = selectedCell;
    
    // Don't allow changes to original puzzle cells
    if (originalPuzzle[row][col] !== 0) return;

    const newPuzzle = currentPuzzle.map(r => [...r]);
    
    // If number is same as current, clear it
    if (newPuzzle[row][col] === number) {
      newPuzzle[row][col] = 0;
    } else {
      // Validate the move
      if (number > 0 && !validateSudokuMove(newPuzzle, row, col, number)) {
        setMistakes(prev => {
          const newMistakes = prev + 1;
          if (newMistakes >= maxMistakes) {
            setGameState('completed');
            toast({
              title: "Game Over",
              description: "Too many mistakes! Try again.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Invalid Move",
              description: `${maxMistakes - newMistakes} mistakes remaining.`,
              variant: "destructive"
            });
          }
          return newMistakes;
        });
        return;
      }
      
      newPuzzle[row][col] = number;
      
      // Add points for correct placement
      if (number > 0 && solution[row][col] === number) {
        const points = Math.floor(10 * difficultySettings[difficulty].scoreMultiplier);
        setScore(prev => prev + points);
      }
    }
    
    setCurrentPuzzle(newPuzzle);
    
    // Check if puzzle is completed
    if (checkSudokuComplete(newPuzzle)) {
      completePuzzle();
    }
  };

  const completePuzzle = () => {
    setGameState('completed');
    
    // Calculate final score
    const baseScore = 1000;
    const timeBonus = Math.max(0, 1800 - timeElapsed); // Bonus for completing under 30 minutes
    const difficultyBonus = baseScore * (difficultySettings[difficulty].scoreMultiplier - 1);
    const hintPenalty = hintsUsed * 50;
    const mistakePenalty = mistakes * 25;
    
    const finalScore = Math.max(0, 
      (baseScore + timeBonus + difficultyBonus - hintPenalty - mistakePenalty) * 
      difficultySettings[difficulty].scoreMultiplier
    );
    
    setScore(finalScore);
    onGameComplete(finalScore);
    
    toast({
      title: "Puzzle Completed!",
      description: `${difficulty} puzzle solved! Score: ${finalScore}`,
    });
  };

  const useHint = () => {
    if (hintsUsed >= maxHints || !selectedCell || gameState !== 'playing') return;
    
    const { row, col } = selectedCell;
    
    // Don't give hints for original puzzle cells
    if (originalPuzzle[row][col] !== 0) {
      toast({
        title: "Hint not needed",
        description: "This cell is already filled!",
        variant: "destructive"
      });
      return;
    }
    
    const correctNumber = solution[row][col];
    const newPuzzle = currentPuzzle.map(r => [...r]);
    newPuzzle[row][col] = correctNumber;
    
    setCurrentPuzzle(newPuzzle);
    setHintsUsed(prev => prev + 1);
    setSelectedCell(null);
    
    toast({
      title: "Hint Used",
      description: `The correct number is ${correctNumber}. ${maxHints - hintsUsed - 1} hints remaining.`,
    });
    
    // Check if puzzle is completed
    if (checkSudokuComplete(newPuzzle)) {
      completePuzzle();
    }
  };

  const resetPuzzle = () => {
    setCurrentPuzzle(originalPuzzle.map(row => [...row]));
    setSelectedCell(null);
    setMistakes(0);
    setScore(0);
    toast({
      title: "Puzzle Reset",
      description: "Starting fresh with the same puzzle.",
    });
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPossibleNumbers = (row: number, col: number): number[] => {
    if (currentPuzzle[row][col] !== 0) return [];
    
    const possible = [];
    for (let num = 1; num <= 9; num++) {
      if (validateSudokuMove(currentPuzzle, row, col, num)) {
        possible.push(num);
      }
    }
    return possible;
  };

  if (gameState === 'menu') {
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
              Sudoku Classic (9×9)
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'pi' : 'light')}
              >
                Theme: {theme}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🧩</div>
            <h2 className="text-2xl font-bold">Classic 9×9 Sudoku</h2>
            <p className="text-gray-600 mb-6">
              Fill the 9×9 grid so each row, column, and 3×3 box contains all digits 1-9.
              <br />
              Choose your difficulty level to begin!
            </p>
            
            {/* Difficulty Selection */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
              {(Object.keys(difficultySettings) as Difficulty[]).map((diff) => (
                <Button
                  key={diff}
                  variant={difficulty === diff ? "default" : "outline"}
                  className={`h-16 ${difficulty === diff ? difficultySettings[diff].color : ''}`}
                  onClick={() => setDifficulty(diff)}
                >
                  <div className="text-center">
                    <div className="font-bold">{difficultySettings[diff].name}</div>
                    <div className="text-xs">{difficultySettings[diff].scoreMultiplier}x points</div>
                  </div>
                </Button>
              ))}
            </div>
            
            <Button size="lg" onClick={() => startGame(difficulty)}>
              Start {difficultySettings[difficulty].name} Puzzle
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle>
              {mistakes >= maxMistakes ? 'Game Over!' : 'Puzzle Complete!'}
            </CardTitle>
            <Badge variant="outline">{difficultySettings[difficulty].name}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">
              {mistakes >= maxMistakes ? '😞' : '🎉'}
            </div>
            <h2 className="text-2xl font-bold">
              {mistakes >= maxMistakes ? 'Better luck next time!' : `${difficultySettings[difficulty].name} Puzzle Solved!`}
            </h2>
            
            {mistakes < maxMistakes && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-gray-600">Time</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">{hintsUsed}</div>
                  <div className="text-sm text-gray-600">Hints Used</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">{mistakes}</div>
                  <div className="text-sm text-gray-600">Mistakes</div>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 justify-center">
              <Button onClick={() => startGame(difficulty)} size="lg">
                New {difficultySettings[difficulty].name} Puzzle
              </Button>
              <Button variant="outline" onClick={() => setGameState('menu')}>
                Change Difficulty
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'paused') {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle>Game Paused</CardTitle>
            <Badge variant="outline">{difficultySettings[difficulty].name}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">⏸️</div>
            <h2 className="text-2xl font-bold">Game Paused</h2>
            <p className="text-gray-600">Take your time! Resume when you're ready.</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={resumeGame} size="lg">
                Resume Game
              </Button>
              <Button variant="outline" onClick={() => setGameState('menu')}>
                Back to Menu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto">
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
          <div className="flex items-center gap-2">
            <Badge variant="outline">{difficultySettings[difficulty].name}</Badge>
            <Button variant="outline" size="sm" onClick={pauseGame}>
              Pause
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <div className="text-center mb-4">
              <SudokuBoard
                board={currentPuzzle}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
                theme={theme}
              />
            </div>
            
            {/* Number Input Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                <Button
                  key={number}
                  variant="outline"
                  onClick={() => handleNumberInput(number)}
                  disabled={!selectedCell}
                  className="w-10 h-10 text-lg font-bold"
                >
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => handleNumberInput(0)}
                disabled={!selectedCell}
                className="w-10 h-10"
                title="Clear cell"
              >
                ✗
              </Button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Game Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Score:
                  </span>
                  <span className="font-semibold">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Time:
                  </span>
                  <span className="font-semibold">{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hints:</span>
                  <span className="font-semibold">{hintsUsed}/{maxHints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mistakes:</span>
                  <span className="font-semibold text-red-600">{mistakes}/{maxMistakes}</span>
                </div>
              </CardContent>
            </Card>

            {/* Game Controls */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={useHint}
                  disabled={hintsUsed >= maxHints || !selectedCell}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Use Hint ({maxHints - hintsUsed} left)
                </Button>
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Puzzle
                </Button>
                <Button
                  onClick={() => setShowPossibleNumbers(!showPossibleNumbers)}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  {showPossibleNumbers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showPossibleNumbers ? 'Hide' : 'Show'} Possibilities
                </Button>
              </CardContent>
            </Card>

            {/* Possible Numbers for Selected Cell */}
            {showPossibleNumbers && selectedCell && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Possible Numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    {(() => {
                      const possible = getPossibleNumbers(selectedCell.row, selectedCell.col);
                      return possible.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {possible.map(num => (
                            <Badge key={num} variant="secondary" className="text-sm">
                              {num}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          {currentPuzzle[selectedCell.row][selectedCell.col] !== 0 
                            ? 'Cell already filled' 
                            : 'No valid numbers'}
                        </span>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* How to Play */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Fill each row with numbers 1-9</p>
                <p>• Fill each column with numbers 1-9</p>
                <p>• Fill each 3×3 box with numbers 1-9</p>
                <p>• No number can repeat in any row, column, or box</p>
                <p>• Click a cell, then click a number to fill it</p>
                <p>• Use hints wisely - you only get {maxHints}!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Enhanced9x9SudokuEngine;
