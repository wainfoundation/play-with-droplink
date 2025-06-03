import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, ShoppingBag, Package, Plus, Gift, Coins } from 'lucide-react';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import { useRoomManager } from '@/hooks/useRoomManager';
import PetDisplay from './PetDisplay';
import EnhancedItemShop from '../shop/EnhancedItemShop';
import InventoryModal from './InventoryModal';
import ComprehensiveCoinShop from '../shop/ComprehensiveCoinShop';
import { useLocalShop } from '@/hooks/useLocalShop';

const FullScreenPetGame: React.FC = () => {
  const [selectedCharacter] = useState('droplet-blue');
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const { moodState, actions } = usePetMoodEngine(selectedCharacter);
  const { wallet, claimDailyCoins, canClaimDailyCoins } = usePetEconomy(selectedCharacter);
  const { currentRoom, changeRoom, getCurrentTheme, getCurrentMood } = useRoomManager();
  const { inventory, useItem } = useLocalShop(selectedCharacter);

  const currentTheme = getCurrentTheme();
  const currentMood = getCurrentMood();

  // Calculate pet level
  const calculatePetLevel = () => {
    const totalStats = moodState.happiness + moodState.health + moodState.energy + moodState.hunger;
    return Math.max(1, Math.floor(totalStats / 100));
  };

  const petLevel = calculatePetLevel();

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

  const handleDragStart = (item: any) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnCharacter = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      // Use the item and apply effects
      const effects = useItem(draggedItem.itemId);
      if (effects) {
        // Apply effects to pet based on item type
        if (draggedItem.item?.category === 'food') {
          actions.feedPet();
        } else if (draggedItem.item?.category === 'medicine') {
          actions.giveMedicine();
        }
      }
      setDraggedItem(null);
    }
  };

  // Get available inventory items for current room
  const getAvailableItems = () => {
    return inventory.filter(item => {
      if (currentRoom === 'kitchen') return item.item?.category === 'food';
      if (currentRoom === 'medicine') return item.item?.category === 'medicine';
      if (currentRoom === 'bathroom') return item.item?.category === 'cleaning';
      return item.quantity > 0;
    }).slice(0, 3); // Show max 3 items
  };

  const availableItems = getAvailableItems();

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
          <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {petLevel}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold capitalize">{currentRoom}</span>
            <span className="text-xs opacity-80 capitalize">{currentMood.primaryMood}</span>
          </div>
        </div>

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
            onClick={() => setShowInventory(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex h-full">
        {/* Left Side - Available Items */}
        <div className="w-24 bg-white/10 backdrop-blur-sm border-r border-white/20 flex flex-col items-center py-4 space-y-4">
          <div className="text-white text-xs font-semibold mb-2">Items</div>
          {availableItems.map((item, index) => (
            <motion.div
              key={`${item.itemId}-${index}`}
              draggable
              onDragStart={() => handleDragStart(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 rounded-xl p-3 cursor-grab active:cursor-grabbing shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {item.item?.category === 'food' ? '🍎' : 
                   item.item?.category === 'medicine' ? '💊' :
                   item.item?.category === 'cleaning' ? '🧼' : '📦'}
                </div>
                <div className="text-xs font-bold text-gray-700">{item.quantity}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Area - Pet and Game */}
        <div className="flex-1 flex flex-col">
          {/* Pet Display Area */}
          <div 
            className="flex-1 flex items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDropOnCharacter}
          >
            <motion.div
              key={`${currentRoom}-${currentMood.primaryMood}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="scale-75" // Smaller character like in demo
            >
              <PetDisplay characterId={selectedCharacter} />
            </motion.div>
          </div>

          {/* Stats Display - Bottom positioned like demo */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Happy', value: moodState.happiness, color: 'bg-pink-500', icon: '💝' },
                { label: 'Health', value: moodState.health, color: 'bg-red-500', icon: '❤️' },
                { label: 'Energy', value: moodState.energy, color: 'bg-blue-500', icon: '⚡' },
                { label: 'Hunger', value: moodState.hunger, color: 'bg-orange-500', icon: '🍎' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className="text-xs font-medium text-gray-700 mb-2">{stat.label}</div>
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
            <div className="grid grid-cols-3 gap-3 mt-4">
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
            onClick={() => setShowCoinShop(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Coins className="w-5 h-5" />
            <span className="font-semibold">Buy Coins</span>
          </Button>

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
              <ComprehensiveCoinShop onBack={() => setShowCoinShop(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullScreenPetGame;
