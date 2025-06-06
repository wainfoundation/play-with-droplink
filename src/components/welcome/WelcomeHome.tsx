
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Settings } from 'lucide-react';
import MascotIcon from '@/components/MascotIcon';

interface WelcomeHomeProps {
  mascotVisible: boolean;
  welcomeTextVisible: boolean;
  buttonsVisible: boolean;
  onStartTutorial: () => void;
  onSkipToCharacterSelect: () => void;
}

const WelcomeHome: React.FC<WelcomeHomeProps> = ({
  mascotVisible,
  welcomeTextVisible,
  buttonsVisible,
  onStartTutorial,
  onSkipToCharacterSelect
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={mascotVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="mb-8"
        >
          <div className="relative mx-auto w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center">
            <MascotIcon size={80} mood="excited" />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={welcomeTextVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Welcome to Droplink!
          </h1>
          <p className="text-gray-600 text-lg">
            Your virtual pet adventure is about to begin! 
            Ready to meet your new companion?
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={buttonsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={onStartTutorial}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            size="lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Tutorial
          </Button>
          
          <Button
            onClick={onSkipToCharacterSelect}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Settings className="mr-2 h-4 w-4" />
            Skip to Character Selection
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeHome;
