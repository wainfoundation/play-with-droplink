
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface GameTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const GameTutorial: React.FC<GameTutorialProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Droplet Pet!",
      description: "Take care of your virtual pet droplet by feeding, cleaning, and playing with it.",
      icon: "💧"
    },
    {
      title: "Keep Your Pet Happy",
      description: "Monitor happiness, hunger, energy, and cleanliness stats to keep your pet healthy.",
      icon: "😊"
    },
    {
      title: "Earn Rewards",
      description: "Complete daily missions and watch ads to earn coins and upgrade your pet's home.",
      icon: "🏆"
    },
    {
      title: "Ready to Play!",
      description: "You're all set to start your pet care adventure. Have fun!",
      icon: "🎮"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <div className="text-6xl mb-6">{currentTutorial.icon}</div>
          <h1 className="text-3xl font-bold mb-4">{currentTutorial.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {currentTutorial.description}
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          
          <Button onClick={onSkip} variant="ghost" className="flex-1">
            Skip Tutorial
          </Button>
          
          <Button onClick={nextStep} className="flex-1">
            {currentStep === tutorialSteps.length - 1 ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Playing
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameTutorial;
