
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '@/hooks/useGameData';

interface InventoryDragDropProps {
  inventory: InventoryItem[];
  onUseItem: (itemId: string) => void;
  className?: string;
}

const InventoryDragDrop: React.FC<InventoryDragDropProps> = ({
  inventory,
  onUseItem,
  className = ""
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍎';
      case 'hygiene': return '🧼';
      case 'medicine': return '💊';
      case 'toy': return '🎾';
      default: return '📦';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'hygiene': return 'bg-blue-100 text-blue-800';
      case 'medicine': return 'bg-green-100 text-green-800';
      case 'toy': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (inventory.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-4 text-center text-gray-500">
          <div className="text-4xl mb-2">🎒</div>
          <p>No items in inventory</p>
          <p className="text-sm">Visit the shop to buy items!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>🎒</span>
          Inventory
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {inventory.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e as any, item.item_id)}
              onDragEnd={handleDragEnd}
              onClick={() => onUseItem(item.item_id)}
              className={`
                relative p-3 bg-white border rounded-lg cursor-pointer
                hover:shadow-md transition-all duration-200
                ${draggedItem === item.item_id ? 'opacity-50 scale-95' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {getItemIcon(item.shop_item?.category || '')}
                </div>
                <p className="text-xs font-medium truncate">
                  {item.shop_item?.name}
                </p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs mt-1 ${getCategoryColor(item.shop_item?.category || '')}`}
                >
                  {item.quantity}x
                </Badge>
              </div>
              
              {/* Drag indicator */}
              {draggedItem === item.item_id && (
                <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg" />
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Drag items to your pet or tap to use
        </p>
      </CardContent>
    </Card>
  );
};

export default InventoryDragDrop;
