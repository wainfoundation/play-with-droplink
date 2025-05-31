
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CharacterCustomization } from './types';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'accessory' | 'color' | 'background';
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
}

interface CharacterShopProps {
  character: CharacterCustomization;
  userCoins: number;
  onPurchase: (item: ShopItem) => void;
}

const CharacterShop: React.FC<CharacterShopProps> = ({
  character,
  userCoins,
  onPurchase
}) => {
  const shopItems: ShopItem[] = [
    { id: 'hat1', name: 'Cool Hat', price: 50, type: 'accessory', icon: '🎩', description: 'A stylish hat', rarity: 'common' },
    { id: 'hat2', name: 'Crown', price: 200, type: 'accessory', icon: '👑', description: 'Royal headwear', rarity: 'epic' },
    { id: 'glasses', name: 'Sunglasses', price: 75, type: 'accessory', icon: '🕶️', description: 'Cool shades', rarity: 'common' },
    { id: 'bow', name: 'Bow Tie', price: 100, type: 'accessory', icon: '🎀', description: 'Elegant bow tie', rarity: 'rare' },
    { id: 'necklace', name: 'Golden Necklace', price: 150, type: 'accessory', icon: '📿', description: 'Shiny jewelry', rarity: 'rare' },
    { id: 'red', name: 'Ruby Red', price: 80, type: 'color', icon: '🔴', description: 'Deep red color', rarity: 'common' },
    { id: 'green', name: 'Emerald Green', price: 80, type: 'color', icon: '🟢', description: 'Vibrant green', rarity: 'common' },
    { id: 'purple', name: 'Royal Purple', price: 120, type: 'color', icon: '🟣', description: 'Majestic purple', rarity: 'rare' },
    { id: 'beach', name: 'Beach Theme', price: 250, type: 'background', icon: '🏖️', description: 'Tropical beach', rarity: 'epic' },
    { id: 'space', name: 'Space Theme', price: 300, type: 'background', icon: '🌌', description: 'Cosmic adventure', rarity: 'epic' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-200 text-gray-800';
      case 'rare': return 'bg-blue-200 text-blue-800';
      case 'epic': return 'bg-purple-200 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getCategoryItems = (type: string) => {
    return shopItems.filter(item => item.type === type);
  };

  const categories = [
    { type: 'accessory', name: 'Accessories', icon: '👒' },
    { type: 'color', name: 'Colors', icon: '🎨' },
    { type: 'background', name: 'Backgrounds', icon: '🖼️' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛍️ Character Shop
          </CardTitle>
          <p className="text-sm text-gray-600">
            Customize your character with awesome items!
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Your coins:</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              💰 {userCoins}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {categories.map((category) => (
        <Card key={category.type}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCategoryItems(category.type).map((item) => {
                const canAfford = userCoins >= item.price;
                const isOwned = category.type === 'accessory' 
                  ? character.accessories.includes(item.id)
                  : false; // For colors and backgrounds, you'd need to track ownership

                return (
                  <Card 
                    key={item.id}
                    className={`transition-all hover:shadow-md ${!canAfford ? 'opacity-75' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{item.icon}</div>
                        
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <Badge className={getRarityColor(item.rarity)}>
                            {item.rarity}
                          </Badge>
                          <Badge variant="outline">
                            💰 {item.price}
                          </Badge>
                        </div>
                        
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => onPurchase(item)}
                          disabled={!canAfford || isOwned}
                        >
                          {isOwned ? 'Owned' : canAfford ? 'Buy' : 'Not enough coins'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CharacterShop;
