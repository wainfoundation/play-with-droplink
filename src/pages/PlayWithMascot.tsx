import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useIsMobile } from '@/hooks/use-mobile';
import GameEngine from '@/components/games/GameEngine';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import CharacterDisplay from '@/components/games/CharacterDisplay';
import GameCategories from '@/components/games/GameCategories';
import PremiumCTA from '@/components/games/PremiumCTA';
import AllGames from '@/components/games/AllGames';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { HelpCircle, Shield, FileText, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { handleSubscribe, loading: paymentLoading } = usePiPayment();
  const { plan, canAccessAllGames, showAds } = useUserPlan();
  const isMobile = useIsMobile();
  
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [showAllGames, setShowAllGames] = useState(false);
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);

  const isPremium = plan === 'premium';

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

  // Set user score from user data
  useEffect(() => {
    if (user?.total_score) {
      setTotalScore(user.total_score);
    }
  }, [user]);

  const handleGameSelect = (game: any) => {
    setCurrentGame({ ...game, category: game.category || 'general' });
    setShowAllGames(false);
    toast({
      title: `Starting ${game.name}`,
      description: isPremium ? "Enjoy ad-free gaming!" : "Get ready to play!",
    });
  };

  const handleViewAllGames = () => {
    setShowAllGames(true);
  };

  const handleBackFromAllGames = () => {
    setShowAllGames(false);
  };

  const handleGameClick = (game: any, category: string) => {
    // Premium users can access all games
    if (isPremium || canAccessAllGames) {
      setCurrentGame({ ...game, category });
      toast({
        title: `Starting ${game.name}`,
        description: isPremium ? "Enjoy ad-free gaming!" : "Get ready to play!",
      });
      return;
    }

    // Free users need to check game access
    if (!game.is_free && !purchasedGames.includes(game.id)) {
      toast({
        title: "Premium Required",
        description: `${game.name} requires Premium subscription (10π/month) or individual purchase.`,
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
      toast({
        title: "Premium Activated! 👑",
        description: "Welcome to ad-free gaming with all games unlocked!",
      });
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
    if (!isPremium) {
      setTotalScore(prev => prev + 10);
      toast({
        title: "Ad Reward Earned!",
        description: `You earned ${reward.amount} ${reward.type} for watching an ad!`,
      });
    }
  };

  const handleAdError = (error: string) => {
    if (!isPremium) {
      toast({
        title: "Ad Error",
        description: error,
        variant: "destructive",
      });
    }
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
        <div className={isMobile ? "min-h-screen" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8"}>
          <div className={isMobile ? "" : "container mx-auto px-4"}>
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

  // Show AllGames component if requested
  if (showAllGames) {
    return (
      <>
        <Helmet>
          <title>All Games - Droplink Gaming</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button 
                onClick={handleBackFromAllGames}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Game Hub
              </Button>
            </div>
            <AllGames 
              onGameSelect={handleGameSelect}
              onUpgradeToPremium={handleUpgradeToPremium}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play with Droplink - 50+ Interactive Games & Activities</title>
        <meta name="description" content="Play 50+ interactive games with Droplink! Puzzle games, action games, trivia, creative activities, and premium challenges." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                Play with Droplink
              </h1>
              {isPremium && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Crown className="w-4 h-4" />
                  Premium
                </div>
              )}
            </div>
            <p className="text-lg text-gray-600 mb-6">
              {games.length}+ interactive games with your gaming companion
              {isPremium && " - Ad-free experience!"}
            </p>
            
            {/* Premium CTA for Free Users */}
            {!isPremium && (
              <PremiumCTA
                userPlan={plan}
                gamesCount={games.length}
                paymentLoading={paymentLoading}
                onUpgradeToPremium={handleUpgradeToPremium}
              />
            )}

            {/* View All Games Button */}
            <div className="mb-6">
              <Button 
                onClick={handleViewAllGames}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
              >
                <Crown className="w-5 h-5 mr-2" />
                View All {games.length} Games
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Character Display */}
            <CharacterDisplay
              selectedCharacter={selectedCharacter}
              totalScore={totalScore}
              userPlan={plan}
              paymentLoading={paymentLoading}
              onUpgradeToPremium={handleUpgradeToPremium}
              onAdReward={handleAdReward}
              onAdError={handleAdError}
            />

            {/* Games Area */}
            <GameCategories
              games={games}
              userPlan={plan}
              purchasedGames={purchasedGames}
              onGameClick={handleGameSelect}
              onPurchaseGame={handlePurchaseGame}
              onUpgradeToPremium={handleUpgradeToPremium}
              isPremium={isPremium}
              canAccessAllGames={canAccessAllGames}
            />
          </div>
        </div>

        {/* Footer with navigation links */}
        <footer className="mt-16 border-t bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link 
                to="/help" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <HelpCircle className="w-5 h-5" />
                Help Center
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <Shield className="w-5 h-5" />
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <FileText className="w-5 h-5" />
                Terms of Service
              </Link>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              © {new Date().getFullYear()} Droplink Gaming. All rights reserved.
            </div>
          </div>
        </footer>

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
