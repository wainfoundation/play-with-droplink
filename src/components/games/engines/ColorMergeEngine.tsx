
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { playSoundEffect } from '@/utils/sounds';
import { useColorMergeGame } from '@/hooks/useColorMergeGame';
import { initializePiAds, showRewardedAd, showInterstitialAd, isAdServiceReady } from '@/services/piAdService';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import ColorMergeStats from '@/components/games/color-merge/ColorMergeStats';
import ColorMergeStartScreen from '@/components/games/color-merge/ColorMergeStartScreen';
import ColorMergeGameOver from '@/components/games/color-merge/ColorMergeGameOver';
import ColorMergeGameplay from '@/components/games/color-merge/ColorMergeGameplay';

interface ColorMergeEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const ColorMergeEngine: React.FC<ColorMergeEngineProps> = ({ onBack, onGameComplete }) => {
  const [adServiceReady, setAdServiceReady] = useState(false);
  const [showPiWarning, setShowPiWarning] = useState(false);

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

  // Initialize Pi Ads on component mount
  useEffect(() => {
    const initAds = async () => {
      const isPiBrowser = isRunningInPiBrowser();
      
      if (!isPiBrowser) {
        setShowPiWarning(true);
        return;
      }

      try {
        const initialized = await initializePiAds({
          onReward: (reward) => {
            if (soundEnabled) {
              playSoundEffect('piPayment', 0.8);
            }
            toast({
              title: "Ad Reward Earned! 🎉",
              description: `You earned ${reward.amount} ${reward.type}!`,
            });
          },
          onAdError: (error) => {
            console.error("Ad service error:", error);
            toast({
              title: "Ad Error",
              description: error,
              variant: "destructive",
            });
          },
          onAdNotSupported: () => {
            setShowPiWarning(true);
            toast({
              title: "Ads Not Supported",
              description: "Please update your Pi Browser to access ads.",
              variant: "destructive",
            });
          }
        });

        setAdServiceReady(initialized);
      } catch (error) {
        console.error("Failed to initialize Pi Ads:", error);
        setShowPiWarning(true);
      }
    };

    initAds();
  }, [soundEnabled]);

  // Handle game completion milestone
  useEffect(() => {
    if (level % 100 === 0 && level > 1) {
      onGameComplete(score);
    }
  }, [level, score, onGameComplete]);

  const startLevel = async () => {
    if (!adWatched && level > 1) {
      if (!adServiceReady) {
        toast({
          title: "Ad Service Not Ready",
          description: "Please ensure you're using Pi Browser with ad support",
          variant: "destructive"
        });
        return;
      }

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

    // Show interstitial ad every 5 levels for engagement
    if (level > 1 && level % 5 === 0 && adServiceReady) {
      setTimeout(async () => {
        await showInterstitialAd();
      }, 1000);
    }
  };

  const retryWithAd = async () => {
    if (!adServiceReady) {
      toast({
        title: "Ad Service Not Ready",
        description: "Please ensure you're using Pi Browser with ad support",
        variant: "destructive"
      });
      return;
    }

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
    if (!adServiceReady) {
      toast({
        title: "Watch Ad for Hint",
        description: "Ads not available - try the hint anyway!",
        variant: "destructive"
      });
      // Still provide the hint as fallback
      provideFreeHint();
      return;
    }

    try {
      const success = await showRewardedAd({
        type: "points",
        amount: 1,
        description: "Color Merge hint - show next move"
      });

      if (success) {
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
      }
    } catch (error) {
      toast({
        title: "Ad Error",
        description: "Unable to show ad for hint",
        variant: "destructive"
      });
      // Provide free hint as fallback
      provideFreeHint();
    }
  };

  const provideFreeHint = () => {
    const bestColor = findBestNextColor();
    setHintColor(bestColor);
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
    
    toast({
      title: "Free Hint! 💡",
      description: "The best color choice is highlighted",
    });
    
    setTimeout(() => {
      setShowHint(false);
      setHintColor(null);
    }, 3000);
  };

  const skipLevel = async () => {
    if (!adServiceReady) {
      toast({
        title: "Skip Not Available",
        description: "Ad service required for level skip",
        variant: "destructive"
      });
      return;
    }

    try {
      const success = await showRewardedAd({
        type: "pi",
        amount: 0.05,
        description: "Color Merge skip level"
      });

      if (success) {
        if (soundEnabled) {
          playSoundEffect('piPayment', 0.8);
        }
        
        // Skip to next level logic would go here
        toast({
          title: "Level Skipped! ⏭️",
          description: `Moved to level ${level + 1}`,
        });
      }
    } catch (error) {
      toast({
        title: "Skip Failed",
        description: "Unable to process level skip",
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
            {showPiWarning && (
              <AlertCircle className="w-4 h-4 text-yellow-500" title="Pi Browser required for ads" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showPiWarning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Pi Browser recommended for full ad experience
              </span>
            </div>
          </div>
        )}

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
