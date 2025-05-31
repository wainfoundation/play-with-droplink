
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RefreshCw, Trophy, Heart, Lightbulb, Volume2, VolumeX, Crown, Calendar, Zap, Users } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { toast } from '@/hooks/use-toast';
import { createPiPayment } from '@/utils/pi-payments';
import { useIsMobile } from '@/hooks/use-mobile';

interface DailyCrosswordEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

interface CrosswordCell {
  letter: string;
  number?: number;
  isBlack: boolean;
  userInput: string;
  isCorrect: boolean;
  acrossClue?: number;
  downClue?: number;
}

interface Clue {
  number: number;
  text: string;
  answer: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  length: number;
}

const DailyCrosswordEngine: React.FC<DailyCrosswordEngineProps> = ({ onBack, onGameComplete }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [grid, setGrid] = useState<CrosswordCell[][]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [hintsUsed, setHintsUsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showDuelMode, setShowDuelMode] = useState(false);
  
  const isMobile = useIsMobile();
  const gridSize = Math.min(Math.max(8, level + 3), 15);
  const maxHints = isPremium ? 999 : 3;
  const today = new Date().toDateString();

  // Sample word list for crossword generation
  const words = [
    { word: 'GAME', clue: 'What you play for fun' },
    { word: 'CODE', clue: 'Programming instructions' },
    { word: 'PLAY', clue: 'To engage in activity for fun' },
    { word: 'WORD', clue: 'Unit of language' },
    { word: 'PUZZLE', clue: 'Brain teaser' },
    { word: 'BLOCK', clue: 'Building unit' },
    { word: 'CONNECT', clue: 'To join together' },
    { word: 'HINT', clue: 'Helpful suggestion' },
    { word: 'LEVEL', clue: 'Stage or degree' },
    { word: 'SCORE', clue: 'Points earned' }
  ];

  // Sound effects
  const playSound = (type: 'type' | 'correct' | 'wrong' | 'complete' | 'hint') => {
    if (!soundEnabled) return;
    
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch (type) {
      case 'type':
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        break;
      case 'correct':
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        break;
      case 'wrong':
        oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        break;
      case 'complete':
        oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        break;
      case 'hint':
        oscillator.frequency.setValueAtTime(550, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft]);

  const generateCrossword = () => {
    // Initialize empty grid
    const newGrid: CrosswordCell[][] = Array(gridSize).fill(null).map(() =>
      Array(gridSize).fill(null).map(() => ({
        letter: '',
        isBlack: true,
        userInput: '',
        isCorrect: false
      }))
    );

    const newClues: Clue[] = [];
    let clueNumber = 1;

    // Simple crossword generation (place words manually for demo)
    const placements = [
      { word: 'GAME', row: 2, col: 2, direction: 'across' as const },
      { word: 'CODE', row: 1, col: 4, direction: 'down' as const },
      { word: 'PLAY', row: 4, col: 1, direction: 'across' as const },
      { word: 'WORD', row: 2, col: 2, direction: 'down' as const }
    ];

    placements.forEach((placement, index) => {
      const wordData = words.find(w => w.word === placement.word);
      if (!wordData) return;

      // Place word in grid
      for (let i = 0; i < placement.word.length; i++) {
        const row = placement.direction === 'down' ? placement.row + i : placement.row;
        const col = placement.direction === 'across' ? placement.col + i : placement.col;
        
        if (row < gridSize && col < gridSize) {
          newGrid[row][col] = {
            letter: placement.word[i],
            number: i === 0 ? clueNumber : undefined,
            isBlack: false,
            userInput: '',
            isCorrect: false,
            [placement.direction === 'across' ? 'acrossClue' : 'downClue']: clueNumber
          };
        }
      }

      // Add clue
      newClues.push({
        number: clueNumber,
        text: wordData.clue,
        answer: placement.word,
        direction: placement.direction,
        startRow: placement.row,
        startCol: placement.col,
        length: placement.word.length
      });

      clueNumber++;
    });

    setGrid(newGrid);
    setClues(newClues);
  };

  const startLevel = async () => {
    if (!adWatched && !isPremium && !isDailyChallenge) {
      try {
        const success = await showRewardedAd({
          type: "pi",
          amount: 0.01,
          description: "Daily Crossword level unlock"
        });
        
        if (!success) {
          toast({
            title: "Ad Required",
            description: "Please watch an ad to start the level",
            variant: "destructive"
          });
          return;
        }
        setAdWatched(true);
      } catch (error) {
        toast({
          title: "Ad Error", 
          description: "Unable to show ad. Try again later.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsPlaying(true);
    setGameOver(false);
    setSelectedCell(null);
    setSelectedClue(null);
    setHintsUsed(0);
    setWrongGuesses(0);
    setCompletedWords(new Set());
    setTimeLeft(isDailyChallenge ? 1800 : 900); // 30 min for daily, 15 for regular
    generateCrossword();
  };

  const handleCellClick = (row: number, col: number) => {
    if (!isPlaying || grid[row][col].isBlack) return;
    
    playSound('type');
    setSelectedCell({ row, col });
    
    // Find clue for this cell
    const cell = grid[row][col];
    const acrossClue = clues.find(c => c.number === cell.acrossClue && c.direction === 'across');
    const downClue = clues.find(c => c.number === cell.downClue && c.direction === 'down');
    
    if (direction === 'across' && acrossClue) {
      setSelectedClue(acrossClue);
    } else if (direction === 'down' && downClue) {
      setSelectedClue(downClue);
    } else if (acrossClue) {
      setSelectedClue(acrossClue);
      setDirection('across');
    } else if (downClue) {
      setSelectedClue(downClue);
      setDirection('down');
    }
  };

  const handleKeyPress = (key: string) => {
    if (!selectedCell || !isPlaying) return;
    
    const { row, col } = selectedCell;
    if (grid[row][col].isBlack) return;

    playSound('type');
    
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      userInput: key.toUpperCase()
    };
    
    setGrid(newGrid);
    checkWord(newGrid);
    
    // Auto-advance to next cell
    if (selectedClue) {
      const nextPos = getNextCell(row, col, selectedClue.direction);
      if (nextPos) {
        setSelectedCell(nextPos);
      }
    }
  };

  const getNextCell = (row: number, col: number, dir: 'across' | 'down') => {
    const nextRow = dir === 'down' ? row + 1 : row;
    const nextCol = dir === 'across' ? col + 1 : col;
    
    if (nextRow < gridSize && nextCol < gridSize && !grid[nextRow][nextCol].isBlack) {
      return { row: nextRow, col: nextCol };
    }
    return null;
  };

  const checkWord = (currentGrid: CrosswordCell[][]) => {
    let newCompletedWords = new Set(completedWords);
    
    clues.forEach(clue => {
      let word = '';
      let allFilled = true;
      
      for (let i = 0; i < clue.length; i++) {
        const r = clue.direction === 'down' ? clue.startRow + i : clue.startRow;
        const c = clue.direction === 'across' ? clue.startCol + i : clue.startCol;
        
        if (currentGrid[r] && currentGrid[r][c]) {
          word += currentGrid[r][c].userInput;
          if (!currentGrid[r][c].userInput) allFilled = false;
        }
      }
      
      if (allFilled && word === clue.answer) {
        if (!completedWords.has(clue.number)) {
          playSound('correct');
          newCompletedWords.add(clue.number);
          setScore(prev => prev + clue.length * 10);
          
          // Mark cells as correct
          for (let i = 0; i < clue.length; i++) {
            const r = clue.direction === 'down' ? clue.startRow + i : clue.startRow;
            const c = clue.direction === 'across' ? clue.startCol + i : clue.startCol;
            currentGrid[r][c].isCorrect = true;
          }
        }
      } else if (allFilled && word !== clue.answer) {
        // Wrong word
        const newWrongGuesses = wrongGuesses + 1;
        setWrongGuesses(newWrongGuesses);
        playSound('wrong');
        
        if (newWrongGuesses >= 3) {
          loseLife();
        }
      }
    });
    
    setCompletedWords(newCompletedWords);
    
    // Check if puzzle is complete
    if (newCompletedWords.size === clues.length) {
      completeLevel();
    }
  };

  const loseLife = () => {
    const newLives = lives - 1;
    setLives(newLives);
    setWrongGuesses(0);
    
    if (newLives <= 0) {
      endGame();
    } else {
      toast({
        title: "Life Lost!",
        description: `${newLives} lives remaining. Be more careful!`,
        variant: "destructive"
      });
    }
  };

  const useHint = async () => {
    if (hintsUsed >= maxHints || !isPlaying || !selectedClue) return;

    if (!isPremium) {
      try {
        await createPiPayment(
          {
            amount: 1,
            memo: `Daily Crossword Hint - Level ${level}`,
            metadata: { type: 'hint', level, game: 'daily-crossword' }
          },
          {
            onReadyForServerApproval: (paymentId) => {
              console.log('Hint payment approved:', paymentId);
            },
            onReadyForServerCompletion: (paymentId, txid) => {
              console.log('Hint payment completed:', paymentId, txid);
              executeHint();
            },
            onCancel: () => {
              toast({
                title: "Payment Cancelled",
                description: "Hint purchase was cancelled",
                variant: "destructive"
              });
            },
            onError: (error) => {
              toast({
                title: "Payment Failed",
                description: "Unable to process Pi payment for hint",
                variant: "destructive"
              });
            }
          }
        );
      } catch (error) {
        toast({
          title: "Payment Error",
          description: "Failed to initiate Pi payment",
          variant: "destructive"
        });
      }
    } else {
      executeHint();
    }
  };

  const executeHint = () => {
    if (!selectedClue) return;
    
    playSound('hint');
    setHintsUsed(prev => prev + 1);
    
    // Fill in the entire word
    const newGrid = [...grid];
    for (let i = 0; i < selectedClue.length; i++) {
      const r = selectedClue.direction === 'down' ? selectedClue.startRow + i : selectedClue.startRow;
      const c = selectedClue.direction === 'across' ? selectedClue.startCol + i : selectedClue.startCol;
      newGrid[r][c].userInput = selectedClue.answer[i];
    }
    
    setGrid(newGrid);
    checkWord(newGrid);
    
    toast({
      title: "Hint Used",
      description: `Revealed: ${selectedClue.answer}`,
    });
  };

  const completeLevel = () => {
    setIsPlaying(false);
    playSound('complete');
    const timeBonus = Math.floor(timeLeft / 10) * 5;
    const levelBonus = level * 100;
    const totalScore = timeBonus + levelBonus;
    setScore(prev => prev + totalScore);
    
    if (isDailyChallenge) {
      setStreak(prev => prev + 1);
      toast({
        title: "Daily Challenge Complete!",
        description: `Streak: ${streak + 1} days! +${totalScore} points`,
      });
    } else {
      toast({
        title: "Level Complete!",
        description: `Level ${level} completed! +${totalScore} points`,
      });
    }
    
    setLevel(prev => prev + 1);
    setAdWatched(false);
    setLives(3);
    
    if (level % 10 === 0) {
      onGameComplete(score + totalScore);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    onGameComplete(score);
  };

  const retryWithAd = async () => {
    try {
      const success = await showRewardedAd({
        type: "pi",
        amount: 0.01,
        description: "Daily Crossword retry"
      });
      
      if (success) {
        setLives(3);
        setGameOver(false);
        setWrongGuesses(0);
        startLevel();
      }
    } catch (error) {
      toast({
        title: "Ad Error",
        description: "Unable to show ad for retry",
        variant: "destructive"
      });
    }
  };

  const unlockPremium = async () => {
    try {
      await createPiPayment(
        {
          amount: 10,
          memo: "Daily Crossword Premium Unlock",
          metadata: { type: 'premium', game: 'daily-crossword' }
        },
        {
          onReadyForServerApproval: (paymentId) => {
            console.log('Premium payment approved:', paymentId);
          },
          onReadyForServerCompletion: (paymentId, txid) => {
            console.log('Premium payment completed:', paymentId, txid);
            setIsPremium(true);
            toast({
              title: "Premium Unlocked!",
              description: "Enjoy ad-free crosswords with unlimited hints!",
            });
          },
          onCancel: () => {
            toast({
              title: "Purchase Cancelled",
              description: "Premium unlock was cancelled",
              variant: "destructive"
            });
          },
          onError: (error) => {
            toast({
              title: "Purchase Failed",
              description: "Unable to process premium unlock",
              variant: "destructive"
            });
          }
        }
      );
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initiate premium unlock",
        variant: "destructive"
      });
    }
  };

  const startDailyChallenge = () => {
    setIsDailyChallenge(true);
    setAdWatched(true); // Daily challenge doesn't require ads
    startLevel();
  };

  const startDuelMode = async () => {
    try {
      await createPiPayment(
        {
          amount: 2,
          memo: "Daily Crossword Duel Entry",
          metadata: { type: 'duel', game: 'daily-crossword' }
        },
        {
          onReadyForServerApproval: (paymentId) => {
            console.log('Duel payment approved:', paymentId);
          },
          onReadyForServerCompletion: (paymentId, txid) => {
            console.log('Duel payment completed:', paymentId, txid);
            toast({
              title: "Duel Mode Started!",
              description: "Finding opponent...",
            });
            // TODO: Implement multiplayer logic
          },
          onCancel: () => {
            toast({
              title: "Duel Cancelled",
              description: "Duel entry was cancelled",
              variant: "destructive"
            });
          },
          onError: (error) => {
            toast({
              title: "Payment Failed",
              description: "Unable to process duel entry fee",
              variant: "destructive"
            });
          }
        }
      );
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initiate duel payment",
        variant: "destructive"
      });
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setAdWatched(false);
    setCompletedWords(new Set());
    setHintsUsed(0);
    setWrongGuesses(0);
    setIsDailyChallenge(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameOver) {
    return (
      <Card className={`${isMobile ? 'h-screen w-full' : 'max-w-md'} mx-auto`}>
        <CardHeader>
          <CardTitle className="text-center">🧩 Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Final Score: {score}</p>
            <p className="text-sm text-gray-600">Level Reached: {level}</p>
            {isDailyChallenge && (
              <p className="text-sm text-yellow-600">Daily Streak: {streak} days</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={retryWithAd} variant="outline" className="w-full">
              📺 Watch Ad to Continue
            </Button>
            <Button onClick={resetGame} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isMobile ? 'h-screen w-full' : 'max-w-4xl'} mx-auto`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            🧩 Daily Crossword
            {isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
            {isDailyChallenge && <Calendar className="w-5 h-5 text-blue-500" />}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Stats */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span>Level: {level}</span>
            {isDailyChallenge && <span className="text-blue-600">Daily</span>}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-4 h-4 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score}</span>
          </div>
        </div>

        {isPlaying && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Words: {completedWords.size}/{clues.length}</span>
              <span>Time: {formatTime(timeLeft)}</span>
              <span>Wrong: {wrongGuesses}/3</span>
            </div>
            <Progress value={(completedWords.size / clues.length) * 100} className="h-2" />
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-lg font-semibold">Daily Crossword - Level {level}</h3>
            <p className="text-sm text-gray-600">
              Solve the crossword puzzle by filling in all the words!
            </p>

            {/* Game Mode Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Daily Challenge
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Today's special puzzle - Build your streak!
                </p>
                <Button onClick={startDailyChallenge} className="w-full" size="sm">
                  Play Daily
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" />
                  Regular Mode
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Infinite levels - Practice makes perfect!
                </p>
                <Button onClick={startLevel} variant="outline" className="w-full" size="sm">
                  {(adWatched || isPremium) ? 'Start Level' : 'Watch Ad to Play'}
                </Button>
              </Card>
            </div>

            {/* Duel Mode */}
            <Card className="p-4 bg-purple-50">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                Crossword Duel
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Race against another player! Winner takes 3 Pi (2 Pi entry fee)
              </p>
              <Button onClick={startDuelMode} variant="outline" className="w-full" size="sm">
                Enter Duel (2 Pi)
              </Button>
            </Card>

            {!isPremium && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Button onClick={unlockPremium} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Crown className="w-4 h-4 mr-2" />
                  Unlock Premium (10 Pi)
                </Button>
                <p className="text-xs text-gray-600 mt-2">Ad-free + Unlimited hints + Exclusive themes</p>
              </div>
            )}
          </div>
        )}

        {isPlaying && (
          <div className="space-y-4">
            {/* Hint Button */}
            <div className="flex justify-center">
              <Button 
                onClick={useHint}
                disabled={hintsUsed >= maxHints || !selectedClue}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                {isPremium ? 'Reveal Word' : '1 Pi Hint'} ({hintsUsed}/{maxHints})
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Crossword Grid */}
              <div className="space-y-2">
                <h4 className="font-semibold">Crossword Grid</h4>
                <div className="grid gap-1 mx-auto" style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: isMobile ? '100%' : '300px'
                }}>
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`
                          ${isMobile ? 'w-8 h-8' : 'w-6 h-6'} text-xs font-bold border transition-all relative
                          ${cell.isBlack 
                            ? 'bg-black' 
                            : selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                              ? 'bg-blue-200 border-blue-500'
                              : cell.isCorrect
                                ? 'bg-green-100 border-green-500'
                                : 'bg-white border-gray-300 hover:border-blue-300'
                          }
                        `}
                        disabled={cell.isBlack}
                      >
                        {cell.number && (
                          <span className="absolute top-0 left-0 text-xs text-gray-600">
                            {cell.number}
                          </span>
                        )}
                        <span className="text-center">{cell.userInput}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Clues */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Across</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {clues.filter(c => c.direction === 'across').map(clue => (
                      <div 
                        key={clue.number}
                        className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                          selectedClue?.number === clue.number && selectedClue?.direction === 'across'
                            ? 'bg-blue-100' 
                            : completedWords.has(clue.number)
                              ? 'bg-green-100'
                              : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedClue(clue);
                          setDirection('across');
                          setSelectedCell({ row: clue.startRow, col: clue.startCol });
                        }}
                      >
                        <span className="font-medium">{clue.number}.</span> {clue.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Down</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {clues.filter(c => c.direction === 'down').map(clue => (
                      <div 
                        key={clue.number}
                        className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                          selectedClue?.number === clue.number && selectedClue?.direction === 'down'
                            ? 'bg-blue-100' 
                            : completedWords.has(clue.number)
                              ? 'bg-green-100'
                              : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedClue(clue);
                          setDirection('down');
                          setSelectedCell({ row: clue.startRow, col: clue.startCol });
                        }}
                      >
                        <span className="font-medium">{clue.number}.</span> {clue.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Virtual Keyboard */}
                <div className="grid grid-cols-6 gap-1">
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <Button
                      key={letter}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleKeyPress(letter)}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyCrosswordEngine;
