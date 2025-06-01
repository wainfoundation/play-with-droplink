
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Crown, Volume2, VolumeX } from 'lucide-react';

interface ColorMergeGameOverProps {
  score: number;
  level: number;
  hintsUsed: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onRetryWithAd: () => void;
  onResetGame: () => void;
  onBack: () => void;
}

const ColorMergeGameOver: React.FC<ColorMergeGameOverProps> = ({
  score,
  level,
  hintsUsed,
  soundEnabled,
  setSoundEnabled,
  onRetryWithAd,
  onResetGame,
  onBack
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">🎨 Color Merge - Game Over!</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
      
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
        <Button onClick={onRetryWithAd} variant="outline" className="flex-1">
          📺 Watch Ad to Retry
        </Button>
        <Button onClick={onResetGame} variant="outline" className="flex-1">
          <RefreshCw className="w-4 h-4 mr-2" />
          Restart
        </Button>
        <Button onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default ColorMergeGameOver;
