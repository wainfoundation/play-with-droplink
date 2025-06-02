
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { characters } from '@/components/welcome/characterData';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import PetDisplay from './PetDisplay';
import PetStatsPanel from './PetStatsPanel';
import ActionButtons from './ActionButtons';
import NavigationBar from './NavigationBar';
import RoomBackground from './RoomBackground';
import EnhancedItemShop from '../shop/EnhancedItemShop';
import InventoryModal from './InventoryModal';

const MyBooStyleGame: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const { moodState, actions } = usePetMoodEngine(selectedCharacter.id);
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
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <X className="w-4 h-4" />
            </Button>
          </Link>
          
          <motion.h1 
            className="text-xl font-bold text-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Droplet Pet 🐾
          </motion.h1>
          
          <Link to="/welcome">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
          {/* Pet Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <PetDisplay characterId={selectedCharacter.id} />
          </motion.div>

          {/* Pet Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 w-full max-w-md"
          >
            <PetStatsPanel stats={moodState} />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <ActionButtons
              onFeed={actions.feedPet}
              onPlay={actions.playWithPet}
              onSleep={actions.sleepPet}
              onMedicine={actions.giveMedicine}
              onClean={actions.bathePet}
              onPet={actions.petCharacter}
            />
          </motion.div>
        </div>

        {/* Navigation Bar */}
        <NavigationBar
          activeRoom={currentRoom}
          onRoomChange={setCurrentRoom}
          onOpenShop={() => setShowShop(true)}
          onOpenInventory={() => setShowInventory(true)}
          coinBalance={wallet?.dropletCoins || 0}
        />

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
    </RoomBackground>
  );
};

export default MyBooStyleGame;
