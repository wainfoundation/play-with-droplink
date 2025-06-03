
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, ShoppingBag, Package, Plus, Gift } from 'lucide-react';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import { useRoomManager } from '@/hooks/useRoomManager';
import PetDisplay from './PetDisplay';
import EnhancedItemShop from '../shop/EnhancedItemShop';
import InventoryModal from './InventoryModal';

const FullScreenPetGame: React.FC = () => {
  const [selectedCharacter] = useState('droplet-blue');
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { moodState, actions } = usePetMoodEngine(selectedCharacter);
  const { wallet, claimDailyCoins, canClaimDailyCoins } = usePetEconomy(selectedCharacter);
  const { currentRoom, changeRoom, getCurrentTheme, getCurrentMood } = useRoomManager();

  const currentTheme = getCurrentTheme();
  const currentMood = getCurrentMood();

  // Calculate pet level based on overall stats
  const calculatePetLevel = () => {
    const totalStats = moodState.happiness + moodState.health + moodState.energy + moodState.hunger;
    return Math.max(1, Math.floor(totalStats / 100));
  };

  const petLevel = calculatePetLevel();

  // Apply room mood effects
  useEffect(() => {
    console.log(`Moved to ${currentRoom} - applying ${currentMood.primaryMood} mood`);
  }, [currentRoom, currentMood]);

  const rooms = [
    { id: 'bedroom', name: 'Sleep', icon: '🛏️', color: 'from-purple-400 to-purple-600' },
    { id: 'playroom', name: 'Play', icon: '🎮', color: 'from-green-400 to-green-600' },
    { id: 'bathroom', name: 'Bath', icon: '🛁', color: 'from-cyan-400 to-cyan-600' },
    { id: 'kitchen', name: 'Food', icon: '🍽️', color: 'from-orange-400 to-orange-600' },
    { id: 'medicine', name: 'Health', icon: '💊', color: 'from-red-400 to-red-600' },
    { id: 'outside', name: 'Nature', icon: '🌳', color: 'from-emerald-400 to-emerald-600' }
  ];

  const actionButtons = [
    { action: 'feed', icon: '🍎', label: 'Feed', onClick: actions.feedPet },
    { action: 'play', icon: '🎾', label: 'Play', onClick: actions.playWithPet },
    { action: 'sleep', icon: '😴', label: 'Sleep', onClick: actions.sleepPet },
    { action: 'bathe', icon: '🛁', label: 'Bathe', onClick: actions.bathePet },
    { action: 'medicine', icon: '💊', label: 'Heal', onClick: actions.giveMedicine },
    { action: 'pet', icon: '💝', label: 'Pet', onClick: actions.petCharacter }
  ];

  const handleClaimDaily = () => {
    const earned = claimDailyCoins(petLevel);
    if (earned > 0) {
      console.log(`Claimed ${earned} daily coins!`);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${currentTheme.background_color}`}
        style={currentTheme.background_image ? {
          backgroundImage: `url(${currentTheme.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Top Status Bar */}
      <div className="relative z-10 flex justify-between items-center p-4 bg-gradient-to-r from-blue-400/90 to-purple-500/90 backdrop-blur-sm text-white">
        <div className="flex items-center space-x-2">
          {/* Level Badge */}
          <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {petLevel}
          </div>
          
          {/* Current Room & Mood */}
          <div className="flex flex-col">
            <span className="text-sm font-bold capitalize">{currentRoom}</span>
            <span className="text-xs opacity-80 capitalize">{currentMood.primaryMood}</span>
          </div>
        </div>

        {/* Coins & Actions */}
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 text-black rounded-full px-4 py-2 font-bold flex items-center space-x-1">
            <span className="text-lg">💰</span>
            <span>{wallet?.dropletCoins || 0}</span>
          </div>
          
          {canClaimDailyCoins() && (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-green-500/80 border-green-300 text-white hover:bg-green-600"
              onClick={handleClaimDaily}
            >
              <Gift className="w-4 h-4" />
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 border-white/30 text-white"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Pet Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-32">
        {/* Pet Display */}
        <motion.div
          key={`${currentRoom}-${currentMood.primaryMood}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <PetDisplay characterId={selectedCharacter} className="scale-150" />
        </motion.div>

        {/* Stats Display */}
        <div className="grid grid-cols-4 gap-2 w-full max-w-sm mb-6">
          {[
            { label: 'Happy', value: moodState.happiness, color: 'bg-pink-500', icon: '💝' },
            { label: 'Health', value: moodState.health, color: 'bg-red-500', icon: '❤️' },
            { label: 'Energy', value: moodState.energy, color: 'bg-blue-500', icon: '⚡' },
            { label: 'Hunger', value: moodState.hunger, color: 'bg-orange-500', icon: '🍎' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-xs font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
                  className={`h-full ${stat.color} rounded-full`}
                />
              </div>
              <div className="text-xs font-bold text-gray-600 mt-1">
                {Math.round(stat.value)}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {actionButtons.map((button, index) => (
            <motion.button
              key={button.action}
              onClick={button.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center shadow-lg border-2 border-white/50 hover:bg-white transition-all"
            >
              <span className="text-2xl mb-1">{button.icon}</span>
              <span className="text-xs font-medium text-gray-700">{button.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-yellow-300/95 to-orange-400/95 backdrop-blur-sm p-4">
        {/* Room Navigation */}
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

        {/* Shop & Inventory */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setShowShop(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold">Shop</span>
          </Button>

          <Button
            onClick={() => setShowInventory(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">Items</span>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
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
};

export default FullScreenPetGame;
