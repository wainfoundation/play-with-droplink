
import React from 'react';
import SplashWrapper from '@/components/welcome/SplashWrapper';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Play, Eye, Sparkles } from 'lucide-react';
import MascotIcon from '@/components/MascotIcon';
import { dropinkColors } from '@/styles/designSystem';

const Index = () => {
  const navigate = useNavigate();

  const handleStartPlaying = () => {
    navigate('/play');
  };

  const handleViewLanding = () => {
    navigate('/landing');
  };

  return (
    <SplashWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-200/30"
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
            className="absolute top-32 right-16 w-12 h-12 rounded-full bg-purple-200/30"
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
            className="absolute bottom-32 left-20 w-20 h-20 rounded-full bg-cyan-200/30"
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

        <div className="text-center max-w-md relative z-10">
          {/* Mascot with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              <MascotIcon size={140} mood="excited" className="mx-auto" />
              {/* Sparkle effects around mascot */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title and description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome to Droplink!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-2 font-medium">
              Your Pi-powered pet companion awaits
            </p>
            <p className="text-base text-gray-600 mb-8">
              Start your journey today and earn Pi cryptocurrency while caring for your virtual pet!
            </p>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <Button 
              onClick={handleStartPlaying}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Start Playing
            </Button>
            
            <Button 
              onClick={handleViewLanding}
              variant="outline"
              className="w-full py-4 text-lg font-medium border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
            >
              <Eye className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              View Landing Page
            </Button>
          </motion.div>

          {/* Pi Network badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8"
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Powered by Pi Network</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SplashWrapper>
  );
};

export default Index;
