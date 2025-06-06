
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import WelcomeHome from '@/components/welcome/WelcomeHome';
import CharacterSelection from '@/components/welcome/CharacterSelection';
import GameTutorial from '@/components/welcome/GameTutorial';
import { useUser } from '@/context/UserContext';

interface SplashWrapperProps {
  children: React.ReactNode;
}

const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
  const { isLoggedIn, loading } = useUser();
  const [currentStep, setCurrentStep] = useState<'splash' | 'welcome' | 'character' | 'tutorial' | 'complete'>('splash');
  const [showSplash, setShowSplash] = useState(true);
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('droplet-blue');

  useEffect(() => {
    // Wait for auth loading to complete
    if (loading) return;

    const welcomeCompleted = localStorage.getItem('welcomeCompleted');
    const petSetupCompleted = localStorage.getItem('petSetupCompleted');
    const hasSelectedCharacter = localStorage.getItem('selectedCharacter');
    
    // If user is logged in and has completed setup, skip to main app
    if (isLoggedIn && welcomeCompleted === 'true' && petSetupCompleted === 'true' && hasSelectedCharacter) {
      setCurrentStep('complete');
      setShowSplash(false);
      return;
    }
    
    // If user is not logged in, show splash and then redirect to auth
    if (!isLoggedIn) {
      setCurrentStep('splash');
      setShowSplash(true);
    } else {
      // User is logged in but hasn't completed setup
      setCurrentStep('welcome');
      setShowSplash(false);
    }
  }, [isLoggedIn, loading]);

  const handleSplashComplete = () => {
    if (!isLoggedIn) {
      // Redirect to auth page for non-authenticated users
      window.location.href = '/auth';
      return;
    }

    setCurrentStep('welcome');
    setShowSplash(false);
    
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

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleCharacterConfirm = () => {
    const selectedCharacterData = { id: selectedCharacter };
    localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacterData));
    setCurrentStep('tutorial');
  };

  const handleCharacterBack = () => {
    setCurrentStep('welcome');
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    setCurrentStep('complete');
  };

  const handleSkipWelcome = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    setCurrentStep('complete');
  };

  const handleDevBypass = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('petSetupCompleted', 'true');
    localStorage.setItem('devBypass', 'true');
    setCurrentStep('complete');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete') {
    return <>{children}</>;
  }

  if (showSplash) {
    return (
      <div className="relative">
        <SplashScreen onComplete={handleSplashComplete} />
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={handleDevBypass}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-1 rounded text-xs opacity-70 hover:opacity-100"
          >
            DEV SKIP
          </button>
        )}
      </div>
    );
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
        selectedCharacter={selectedCharacter}
        onCharacterSelect={handleCharacterSelect}
        onBack={handleCharacterBack}
        onConfirm={handleCharacterConfirm}
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
