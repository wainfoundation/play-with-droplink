
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RefreshCw, Trophy, Heart, Lightbulb, Volume2, VolumeX, Crown } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { toast } from '@/hooks/use-toast';
import { createPiPayment } from '@/utils/pi-payments';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlockConnectEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const BlockConnectEngine: React.FC<BlockConnectEngineProps> = ({ onBack, onGameComplete }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [grid, setGrid] = useState<number[][]>([]);
  const [connections, setConnections] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<{x: number, y: number} | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [wrongMoves, setWrongMoves] = useState(0);
  const [showHintButton, setShowHintButton] = useState(false);
  
  const isMobile = useIsMobile();
  const gridSize = Math.min(4 + Math.floor(level / 5), 8);
  const targetConnections = Math.max(3, Math.floor(level * 1.5));
  const maxHints = isPremium ? 999 : 3;

  // Sound effects
  const playSound = (type: 'tap' | 'connect' | 'error' | 'complete' | 'hint') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch (type) {
      case 'tap':
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        break;
      case 'connect':
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        break;
      case 'complete':
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
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

  const generateGrid = () => {
    const colors = Math.min(4, Math.max(2, Math.floor(level / 2) + 2));
    const newGrid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => Math.floor(Math.random() * colors) + 1)
    );
    setGrid(newGrid);
  };

  const startLevel = async () => {
    if (!adWatched && !isPremium) {
      try {
        const success = await showRewardedAd({
          type: "pi",
          amount: 0.01,
          description: "Block Connect level unlock"
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
    setConnections([]);
    setSelectedBlock(null);
    setHintsUsed(0);
    setWrongMoves(0);
    setTimeLeft(60 + Math.floor(level / 3) * 10);
    setShowHintButton(level > 1); // Show hints after level 1
    generateGrid();
  };

  const handleBlockClick = (x: number, y: number) => {
    if (!isPlaying) return;

    playSound('tap');

    if (!selectedBlock) {
      setSelectedBlock({x, y});
    } else {
      const distance = Math.abs(selectedBlock.x - x) + Math.abs(selectedBlock.y - y);
      if (distance === 1 && grid[selectedBlock.x][selectedBlock.y] === grid[x][y]) {
        const connectionKey = `${Math.min(selectedBlock.x, x)},${Math.min(selectedBlock.y, y)}-${Math.max(selectedBlock.x, x)},${Math.max(selectedBlock.y, y)}`;
        
        if (!connections.includes(connectionKey)) {
          playSound('connect');
          const newConnections = [...connections, connectionKey];
          setConnections(newConnections);
          setScore(prev => prev + 10 * level);
          
          if (newConnections.length >= targetConnections) {
            completeLevel();
          }
        }
      } else {
        // Wrong move
        playSound('error');
        setWrongMoves(prev => {
          const newWrongMoves = prev + 1;
          if (newWrongMoves >= 3) {
            loseLife();
          }
          return newWrongMoves;
        });
      }
      setSelectedBlock(null);
    }
  };

  const loseLife = () => {
    const newLives = lives - 1;
    setLives(newLives);
    setWrongMoves(0);
    
    if (newLives <= 0) {
      endGame();
    } else {
      toast({
        title: "Life Lost!",
        description: `${newLives} lives remaining. Watch your moves!`,
        variant: "destructive"
      });
    }
  };

  const useHint = async () => {
    if (hintsUsed >= maxHints || !isPlaying) return;

    if (!isPremium) {
      try {
        await createPiPayment(
          {
            amount: 1,
            memo: `Block Connect Hint - Level ${level}`,
            metadata: { type: 'hint', level, game: 'block-connect' }
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
    playSound('hint');
    setHintsUsed(prev => prev + 1);
    
    // Find a valid connection and highlight it
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const adjacents = [
          {x: x+1, y}, {x: x-1, y}, {x, y: y+1}, {x, y: y-1}
        ].filter(pos => pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize);
        
        for (const adj of adjacents) {
          if (grid[x][y] === grid[adj.x][adj.y]) {
            const connectionKey = `${Math.min(x, adj.x)},${Math.min(y, adj.y)}-${Math.max(x, adj.x)},${Math.max(y, adj.y)}`;
            if (!connections.includes(connectionKey)) {
              // Temporarily highlight the hint
              const hintElement = document.querySelector(`[data-pos="${x}-${y}"]`);
              const hintElement2 = document.querySelector(`[data-pos="${adj.x}-${adj.y}"]`);
              if (hintElement && hintElement2) {
                hintElement.classList.add('animate-pulse', 'ring-2', 'ring-yellow-400');
                hintElement2.classList.add('animate-pulse', 'ring-2', 'ring-yellow-400');
                setTimeout(() => {
                  hintElement.classList.remove('animate-pulse', 'ring-2', 'ring-yellow-400');
                  hintElement2.classList.remove('animate-pulse', 'ring-2', 'ring-yellow-400');
                }, 2000);
              }
              return;
            }
          }
        }
      }
    }
    
    toast({
      title: "Hint Used",
      description: "Look for the highlighted blocks!",
    });
  };

  const completeLevel = () => {
    setIsPlaying(false);
    playSound('complete');
    const levelBonus = level * 50;
    const timeBonus = timeLeft * 2;
    const totalScore = levelBonus + timeBonus;
    setScore(prev => prev + totalScore);
    
    toast({
      title: "Level Complete!",
      description: `Level ${level} completed! +${totalScore} points`,
    });
    
    setLevel(prev => prev + 1);
    setAdWatched(false);
    setLives(3); // Restore lives on level completion
    
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
        description: "Block Connect retry"
      });
      
      if (success) {
        setLives(3);
        setGameOver(false);
        setWrongMoves(0);
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
          memo: "Block Connect Premium Unlock",
          metadata: { type: 'premium', game: 'block-connect' }
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
              description: "Enjoy ad-free gaming with unlimited hints!",
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

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setAdWatched(false);
    setConnections([]);
    setSelectedBlock(null);
    setHintsUsed(0);
    setWrongMoves(0);
  };

  if (gameOver) {
    return (
      <Card className={`${isMobile ? 'h-screen w-full' : 'max-w-md'} mx-auto`}>
        <CardHeader>
          <CardTitle className="text-center">🎮 Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Final Score: {score}</p>
            <p className="text-sm text-gray-600">Level Reached: {level}</p>
            <p className="text-sm text-gray-500">Out of {level > 9999999 ? 'Infinite' : '9,999,999'} levels</p>
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
    <Card className={`${isMobile ? 'h-screen w-full' : 'max-w-2xl'} mx-auto`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            🧩 Block Connect
            {isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
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
            {level > 9999999 && <span className="text-xs text-purple-600">∞</span>}
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
              <span>Connections: {connections.length}/{targetConnections}</span>
              <span>Time: {timeLeft}s</span>
              <span>Wrong: {wrongMoves}/3</span>
            </div>
            <Progress value={(connections.length / targetConnections) * 100} className="h-2" />
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-lg font-semibold">Block Connect - Level {level}</h3>
            <p className="text-sm text-gray-600">
              Connect {targetConnections} matching adjacent blocks to complete the level!
            </p>
            {!isPremium && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Button onClick={unlockPremium} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Crown className="w-4 h-4 mr-2" />
                  Unlock Premium (10 Pi)
                </Button>
                <p className="text-xs text-gray-600 mt-2">Ad-free + Unlimited hints + Custom themes</p>
              </div>
            )}
            <Button onClick={startLevel} size="lg" className="w-full">
              {(adWatched || isPremium) ? 'Start Level' : 'Watch Ad to Play'}
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="space-y-4">
            {/* Hint Button */}
            {showHintButton && (
              <div className="flex justify-center">
                <Button 
                  onClick={useHint}
                  disabled={hintsUsed >= maxHints}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {isPremium ? 'Hint' : '1 Pi Hint'} ({hintsUsed}/{maxHints})
                </Button>
              </div>
            )}

            {/* Game Grid */}
            <div className="space-y-4">
              <div className="grid gap-1 mx-auto" style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                maxWidth: isMobile ? '100%' : '320px'
              }}>
                {grid.map((row, x) =>
                  row.map((value, y) => (
                    <button
                      key={`${x}-${y}`}
                      data-pos={`${x}-${y}`}
                      onClick={() => handleBlockClick(x, y)}
                      className={`
                        ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded border-2 text-xs font-bold transition-all
                        ${selectedBlock?.x === x && selectedBlock?.y === y 
                          ? 'border-blue-500 bg-blue-100 scale-110' 
                          : 'border-gray-300 hover:border-blue-300 hover:scale-105'}
                        ${value === 1 ? 'bg-red-400' :
                          value === 2 ? 'bg-blue-400' :
                          value === 3 ? 'bg-green-400' : 
                          value === 4 ? 'bg-yellow-400' : 'bg-purple-400'}
                        text-white shadow-sm
                      `}
                    >
                      {value}
                    </button>
                  ))
                )}
              </div>
              <p className="text-center text-sm text-gray-600">
                Select two adjacent blocks with the same number to connect them
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockConnectEngine;
