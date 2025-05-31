import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { 
  PuzzleIcon,
  RocketIcon,
  BrainIcon,
  PaletteIcon,
  InfinityIcon,
  TrophyIcon,
  CrownIcon,
  CoinsIcon
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import GameCard from '@/components/games/GameCard';
import GameEngine from '@/components/games/GameEngine';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import PiAdsNetwork from '@/components/PiAdsNetwork';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { handleSubscribe, loading: paymentLoading } = usePiPayment();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [userPlan, setUserPlan] = useState('free');
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);

  // Check Pi Browser on component mount
  useEffect(() => {
    const isPiBrowser = isRunningInPiBrowser();
    if (isPiBrowser) {
      setShowPiBrowserCheck(false);
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

  // Mascot emotions
  const emotions = [
    { name: "happy", eyes: "happy", mouth: "smile", thought: "Let's play some amazing games! 🎮" },
    { name: "excited", eyes: "excited", mouth: "big-smile", thought: "So many games to choose from! 🎉" },
    { name: "thinking", eyes: "thinking", mouth: "neutral", thought: "Which game should we play next? 🤔" },
    { name: "surprised", eyes: "wide", mouth: "open", thought: "Wow! You're really good at this! 😲" },
    { name: "sleepy", eyes: "sleepy", mouth: "yawn", thought: "Maybe just one more game... 😴" },
    { name: "loving", eyes: "hearts", mouth: "gentle-smile", thought: "I love playing with you! 💕" },
    { name: "confused", eyes: "crossed", mouth: "puzzled", thought: "Hmm, that's tricky! 🤨" },
    { name: "playful", eyes: "wink", mouth: "grin", thought: "Ready for a challenge? 😄" },
    { name: "proud", eyes: "bright", mouth: "proud-smile", thought: "You're absolutely amazing! 🌟" },
    { name: "mischievous", eyes: "sly", mouth: "smirk", thought: "I have some fun games for you... 😏" }
  ];

  // Game categories organized by category from database
  const organizeGamesByCategory = () => {
    const categories = {
      puzzle: {
        name: "Puzzle & Logic",
        icon: PuzzleIcon,
        color: "bg-blue-500",
        games: games.filter(game => game.category === 'puzzle')
      },
      action: {
        name: "Action & Reflex",
        icon: RocketIcon,
        color: "bg-red-500",
        games: games.filter(game => game.category === 'action')
      },
      trivia: {
        name: "Trivia & Quiz",
        icon: BrainIcon,
        color: "bg-green-500",
        games: games.filter(game => game.category === 'trivia')
      },
      creative: {
        name: "Creative & Fun",
        icon: PaletteIcon,
        color: "bg-purple-500",
        games: games.filter(game => game.category === 'creative')
      },
      infinite: {
        name: "Infinite Games",
        icon: InfinityIcon,
        color: "bg-orange-500",
        games: games.filter(game => game.category === 'infinite')
      }
    };
    return categories;
  };

  const gameCategories = organizeGamesByCategory();

  // Pi Ads integration
  const showAdForReward = () => {
    if (!isRunningInPiBrowser()) {
      toast({
        title: "Pi Browser Required",
        description: "Please use Pi Browser to view ads and earn rewards.",
        variant: "destructive",
      });
      return;
    }

    // Simulate ad reward
    toast({
      title: "Ad Reward Earned!",
      description: "You earned 0.1 Pi for watching an ad!",
    });
    setTotalScore(prev => prev + 10);
  };

  // Mascot rendering functions
  const renderMascotEyes = (type: string) => {
    switch (type) {
      case "happy":
        return (
          <>
            <path d="M70 100 Q80 95 90 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "excited":
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
      case "hearts":
        return (
          <>
            <path d="M70 95 C70 90, 80 90, 80 95 C80 90, 90 90, 90 95 C90 105, 80 110, 80 110 C80 110, 70 105, 70 95 Z" fill="#ff69b4" />
            <path d="M110 95 C110 90, 120 90, 120 95 C120 90, 130 90, 130 95 C130 105, 120 110, 120 110 C120 110, 110 105, 110 95 Z" fill="#ff69b4" />
          </>
        );
      case "wide":
        return (
          <>
            <circle cx="80" cy="105" r="12" fill="#fff" />
            <circle cx="120" cy="105" r="12" fill="#fff" />
            <circle cx="80" cy="105" r="8" fill="#333" />
            <circle cx="120" cy="105" r="8" fill="#333" />
          </>
        );
      case "sleepy":
        return (
          <>
            <path d="M70 110 L90 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 110 L130 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "wink":
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="83" cy="108" r="4" fill="#333" />
            <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      default:
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

  const renderMascotMouth = (type: string) => {
    switch (type) {
      case "big-smile":
        return (
          <path
            d="M75 140 Q100 165 125 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "open":
        return (
          <ellipse cx="100" cy="145" rx="12" ry="8" fill="#333" />
        );
      case "yawn":
        return (
          <ellipse cx="100" cy="145" rx="8" ry="12" fill="#333" />
        );
      case "grin":
        return (
          <path
            d="M70 140 Q100 160 130 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "neutral":
        return (
          <ellipse cx="100" cy="145" rx="6" ry="3" fill="#fff" />
        );
      default:
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
    setCurrentEmotion(1); // excited
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
    setCurrentEmotion(8); // proud
    
    toast({
      title: "Great Job!",
      description: `You earned ${score} points!`,
    });

    // Show ad after game completion for extra reward
    if (isRunningInPiBrowser()) {
      setTimeout(() => {
        showAdForReward();
      }, 1000);
    }
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
    setCurrentEmotion(0);
  };

  if (showPiBrowserCheck && !isRunningInPiBrowser()) {
    return (
      <PiBrowserCheck 
        showContinueOption={true}
        onContinueAnyway={() => setShowPiBrowserCheck(false)}
      />
    );
  }

  if (gamesLoading) {
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
        <title>Play with Droplink - 50+ Interactive Games & Activities</title>
        <meta name="description" content="Play 50+ interactive games with the Droplink mascot! Puzzle games, action games, trivia, creative activities, and premium challenges." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Droplink Gaming Platform
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {games.length}+ interactive games and activities with Pi Network integration
            </p>
            
            {/* Score & Status Display */}
            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Score: {totalScore}
              </Badge>
              <Badge variant={userPlan === 'premium' ? 'default' : 'outline'} className="text-lg px-4 py-2">
                {userPlan === 'premium' ? <CrownIcon className="w-5 h-5 mr-2" /> : <CoinsIcon className="w-5 h-5 mr-2" />}
                {userPlan === 'premium' ? 'Premium' : 'Free Plan'}
              </Badge>
            </div>

            {/* Premium CTA for Free Users */}
            {userPlan === 'free' && (
              <Card className="max-w-md mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <CrownIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-800 mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-yellow-700 mb-3">Unlock all {games.length}+ games, remove ads, and get exclusive features!</p>
                  <button 
                    onClick={handleUpgradeToPremium} 
                    disabled={paymentLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    <CoinsIcon className="w-4 h-4 mr-2 inline" />
                    {paymentLoading ? 'Processing...' : 'Upgrade for 10 Pi'}
                  </button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Mascot Display */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <svg
                      width="200"
                      height="240"
                      viewBox="0 0 200 240"
                      className="animate-bounce-gentle"
                    >
                      {/* Droplet shape */}
                      <path
                        d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                        fill="url(#playDropletGradient)"
                        className="animate-pulse-gentle"
                      />
                      
                      <defs>
                        <linearGradient id="playDropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00aaff" />
                          <stop offset="50%" stopColor="#0099ee" />
                          <stop offset="100%" stopColor="#0077cc" />
                        </linearGradient>
                      </defs>
                      
                      {/* Highlight */}
                      <ellipse
                        cx="75"
                        cy="70"
                        rx="12"
                        ry="18"
                        fill="rgba(255, 255, 255, 0.6)"
                        className="animate-shimmer"
                      />
                      
                      {/* Face */}
                      {renderMascotEyes(emotions[currentEmotion].eyes)}
                      {renderMascotMouth(emotions[currentEmotion].mouth)}
                    </svg>
                    
                    {/* Thought bubble */}
                    <div className="absolute -right-4 -top-4 bg-white rounded-lg p-3 shadow-lg border-2 border-primary/20 max-w-xs animate-float">
                      <p className="text-sm font-medium text-primary">
                        {emotions[currentEmotion].thought}
                      </p>
                    </div>
                  </div>

                  {/* Pi Ads Network */}
                  <PiAdsNetwork placementId="gaming-sidebar" />
                </div>
              </div>
            </div>

            {/* Games Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="puzzle" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  {Object.entries(gameCategories).map(([key, category]) => (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs">
                      <category.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(gameCategories).map(([key, category]) => (
                  <TabsContent key={key} value={key}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <category.icon className="w-6 h-6" />
                          {category.name}
                        </CardTitle>
                        <CardDescription>
                          Choose from {category.games.length} amazing {category.name.toLowerCase()} games
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.games.map(game => {
                            const isLocked = !game.is_free && userPlan === 'free' && !purchasedGames.includes(game.id);
                            return (
                              <GameCard
                                key={game.id}
                                game={game}
                                isLocked={isLocked}
                                userPlan={userPlan}
                                onPlay={(game) => handleGameClick(game, key)}
                                onPurchase={handlePurchaseGame}
                                onUpgrade={handleUpgradeToPremium}
                              />
                            );
                          })}
                        </div>
                        
                        {/* Pi Ads between games */}
                        <div className="mt-6">
                          <PiAdsNetwork placementId={`${key}-games`} />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
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
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 2.5s ease-in-out infinite;
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
