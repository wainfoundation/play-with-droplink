
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound, sounds } from '@/utils/sounds';
import { Progress } from "@/components/ui/progress";
import MascotIcon from './MascotIcon';

export interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    // Total loading time in milliseconds - slightly longer for better experience
    const totalLoadTime = 3500;
    const updateInterval = 50; // More frequent updates for smoother progress
    const totalUpdates = totalLoadTime / updateInterval;
    const progressIncrement = 100 / totalUpdates;
    
    // Loading text progression
    const loadingSteps = [
      { progress: 0, text: 'Initializing Pet System...' },
      { progress: 25, text: 'Loading Character Data...' },
      { progress: 50, text: 'Setting Up Rooms...' },
      { progress: 75, text: 'Preparing Game Assets...' },
      { progress: 90, text: 'Almost Ready...' },
      { progress: 100, text: 'Welcome to Droplink!' }
    ];
    
    // Start progress animation
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + progressIncrement, 100);
        
        // Update loading text based on progress
        const currentStep = loadingSteps.find(step => newProgress >= step.progress);
        if (currentStep) {
          setLoadingText(currentStep.text);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, updateInterval);
    
    // Complete the loading after the total time
    const timer = setTimeout(() => {
      // Play completion sound
      try {
        playSound(sounds.loadingComplete, 0.4);
      } catch (error) {
        console.log('Sound not available, continuing...');
      }
      
      // Fade out smoothly
      setIsVisible(false);
      
      // Small delay for smooth transition
      setTimeout(() => {
        onComplete();
      }, 800);
    }, totalLoadTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-primary to-secondary"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="text-center w-full max-w-md"
      >
        {/* Mascot Logo with enhanced animation */}
        <motion.div
          className="mx-auto mb-8 h-32 w-32 rounded-xl bg-white p-6 shadow-2xl flex items-center justify-center"
          initial={{ scale: 0.8, rotate: -10, y: 50 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            rotate: [-10, 5, 0],
            y: [50, -10, 0] 
          }}
          transition={{ 
            delay: 0.3, 
            duration: 1.2, 
            ease: "easeOut",
            times: [0, 0.6, 1] 
          }}
        >
          <MascotIcon size={80} mood="excited" />
        </motion.div>
        
        {/* App Name with enhanced styling */}
        <motion.h1 
          className="mb-3 font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          Play with Droplink
        </motion.h1>
        
        {/* Enhanced tagline */}
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-2 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          Your Pi Network Gaming Hub
        </motion.p>
        
        {/* Company Name */}
        <motion.p 
          className="text-sm text-white/70 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          by MRWAIN ORGANIZATION
        </motion.p>
        
        {/* Loading text with dynamic updates */}
        <motion.p
          className="mt-8 mb-4 text-white/90 font-medium text-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {loadingText}
        </motion.p>
        
        {/* Progress Percentage */}
        <motion.p
          className="mb-6 text-white/80 font-semibold text-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.p>
        
        {/* Enhanced Progress Bar - Centered */}
        <motion.div 
          className="w-full max-w-sm mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Progress 
            value={progress} 
            className="h-3 bg-white/20 border border-white/30 rounded-full overflow-hidden w-full" 
          />
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-6 h-6 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
