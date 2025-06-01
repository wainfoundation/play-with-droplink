
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import CharacterRenderer from './CharacterRenderer';
import { characters } from './characterData';

interface GameTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps = [
  {
    id: 1,
    title: "Welcome to Play with Droplink!",
    description: "Your adventure begins here! Take care of your adorable pet droplet and play exciting mini-games.",
    icon: "🎮"
  },
  {
    id: 2,
    title: "Meet Your Pet Droplet",
    description: "Feed, clean, and play with your pet to keep it happy and healthy. Watch it grow with love and care!",
    icon: "🐾"
  },
  {
    id: 3,
    title: "Play Mini-Games",
    description: "Enjoy various puzzle games, action games, and creative activities. Each game offers unique rewards!",
    icon: "🎯"
  },
  {
    id: 4,
    title: "Earn Pi Rewards",
    description: "Complete activities and care for your pet to earn Pi coins that you can use in the shop!",
    icon: "💰"
  },
  {
    id: 5,
    title: "Customize Your Experience",
    description: "Unlock new items, decorations, and upgrades for your pet as you progress through the game.",
    icon: "✨"
  }
];

const GameTutorial: React.FC<GameTutorialProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <>
      <Helmet>
        <title>Game Tutorial - Play with Droplink</title>
        <meta name="description" content="Learn how to play and take care of your pet droplet in this fun tutorial!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Character Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <CharacterRenderer character={characters[0]} size={100} />
            </motion.div>

            {/* Tutorial Card */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-none">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{currentTutorial.icon}</div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {currentTutorial.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentTutorial.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                    />
                  </div>
                  
                  {/* Step Counter */}
                  <p className="text-sm text-gray-500">
                    Step {currentStep + 1} of {tutorialSteps.length}
                  </p>
                  
                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button 
                      onClick={handlePrevious}
                      variant="outline"
                      disabled={currentStep === 0}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <Button 
                      onClick={handleNext}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                    >
                      {currentStep < tutorialSteps.length - 1 ? (
                        <>
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Start Playing
                          <Play className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={onSkip}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                    >
                      <SkipForward className="h-4 w-4" />
                      Skip Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameTutorial;
