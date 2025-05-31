
import React from 'react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: string;
}

interface TutorialComponentProps {
  tutorialStep: number;
  tutorialSteps: TutorialStep[];
  onPrevStep: () => void;
  onNextStep: () => void;
  onSkipToCharacterSelect: () => void;
}

const TutorialComponent: React.FC<TutorialComponentProps> = ({
  tutorialStep,
  tutorialSteps,
  onPrevStep,
  onNextStep,
  onSkipToCharacterSelect
}) => {
  return (
    <>
      <Helmet>
        <title>Gaming Tutorial - Learn How to Play</title>
        <meta name="description" content="Learn how to play games with Droplink and start your gaming adventure." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Tutorial Content */}
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
                  onClick={onNextStep}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                >
                  Choose Character
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                onClick={onSkipToCharacterSelect}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Skip Tutorial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialComponent;
