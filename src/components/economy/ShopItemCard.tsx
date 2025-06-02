
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopItem } from '@/data/shopItems';

interface ShopItemCardProps {
  item: ShopItem;
  canAfford: boolean;
  owned?: number;
  onPurchase: (itemId: string) => void;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ 
  item, 
  canAfford, 
  owned = 0,
  onPurchase 
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-red-100 border-red-300';
      case 'hygiene': return 'bg-blue-100 border-blue-300';
      case 'play': return 'bg-green-100 border-green-300';
      case 'medicine': return 'bg-purple-100 border-purple-300';
      case 'cosmetic': return 'bg-pink-100 border-pink-300';
      case 'theme': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const effectText = Object.entries(item.effect)
    .map(([key, value]) => `+${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`)
    .join(', ');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`${getCategoryColor(item.category)} border-2 shadow-lg h-full`}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="text-center mb-3">
            <div className="text-4xl mb-2">{item.emoji}</div>
            <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
            <Badge variant="outline" className="text-xs capitalize mb-2">
              {item.category}
            </Badge>
            {owned > 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                Owned: {owned}
              </Badge>
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            {effectText && (
              <p className="text-xs text-green-700 font-semibold mb-3">
                {effectText}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-yellow-600" />
              <span className="font-bold text-yellow-700">{item.price}</span>
            </div>
            
            <Button
              size="sm"
              disabled={!canAfford}
              onClick={() => onPurchase(item.id)}
              className={`${
                canAfford 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white`}
            >
              {canAfford ? 'Buy' : 'Too Expensive'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShopItemCard;
