
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, Star, Coins, Heart } from 'lucide-react';

interface MyBooHeaderProps {
  totalScore: number;
  coins: number;
  level: number;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

const MyBooHeader: React.FC<MyBooHeaderProps> = ({
  totalScore,
  coins,
  level,
  soundEnabled,
  onSoundToggle
}) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 p-4 rounded-none">
      <div className="flex items-center justify-between">
        {/* Left side - Level and Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600 rounded-full p-2 border-4 border-white shadow-lg transform rotate-12">
            <Star className="w-6 h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {level}
            </span>
          </div>
          
          {/* Heart/Health indicator */}
          <div className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-full border-2 border-white shadow-lg">
            <Heart className="w-4 h-4 text-white fill-white" />
            <span className="text-white font-bold text-sm">100</span>
          </div>
        </div>

        {/* Right side - Coins and Settings */}
        <div className="flex items-center gap-3">
          {/* Coins Display */}
          <div className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-full border-3 border-white shadow-lg">
            <Coins className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg">{coins.toLocaleString()}</span>
          </div>

          {/* Sound Toggle */}
          <Button
            onClick={onSoundToggle}
            variant="outline"
            size="sm"
            className="bg-purple-500 border-white border-2 hover:bg-purple-600 text-white rounded-full p-3"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyBooHeader;
