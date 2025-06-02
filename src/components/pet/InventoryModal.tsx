
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Coins } from 'lucide-react';
import { useLocalShop } from '@/hooks/useLocalShop';

interface InventoryModalProps {
  onClose: () => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const { inventory, useItem, toggleEquip, loading } = useLocalShop('droplet-blue');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-emerald-500" />
              My Inventory
              <Badge className="bg-emerald-500 text-white">
                {inventory.length} Items
              </Badge>
            </CardTitle>
            <p className="text-gray-600">
              Use or equip items to help your pet!
            </p>
          </CardHeader>
        </Card>

        {inventory.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No items yet</h3>
            <p>Visit the shop to buy items for your pet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {inventory.map((invItem) => (
              <motion.div
                key={invItem.itemId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-2 ${invItem.equipped ? 'border-green-400 bg-green-50' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                  <CardContent className="p-3">
                    <div className="text-center mb-3">
                      <div className="text-3xl mb-2">
                        {getItemEmoji(invItem.item?.category || '', invItem.itemId)}
                      </div>
                      <h3 className="font-semibold text-sm">{invItem.item?.name}</h3>
                      {invItem.equipped && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700 mt-1">
                          Equipped
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      {invItem.item?.description}
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <Badge variant="outline">Qty: {invItem.quantity}</Badge>
                      <span className="text-gray-500 capitalize">{invItem.item?.category}</span>
                    </div>

                    {/* Effects */}
                    {invItem.item?.effect && Object.keys(invItem.item.effect).length > 0 && (
                      <div className="text-xs mb-3">
                        <div className="font-medium text-gray-700 mb-1">Effects:</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(invItem.item.effect).map(([stat, value]) => (
                            <Badge key={stat} variant="outline" className="text-xs px-1 py-0">
                              {stat} {value > 0 ? '+' : ''}{value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {invItem.item?.category === 'food' || invItem.item?.category === 'medicine' || invItem.item?.category === 'special' ? (
                        <Button
                          onClick={() => useItem(invItem.itemId)}
                          size="sm"
                          className="w-full text-xs"
                          disabled={loading}
                        >
                          Use Item
                        </Button>
                      ) : (
                        <Button
                          onClick={() => toggleEquip(invItem.itemId, !invItem.equipped)}
                          size="sm"
                          variant={invItem.equipped ? "outline" : "default"}
                          className="w-full text-xs"
                          disabled={loading}
                        >
                          {invItem.equipped ? 'Unequip' : 'Equip'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
