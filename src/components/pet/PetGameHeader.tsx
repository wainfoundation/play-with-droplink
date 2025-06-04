
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Heart, Coins } from 'lucide-react';

interface PetGameHeaderProps {
  showMenu: boolean;
  onToggleMenu: () => void;
  happiness: number;
  dropletCoins: number;
}

const PetGameHeader: React.FC<PetGameHeaderProps> = ({
  showMenu,
  onToggleMenu,
  happiness,
  dropletCoins
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMenu}
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-white font-medium">{happiness}%</span>
          </div>
          
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-white font-medium">{dropletCoins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetGameHeader;
