
import React from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ColorMergeStatsProps {
  lives: number;
  movesUsed: number;
  totalMoves: number;
  timeLeft: number;
  hintsUsed: number;
  mergeAccuracy: number;
  level: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isPlaying: boolean;
}

const ColorMergeStats: React.FC<ColorMergeStatsProps> = ({
  lives,
  movesUsed,
  totalMoves,
  timeLeft,
  hintsUsed,
  mergeAccuracy,
  level,
  soundEnabled,
  setSoundEnabled,
  isPlaying
}) => {
  return (
    <div className="space-y-4">
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

      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ColorMergeStats;
