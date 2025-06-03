
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, Heart } from 'lucide-react';

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
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleMenu}
          className="bg-white/80 backdrop-blur-sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Heart className="h-3 w-3 mr-1 text-red-500" />
            {happiness}
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            💰 {dropletCoins}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PetGameHeader;
