
import React, { useEffect, useState } from 'react';
import WelcomeHome from '@/components/welcome/WelcomeHome';
import TutorialComponent from '@/components/welcome/TutorialComponent';
import CharacterSelection from '@/components/welcome/CharacterSelection';
import WelcomeStyles from '@/components/welcome/WelcomeStyles';
import { characters } from '@/components/welcome/characterData';
import { generateRandomName, resetUsedNames } from '@/utils/nameGenerator';

interface WelcomeProps {
  onEnter?: () => void;
}

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

const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('droplet-blue-happy');
  const [tutorialStep, setTutorialStep] = useState(0);
  const [charactersWithRandomNames, setCharactersWithRandomNames] = useState(characters);

  useEffect(() => {
    // Animated sequence
    const timer1 = setTimeout(() => setMascotVisible(true), 300);
    const timer2 = setTimeout(() => setWelcomeTextVisible(true), 1500);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2500);

    // Generate random names for characters when component mounts
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithRandomNames(updatedCharacters);

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
    const selectedCharacterData = charactersWithRandomNames.find(c => c.id === selectedCharacter);
    if (selectedCharacterData) {
      localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacterData));
    }
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

  const handleBackToWelcome = () => {
    setShowCharacterSelect(false);
    setShowTutorial(false);
  };

  if (showCharacterSelect) {
    return (
      <>
        <CharacterSelection
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onBack={handleBackToWelcome}
          onConfirm={handleConfirmCharacter}
        />
        <WelcomeStyles />
      </>
    );
  }

  if (showTutorial) {
    return (
      <>
        <TutorialComponent
          tutorialStep={tutorialStep}
          tutorialSteps={tutorialSteps}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onSkipToCharacterSelect={handleSkipToCharacterSelect}
        />
        <WelcomeStyles />
      </>
    );
  }

  return (
    <>
      <WelcomeHome
        mascotVisible={mascotVisible}
        welcomeTextVisible={welcomeTextVisible}
        buttonsVisible={buttonsVisible}
        onStartTutorial={handleStartTutorial}
        onSkipToCharacterSelect={handleSkipToCharacterSelect}
      />
      <WelcomeStyles />
    </>
  );
};

export default Welcome;
