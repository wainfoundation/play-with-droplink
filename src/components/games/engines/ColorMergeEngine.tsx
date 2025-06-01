
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { toast } from '@/hooks/use-toast';

interface ColorMergeEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const ColorMergeEngine: React.FC<ColorMergeEngineProps> = ({ onBack, onGameComplete }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [currentColor, setCurrentColor] = useState({ r: 255, g: 255, b: 255 });
  const [availableColors, setAvailableColors] = useState<{r: number, g: number, b: number}[]>([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [mergeAccuracy, setMergeAccuracy] = useState(0);

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
    // Generate target color
    const target = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    setTargetColor(target);
    
    // Generate available colors to mix
    const numColors = Math.min(3 + Math.floor(level / 3), 6);
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
  };

  const startLevel = async () => {
    if (!adWatched) {
      try {
        const success = await showRewardedAd({
          type: "pi",
          amount: 0.01,
          description: "Color Merge level unlock"
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
    setTimeLeft(45 + Math.floor(level / 2) * 5);
    setMergeAccuracy(0);
    generateLevel();
  };

  const mergeColor = (mixColor: {r: number, g: number, b: number}) => {
    if (!isPlaying) return;

    // Simple color mixing (average)
    const newColor = {
      r: Math.floor((currentColor.r + mixColor.r) / 2),
      g: Math.floor((currentColor.g + mixColor.g) / 2),
      b: Math.floor((currentColor.b + mixColor.b) / 2)
    };
    setCurrentColor(newColor);
    
    // Calculate accuracy
    const accuracy = calculateColorAccuracy(newColor, targetColor);
    setMergeAccuracy(accuracy);
    
    if (accuracy >= 85) {
      completeLevel();
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
    const timeBonus = timeLeft * 3;
    const accuracyBonus = mergeAccuracy * 2;
    const totalScore = levelBonus + timeBonus + accuracyBonus;
    setScore(prev => prev + totalScore);
    
    toast({
      title: "Perfect Match!",
      description: `Level ${level} completed! +${totalScore} points`,
    });
    
    setLevel(prev => prev + 1);
    setAdWatched(false);
    
    if (level % 5 === 0) {
      onGameComplete(score + totalScore);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    onGameComplete(score);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setAdWatched(false);
    setMergeAccuracy(0);
  };

  const colorToHex = (color: {r: number, g: number, b: number}) => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">🎨 Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Final Score: {score}</p>
            <p className="text-sm text-gray-600">Level Reached: {level}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={resetGame} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
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
            🎨 Color Merge - Level {level}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPlaying && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Accuracy: {mergeAccuracy}%</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <Progress value={mergeAccuracy} className="h-2" />
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold">Color Merge - Level {level}</h3>
            <p className="text-sm text-gray-600">
              Mix colors to match the target! Get 85% accuracy to pass.
            </p>
            <Button onClick={startLevel} size="lg">
              {adWatched ? 'Start Level' : 'Watch Ad to Play'}
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
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: colorToHex(targetColor) }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Your Color</p>
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300"
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
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all hover:scale-105"
                    style={{ backgroundColor: colorToHex(color) }}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentColor({ r: 255, g: 255, b: 255 })}
                variant="outline"
                size="sm"
              >
                Reset Color
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorMergeEngine;
