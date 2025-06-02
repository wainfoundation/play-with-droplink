
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Package } from 'lucide-react';
import { ShopItem } from '@/hooks/useShopItems';

interface ShopItemGridProps {
  items: ShopItem[];
  wallet: { droplet_coins: number } | null;
  inventory: any[];
  onBuyItem: (item: ShopItem) => void;
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
    if (category === 'food') {
      if (itemId.includes('apple')) return '🍎';
      if (itemId.includes('banana')) return '🍌';
      if (itemId.includes('bread')) return '🍞';
      if (itemId.includes('cheese')) return '🧀';
      if (itemId.includes('milk')) return '🥛';
      if (itemId.includes('steak')) return '🥩';
      if (itemId.includes('lobster')) return '🦞';
      if (itemId.includes('truffle')) return '🍄';
      if (itemId.includes('burger')) return '🍔';
      if (itemId.includes('sushi')) return '🍣';
      if (itemId.includes('pasta')) return '🍝';
      if (itemId.includes('icecream')) return '🍦';
      if (itemId.includes('donut')) return '🍩';
      if (itemId.includes('waffle')) return '🧇';
      if (itemId.includes('bagel')) return '🥯';
      if (itemId.includes('taco')) return '🌮';
      if (itemId.includes('ramen')) return '🍜';
    }
    if (category === 'toy') {
      if (itemId.includes('frisbee')) return '🥏';
      if (itemId.includes('teddy')) return '🧸';
      if (itemId.includes('robot')) return '🤖';
      if (itemId.includes('drone')) return '🚁';
      if (itemId.includes('kite')) return '🪁';
      if (itemId.includes('skateboard')) return '🛹';
      if (itemId.includes('yoyo')) return '🪀';
      if (itemId.includes('blocks')) return '🧱';
      if (itemId.includes('train')) return '🚂';
      if (itemId.includes('ball')) return '⚽';
    }
    if (category === 'accessory') {
      if (itemId.includes('crown')) return '👑';
      if (itemId.includes('scarf')) return '🧣';
      if (itemId.includes('watch')) return '⌚';
      if (itemId.includes('necklace')) return '📿';
      if (itemId.includes('backpack')) return '🎒';
      if (itemId.includes('boots')) return '👢';
      if (itemId.includes('mask')) return '🎭';
      if (itemId.includes('wings')) return '🪽';
      if (itemId.includes('monocle')) return '🧐';
    }
    if (category === 'enhancement') {
      if (itemId.includes('speed')) return '💨';
      if (itemId.includes('strength')) return '💪';
      if (itemId.includes('brain')) return '🧠';
      if (itemId.includes('beauty')) return '✨';
      if (itemId.includes('luck')) return '🍀';
      if (itemId.includes('energy')) return '⚡';
      if (itemId.includes('immortal')) return '🧿';
      if (itemId.includes('telepathy')) return '👁️';
      if (itemId.includes('flight')) return '🚀';
    }
    if (category === 'luxury') {
      if (itemId.includes('car')) return '🏎️';
      if (itemId.includes('mansion')) return '🏰';
      if (itemId.includes('yacht')) return '🛥️';
      if (itemId.includes('jet')) return '✈️';
      if (itemId.includes('island')) return '🏝️';
      if (itemId.includes('helicopter')) return '🚁';
      if (itemId.includes('submarine')) return '🟡';
      if (itemId.includes('castle')) return '🏰';
      if (itemId.includes('spaceship')) return '🚀';
      if (itemId.includes('limousine')) return '🚗';
      if (itemId.includes('penthouse')) return '🏢';
    }
    if (category === 'vehicle') {
      if (itemId.includes('motorcycle')) return '🏍️';
      if (itemId.includes('bicycle')) return '🚴';
      if (itemId.includes('scooter')) return '🛴';
      if (itemId.includes('atv')) return '🚗';
      if (itemId.includes('truck')) return '🚛';
      if (itemId.includes('convertible')) return '🚘';
      if (itemId.includes('van')) return '🚐';
      if (itemId.includes('boat')) return '⛵';
    }
    if (category === 'furniture') {
      if (itemId.includes('throne')) return '🪑';
      if (itemId.includes('bed')) return '🛏️';
      if (itemId.includes('sofa')) return '🛋️';
      if (itemId.includes('piano')) return '🎹';
      if (itemId.includes('chandelier')) return '🕯️';
      if (itemId.includes('bookshelf')) return '📚';
      if (itemId.includes('mirror')) return '🪞';
      if (itemId.includes('desk')) return '🗃️';
      if (itemId.includes('statue')) return '🗿';
    }
    if (category === 'technology') {
      if (itemId.includes('computer')) return '💻';
      if (itemId.includes('phone')) return '📱';
      if (itemId.includes('vr')) return '🥽';
      if (itemId.includes('ai')) return '🤖';
      if (itemId.includes('tablet')) return '📱';
      if (itemId.includes('console')) return '🎮';
      if (itemId.includes('projector')) return '📽️';
    }
    if (category === 'collectible') {
      if (itemId.includes('stamp')) return '📮';
      if (itemId.includes('coin')) return '🪙';
      if (itemId.includes('card')) return '🃏';
      if (itemId.includes('fossil')) return '🦴';
      if (itemId.includes('gem')) return '💎';
      if (itemId.includes('artifact')) return '🏺';
    }
    return '📦';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: 'bg-gray-100 text-gray-700',
      rare: 'bg-blue-100 text-blue-700',
      epic: 'bg-purple-100 text-purple-700',
      legendary: 'bg-yellow-100 text-yellow-700'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getOwnedQuantity = (itemId: string) => {
    const item = inventory.find(inv => inv.item_id === itemId);
    return item ? item.quantity : 0;
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No items found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item: ShopItem) => {
        const ownedQuantity = getOwnedQuantity(item.id);
        const canAfford = (wallet?.droplet_coins || 0) >= item.price_coins;

        return (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`border-2 ${getRarityColor(item.rarity)} hover:shadow-lg transition-all h-full`}>
              <CardContent className="p-3 flex flex-col h-full">
                {/* Item Icon */}
                <div className="text-center mb-2">
                  <div className="text-3xl mb-1">
                    {getItemEmoji(item.category, item.id)}
                  </div>
                  <h3 className="font-semibold text-xs">{item.name}</h3>
                </div>

                {/* Rarity Badge */}
                <div className="flex justify-center mb-2">
                  <Badge className={`text-xs ${getRarityBadge(item.rarity)}`}>
                    {item.rarity}
                  </Badge>
                </div>

                {/* Effects */}
                <div className="text-xs text-gray-600 mb-2 flex-1 min-h-[2rem]">
                  {Object.entries(item.effect).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{key}:</span>
                      <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                        {value > 0 ? '+' : ''}{value}
                      </span>
                    </div>
                  ))}
                  {Object.keys(item.effect).length > 2 && (
                    <div className="text-gray-400">+{Object.keys(item.effect).length - 2} more</div>
                  )}
                </div>

                {/* Price and Owned */}
                <div className="space-y-1 mt-auto">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3 text-yellow-600" />
                      <span className="font-semibold">{item.price_coins.toLocaleString()}</span>
                    </div>
                    {ownedQuantity > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Owned: {ownedQuantity}
                      </Badge>
                    )}
                  </div>

                  {/* Buy Button */}
                  <Button
                    onClick={() => onBuyItem(item)}
                    disabled={!canAfford || loading}
                    size="sm"
                    className="w-full text-xs h-7"
                    variant={canAfford ? "default" : "outline"}
                  >
                    {canAfford ? 'Buy' : 'Need more coins'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShopItemGrid;
