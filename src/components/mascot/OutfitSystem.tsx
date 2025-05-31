
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shirt } from 'lucide-react';
import { Outfits } from './types';

interface OutfitSystemProps {
  currentOutfit: string;
  onChangeOutfit: () => void;
}

const OutfitSystem: React.FC<OutfitSystemProps> = ({ currentOutfit, onChangeOutfit }) => {
  return (
    <Button
      onClick={onChangeOutfit}
      variant="outline"
      size="sm"
      className="w-full flex items-center gap-1 text-xs"
    >
      <Shirt className="w-3 h-3" />
      Change Outfit ({currentOutfit})
    </Button>
  );
};

export default OutfitSystem;

export const outfits: Outfits = {
  default: { color: '#00aaff', accessory: null },
  casual: { color: '#00aaff', accessory: 'hat' },
  formal: { color: '#0077cc', accessory: 'tie' },
  sporty: { color: '#00cc99', accessory: 'headband' },
  party: { color: '#ff6600', accessory: 'bowtie' }
};
