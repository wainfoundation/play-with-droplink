
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import WelcomeHome from '@/components/welcome/WelcomeHome';
import CharacterSelection from '@/components/welcome/CharacterSelection';
import GameTutorial from '@/components/welcome/GameTutorial';

interface SplashWrapperProps {
  children: React.ReactNode;
}

const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<'splash' | 'welcome' | 'character' | 'tutorial' | 'complete'>('splash');
  const [showSplash, setShowSplash] = useState(true);
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Check if user has already completed the welcome flow
  useEffect(() => {
    const hasCompletedWelcome = localStorage.getItem('welcomeCompleted');
    if (hasCompletedWelcome) {
      setCurrentStep('complete');
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setCurrentStep('welcome');
    setShowSplash(false);
    
    // Stagger the welcome animations
    setTimeout(() => setMascotVisible(true), 200);
    setTimeout(() => setWelcomeTextVisible(true), 800);
    setTimeout(() => setButtonsVisible(true), 1400);
  };

  const handleStartTutorial = () => {
    setCurrentStep('tutorial');
  };

  const handleSkipToCharacterSelect = () => {
    setCurrentStep('character');
  };

  const handleCharacterSelected = () => {
    setCurrentStep('tutorial');
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    setCurrentStep('complete');
  };

  const handleSkipWelcome = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    setCurrentStep('complete');
  };

  if (currentStep === 'complete') {
    return <>{children}</>;
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentStep === 'welcome') {
    return (
      <WelcomeHome
        mascotVisible={mascotVisible}
        welcomeTextVisible={welcomeTextVisible}
        buttonsVisible={buttonsVisible}
        onStartTutorial={handleStartTutorial}
        onSkipToCharacterSelect={handleSkipToCharacterSelect}
      />
    );
  }

  if (currentStep === 'character') {
    return (
      <CharacterSelection
        onCharacterSelected={handleCharacterSelected}
        onSkip={handleSkipWelcome}
      />
    );
  }

  if (currentStep === 'tutorial') {
    return (
      <GameTutorial
        onComplete={handleTutorialComplete}
        onSkip={handleSkipWelcome}
      />
    );
  }

  return <>{children}</>;
};

export default SplashWrapper;
