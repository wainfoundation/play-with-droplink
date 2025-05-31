
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, SkipForward } from 'lucide-react';

interface WelcomeActionsProps {
  visible: boolean;
  onStartTutorial: () => void;
  onSkipTutorial: () => void;
}

const WelcomeActions: React.FC<WelcomeActionsProps> = ({
  visible,
  onStartTutorial,
  onSkipTutorial
}) => {
  return (
    <div className={`transition-all duration-1000 delay-1000 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button 
          onClick={onStartTutorial}
          size="lg" 
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
        >
          <Play className="mr-2 h-5 w-5" />
          Start Gaming Tutorial
        </Button>
        <Button 
          onClick={onSkipTutorial}
          variant="outline" 
          size="lg" 
          className="hover:bg-blue-50 transition-colors text-lg px-8 py-4"
        >
          <SkipForward className="mr-2 h-5 w-5" />
          Skip to Games
        </Button>
      </div>
    </div>
  );
};

export default WelcomeActions;
