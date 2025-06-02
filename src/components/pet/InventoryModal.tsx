
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Sparkles } from 'lucide-react';
import { useLocalShop } from '@/hooks/useLocalShop';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { toast } from '@/hooks/use-toast';

interface InventoryModalProps {
  onClose: () => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const { inventory, useItem } = useLocalShop('droplet-blue');
  const { actions } = usePetMoodEngine('droplet-blue');

  const handleUseItem = async (itemId: string, itemName: string) => {
    const effects = useItem(itemId);
    if (effects) {
      // Apply effects to pet
      if (effects.hunger) actions.feedPet();
      if (effects.cleanliness) actions.bathePet();
      if (effects.health) actions.giveMedicine();
      if (effects.energy) actions.sleepPet();
      if (effects.happiness || effects.affection) actions.petCharacter();

      toast({
        title: `Used ${itemName}! ✨`,
        description: "Effects applied to your pet",
        className: "bg-green-50 border-green-200"
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍎';
      case 'toy': return '🎾';
      case 'medicine': return '💊';
      case 'cleaning': return '🧼';
      case 'luxury': return '💎';
      case 'theme': return '🎨';
      case 'special': return '✨';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <Badge variant="outline" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {inventory.length} items
          </Badge>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-green-500" />
              Your Inventory
            </CardTitle>
            <p className="text-gray-600">
              Use items to care for your pet and improve their stats
            </p>
          </CardHeader>
        </Card>

        {/* Inventory Grid */}
        {inventory.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Empty Inventory</h3>
              <p className="text-gray-600">
                Visit the shop to buy items for your pet!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((invItem) => {
              const item = invItem.item;
              if (!item) return null;

              return (
                <motion.div
                  key={invItem.itemId}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">
                            {item.emoji || getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                            <Badge 
                              className={`text-xs ${getRarityColor(item.rarity)}`}
                              variant="outline"
                            >
                              {item.rarity}
                            </Badge>
                          </div>
                        </div>
                        
                        <Badge variant="secondary" className="text-xs">
                          x{invItem.quantity}
                        </Badge>
                      </div>

                      {/* Item Description */}
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Effects */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-xs font-semibold text-gray-700">Effects:</h4>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {Object.entries(item.effect).map(([stat, value]) => (
                            <div key={stat} className="flex justify-between">
                              <span className="capitalize text-gray-600">{stat}:</span>
                              <span className={`font-medium ${
                                typeof value === 'number' && value > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {typeof value === 'number' ? (value > 0 ? `+${value}` : value) : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleUseItem(item.id, item.name)}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xs"
                          size="sm"
                          disabled={invItem.quantity <= 0}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Use Item
                        </Button>

                        {/* Equipment toggle for certain items */}
                        {['luxury', 'theme'].includes(item.category) && (
                          <Button
                            variant={invItem.equipped ? "secondary" : "outline"}
                            size="sm"
                            className="w-full text-xs"
                          >
                            {invItem.equipped ? 'Equipped ✓' : 'Equip'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
