
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      <Button onClick={onStartLevel} size="lg">
        {(adWatched || level === 1) ? 'Start Level' : 'Watch Ad to Play'}
      </Button>
    </div>
  );
};

export default ColorMergeStartScreen;
