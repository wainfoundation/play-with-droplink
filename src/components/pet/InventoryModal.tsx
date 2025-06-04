
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Package } from 'lucide-react';

interface InventoryModalProps {
  onClose: () => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const inventoryItems = [
    { id: 'apple', name: 'Apple', type: 'food', quantity: 3, emoji: '🍎', effect: 'Restores hunger' },
    { id: 'milk', name: 'Milk', type: 'food', quantity: 2, emoji: '🥛', effect: 'Restores hunger and health' },
    { id: 'soap', name: 'Soap', type: 'hygiene', quantity: 1, emoji: '🧼', effect: 'Improves cleanliness' },
    { id: 'ball', name: 'Ball', type: 'toy', quantity: 1, emoji: '⚽', effect: 'Increases happiness' },
    { id: 'medicine', name: 'Medicine', type: 'health', quantity: 1, emoji: '💊', effect: 'Restores health' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Inventory</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {inventoryItems.map((item) => (
            <Card key={item.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.effect}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">×{item.quantity}</div>
                  <Button size="sm" className="mt-1" disabled={item.quantity === 0}>
                    Use
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InventoryModal;
