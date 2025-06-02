
import React from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer from '../welcome/CharacterRenderer';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import { useRoomManager } from '@/hooks/useRoomManager';

interface PetDisplayProps {
  characterId: string;
  className?: string;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ characterId, className = "" }) => {
  const { moodState, currentMessage } = usePetMoodEngine(characterId);
  const { getCurrentMood } = useRoomManager();
  
  const roomMood = getCurrentMood();
  
  const { happiness, health, hunger, energy } = moodState;

  const getMoodEmoji = (happiness: number, health: number, hunger: number, energy: number, roomMood: string) => {
    // Room-specific mood overrides
    if (roomMood === 'sleepy' && energy < 50) return '😴';
    if (roomMood === 'playful' && energy > 50) return '🤩';
    if (roomMood === 'clean') return '✨';
    if (roomMood === 'hungry') return '😋';
    if (roomMood === 'sick' && health < 50) return '🤒';
    if (roomMood === 'adventurous') return '🌟';
    
    // Default mood logic
    if (health < 30) return '🤒';
    if (hunger < 30) return '😋';
    if (energy < 30) return '😴';
    if (happiness > 80) return '😊';
    if (happiness < 30) return '😢';
    return '😐';
  };

  const getCharacterMood = () => {
    if (roomMood.primaryMood === 'sleepy') return 'sleepy';
    if (roomMood.primaryMood === 'playful') return 'happy';
    if (roomMood.primaryMood === 'sick') return 'sad';
    if (happiness > 70) return 'happy';
    if (happiness < 40) return 'sad';
    return 'neutral';
  };

  const character = {
    id: characterId,
    name: 'Droplet',
    gender: 'neutral',
    color: characterId.includes('pink') ? '#ff69b4' : characterId.includes('green') ? '#32cd32' : '#00aaff',
    mood: getCharacterMood(),
    personality: roomMood.primaryMood
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Pet Character with Room-Based Animation */}
      <motion.div
        animate={{ 
          scale: roomMood.primaryMood === 'playful' ? [1, 1.05, 1] : [1, 1.02, 1],
          y: roomMood.primaryMood === 'sleepy' ? [0, -1, 0] : [0, -3, 0],
          rotate: roomMood.primaryMood === 'playful' ? [0, 2, -2, 0] : [0, 1, -1, 0]
        }}
        transition={{ 
          duration: roomMood.primaryMood === 'playful' ? 1.5 : 2.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative mb-4"
      >
        <CharacterRenderer character={character} size={160} />
        
        {/* Room & Mood Indicator */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1 text-2xl"
        >
          {getMoodEmoji(happiness, health, hunger, energy, roomMood.primaryMood)}
        </motion.div>

        {/* Room-specific effects */}
        {roomMood.primaryMood === 'sleepy' && energy < 40 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-8 top-12"
          >
            <span className="text-3xl">💤</span>
          </motion.div>
        )}

        {roomMood.primaryMood === 'playful' && happiness > 60 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-20, -30, -40]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
          >
            <span className="text-xl">✨</span>
          </motion.div>
        )}

        {roomMood.primaryMood === 'clean' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -left-6 top-8"
          >
            <span className="text-2xl">🧼</span>
          </motion.div>
        )}
      </motion.div>

      {/* Pet Message with Room Context */}
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="relative bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg max-w-xs text-center border-2 border-white/50"
        >
          <p className="text-sm text-gray-800 font-medium">
            {currentMessage}
            {roomMood.primaryMood !== 'neutral' && (
              <span className="block text-xs text-gray-600 mt-1 capitalize">
                Feeling {roomMood.primaryMood} in this room
              </span>
            )}
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
        </motion.div>
      )}
    </div>
  );
};

export default PetDisplay;
