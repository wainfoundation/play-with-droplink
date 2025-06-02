
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Coins, Star } from 'lucide-react';
import { ShopItem } from '@/data/shopItems';

interface ShopItemGridProps {
  items: ShopItem[];
  wallet: any;
  inventory: any[];
  onBuyItem: (item: ShopItem) => boolean;
  loading: boolean;
}

const ShopItemGrid: React.FC<ShopItemGridProps> = ({
  items,
  wallet,
  inventory,
  onBuyItem,
  loading
}) => {
  const getItemEmoji = (category: string, itemId: string) => {
    if (category === 'food') return '🍎';
    if (category === 'toy') return '🎾';
    if (category === 'medicine') return '💊';
    if (category === 'cleaning') return '🧼';
    if (category === 'luxury') return '💎';
    if (category === 'theme') return '🎨';
    if (category === 'special') return '✨';
    return '📦';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'common': return 1;
      case 'rare': return 2;
      case 'epic': return 3;
      case 'legendary': return 4;
      default: return 1;
    }
  };

  const canAfford = (price: number) => {
    return wallet && wallet.dropletCoins >= price;
  };

  const isOwned = (itemId: string) => {
    return inventory.some(inv => inv.itemId === itemId);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">No items found</h3>
        <p>Try adjusting your filters to see more items</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className={`border-2 hover:shadow-lg transition-all ${
            isOwned(item.id) ? 'border-green-300 bg-green-50' : 'border-gray-200'
          }`}>
            <CardContent className="p-3">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">
                  {getItemEmoji(item.category, item.id)}
                </div>
                <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                
                {/* Rarity Badge */}
                <div className="flex items-center justify-center mt-1 mb-2">
                  <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: getRarityStars(item.rarity) }).map((_, i) => (
                        <Star key={i} className="w-2 h-2 fill-current" />
                      ))}
                      <span className="capitalize">{item.rarity}</span>
                    </div>
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </div>

              {/* Effects */}
              {Object.keys(item.effect).length > 0 && (
                <div className="text-xs mb-3">
                  <div className="font-medium text-gray-700 mb-1">Effects:</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(item.effect).map(([stat, value]) => (
                      <Badge key={stat} variant="outline" className="text-xs px-1 py-0">
                        {stat} {value > 0 ? '+' : ''}{value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Buy Button */}
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${
                    canAfford(item.price) ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <Coins className="w-3 h-3" />
                    <span>{item.price}</span>
                  </div>
                </div>

                <Button
                  onClick={() => onBuyItem(item)}
                  disabled={loading || !canAfford(item.price) || isOwned(item.id)}
                  className="w-full text-xs"
                  size="sm"
                >
                  {isOwned(item.id) ? 'Owned' : 
                   !canAfford(item.price) ? 'Too Expensive' : 
                   'Buy'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ShopItemGrid;
