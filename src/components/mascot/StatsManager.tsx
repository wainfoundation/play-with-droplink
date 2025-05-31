
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Gamepad2, 
  Droplets, 
  Apple, 
  Coffee,
  Zap
} from 'lucide-react';
import { MascotStats } from './types';

interface StatsManagerProps {
  stats: MascotStats;
  onFeed: () => void;
  onPlay: () => void;
  onShower: () => void;
  onRest: () => void;
}

const StatsManager: React.FC<StatsManagerProps> = ({
  stats,
  onFeed,
  onPlay,
  onShower,
  onRest
}) => {
  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      {/* Stats Display */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">Happy</div>
            <div className={`h-2 rounded-full ${getStatColor(stats.happiness)}`} 
                 style={{ width: `${stats.happiness}%` }} />
          </div>
          <span className="text-xs">{Math.round(stats.happiness)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Apple className="w-4 h-4 text-green-500" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">Food</div>
            <div className={`h-2 rounded-full ${getStatColor(stats.hunger)}`} 
                 style={{ width: `${stats.hunger}%` }} />
          </div>
          <span className="text-xs">{Math.round(stats.hunger)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">Clean</div>
            <div className={`h-2 rounded-full ${getStatColor(stats.cleanliness)}`} 
                 style={{ width: `${stats.cleanliness}%` }} />
          </div>
          <span className="text-xs">{Math.round(stats.cleanliness)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">Energy</div>
            <div className={`h-2 rounded-full ${getStatColor(stats.energy)}`} 
                 style={{ width: `${stats.energy}%` }} />
          </div>
          <span className="text-xs">{Math.round(stats.energy)}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          onClick={onFeed}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          disabled={stats.hunger >= 95}
        >
          <Apple className="w-3 h-3" />
          Feed
        </Button>
        
        <Button
          onClick={onPlay}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          disabled={stats.energy <= 10}
        >
          <Gamepad2 className="w-3 h-3" />
          Play
        </Button>
        
        <Button
          onClick={onShower}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          disabled={stats.cleanliness >= 95}
        >
          <Droplets className="w-3 h-3" />
          Shower
        </Button>
        
        <Button
          onClick={onRest}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          disabled={stats.energy >= 95}
        >
          <Coffee className="w-3 h-3" />
          Rest
        </Button>
      </div>
    </>
  );
};

export default StatsManager;
