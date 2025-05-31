
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, sounds } from '@/utils/sounds';
import { Progress } from "@/components/ui/progress";

export interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Total loading time in milliseconds - slightly longer for smoother animation
    const totalLoadTime = 2800;
    // Update interval in milliseconds - more frequent updates for smoother progress
    const updateInterval = 16; // ~60fps
    // Calculate the number of updates needed
    const totalUpdates = totalLoadTime / updateInterval;
    // Calculate progress increment per update
    const progressIncrement = 100 / totalUpdates;
    
    // Start progress animation with easing
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Apply slight easing to make progress more natural
        const remaining = 100 - prevProgress;
        const increment = Math.min(progressIncrement * (0.5 + (remaining / 100)), remaining);
        
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prevProgress + increment, 100);
      });
    }, updateInterval);
    
    // Complete the loading after the total time
    const timer = setTimeout(() => {
      // Play sound when loading completes
      playSound(sounds.loadingComplete, 0.4);
      
      // Set exiting state first for smooth transition
      setIsExiting(true);
      
      // Small delay after sound before transitioning
      setTimeout(() => {
        onComplete();
      }, 500);
    }, totalLoadTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              className="mx-auto mb-6 h-24 w-24 rounded-xl bg-white p-4 shadow-lg"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ 
                scale: [0.8, 1.05, 1],
                rotate: [-5, 2, 0] 
              }}
              transition={{ 
                delay: 0.3, 
                duration: 0.8, 
                ease: "easeOut",
                times: [0, 0.7, 1] 
              }}
            >
              <img 
                src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
                alt="Droplink Logo" 
                className="h-full w-full" 
              />
            </motion.div>
            
            {/* App Name */}
            <motion.h1 
              className="mb-2 font-poppins text-4xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              Play with Droplink
            </motion.h1>
            
            {/* Company Name */}
            <motion.p 
              className="text-sm text-white/80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            >
              by MRWAIN ORGANIZATION
            </motion.p>
            
            {/* Progress Percentage */}
            <motion.p
              className="mt-6 text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.p>
            
            {/* Progress Bar */}
            <motion.div 
              className="mt-2 w-64 md:w-80"
              initial={{ opacity: 0, width: "60%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Progress 
                value={progress} 
                className="h-2 overflow-hidden" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
