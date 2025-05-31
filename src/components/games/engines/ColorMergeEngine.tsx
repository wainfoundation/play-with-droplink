import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Trophy, Heart, Lightbulb, SkipForward, Crown, Volume2, VolumeX } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { createPiPayment } from '@/services/piNetwork';
import { toast } from '@/hooks/use-toast';
import { playSoundEffect, backgroundMusic } from '@/utils/sounds';

interface ColorMergeEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const ColorMergeEngine: React.FC<ColorMergeEngineProps> = ({ onBack, onGameComplete }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [currentColor, setCurrentColor] = useState({ r: 255, g: 255, b: 255 });
  const [availableColors, setAvailableColors] = useState<{r: number, g: number, b: number}[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mergeAccuracy, setMergeAccuracy] = useState(0);
  const [movesUsed, setMovesUsed] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintColor, setHintColor] = useState<{r: number, g: number, b: number} | null>(null);

  useEffect(() => {
    // Start calm background music when component mounts
    if (soundEnabled) {
      backgroundMusic.play('/sounds/background/calm-ambient.mp3');
    }
    
    return () => {
      backgroundMusic.stop();
    };
  }, []);

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

  const generateLevel = () => {
    // Generate target color based on level difficulty
    const complexity = Math.min(Math.floor(level / 10) + 1, 5);
    const target = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    setTargetColor(target);
    
    // Generate available colors to mix (more colors for higher levels)
    const numColors = Math.min(3 + Math.floor(level / 5), 8);
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push({
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      });
    }
    setAvailableColors(colors);
    setCurrentColor({ r: 255, g: 255, b: 255 });
    setMovesUsed(0);
    setMergeAccuracy(0);
    
    // Calculate optimal moves for scoring
    setTotalMoves(Math.max(3, Math.floor(Math.log(level + 1) * 2)));
  };

  const startLevel = async () => {
    if (!adWatched && level > 1) {
      try {
        const success = await showRewardedAd({
          type: "pi",
          amount: 0.01,
          description: `Color Merge level ${level} unlock`
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
    setTimeLeft(60 + Math.floor(level / 10) * 10); // More time for higher levels
    setShowHint(false);
    setHintColor(null);
    generateLevel();
    
    if (soundEnabled) {
      playSoundEffect('newLevel', 0.7);
    }
  };

  const mergeColor = (mixColor: {r: number, g: number, b: number}) => {
    if (!isPlaying) return;

    setMovesUsed(prev => prev + 1);
    
    // Advanced color mixing based on level
    const newColor = level < 10 
      ? {
          r: Math.floor((currentColor.r + mixColor.r) / 2),
          g: Math.floor((currentColor.g + mixColor.g) / 2),
          b: Math.floor((currentColor.b + mixColor.b) / 2)
        }
      : {
          r: Math.floor((currentColor.r * 0.6) + (mixColor.r * 0.4)),
          g: Math.floor((currentColor.g * 0.6) + (mixColor.g * 0.4)),
          b: Math.floor((currentColor.b * 0.6) + (mixColor.b * 0.4))
        };
    
    setCurrentColor(newColor);
    
    // Calculate accuracy
    const accuracy = calculateColorAccuracy(newColor, targetColor);
    setMergeAccuracy(accuracy);
    
    if (soundEnabled) {
      playSoundEffect('colorMerge', 0.5);
    }
    
    if (accuracy >= 90) {
      completeLevel();
    } else if (accuracy < 20) {
      loseLife();
    }
  };

  const calculateColorAccuracy = (current: {r: number, g: number, b: number}, target: {r: number, g: number, b: number}) => {
    const rDiff = Math.abs(current.r - target.r);
    const gDiff = Math.abs(current.g - target.g);
    const bDiff = Math.abs(current.b - target.b);
    const totalDiff = rDiff + gDiff + bDiff;
    const maxDiff = 765; // Maximum possible difference (255 * 3)
    return Math.max(0, Math.floor((1 - totalDiff / maxDiff) * 100));
  };

  const completeLevel = () => {
    setIsPlaying(false);
    const levelBonus = level * 100;
    const timeBonus = timeLeft * 5;
    const moveBonus = Math.max(0, (totalMoves - movesUsed) * 50);
    const accuracyBonus = mergeAccuracy * 3;
    const totalScore = levelBonus + timeBonus + moveBonus + accuracyBonus;
    setScore(prev => prev + totalScore);
    
    if (soundEnabled) {
      playSoundEffect(mergeAccuracy === 100 ? 'perfectMatch' : 'correctMatch', 0.8);
    }
    
    toast({
      title: mergeAccuracy === 100 ? "Perfect Match! 🎨" : "Level Complete! 🎯",
      description: `Level ${level} completed! +${totalScore} points`,
    });
    
    setLevel(prev => prev + 1);
    setAdWatched(false);
    
    // Check for game completion milestone
    if (level % 10 === 0) {
      if (soundEnabled) {
        playSoundEffect('victory', 0.9);
      }
      toast({
        title: "Milestone Reached! 🏆",
        description: `You've reached level ${level}! Amazing progress!`,
      });
    }
    
    if (level % 100 === 0) {
      onGameComplete(score + totalScore);
    }
  };

  const loseLife = () => {
    setLives(prev => prev - 1);
    
    if (soundEnabled) {
      playSoundEffect('loseLife', 0.6);
    }
    
    toast({
      title: "Life Lost! 💔",
      description: `${lives - 1} lives remaining`,
      variant: "destructive"
    });
    
    if (lives <= 1) {
      endGame();
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (soundEnabled) {
      playSoundEffect('gameOver', 0.7);
    }
    
    onGameComplete(score);
  };

  const retryWithAd = async () => {
    try {
      const success = await showRewardedAd({
        type: "pi",
        amount: 0.02,
        description: "Color Merge retry with extra life"
      });
      
      if (success) {
        setLives(3);
        setGameOver(false);
        setLevel(Math.max(1, level - 1)); // Go back one level
        setAdWatched(true);
        
        if (soundEnabled) {
          playSoundEffect('gainLife', 0.7);
        }
        
        toast({
          title: "Lives Restored! ❤️",
          description: "You got another chance!",
        });
      }
    } catch (error) {
      toast({
        title: "Ad Error",
        description: "Unable to show retry ad",
        variant: "destructive"
      });
    }
  };

  const buyHint = async () => {
    try {
      await createPiPayment(1, "Color Merge hint - show next move");
      
      // Calculate and show hint
      const bestColor = findBestNextColor();
      setHintColor(bestColor);
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
      
      if (soundEnabled) {
        playSoundEffect('piPayment', 0.8);
      }
      
      toast({
        title: "Hint Purchased! 💡",
        description: "The best color choice is highlighted",
      });
      
      setTimeout(() => {
        setShowHint(false);
        setHintColor(null);
      }, 5000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process Pi payment",
        variant: "destructive"
      });
    }
  };

  const skipLevel = async () => {
    try {
      await createPiPayment(2, "Color Merge skip level");
      
      setLevel(prev => prev + 1);
      setAdWatched(false);
      
      if (soundEnabled) {
        playSoundEffect('piPayment', 0.8);
      }
      
      toast({
        title: "Level Skipped! ⏭️",
        description: `Moved to level ${level + 1}`,
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process Pi payment",
        variant: "destructive"
      });
    }
  };

  const findBestNextColor = () => {
    let bestColor = availableColors[0];
    let bestAccuracy = 0;
    
    availableColors.forEach(color => {
      const testColor = {
        r: Math.floor((currentColor.r + color.r) / 2),
        g: Math.floor((currentColor.g + color.g) / 2),
        b: Math.floor((currentColor.b + color.b) / 2)
      };
      const accuracy = calculateColorAccuracy(testColor, targetColor);
      if (accuracy > bestAccuracy) {
        bestAccuracy = accuracy;
        bestColor = color;
      }
    });
    
    return bestColor;
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setAdWatched(false);
    setMergeAccuracy(0);
    setMovesUsed(0);
    setHintsUsed(0);
    setShowHint(false);
    setHintColor(null);
  };

  const colorToHex = (color: {r: number, g: number, b: number}) => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            🎨 Color Merge - Game Over!
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Final Score: {score.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Level Reached: {level}</p>
            <p className="text-sm text-gray-600">Hints Used: {hintsUsed}</p>
            {level > 10 && (
              <Badge variant="secondary" className="mx-auto">
                <Crown className="w-3 h-3 mr-1" />
                Advanced Player
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={retryWithAd} variant="outline" className="flex-1">
              📺 Watch Ad to Retry
            </Button>
            <Button onClick={resetGame} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restart
            </Button>
            <Button onClick={onBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            🎨 Color Merge
            <Badge variant="outline">Level {level.toLocaleString()}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-4 h-4 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">Lives</p>
          </div>
          <div>
            <p className="font-semibold">{movesUsed}/{totalMoves}</p>
            <p className="text-xs text-gray-600">Moves</p>
          </div>
          <div>
            <p className="font-semibold">{timeLeft}s</p>
            <p className="text-xs text-gray-600">Time</p>
          </div>
          <div>
            <p className="font-semibold">{hintsUsed}</p>
            <p className="text-xs text-gray-600">Hints</p>
          </div>
        </div>

        {isPlaying && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Accuracy: {mergeAccuracy}%</span>
              <span>Target: {level < 50 ? '90%' : level < 100 ? '92%' : '95%'}</span>
            </div>
            <Progress value={mergeAccuracy} className="h-2" />
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold">Color Merge - Level {level.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">
              Mix colors to match the target! Reach {level < 50 ? '90%' : level < 100 ? '92%' : '95%'} accuracy to pass.
            </p>
            {level > 9999 && (
              <Badge variant="destructive" className="animate-pulse">
                🔥 Extreme Mode Active!
              </Badge>
            )}
            <Button onClick={startLevel} size="lg">
              {(adWatched || level === 1) ? 'Start Level' : 'Watch Ad to Play'}
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="space-y-6">
            {/* Target and Current Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Target Color</p>
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
                  style={{ backgroundColor: colorToHex(targetColor) }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Your Color</p>
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
                  style={{ backgroundColor: colorToHex(currentColor) }}
                ></div>
              </div>
            </div>

            {/* Available Colors */}
            <div className="text-center">
              <p className="text-sm font-medium mb-3">Mix with these colors:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => mergeColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${
                      showHint && hintColor && 
                      color.r === hintColor.r && color.g === hintColor.g && color.b === hintColor.b
                        ? 'border-yellow-400 ring-2 ring-yellow-300 animate-pulse' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                    style={{ backgroundColor: colorToHex(color) }}
                  />
                ))}
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                onClick={() => setCurrentColor({ r: 255, g: 255, b: 255 })}
                variant="outline"
                size="sm"
              >
                Reset Color
              </Button>
              <Button 
                onClick={buyHint}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                1π Hint
              </Button>
              <Button 
                onClick={skipLevel}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <SkipForward className="w-3 h-3" />
                2π Skip
              </Button>
            </div>

            {showHint && (
              <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 The highlighted color will get you closer to the target!
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorMergeEngine;
