
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import WelcomeHome from './WelcomeHome';
import CharacterSelection from './CharacterSelection';
import GameTutorial from './GameTutorial';

interface SplashWrapperProps {
  children: React.ReactNode;
}

export const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'splash' | 'welcome' | 'character' | 'tutorial' | 'home'>('splash');
  const [showDevSkip, setShowDevSkip] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('droplet-blue');
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Check if user has completed setup
    const welcomeCompleted = localStorage.getItem('welcomeCompleted');
    const petSetupCompleted = localStorage.getItem('petSetupCompleted');
    
    if (welcomeCompleted === 'true' && petSetupCompleted === 'true') {
      setCurrentStep('home');
      return;
    }

    // Show dev skip in development
    if (import.meta.env.DEV) {
      setShowDevSkip(true);
    }

    // Auto-advance splash screen
    const timer = setTimeout(() => {
      if (currentStep === 'splash') {
        setCurrentStep('welcome');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    // Animate welcome screen elements
    if (currentStep === 'welcome') {
      setTimeout(() => setMascotVisible(true), 500);
      setTimeout(() => setWelcomeTextVisible(true), 1000);
      setTimeout(() => setButtonsVisible(true), 1500);
    }
  }, [currentStep]);

  const handleDevSkip = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    localStorage.setItem('selectedCharacter', 'droplet-blue');
    navigate('/play');
  };

  const handleSplashComplete = () => {
    setCurrentStep('welcome');
  };

  const handleStartTutorial = () => {
    setCurrentStep('character');
  };

  const handleSkipToCharacterSelect = () => {
    setCurrentStep('character');
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
    localStorage.setItem('selectedCharacter', characterId);
    setCurrentStep('tutorial');
  };

  const handleCharacterBack = () => {
    setCurrentStep('welcome');
  };

  const handleCharacterConfirm = () => {
    setCurrentStep('tutorial');
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    navigate('/play');
  };

  const handleTutorialSkip = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    navigate('/play');
  };

  if (currentStep === 'splash') {
    return (
      <>
        <SplashScreen onComplete={handleSplashComplete} />
        {showDevSkip && (
          <button
            onClick={handleDevSkip}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600"
          >
            DEV SKIP
          </button>
        )}
      </>
    );
  }

  if (currentStep === 'welcome') {
    return (
      <>
        <WelcomeHome 
          mascotVisible={mascotVisible}
          welcomeTextVisible={welcomeTextVisible}
          buttonsVisible={buttonsVisible}
          onStartTutorial={handleStartTutorial}
          onSkipToCharacterSelect={handleSkipToCharacterSelect}
        />
        {showDevSkip && (
          <button
            onClick={handleDevSkip}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600"
          >
            DEV SKIP
          </button>
        )}
      </>
    );
  }

  if (currentStep === 'character') {
    return (
      <>
        <CharacterSelection 
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onBack={handleCharacterBack}
          onConfirm={handleCharacterConfirm}
        />
        {showDevSkip && (
          <button
            onClick={handleDevSkip}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600"
          >
            DEV SKIP
          </button>
        )}
      </>
    );
  }

  if (currentStep === 'tutorial') {
    return (
      <>
        <GameTutorial 
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
        {showDevSkip && (
          <button
            onClick={handleDevSkip}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600"
          >
            DEV SKIP
          </button>
        )}
      </>
    );
  }

  return <>{children}</>;
};
