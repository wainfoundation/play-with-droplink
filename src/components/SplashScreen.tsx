
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    // Animate progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          className="mx-auto mb-6 h-24 w-24 rounded-xl bg-white p-4 shadow-lg"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
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
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Droplink
        </motion.h1>
        
        {/* Company Name */}
        <motion.p 
          className="text-sm text-white/80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          by MRWAIN ORGANIZATION
        </motion.p>
        
        {/* Progress Bar */}
        <motion.div className="mt-8 h-1 w-48 rounded-full bg-white/20">
          <motion.div 
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
