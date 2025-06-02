
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Shirt, Utensils, Gamepad2, Pill } from 'lucide-react';
import { useShopItems, InventoryItem } from '@/hooks/useShopItems';
import { useAuth } from '@/hooks/useAuth';

interface UserInventoryProps {
  onBack: () => void;
}

const UserInventory: React.FC<UserInventoryProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { inventory, useItem, toggleEquip, loading, getInventoryByCategory } = useShopItems();
  const [selectedCategory, setSelectedCategory] = useState('food');

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const categories = [
    { id: 'food', name: 'Food', icon: <Utensils className="w-4 h-4" /> },
    { id: 'toy', name: 'Toys', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'accessory', name: 'Accessories', icon: <Shirt className="w-4 h-4" /> },
    { id: 'medicine', name: 'Medicine', icon: <Pill className="w-4 h-4" /> },
  ];

  const handleUseItem = async (itemId: string) => {
    const effects = await useItem(itemId);
    // Effects are automatically applied and toast is shown
  };

  const handleToggleEquip = async (itemId: string, equipped: boolean) => {
    await toggleEquip(itemId, equipped);
  };

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
          <p className="text-gray-600 mb-4">Please log in to view your inventory</p>
          <Button onClick={onBack}>Back to Game</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-500" />
              Your Inventory
            </CardTitle>
            <p className="text-gray-600">Manage your items and equipment</p>
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
                {getInventoryByCategory(category.id).map((inventoryItem: InventoryItem) => {
                  const item = inventoryItem.item;
                  if (!item) return null;

                  const isConsumable = category.id === 'food' || category.id === 'medicine';
                  const isEquippable = category.id === 'accessory' || category.id === 'toy';

                  return (
                    <motion.div
                      key={inventoryItem.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className={`border-2 ${getRarityColor(item.rarity)} hover:shadow-lg transition-all ${inventoryItem.equipped ? 'ring-2 ring-green-400' : ''}`}>
                        <CardContent className="p-4">
                          {/* Item Icon */}
                          <div className="text-center mb-3">
                            <div className="text-4xl mb-2">
                              {getItemEmoji(item.category, item.id)}
                            </div>
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                          </div>

                          {/* Status Badges */}
                          <div className="flex flex-wrap gap-1 justify-center mb-3">
                            <Badge variant="outline" className="text-xs">
                              Qty: {inventoryItem.quantity}
                            </Badge>
                            {inventoryItem.equipped && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Equipped
                              </Badge>
                            )}
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

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            {isConsumable && (
                              <Button
                                onClick={() => handleUseItem(item.id)}
                                disabled={inventoryItem.quantity <= 0 || loading}
                                size="sm"
                                className="w-full text-xs"
                              >
                                Use Item
                              </Button>
                            )}
                            
                            {isEquippable && (
                              <Button
                                onClick={() => handleToggleEquip(item.id, inventoryItem.equipped)}
                                disabled={loading}
                                size="sm"
                                variant={inventoryItem.equipped ? "outline" : "default"}
                                className="w-full text-xs"
                              >
                                {inventoryItem.equipped ? 'Unequip' : 'Equip'}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {getInventoryByCategory(category.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No {category.name.toLowerCase()} items yet</p>
                  <p className="text-sm">Visit the shop to buy some items!</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UserInventory;
