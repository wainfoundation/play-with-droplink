
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { playSoundEffect, backgroundMusic } from '@/utils/sounds';

interface Color {
  r: number;
  g: number;
  b: number;
}

export const useColorMergeGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [targetColor, setTargetColor] = useState<Color>({ r: 0, g: 0, b: 0 });
  const [currentColor, setCurrentColor] = useState<Color>({ r: 255, g: 255, b: 255 });
  const [availableColors, setAvailableColors] = useState<Color[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mergeAccuracy, setMergeAccuracy] = useState(0);
  const [movesUsed, setMovesUsed] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintColor, setHintColor] = useState<Color | null>(null);

  // Timer effect
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

  // Background music effect
  useEffect(() => {
    if (soundEnabled) {
      backgroundMusic.play('/sounds/background/calm-ambient.mp3');
    }
    
    return () => {
      backgroundMusic.stop();
    };
  }, []);

  const generateLevel = useCallback(() => {
    const target = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    setTargetColor(target);
    
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
    setTotalMoves(Math.max(3, Math.floor(Math.log(level + 1) * 2)));
  }, [level]);

  const calculateColorAccuracy = useCallback((current: Color, target: Color) => {
    const rDiff = Math.abs(current.r - target.r);
    const gDiff = Math.abs(current.g - target.g);
    const bDiff = Math.abs(current.b - target.b);
    const totalDiff = rDiff + gDiff + bDiff;
    const maxDiff = 765;
    return Math.max(0, Math.floor((1 - totalDiff / maxDiff) * 100));
  }, []);

  const mergeColor = useCallback((mixColor: Color) => {
    if (!isPlaying) return;

    setMovesUsed(prev => prev + 1);
    
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
  }, [isPlaying, level, currentColor, targetColor, soundEnabled, calculateColorAccuracy]);

  const completeLevel = useCallback(() => {
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
    
    if (level % 10 === 0) {
      if (soundEnabled) {
        playSoundEffect('victory', 0.9);
      }
      toast({
        title: "Milestone Reached! 🏆",
        description: `You've reached level ${level}! Amazing progress!`,
      });
    }
  }, [level, timeLeft, totalMoves, movesUsed, mergeAccuracy, soundEnabled]);

  const loseLife = useCallback(() => {
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
  }, [lives, soundEnabled]);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (soundEnabled) {
      playSoundEffect('gameOver', 0.7);
    }
  }, [soundEnabled]);

  const findBestNextColor = useCallback(() => {
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
  }, [availableColors, currentColor, targetColor, calculateColorAccuracy]);

  const resetGame = useCallback(() => {
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
  }, []);

  const colorToHex = useCallback((color: Color) => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }, []);

  return {
    // State
    level,
    score,
    lives,
    isPlaying,
    gameOver,
    adWatched,
    targetColor,
    currentColor,
    availableColors,
    timeLeft,
    mergeAccuracy,
    movesUsed,
    totalMoves,
    hintsUsed,
    soundEnabled,
    showHint,
    hintColor,
    // Actions
    setIsPlaying,
    setTimeLeft,
    setAdWatched,
    setHintsUsed,
    setShowHint,
    setHintColor,
    setSoundEnabled,
    generateLevel,
    mergeColor,
    endGame,
    resetGame,
    findBestNextColor,
    colorToHex,
    setCurrentColor,
  };
};
