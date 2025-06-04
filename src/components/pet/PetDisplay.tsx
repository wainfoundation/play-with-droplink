
import React from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';

interface PetDisplayProps {
  characterId: string;
  mood?: string;
  isAsleep?: boolean;
  size?: number;
  className?: string;
}

const PetDisplay: React.FC<PetDisplayProps> = ({
  characterId,
  mood = 'happy',
  isAsleep = false,
  size = 150,
  className = ''
}) => {
  const character = {
    id: characterId,
    name: 'Droplet',
    gender: 'neutral',
    color: '#3B82F6',
    mood: isAsleep ? 'sleepy' : mood,
    personality: 'friendly'
  };

  const getAnimationProps = () => {
    if (isAsleep) {
      return {
        animate: {
          y: [0, -2, 0],
          scale: [1, 1.02, 1],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }
      };
    }

    switch (mood) {
      case 'excited':
        return {
          animate: {
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }
        };
      case 'sad':
        return {
          animate: {
            y: [0, 2, 0],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        };
      case 'sick':
        return {
          animate: {
            x: [-2, 2, -2],
            scale: [0.95, 1, 0.95],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }
        };
      default:
        return {
          animate: {
            y: [0, -5, 0],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        };
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div {...getAnimationProps()}>
        <CharacterRenderer character={character} size={size} />
      </motion.div>
      
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
      
      {/* Mood indicators */}
      {mood === 'sick' && (
        <motion.div
          className="absolute -top-6 -right-2 text-xl"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🤒
        </motion.div>
      )}
      
      {mood === 'excited' && (
        <motion.div
          className="absolute -top-4 -right-4 text-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}
    </div>
  );
};

export default PetDisplay;
