
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Play } from 'lucide-react';

interface ColorMergeStartScreenProps {
  level: number;
  adWatched: boolean;
  onStartLevel: () => void;
}

const ColorMergeStartScreen: React.FC<ColorMergeStartScreenProps> = ({
  level,
  adWatched,
  onStartLevel
}) => {
  const needsAd = !adWatched && level > 1;
  
  return (
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
      
      {needsAd && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700 mb-2">
            📺 Watch a short ad to unlock this level
          </p>
          <Badge variant="outline" className="text-xs">
            Earn 0.01 Pi for watching
          </Badge>
        </div>
      )}

      <Button onClick={onStartLevel} size="lg" className="flex items-center gap-2">
        {needsAd ? (
          <>
            <Eye className="w-4 h-4" />
            Watch Ad to Play
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Start Level
          </>
        )}
      </Button>
    </div>
  );
};

export default ColorMergeStartScreen;
