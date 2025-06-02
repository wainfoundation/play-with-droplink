
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Package, Star, Utensils, Heart, Gamepad2, Pill } from 'lucide-react';
import { useShopItems, ShopItem } from '@/hooks/useShopItems';
import { useCharacterShop } from '@/hooks/useCharacterShop';
import { useAuth } from '@/hooks/useAuth';

interface EnhancedItemShopProps {
  onBack: () => void;
}

const EnhancedItemShop: React.FC<EnhancedItemShopProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { wallet } = useCharacterShop();
  const { shopItems, inventory, buyItem, loading, getItemsByCategory, getInventoryByCategory } = useShopItems();
  const [selectedCategory, setSelectedCategory] = useState('food');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <Utensils className="w-5 h-5" />;
      case 'toy': return <Gamepad2 className="w-5 h-5" />;
      case 'accessory': return <Heart className="w-5 h-5" />;
      case 'medicine': return <Pill className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
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

  const getItemEmoji = (category: string, itemId: string) => {
    if (category === 'food') {
      if (itemId.includes('apple')) return '🍎';
      if (itemId.includes('banana')) return '🍌';
      if (itemId.includes('carrot')) return '🥕';
      if (itemId.includes('fish')) return '🐟';
      if (itemId.includes('cake')) return '🎂';
      if (itemId.includes('pizza')) return '🍕';
      if (itemId.includes('sandwich')) return '🥪';
      if (itemId.includes('soup')) return '🍲';
      if (itemId.includes('cookie')) return '🍪';
      if (itemId.includes('salad')) return '🥗';
    }
    if (category === 'toy') {
      if (itemId.includes('ball')) return '⚽';
      if (itemId.includes('rope')) return '🪢';
      if (itemId.includes('puzzle')) return '🧩';
      if (itemId.includes('squeaky')) return '🐭';
      if (itemId.includes('laser')) return '🔴';
    }
    if (category === 'accessory') {
      if (itemId.includes('hat')) return '🎩';
      if (itemId.includes('bow')) return '🎀';
      if (itemId.includes('glasses')) return '👓';
      if (itemId.includes('collar')) return '💎';
      if (itemId.includes('cape')) return '🦸';
    }
    if (category === 'medicine') {
      if (itemId.includes('vitamin')) return '💊';
      if (itemId.includes('energy')) return '⚡';
      if (itemId.includes('heal')) return '🧪';
      if (itemId.includes('super')) return '✨';
    }
    return '📦';
  };

  const getOwnedQuantity = (itemId: string) => {
    const item = inventory.find(inv => inv.item_id === itemId);
    return item ? item.quantity : 0;
  };

  const categories = [
    { id: 'food', name: 'Food', icon: <Utensils className="w-4 h-4" /> },
    { id: 'toy', name: 'Toys', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'accessory', name: 'Accessories', icon: <Heart className="w-4 h-4" /> },
    { id: 'medicine', name: 'Medicine', icon: <Pill className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the shop</p>
          <Button onClick={onBack}>Back to Game</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">{wallet?.droplet_coins || 0}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-green-500" />
              Item Shop
            </CardTitle>
            <p className="text-gray-600">Purchase items to care for and customize your pet</p>
          </CardHeader>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getItemsByCategory(category.id).map((item: ShopItem) => {
                  const ownedQuantity = getOwnedQuantity(item.id);
                  const canAfford = (wallet?.droplet_coins || 0) >= item.price_coins;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className={`border-2 ${getRarityColor(item.rarity)} hover:shadow-lg transition-all`}>
                        <CardContent className="p-4">
                          {/* Item Icon */}
                          <div className="text-center mb-3">
                            <div className="text-4xl mb-2">
                              {getItemEmoji(item.category, item.id)}
                            </div>
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                          </div>

                          {/* Rarity Badge */}
                          <div className="flex justify-center mb-2">
                            <Badge className={`text-xs ${getRarityBadge(item.rarity)}`}>
                              {item.rarity}
                            </Badge>
                          </div>

                          {/* Effects */}
                          <div className="text-xs text-gray-600 mb-3 min-h-[2rem]">
                            {Object.entries(item.effect).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span>{key}:</span>
                                <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {value > 0 ? '+' : ''}{value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Price and Owned */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <Coins className="w-3 h-3 text-yellow-600" />
                                <span className="font-semibold">{item.price_coins}</span>
                              </div>
                              {ownedQuantity > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  Owned: {ownedQuantity}
                                </Badge>
                              )}
                            </div>

                            {/* Buy Button */}
                            <Button
                              onClick={() => buyItem(item)}
                              disabled={!canAfford || loading}
                              size="sm"
                              className="w-full text-xs"
                              variant={canAfford ? "default" : "outline"}
                            >
                              {canAfford ? 'Buy' : 'Not enough coins'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {getItemsByCategory(category.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No items in this category yet</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedItemShop;
