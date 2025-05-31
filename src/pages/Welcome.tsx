
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe, Play, SkipForward, ChevronLeft, ChevronRight, Gamepad2, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface WelcomeProps {
  onEnter?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [mascotMood, setMascotMood] = useState(0); // 0: happy, 1: excited, 2: thinking, 3: playful

  const moods = [
    { name: 'Happy', eyes: 'normal', mouth: 'smile', color: '#00aaff' },
    { name: 'Excited', eyes: 'wide', mouth: 'big_smile', color: '#ff6600' },
    { name: 'Thinking', eyes: 'squint', mouth: 'neutral', color: '#9966ff' },
    { name: 'Playful', eyes: 'wink', mouth: 'tongue', color: '#00cc66' }
  ];

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

  useEffect(() => {
    // Animated sequence
    const timer1 = setTimeout(() => setMascotVisible(true), 300);
    const timer2 = setTimeout(() => setWelcomeTextVisible(true), 1500);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2500);

    // Mood cycling for mascot
    const moodTimer = setInterval(() => {
      setMascotMood(prev => (prev + 1) % moods.length);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(moodTimer);
    };
  }, []);

  const handleGoToHome = () => {
    if (onEnter) {
      onEnter();
    }
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const handleSkipTutorial = () => {
    handleGoToHome();
  };

  const handleNextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      handleGoToHome();
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const handleFinishTutorial = () => {
    handleGoToHome();
  };

  const renderMascotEyes = (mood: typeof moods[0]) => {
    switch (mood.eyes) {
      case 'wide':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="4" fill="#333" />
            <circle cx="120" cy="105" r="4" fill="#333" />
            <circle cx="78" cy="103" r="1.5" fill="#fff" />
            <circle cx="118" cy="103" r="1.5" fill="#fff" />
          </>
        );
      case 'squint':
        return (
          <>
            <path d="M 72 110 Q 80 105 88 110" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 112 110 Q 120 105 128 110" stroke="#333" strokeWidth="2" fill="none" />
          </>
        );
      case 'wink':
        return (
          <>
            <circle cx="80" cy="110" r="6" fill="#fff" />
            <circle cx="82" cy="112" r="3" fill="#333" />
            <circle cx="83" cy="111" r="1" fill="#fff" />
            <path d="M 112 115 Q 120 110 128 115" stroke="#333" strokeWidth="2" fill="none" />
          </>
        );
      default:
        return (
          <>
            <circle cx="80" cy="110" r="6" fill="#fff" />
            <circle cx="120" cy="110" r="6" fill="#fff" />
            <circle cx="82" cy="112" r="3" fill="#333" className="animate-pulse" />
            <circle cx="122" cy="112" r="3" fill="#333" className="animate-pulse" />
            <circle cx="83" cy="111" r="1" fill="#fff" />
            <circle cx="123" cy="111" r="1" fill="#fff" />
          </>
        );
    }
  };

  const renderMascotMouth = (mood: typeof moods[0]) => {
    switch (mood.mouth) {
      case 'big_smile':
        return (
          <path
            d="M75 140 Q100 165 125 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'neutral':
        return (
          <ellipse cx="100" cy="145" rx="8" ry="2" fill="#fff" />
        );
      case 'tongue':
        return (
          <>
            <path
              d="M80 140 Q100 160 120 140"
              stroke="#fff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="150" rx="4" ry="6" fill="#ff69b4" />
          </>
        );
      default:
        return (
          <path
            d="M80 140 Q100 155 120 140"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  if (showTutorial) {
    return (
      <>
        <Helmet>
          <title>Droplink Gaming Tutorial - Learn How to Play & Earn Pi</title>
          <meta name="description" content="Learn how to play 50+ games on Droplink, earn Pi rewards, and unlock premium gaming content." />
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
                    onClick={handleFinishTutorial}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                  >
                    Start Playing!
                    <Gamepad2 className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  onClick={handleSkipTutorial}
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

  const currentMood = moods[mascotMood];

  return (
    <>
      <Helmet>
        <title>Welcome to Droplink Gaming - Your Pi Network Game Hub</title>
        <meta name="description" content="Welcome to Droplink Gaming! Play 50+ interactive games, earn Pi rewards, and enjoy premium gaming on Pi Network." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating Gaming Elements */}
        <div className="absolute top-20 left-20 animate-bounce">
          <Gamepad2 className="text-primary/30 h-8 w-8" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-300">
          <Heart className="text-red-400/30 h-6 w-6" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-700">
          <Zap className="text-yellow-400/30 h-7 w-7" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Gaming Mascot */}
          <div className={`transition-all duration-1000 ${
            mascotVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'
          }`}>
            <div className="relative mb-8">
              <svg
                width="200"
                height="240"
                viewBox="0 0 200 240"
                className="animate-bounce-gentle"
              >
                {/* Droplet shape with mood color */}
                <defs>
                  <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={currentMood.color} />
                    <stop offset="50%" stopColor={currentMood.color} />
                    <stop offset="100%" stopColor="#0077cc" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <path
                  d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                  fill="url(#mascotGradient)"
                  filter="url(#glow)"
                  className="transition-all duration-500"
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
                
                {/* Gaming controller pattern */}
                <circle cx="65" cy="160" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="135" cy="160" r="3" fill="rgba(255,255,255,0.3)" />
                <rect x="95" y="155" width="10" height="2" fill="rgba(255,255,255,0.3)" />
                <rect x="99" y="151" width="2" height="10" fill="rgba(255,255,255,0.3)" />
                
                {/* Mood-based eyes */}
                {renderMascotEyes(currentMood)}
                
                {/* Mood-based mouth */}
                {renderMascotMouth(currentMood)}
              </svg>
              
              {/* Mood indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                  {currentMood.name}
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
                Welcome to Droplink! 🎮
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              Play with Droplink
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-2">
              Your ultimate Pi Network gaming platform with 50+ interactive games.
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Watch ads to earn Pi rewards, subscribe for unlimited access, or pay with Pi to unlock premium games instantly. Start your gaming adventure on Pi Network today!
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
                Start Gaming Tutorial
              </Button>
              <Button 
                onClick={handleSkipTutorial}
                variant="outline" 
                size="lg" 
                className="hover:bg-blue-50 transition-colors text-lg px-8 py-4"
              >
                <SkipForward className="mr-2 h-5 w-5" />
                Skip to Games
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
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
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
