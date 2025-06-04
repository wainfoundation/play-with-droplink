
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Play, Home, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import { MusicToggle } from '@/components/ui/MusicToggle';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  // Check if user has already completed setup
  useEffect(() => {
    const setupCompleted = localStorage.getItem('petSetupCompleted');
    if (setupCompleted === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleStartSetup = () => {
    navigate('/pet-setup');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Use the first character for the welcome display
  const welcomeCharacter = {
    ...characters[0],
    mood: 'excited',
    personality: "Let's create your perfect companion!"
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Droplet Pet - Your Virtual Pet Adventure</title>
        <meta name="description" content="Welcome to Droplet Pet! Create your virtual companion and start your pet care adventure." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Music Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <MusicToggle 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                onClick={handleGoHome}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to Droplet Pet!
              </h1>
              
              <div className="w-24" />
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Character Display */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CharacterRenderer character={welcomeCharacter} size={160} />
                </motion.div>
                
                {/* Speech bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-6 py-3 shadow-lg border-2 border-primary/20"
                >
                  <div className="text-sm font-medium text-primary">Ready to create your pet? 🎮</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </motion.div>
              </div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Create Your Perfect Companion
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Your virtual pet adventure is about to begin! Choose your character, 
                  give them a name, and start building a bond that will grow stronger every day.
                </p>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
              >
                <Card className="bg-white/70 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🎨</div>
                    <h3 className="font-semibold mb-2">Customize</h3>
                    <p className="text-sm text-gray-600">Choose from unique characters and give them personality</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/70 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">❤️</div>
                    <h3 className="font-semibold mb-2">Care</h3>
                    <p className="text-sm text-gray-600">Feed, play, and nurture your pet to keep them happy</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/70 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🎮</div>
                    <h3 className="font-semibold mb-2">Play</h3>
                    <p className="text-sm text-gray-600">Explore rooms, mini-games, and earn rewards</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <Button 
                  onClick={handleStartSetup}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
                >
                  Create Your Pet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-sm text-gray-500">
                  It only takes a minute to get started!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
