
import React from 'react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Heart, Globe, Play, SkipForward } from 'lucide-react';
import CharacterRenderer from './CharacterRenderer';
import { characters } from './characterData';
import { MusicToggle } from '@/components/ui/MusicToggle';

interface WelcomeHomeProps {
  mascotVisible: boolean;
  welcomeTextVisible: boolean;
  buttonsVisible: boolean;
  onStartTutorial: () => void;
  onSkipToCharacterSelect: () => void;
}

const WelcomeHome: React.FC<WelcomeHomeProps> = ({
  mascotVisible,
  welcomeTextVisible,
  buttonsVisible,
  onStartTutorial,
  onSkipToCharacterSelect
}) => {
  // Create a special "let's play together" character for the welcome page
  const playTogetherCharacter = {
    ...characters[0],
    mood: 'excited',
    personality: "Let's play together!"
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Droplink Gaming - Your Pi Network Gaming Hub</title>
        <meta name="description" content="Welcome to Droplink Gaming! Play games, earn Pi, and have fun with your character companions." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Music Toggle - Fixed position */}
        <div className="fixed top-4 right-4 z-50">
          <MusicToggle 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg"
          />
        </div>

        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-bounce">
          <Sparkles className="text-primary/30 h-8 w-8" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-300">
          <Heart className="text-red-400/30 h-6 w-6" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-700">
          <Globe className="text-blue-400/30 h-7 w-7" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Mascot */}
          <div className={`transition-all duration-1000 ${
            mascotVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'
          }`}>
            <div className="relative mb-8">
              <CharacterRenderer character={playTogetherCharacter} size={200} />
              {/* Speech bubble */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-4 py-2 shadow-lg border-2 border-primary/20 animate-bounce">
                <div className="text-sm font-medium text-primary">Let's play together! 🎮</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className={`transition-all duration-1000 delay-500 ${
            welcomeTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                Welcome to Play with Droplink!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Your Pi Network Gaming Hub
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Play amazing games, earn rewards, and have fun with your character companions 
              in the Pi Network gaming ecosystem.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-1000 delay-1000 ${
            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={onStartTutorial}
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Tutorial
              </Button>
              <Button 
                onClick={onSkipToCharacterSelect}
                variant="outline" 
                size="lg" 
                className="hover:bg-blue-50 transition-colors text-lg px-8 py-4"
              >
                <SkipForward className="mr-2 h-5 w-5" />
                Choose Character
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeHome;
