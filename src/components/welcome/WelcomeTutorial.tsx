
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

interface WelcomeTutorialProps {
  tutorialStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onFinishTutorial: () => void;
  onSkipTutorial: () => void;
}

const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({
  tutorialStep,
  onNextStep,
  onPrevStep,
  onFinishTutorial,
  onSkipTutorial
}) => {
  const tutorialSteps = [
    {
      title: "🎮 50+ Interactive Games",
      description: "Play puzzle games, action challenges, trivia, and creative activities designed for Pi Network users.",
      icon: "🎮"
    },
    {
      title: "⚡ Pi Network Integration",
      description: "Watch ads to earn Pi rewards or pay directly with Pi to unlock premium games and remove ads forever.",
      icon: "⚡"
    },
    {
      title: "💎 Gaming Subscriptions",
      description: "Subscribe monthly for unlimited access to all games or purchase individual games with Pi payments.",
      icon: "💎"
    },
    {
      title: "🏆 Compete & Earn",
      description: "Join leaderboards, earn achievements, and compete with other Pi Network gamers worldwide!",
      icon: "🏆"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-6xl mb-6">{tutorialSteps[tutorialStep].icon}</div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
        {tutorialSteps[tutorialStep].title}
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        {tutorialSteps[tutorialStep].description}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((tutorialStep + 1) / tutorialSteps.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Step Counter */}
      <p className="text-sm text-gray-500 mb-8">
        Step {tutorialStep + 1} of {tutorialSteps.length}
      </p>
      
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={onPrevStep}
          variant="outline"
          disabled={tutorialStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        {tutorialStep < tutorialSteps.length - 1 ? (
          <Button 
            onClick={onNextStep}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={onFinishTutorial}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
          >
            Start Playing!
            <Gamepad2 className="h-4 w-4" />
          </Button>
        )}
        
        <Button 
          onClick={onSkipTutorial}
          variant="ghost"
          className="text-gray-500 hover:text-gray-700"
        >
          Skip Tutorial
        </Button>
      </div>
    </div>
  );
};

export default WelcomeTutorial;
