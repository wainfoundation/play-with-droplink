
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { Room } from './PetGameRooms';

interface PetMainAreaProps {
  currentRoom: Room;
  currentCharacter: any;
  petStats: any;
  currentRoomData: { name: string; bgColor: string };
  onUpdateStat: (stat: string, value: number) => void;
}

const PetMainArea: React.FC<PetMainAreaProps> = ({
  currentRoom,
  currentCharacter,
  petStats,
  currentRoomData,
  onUpdateStat
}) => {
  return (
    <div className="flex items-center justify-center h-full p-20">
      <motion.div
        key={currentRoom}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-4">
          <CharacterRenderer character={currentCharacter} size={200} />
        </div>
        <div className="text-2xl font-bold mb-2">
          Welcome to the {currentRoomData.name}!
        </div>
        <p className="text-gray-600 mb-4">
          Your droplet is feeling {petStats?.mood || 'happy'} today
        </p>
        
        {/* Pet Stats */}
        <div className="flex justify-center gap-2 mb-4">
          <Badge variant="outline">😋 Hunger: {petStats?.hunger || 60}</Badge>
          <Badge variant="outline">⚡ Energy: {petStats?.energy || 85}</Badge>
          <Badge variant="outline">🧼 Clean: {petStats?.cleanliness || 70}</Badge>
        </div>
        
        {/* Room-specific actions */}
        <div className="flex justify-center gap-2">
          {currentRoom === 'kitchen' && (
            <Button onClick={() => onUpdateStat('hunger', 10)}>
              🍎 Feed Pet
            </Button>
          )}
          {currentRoom === 'bathroom' && (
            <Button onClick={() => onUpdateStat('cleanliness', 15)}>
              🛁 Clean Pet
            </Button>
          )}
          {currentRoom === 'bedroom' && (
            <Button onClick={() => onUpdateStat('energy', 20)}>
              😴 Rest
            </Button>
          )}
          {currentRoom === 'playroom' && (
            <Button onClick={() => onUpdateStat('happiness', 10)}>
              🎾 Play
            </Button>
          )}
          {currentRoom === 'nature' && (
            <Button onClick={() => onUpdateStat('happiness', 5)}>
              🌳 Explore
            </Button>
          )}
          {currentRoom === 'health' && (
            <Button onClick={() => onUpdateStat('health', 10)}>
              💊 Heal
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PetMainArea;
