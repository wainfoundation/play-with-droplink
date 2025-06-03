
import React from 'react';
import { motion } from 'framer-motion';

interface PetCharacterProps {
  characterId: string;
  mood: string;
  isAsleep?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const PetCharacter: React.FC<PetCharacterProps> = ({
  characterId,
  mood,
  isAsleep = false,
  size = 'large',
  className = ""
}) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const getCharacterColor = (id: string) => {
    switch (id) {
      case 'droplet-blue': return '#3B82F6';
      case 'droplet-pink': return '#EC4899';
      case 'droplet-green': return '#10B981';
      case 'droplet-purple': return '#8B5CF6';
      default: return '#3B82F6';
    }
  };

  const getMoodEmoji = (mood: string, isAsleep: boolean) => {
    if (isAsleep) return '😴';
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'hungry': return '😋';
      case 'dirty': return '🤢';
      case 'sick': return '🤒';
      case 'excited': return '🤩';
      case 'sleepy': return '😪';
      default: return '😊';
    }
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={{
        y: isAsleep ? 0 : [0, -5, 0],
        scale: mood === 'excited' ? [1, 1.1, 1] : 1
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {/* Pet Body */}
      <div
        className="w-full h-full rounded-full shadow-lg"
        style={{ backgroundColor: getCharacterColor(characterId) }}
      />
      
      {/* Eyes */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full" />
      
      {/* Mood indicator */}
      <div className="absolute -top-2 -right-2 text-lg">
        {getMoodEmoji(mood, isAsleep)}
      </div>
      
      {/* Sleep animation */}
      {isAsleep && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💤
        </motion.div>
      )}
    </motion.div>
  );
};

export default PetCharacter;
