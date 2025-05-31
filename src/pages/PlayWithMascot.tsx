
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import GameEngine from '@/components/games/GameEngine';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import CharacterDisplay from '@/components/games/CharacterDisplay';
import GameCategories from '@/components/games/GameCategories';
import PremiumCTA from '@/components/games/PremiumCTA';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { handleSubscribe, loading: paymentLoading } = usePiPayment();
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [userPlan, setUserPlan] = useState('free');
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  // Check Pi Browser on component mount
  useEffect(() => {
    const isPiBrowser = isRunningInPiBrowser();
    if (isPiBrowser) {
      setShowPiBrowserCheck(false);
    }
  }, []);

  // Load selected character from localStorage
  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        setSelectedCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Error parsing saved character:', error);
        // Set default character
        setSelectedCharacter({
          id: 'droplet-blue-happy',
          name: 'Droplink',
          gender: 'male',
          color: '#00aaff',
          mood: 'happy',
          personality: 'Cheerful and optimistic'
        });
      }
    } else {
      // Set default character
      setSelectedCharacter({
        id: 'droplet-blue-happy',
        name: 'Droplink',
        gender: 'male',
        color: '#00aaff',
        mood: 'happy',
        personality: 'Cheerful and optimistic'
      });
    }
  }, []);

  // Set user plan from user data
  useEffect(() => {
    if (user?.plan) {
      setUserPlan(user.plan);
    }
    if (user?.total_score) {
      setTotalScore(user.total_score);
    }
  }, [user]);

  const handleGameClick = (game: any, category: string) => {
    if (!game.is_free && userPlan === 'free' && !purchasedGames.includes(game.id)) {
      toast({
        title: "Premium Required",
        description: `${game.name} requires a Premium subscription or individual purchase.`,
        variant: "destructive",
      });
      return;
    }

    setCurrentGame({ ...game, category });
    toast({
      title: `Starting ${game.name}`,
      description: "Get ready to play!",
    });
  };

  const handlePurchaseGame = async (game: any) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase games.",
        variant: "destructive",
      });
      return;
    }

    if (!isRunningInPiBrowser()) {
      toast({
        title: "Pi Browser Required",
        description: "Please use Pi Browser to make Pi payments.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Processing Payment",
        description: `Processing ${game.price_pi} Pi payment for ${game.name}...`,
      });

      // Simulate Pi payment
      setTimeout(() => {
        setPurchasedGames([...purchasedGames, game.id]);
        toast({
          title: "Purchase Successful!",
          description: `You now own ${game.name}!`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Failed to process Pi payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpgradeToPremium = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to upgrade to Premium.",
        variant: "destructive",
      });
      return;
    }

    if (!isRunningInPiBrowser()) {
      toast({
        title: "Pi Browser Required",
        description: "Please use Pi Browser to make Pi payments.",
        variant: "destructive",
      });
      return;
    }

    try {
      await handleSubscribe('premium', 'monthly');
      setUserPlan('premium');
    } catch (error) {
      console.error('Premium upgrade failed:', error);
    }
  };

  const handleGameComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    
    toast({
      title: "Great Job!",
      description: `You earned ${score} points!`,
    });
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
  };

  const handleAdReward = (reward: any) => {
    setTotalScore(prev => prev + 10);
    toast({
      title: "Ad Reward Earned!",
      description: `You earned ${reward.amount} ${reward.type} for watching an ad!`,
    });
  };

  const handleAdError = (error: string) => {
    toast({
      title: "Ad Error",
      description: error,
      variant: "destructive",
    });
  };

  if (showPiBrowserCheck && !isRunningInPiBrowser()) {
    return (
      <PiBrowserCheck 
        showContinueOption={true}
        onContinueAnyway={() => setShowPiBrowserCheck(false)}
      />
    );
  }

  if (gamesLoading || !selectedCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  // Show game engine if a game is selected
  if (currentGame) {
    return (
      <>
        <Helmet>
          <title>{currentGame.name} - Droplink Gaming</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="container mx-auto px-4">
            <GameEngine
              game={currentGame}
              onBack={handleBackToGames}
              onGameComplete={handleGameComplete}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play with {selectedCharacter.name} - 50+ Interactive Games & Activities</title>
        <meta name="description" content="Play 50+ interactive games with your chosen character companion! Puzzle games, action games, trivia, creative activities, and premium challenges." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Gaming with {selectedCharacter.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {games.length}+ interactive games with your {selectedCharacter.gender} {selectedCharacter.mood} companion
            </p>
            
            {/* Premium CTA for Free Users */}
            <PremiumCTA
              userPlan={userPlan}
              gamesCount={games.length}
              paymentLoading={paymentLoading}
              onUpgradeToPremium={handleUpgradeToPremium}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Character Display */}
            <CharacterDisplay
              selectedCharacter={selectedCharacter}
              totalScore={totalScore}
              userPlan={userPlan}
              paymentLoading={paymentLoading}
              onUpgradeToPremium={handleUpgradeToPremium}
              onAdReward={handleAdReward}
              onAdError={handleAdError}
            />

            {/* Games Area */}
            <GameCategories
              games={games}
              userPlan={userPlan}
              purchasedGames={purchasedGames}
              onGameClick={handleGameClick}
              onPurchaseGame={handlePurchaseGame}
              onUpgradeToPremium={handleUpgradeToPremium}
            />
          </div>
        </div>

        <style>
          {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default PlayWithMascot;
