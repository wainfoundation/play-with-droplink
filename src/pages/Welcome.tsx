
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import WelcomeMascot from '@/components/welcome/WelcomeMascot';
import WelcomeTutorial from '@/components/welcome/WelcomeTutorial';
import WelcomeFloatingElements from '@/components/welcome/WelcomeFloatingElements';
import WelcomeContent from '@/components/welcome/WelcomeContent';
import WelcomeActions from '@/components/welcome/WelcomeActions';
import CharacterCreationModal from '@/components/welcome/CharacterCreationModal';
import { useCharacter } from '@/hooks/useCharacter';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface WelcomeProps {
  onEnter?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoggedIn } = useUser();
  const { character, loading } = useCharacter();
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setMascotVisible(true), 300);
    const timer2 = setTimeout(() => setWelcomeTextVisible(true), 1500);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Check if user has character and redirect appropriately
  useEffect(() => {
    if (isLoggedIn && !loading) {
      if (character) {
        // User has character, check tutorial status
        if (!character.tutorial_completed) {
          setShowTutorial(true);
        } else {
          // Character exists and tutorial completed, go to play
          handleGoToHome();
        }
      } else {
        // User logged in but no character, show creation modal
        setShowCharacterCreation(true);
      }
    }
  }, [isLoggedIn, character, loading]);

  const handleGoToHome = () => {
    if (onEnter) {
      onEnter();
    } else {
      navigate('/play');
    }
  };

  const handleStartTutorial = () => {
    if (!isLoggedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in first to start the tutorial.",
        variant: "destructive"
      });
      return;
    }
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const handleSkipTutorial = () => {
    if (!isLoggedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in first to continue.",
        variant: "destructive"
      });
      return;
    }
    handleGoToHome();
  };

  const handleCreateCharacter = () => {
    if (!isLoggedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in first to create a character.",
        variant: "destructive"
      });
      return;
    }
    setShowCharacterCreation(true);
  };

  const handleCharacterCreated = () => {
    toast({
      title: "Character Created! 🎉",
      description: "Your character is ready! Starting tutorial...",
    });
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const handleNextStep = () => {
    if (tutorialStep < 3) {
      setTutorialStep(tutorialStep + 1);
    } else {
      handleFinishTutorial();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
            <WelcomeTutorial
              tutorialStep={tutorialStep}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onFinishTutorial={handleFinishTutorial}
              onSkipTutorial={handleSkipTutorial}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Welcome to Droplink Gaming - Create Your Water Character</title>
        <meta name="description" content="Welcome to Droplink Gaming! Create your unique water droplet character and start your Pi Network gaming adventure." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <WelcomeFloatingElements />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <WelcomeMascot visible={mascotVisible} />
          <WelcomeContent visible={welcomeTextVisible} />
          <WelcomeActions 
            visible={buttonsVisible}
            onStartTutorial={handleStartTutorial}
            onSkipTutorial={handleSkipTutorial}
            onCreateCharacter={handleCreateCharacter}
          />
        </div>

        <CharacterCreationModal
          isOpen={showCharacterCreation}
          onClose={() => setShowCharacterCreation(false)}
          onCharacterCreated={handleCharacterCreated}
        />

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
