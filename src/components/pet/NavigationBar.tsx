
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Package, Coins } from 'lucide-react';

interface NavigationBarProps {
  activeRoom: string;
  onRoomChange: (room: string) => void;
  onOpenShop: () => void;
  onOpenInventory: () => void;
  coinBalance: number;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeRoom,
  onRoomChange,
  onOpenShop,
  onOpenInventory,
  coinBalance
}) => {
  const rooms = [
    { id: 'bedroom', name: 'Room', icon: '🏠', color: 'from-blue-400 to-blue-600' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍽️', color: 'from-orange-400 to-orange-600' },
    { id: 'bathroom', name: 'Bath', icon: '🛁', color: 'from-cyan-400 to-cyan-600' },
    { id: 'playroom', name: 'Play', icon: '🎮', color: 'from-green-400 to-green-600' },
    { id: 'garden', name: 'Garden', icon: '🌳', color: 'from-emerald-400 to-emerald-600' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm border-t-2 border-white/50 p-4">
      {/* Coin Balance */}
      <div className="flex justify-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <Coins className="w-5 h-5" />
          <span className="font-bold">{coinBalance.toLocaleString()}</span>
        </motion.div>
      </div>

      {/* Room Navigation */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <motion.div key={room.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onRoomChange(room.id)}
              className={`
                flex flex-col items-center gap-1 h-16 min-w-[70px] px-3
                ${activeRoom === room.id 
                  ? `bg-gradient-to-r ${room.color} text-white shadow-lg` 
                  : 'bg-white/80 text-gray-600 hover:bg-white'
                }
                border-2 border-white/50 transition-all duration-200
              `}
              variant="outline"
            >
              <span className="text-xl">{room.icon}</span>
              <span className="text-xs font-medium">{room.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Shop & Inventory */}
      <div className="flex gap-3 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onOpenShop}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold">Shop</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onOpenInventory}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">Items</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NavigationBar;
