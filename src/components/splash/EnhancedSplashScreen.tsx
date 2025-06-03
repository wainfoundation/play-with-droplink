
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MascotIcon from '@/components/MascotIcon';
import { dropinkColors } from '@/styles/designSystem';
import { playSound, sounds } from '@/utils/sounds';

interface EnhancedSplashScreenProps {
  onComplete: () => void;
}

const EnhancedSplashScreen: React.FC<EnhancedSplashScreenProps> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Show logo first
      setTimeout(() => setShowLogo(true), 200);
      
      // Show mascot
      setTimeout(() => setShowMascot(true), 800);
      
      // Show tagline
      setTimeout(() => setShowTagline(true), 1200);
      
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            playSound(sounds.loadingComplete, 0.3);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    };

    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-200/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-16 h-16 rounded-full bg-purple-200/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-cyan-200/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: showLogo ? 1 : 0, 
            scale: showLogo ? 1 : 0.5 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Droplink
            </h1>
            <div className="text-lg md:text-xl font-medium text-gray-600">
              Pet Game
            </div>
          </div>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showMascot ? 1 : 0, 
            y: showMascot ? 0 : 20 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <MascotIcon size={120} mood="excited" className="drop-shadow-xl" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: showTagline ? 1 : 0, 
            y: showTagline ? 0 : 10 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Your Pi-powered AI pet companion
          </p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            π Network Integration
          </div>
        </motion.div>

        {/* Loading progress */}
        <div className="w-full max-w-xs">
          <div className="bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-3 flex items-center justify-end pr-2"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {loadingProgress > 20 && (
                <div className="text-xs font-bold text-white">
                  {Math.round(loadingProgress)}%
                </div>
              )}
            </motion.div>
          </div>
          <div className="text-center mt-3 text-sm text-gray-600">
            Loading your pet world...
          </div>
        </div>

        {/* Pi Network badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 right-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Powered by π</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedSplashScreen;
