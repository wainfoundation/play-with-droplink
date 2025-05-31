
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { createPiPayment } from '@/services/piNetwork';
import { toast } from '@/hooks/use-toast';
import { playSoundEffect } from '@/utils/sounds';
import { useColorMergeGame } from '@/hooks/useColorMergeGame';
import ColorMergeStats from '@/components/games/color-merge/ColorMergeStats';
import ColorMergeStartScreen from '@/components/games/color-merge/ColorMergeStartScreen';
import ColorMergeGameOver from '@/components/games/color-merge/ColorMergeGameOver';
import ColorMergeGameplay from '@/components/games/color-merge/ColorMergeGameplay';

interface ColorMergeEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const ColorMergeEngine: React.FC<ColorMergeEngineProps> = ({ onBack, onGameComplete }) => {
  const {
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
  } = useColorMergeGame();

  // Handle game completion milestone
  useEffect(() => {
    if (level % 100 === 0 && level > 1) {
      onGameComplete(score);
    }
  }, [level, score, onGameComplete]);

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
    setTimeLeft(60 + Math.floor(level / 10) * 10);
    setShowHint(false);
    setHintColor(null);
    generateLevel();
    
    if (soundEnabled) {
      playSoundEffect('newLevel', 0.7);
    }
  };

  const retryWithAd = async () => {
    try {
      const success = await showRewardedAd({
        type: "pi",
        amount: 0.02,
        description: "Color Merge retry with extra life"
      });
      
      if (success) {
        resetGame();
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

  const handleResetColor = () => {
    setCurrentColor({ r: 255, g: 255, b: 255 });
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <ColorMergeGameOver
            score={score}
            level={level}
            hintsUsed={hintsUsed}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            onRetryWithAd={retryWithAd}
            onResetGame={resetGame}
            onBack={onBack}
          />
        </CardHeader>
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
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ColorMergeStats
          lives={lives}
          movesUsed={movesUsed}
          totalMoves={totalMoves}
          timeLeft={timeLeft}
          hintsUsed={hintsUsed}
          mergeAccuracy={mergeAccuracy}
          level={level}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          isPlaying={isPlaying}
        />

        {!isPlaying && !gameOver && (
          <ColorMergeStartScreen
            level={level}
            adWatched={adWatched}
            onStartLevel={startLevel}
          />
        )}

        {isPlaying && (
          <ColorMergeGameplay
            targetColor={targetColor}
            currentColor={currentColor}
            availableColors={availableColors}
            showHint={showHint}
            hintColor={hintColor}
            colorToHex={colorToHex}
            onMergeColor={mergeColor}
            onResetColor={handleResetColor}
            onBuyHint={buyHint}
            onSkipLevel={skipLevel}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ColorMergeEngine;
