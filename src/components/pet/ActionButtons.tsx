
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, Utensils, Moon, Pill, Sparkles, Gamepad2 } from 'lucide-react';

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onMedicine: () => void;
  onClean: () => void;
  onPet: () => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFeed,
  onPlay,
  onSleep,
  onMedicine,
  onClean,
  onPet,
  disabled = false
}) => {
  const actions = [
    { 
      label: 'Feed', 
      icon: Utensils, 
      onClick: onFeed, 
      color: 'from-orange-400 to-orange-600',
      emoji: '🍎'
    },
    { 
      label: 'Play', 
      icon: Gamepad2, 
      onClick: onPlay, 
      color: 'from-green-400 to-green-600',
      emoji: '🎮'
    },
    { 
      label: 'Sleep', 
      icon: Moon, 
      onClick: onSleep, 
      color: 'from-indigo-400 to-indigo-600',
      emoji: '😴'
    },
    { 
      label: 'Medicine', 
      icon: Pill, 
      onClick: onMedicine, 
      color: 'from-red-400 to-red-600',
      emoji: '💊'
    },
    { 
      label: 'Clean', 
      icon: Sparkles, 
      onClick: onClean, 
      color: 'from-cyan-400 to-cyan-600',
      emoji: '🛁'
    },
    { 
      label: 'Pet', 
      icon: Heart, 
      onClick: onPet, 
      color: 'from-pink-400 to-pink-600',
      emoji: '💖'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Button
              onClick={action.onClick}
              disabled={disabled}
              className={`
                w-full h-16 bg-gradient-to-r ${action.color} 
                hover:shadow-lg transition-all duration-200 
                border-2 border-white/50 text-white font-semibold
                flex flex-col items-center justify-center gap-1
              `}
              variant="default"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <span className="text-lg">{action.emoji}</span>
                <span className="text-xs">{action.label}</span>
              </motion.div>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActionButtons;
