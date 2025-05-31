import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe, Play, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface WelcomeProps {
  onEnter?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('droplet-blue-happy');
  const [tutorialStep, setTutorialStep] = useState(0);

  const characters = [
    // Male Characters - Blue Variations
    {
      id: 'droplet-blue-happy',
      name: 'Droplink',
      gender: 'male',
      description: 'The original water droplet mascot',
      color: '#00aaff',
      mood: 'happy',
      personality: 'Cheerful and optimistic'
    },
    {
      id: 'droplet-blue-excited',
      name: 'Droplink',
      gender: 'male',
      description: 'Energetic water droplet',
      color: '#00aaff',
      mood: 'excited',
      personality: 'Full of energy and enthusiasm'
    },
    {
      id: 'droplet-blue-calm',
      name: 'Droplink',
      gender: 'male',
      description: 'Peaceful water droplet',
      color: '#00aaff',
      mood: 'calm',
      personality: 'Zen and relaxed'
    },
    
    // Female Characters - Pink/Purple Variations
    {
      id: 'droplet-pink-happy',
      name: 'Dropla',
      gender: 'female',
      description: 'Sweet and caring companion',
      color: '#ff69b4',
      mood: 'happy',
      personality: 'Kind and nurturing'
    },
    {
      id: 'droplet-pink-excited',
      name: 'Dropla',
      gender: 'female',
      description: 'Bubbly and enthusiastic',
      color: '#ff69b4',
      mood: 'excited',
      personality: 'Playful and spirited'
    },
    {
      id: 'droplet-purple-calm',
      name: 'Dropia',
      gender: 'female',
      description: 'Wise and thoughtful',
      color: '#9b59b6',
      mood: 'calm',
      personality: 'Intelligent and serene'
    },
    
    // Additional Color Variations
    {
      id: 'droplet-green-happy',
      name: 'Dropie',
      gender: 'male',
      description: 'Nature-loving companion',
      color: '#27ae60',
      mood: 'happy',
      personality: 'Eco-friendly and fresh'
    },
    {
      id: 'droplet-orange-excited',
      name: 'Dropo',
      gender: 'male',
      description: 'Fiery and passionate',
      color: '#ff6b35',
      mood: 'excited',
      personality: 'Bold and adventurous'
    },
    {
      id: 'droplet-cyan-calm',
      name: 'Dropella',
      gender: 'female',
      description: 'Cool and collected',
      color: '#1abc9c',
      mood: 'calm',
      personality: 'Steady and reliable'
    }
  ];

  const tutorialSteps = [
    {
      title: "Welcome to Gaming!",
      description: "Get ready to play amazing games with your chosen character companion.",
      icon: "🎮"
    },
    {
      title: "Choose Your Character",
      description: "Select a character that will accompany you through your gaming journey.",
      icon: "👤"
    },
    {
      title: "Play & Earn",
      description: "Play games, earn points, and have fun in the Pi Network gaming ecosystem.",
      icon: "🏆"
    },
    {
      title: "Ready to Play!",
      description: "Your gaming adventure begins now!",
      icon: "🚀"
    }
  ];

  useEffect(() => {
    // Animated sequence
    const timer1 = setTimeout(() => setMascotVisible(true), 300);
    const timer2 = setTimeout(() => setWelcomeTextVisible(true), 1500);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleGoToGaming = () => {
    if (onEnter) {
      onEnter();
    }
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const handleSkipToCharacterSelect = () => {
    setShowCharacterSelect(true);
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleConfirmCharacter = () => {
    localStorage.setItem('selectedCharacter', JSON.stringify(characters.find(c => c.id === selectedCharacter)));
    handleGoToGaming();
  };

  const handleNextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowCharacterSelect(true);
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const renderCharacter = (character: any, size: number = 120) => {
    const gradientId = `${character.id}Gradient`;
    
    // Eye styles based on mood
    const getEyes = (mood: string) => {
      switch (mood) {
        case 'excited':
          return (
            <>
              <circle cx="80" cy="105" r="8" fill="#fff" />
              <circle cx="120" cy="105" r="8" fill="#fff" />
              <circle cx="80" cy="105" r="5" fill="#333" />
              <circle cx="120" cy="105" r="5" fill="#333" />
              <circle cx="82" cy="103" r="2" fill="#fff" />
              <circle cx="122" cy="103" r="2" fill="#fff" />
            </>
          );
        case 'calm':
          return (
            <>
              <path d="M70 100 Q80 95 90 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          );
        default: // happy
          return (
            <>
              <circle cx="80" cy="105" r="8" fill="#fff" />
              <circle cx="120" cy="105" r="8" fill="#fff" />
              <circle cx="83" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
              <circle cx="123" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
            </>
          );
      }
    };

    // Mouth styles based on mood
    const getMouth = (mood: string) => {
      switch (mood) {
        case 'excited':
          return (
            <path
              d="M75 140 Q100 165 125 140"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          );
        case 'calm':
          return (
            <path
              d="M85 145 Q100 150 115 145"
              stroke="#fff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          );
        default: // happy
          return (
            <path
              d="M80 140 Q100 155 120 140"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          );
      }
    };
    
    return (
      <svg width={size} height={size * 1.2} viewBox="0 0 200 240" className="animate-bounce-gentle">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={character.color} />
            <stop offset="50%" stopColor={character.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={character.color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Character shape */}
        <path
          d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
          fill={`url(#${gradientId})`}
          className="animate-pulse-gentle"
        />
        
        {/* Highlight */}
        <ellipse
          cx="75"
          cy="70"
          rx="12"
          ry="18"
          fill="rgba(255, 255, 255, 0.6)"
          className="animate-shimmer"
        />
        
        {/* Eyes based on mood */}
        {getEyes(character.mood)}
        
        {/* Mouth based on mood */}
        {getMouth(character.mood)}

        {/* Gender indicator (optional bow for female characters) */}
        {character.gender === 'female' && (
          <path
            d="M85 45 Q100 35 115 45 Q100 55 85 45"
            fill="#ff1493"
            opacity="0.8"
          />
        )}
      </svg>
    );
  };

  if (showCharacterSelect) {
    return (
      <>
        <Helmet>
          <title>Choose Your Gaming Character - Droplink</title>
          <meta name="description" content="Choose your gaming companion for the Droplink gaming experience." />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                Choose Your Gaming Character
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Select a character to accompany you on your gaming adventure!
              </p>
              
              {/* Character Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() => handleCharacterSelect(character.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedCharacter === character.id
                        ? 'bg-white border-4 border-primary shadow-lg scale-105'
                        : 'bg-white/50 border-2 border-gray-200 hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {renderCharacter(character, 80)}
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-lg">{character.name}</h3>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            character.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                          }`}>
                            {character.gender === 'male' ? '♂' : '♀'} {character.gender}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {character.mood}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{character.personality}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Selected Character Preview */}
              <div className="bg-white rounded-xl p-6 mb-8 border-2 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Your Gaming Companion:</h3>
                <div className="flex items-center justify-center gap-6">
                  {renderCharacter(characters.find(c => c.id === selectedCharacter)!, 100)}
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">
                      {characters.find(c => c.id === selectedCharacter)?.name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {characters.find(c => c.id === selectedCharacter)?.personality}
                    </p>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        characters.find(c => c.id === selectedCharacter)?.gender === 'male' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-pink-100 text-pink-700'
                      }`}>
                        {characters.find(c => c.id === selectedCharacter)?.gender}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {characters.find(c => c.id === selectedCharacter)?.mood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => setShowCharacterSelect(false)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                
                <Button 
                  onClick={handleConfirmCharacter}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                >
                  Start Gaming
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showTutorial) {
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
                  onClick={handlePrevStep}
                  variant="outline"
                  disabled={tutorialStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {tutorialStep < tutorialSteps.length - 1 ? (
                  <Button 
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                  >
                    Choose Character
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  onClick={handleSkipToCharacterSelect}
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
  }

  return (
    <>
      <Helmet>
        <title>Welcome to Droplink Gaming - Your Pi Network Gaming Hub</title>
        <meta name="description" content="Welcome to Droplink Gaming! Play games, earn Pi, and have fun with your character companions." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
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
              {renderCharacter(characters[0], 200)}
            </div>
          </div>

          {/* Welcome Text */}
          <div className={`transition-all duration-1000 delay-500 ${
            welcomeTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                Welcome to Droplink Gaming!
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
                onClick={handleStartTutorial}
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Tutorial
              </Button>
              <Button 
                onClick={handleSkipToCharacterSelect}
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

        <style>
          {`
          @keyframes bounce-gentle {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-8px); }
          }
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes gentle-blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-gentle-blink {
            animation: gentle-blink 5s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 2.5s ease-in-out infinite;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default Welcome;
