
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, ShoppingBag, Package, Plus, Gift, Coins } from 'lucide-react';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import { useRoomManager } from '@/hooks/useRoomManager';
import PetDisplay from './PetDisplay';
import BedroomRoom from '../rooms/BedroomRoom';
import GenericRoom from '../rooms/GenericRoom';
import EnhancedItemShop from '../shop/EnhancedItemShop';
import CoinShop from '../shop/CoinShop';
import InventoryModal from './InventoryModal';

const FullScreenPetGame: React.FC = () => {
  const [selectedCharacter] = useState('droplet-blue');
  const [showShop, setShowShop] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { moodState, actions } = usePetMoodEngine(selectedCharacter);
  const { wallet, claimDailyCoins, canClaimDailyCoins, petLevel, levelInfo } = usePetEconomy(selectedCharacter);
  const { currentRoom, changeRoom, getCurrentTheme, getCurrentMood } = useRoomManager();

  const currentTheme = getCurrentTheme();
  const currentMood = getCurrentMood();

  const rooms = [
    { id: 'bedroom', name: 'Sleep', icon: '🛏️', color: 'from-purple-400 to-purple-600' },
    { id: 'playroom', name: 'Play', icon: '🎮', color: 'from-green-400 to-green-600' },
    { id: 'bathroom', name: 'Bath', icon: '🛁', color: 'from-cyan-400 to-cyan-600' },
    { id: 'kitchen', name: 'Food', icon: '🍽️', color: 'from-orange-400 to-orange-600' },
    { id: 'medicine', name: 'Health', icon: '💊', color: 'from-red-400 to-red-600' },
    { id: 'outside', name: 'Nature', icon: '🌳', color: 'from-emerald-400 to-emerald-600' }
  ];

  const getRoomActions = (roomId: string) => {
    switch (roomId) {
      case 'playroom':
        return [
          { name: 'Play Ball', icon: '🎾', effect: actions.playWithPet, description: 'Increases happiness' },
          { name: 'Toy Time', icon: '🧸', effect: actions.playWithPet, description: 'Play with toys' },
          { name: 'Pet', icon: '💝', effect: actions.petCharacter, description: 'Show affection' },
          { name: 'Games', icon: '🎮', effect: actions.playWithPet, description: 'Fun activities' }
        ];
      case 'bathroom':
        return [
          { name: 'Bath', icon: '🛁', effect: actions.bathePet, description: 'Increases cleanliness' },
          { name: 'Soap', icon: '🧼', effect: actions.bathePet, description: 'Clean thoroughly' },
          { name: 'Shampoo', icon: '🧴', effect: actions.bathePet, description: 'Fresh and clean' },
          { name: 'Towel', icon: '🏖️', effect: actions.bathePet, description: 'Dry off' }
        ];
      case 'kitchen':
        return [
          { name: 'Apple', icon: '🍎', effect: actions.feedPet, description: 'Healthy snack' },
          { name: 'Burger', icon: '🍔', effect: actions.feedPet, description: 'Filling meal' },
          { name: 'Water', icon: '💧', effect: actions.feedPet, description: 'Stay hydrated' },
          { name: 'Treats', icon: '🍪', effect: actions.feedPet, description: 'Special reward' }
        ];
      case 'medicine':
        return [
          { name: 'Medicine', icon: '💊', effect: actions.giveMedicine, description: 'Restore health' },
          { name: 'Vitamins', icon: '💊', effect: actions.giveMedicine, description: 'Boost immunity' },
          { name: 'Rest', icon: '🛏️', effect: actions.sleepPet, description: 'Healing sleep' },
          { name: 'Checkup', icon: '🩺', effect: actions.giveMedicine, description: 'Health check' }
        ];
      case 'outside':
        return [
          { name: 'Walk', icon: '🚶', effect: actions.playWithPet, description: 'Exercise outside' },
          { name: 'Sun', icon: '☀️', effect: actions.playWithPet, description: 'Enjoy sunshine' },
          { name: 'Nature', icon: '🌳', effect: actions.playWithPet, description: 'Fresh air' },
          { name: 'Adventure', icon: '🗺️', effect: actions.playWithPet, description: 'Explore together' }
        ];
      default:
        return [];
    }
  };

  const handleClaimDaily = () => {
    const earned = claimDailyCoins(petLevel);
    if (earned > 0) {
      console.log(`Claimed ${earned} daily coins!`);
    }
  };

  // Render special room components
  if (currentRoom === 'bedroom') {
    return <BedroomRoom characterId={selectedCharacter} />;
  }

  // Render generic rooms
  const currentRoomData = rooms.find(r => r.id === currentRoom) || rooms[0];
  if (currentRoom !== 'bedroom') {
    return (
      <div className="w-screen h-screen overflow-hidden relative">
        <GenericRoom
          characterId={selectedCharacter}
          roomType={currentRoom}
          roomName={currentRoomData.name}
          roomIcon={currentRoomData.icon}
          roomColor={currentRoomData.color}
          actions={getRoomActions(currentRoom)}
        />
        
        {/* Room Navigation Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-yellow-300/95 to-orange-400/95 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center mb-4">
            {rooms.map((room) => (
              <motion.button
                key={room.id}
                onClick={() => changeRoom(room.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl shadow-lg transition-all ${
                  currentRoom === room.id 
                    ? `bg-gradient-to-r ${room.color} text-white` 
                    : 'bg-white text-gray-600'
                }`}
              >
                <span className="text-lg">{room.icon}</span>
                <span className="text-xs font-bold mt-1">{room.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center space-x-2">
            <Button
              onClick={() => setShowCoinShop(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-4 py-3 rounded-full shadow-lg"
            >
              <Coins className="w-4 h-4" />
              <span className="font-semibold text-sm">Coins</span>
            </Button>

            <Button
              onClick={() => setShowShop(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-semibold text-sm">Shop</span>
            </Button>

            <Button
              onClick={() => setShowInventory(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-4 py-3 rounded-full shadow-lg"
            >
              <Package className="w-4 h-4" />
              <span className="font-semibold text-sm">Items</span>
            </Button>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showCoinShop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setShowCoinShop(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="h-full overflow-auto"
              >
                <CoinShop onBack={() => setShowCoinShop(false)} />
              </motion.div>
            </motion.div>
          )}

          {showShop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setShowShop(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="h-full overflow-auto"
              >
                <EnhancedItemShop onBack={() => setShowShop(false)} />
              </motion.div>
            </motion.div>
          )}

          {showInventory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setShowInventory(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="h-full overflow-auto"
              >
                <InventoryModal onClose={() => setShowInventory(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default fallback (shouldn't reach here)
  return <div>Loading...</div>;
};

export default FullScreenPetGame;
