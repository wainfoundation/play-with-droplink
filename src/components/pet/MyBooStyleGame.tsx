
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { characters } from '@/components/welcome/characterData';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import PetDisplay from './PetDisplay';
import ActionButtons from './ActionButtons';
import RoomBackground from './RoomBackground';
import EnhancedItemShop from '../shop/EnhancedItemShop';
import InventoryModal from './InventoryModal';

const MyBooStyleGame: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const { moodState, actions, currentMessage, isAsleep } = usePetMoodEngine(selectedCharacter.id);
  const { wallet } = usePetEconomy(selectedCharacter.id);

  // Load saved character
  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        const parsedCharacter = JSON.parse(savedCharacter);
        const foundCharacter = characters.find(c => c.id === parsedCharacter.id) || characters[0];
        setSelectedCharacter(foundCharacter);
      } catch (error) {
        console.log('Error parsing saved character, using default');
      }
    }
  }, []);

  return (
    <RoomBackground roomId={currentRoom}>
      <div className="min-h-screen flex flex-col relative">
        {/* Top Status Bar - My Boo Style */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white relative z-10">
          <div className="flex items-center space-x-2">
            {/* Level Badge */}
            <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              2
            </div>
            
            {/* Stats Icons */}
            <div className="flex items-center space-x-1 bg-blue-600 rounded-full px-3 py-1">
              <span className="text-yellow-300">⚡</span>
              <span className="text-sm font-bold">{Math.round(moodState.energy)}</span>
            </div>
            
            <div className="flex items-center space-x-1 bg-gray-700 rounded-full px-3 py-1">
              <span className="text-gray-300">🧠</span>
              <span className="text-sm font-bold">{Math.round(moodState.health)}</span>
            </div>
            
            <div className="flex items-center space-x-1 bg-pink-500 rounded-full px-3 py-1">
              <span className="text-white">💝</span>
              <span className="text-sm font-bold">{Math.round(moodState.happiness)}</span>
            </div>
          </div>

          {/* Coin Balance - My Boo Style */}
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 text-black rounded-full px-4 py-1 font-bold flex items-center space-x-1">
              <span className="text-lg">💰</span>
              <span>{wallet?.dropletCoins || 0}</span>
            </div>
            <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white">
              <span className="text-lg">➕</span>
            </Button>
          </div>
        </div>

        {/* Decorative Bunting */}
        <div className="absolute top-16 left-0 right-0 z-5">
          <svg width="100%" height="40" viewBox="0 0 400 40" className="overflow-visible">
            <path d="M0,0 L40,0 L50,30 L30,30 Z" fill="#00ff88" />
            <path d="M40,0 L80,0 L90,30 L70,30 Z" fill="#ff69b4" />
            <path d="M80,0 L120,0 L130,30 L110,30 Z" fill="#ffff00" />
            <path d="M120,0 L160,0 L170,30 L150,30 Z" fill="#ff6347" />
            <path d="M160,0 L200,0 L210,30 L190,30 Z" fill="#4169e1" />
            <path d="M200,0 L240,0 L250,30 L230,30 Z" fill="#00ff88" />
            <path d="M240,0 L280,0 L290,30 L270,30 Z" fill="#ff69b4" />
            <path d="M280,0 L320,0 L330,30 L310,30 Z" fill="#ffff00" />
            <path d="M320,0 L360,0 L370,30 L350,30 Z" fill="#ff6347" />
            <path d="M360,0 L400,0 L410,30 L390,30 Z" fill="#4169e1" />
          </svg>
        </div>

        {/* Main Pet Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-4">
          {/* Pet Display - Centered like My Boo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <PetDisplay 
              characterId={selectedCharacter.id} 
              mood={moodState.happiness > 80 ? 'excited' : moodState.happiness < 40 ? 'sad' : 'happy'}
              isAsleep={isAsleep}
              size={150}
            />
          </motion.div>

          {/* Pet Message */}
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-sm text-center shadow-lg border-2 border-white/50"
          >
            <p className="text-gray-800 font-medium">{currentMessage}</p>
          </motion.div>

          {/* Room Decorations */}
          <div className="absolute bottom-32 left-8">
            <div className="w-16 h-16 bg-orange-400 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - My Boo Style */}
        <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-4 flex justify-around items-center shadow-lg relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentRoom('bedroom')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl shadow-lg transition-all ${
              currentRoom === 'bedroom' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-blue-500'
            }`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-bold">Boo</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShop(true)}
            className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl shadow-lg text-orange-500"
          >
            <span className="text-2xl">🎨</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actions.playWithPet}
            className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl shadow-lg text-purple-500"
          >
            <span className="text-2xl">🎮</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInventory(true)}
            className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl shadow-lg text-green-500"
          >
            <span className="text-2xl">🎒</span>
          </motion.button>
        </div>

        {/* Floating Action Buttons - My Boo Style */}
        <div className="absolute bottom-24 right-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={actions.feedPet}
            className="w-12 h-12 bg-orange-500 rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <span className="text-xl">🍎</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={actions.bathePet}
            className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <span className="text-xl">🛁</span>
          </motion.button>
        </div>

        {/* Shop Modal */}
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
        </AnimatePresence>

        {/* Inventory Modal */}
        <AnimatePresence>
          {showInventory && (
            <InventoryModal onClose={() => setShowInventory(false)} />
          )}
        </AnimatePresence>
      </div>
    </RoomBackground>
  );
};

export default MyBooStyleGame;
