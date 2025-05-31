
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, SkipForward, Play, Heart, Coins, Gamepad2, Shirt } from 'lucide-react';

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
      title: "Meet Your Boo! 😊",
      content: "Your adorable virtual pet is waiting for you! Take care of them by feeding, playing, and keeping them clean.",
      icon: "😊",
      features: ["Virtual Pet Care", "Real-time Stats", "Emotional Responses"]
    },
    {
      title: "Play Mini-Games 🎮",
      content: "Enjoy 12+ exciting mini-games! From Boo Climb to Piano Boo, there's always something fun to play.",
      icon: "🎮",
      features: ["12+ Mini-Games", "Earn Coins", "Unlock New Games"]
    },
    {
      title: "Customize & Style 👕",
      content: "Visit the shop to buy clothes, accessories, and decorations for your Boo. Make them unique!",
      icon: "👕",
      features: ["Daily Shop", "Hair Styles", "Accessories & Clothes"]
    },
    {
      title: "Ready to Start! 🚀",
      content: "Everything is set up! Create your character and begin your amazing journey with your new Boo companion.",
      icon: "🚀",
      features: ["Character Creation", "Start Playing", "Have Fun!"]
    }
  ];

  const currentStep = tutorialSteps[tutorialStep];

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-gradient-to-b from-yellow-100 to-orange-100 border-4 border-white shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-4">
          <div className="text-6xl mb-4 animate-bounce">{currentStep.icon}</div>
          <CardTitle className="text-2xl font-bold text-gray-800">{currentStep.title}</CardTitle>
          <Badge className="bg-blue-500 text-white">
            Step {tutorialStep + 1} of {tutorialSteps.length}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            {currentStep.content}
          </p>
          
          {/* Features List */}
          <div className="space-y-2">
            {currentStep.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/50 rounded-xl p-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={onPrevStep}
              disabled={tutorialStep === 0}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="flex gap-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === tutorialStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {tutorialStep < tutorialSteps.length - 1 ? (
              <Button onClick={onNextStep} size="sm" className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onFinishTutorial} size="sm" className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start!
              </Button>
            )}
          </div>
          
          {/* Skip Button */}
          <div className="text-center pt-2">
            <Button
              onClick={onSkipTutorial}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Tutorial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeTutorial;
