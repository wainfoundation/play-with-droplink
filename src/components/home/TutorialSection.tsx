
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Play } from "lucide-react";
import { playSound, sounds } from "@/utils/sounds";

interface TutorialSectionProps {
  soundEnabled: boolean;
  onStartPlaying: () => void;
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ soundEnabled, onStartPlaying }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Droplink Gaming!",
      description: "The ultimate Pi Network gaming platform with 50+ interactive games",
      icon: "🎮",
      content: "Play puzzle games, action challenges, trivia, and creative activities while earning Pi!"
    },
    {
      title: "How Pi Network Integration Works",
      description: "Earn rewards and unlock premium content",
      icon: "⚡",
      content: "Watch ads to earn Pi or pay directly to unlock premium games and remove ads forever!"
    },
    {
      title: "Gaming Monetization",
      description: "Multiple ways to enhance your gaming experience",
      icon: "💎",
      content: "Subscribe monthly for unlimited access or purchase individual games with Pi Network payments."
    },
    {
      title: "Ready to Play?",
      description: "Start your gaming adventure now!",
      icon: "🚀",
      content: "Jump into 50+ games and start earning Pi through our integrated ad network!"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (soundEnabled) {
        playSound(sounds.loadingComplete, 0.2);
      }
    }
  };

  return (
    <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">{tutorialSteps[currentStep].icon}</div>
        <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {tutorialSteps[currentStep].title}
        </CardTitle>
        <p className="text-gray-600 text-lg">{tutorialSteps[currentStep].description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-gray-700 text-lg leading-relaxed">
          {tutorialSteps[currentStep].content}
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {currentStep < tutorialSteps.length - 1 ? (
            <Button onClick={handleNext} size="lg" className="px-8">
              Next <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button onClick={onStartPlaying} size="lg" className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <Play className="mr-2 w-5 h-5" />
              Start Playing Now!
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={onStartPlaying}
            size="lg"
          >
            Skip Tutorial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialSection;
