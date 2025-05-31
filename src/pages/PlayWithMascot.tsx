
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
  CoinsIcon,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import GameCard from '@/components/games/GameCard';
import GameEngine from '@/components/games/GameEngine';
import GameUpgradeModal from '@/components/games/GameUpgradeModal';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import PiAdsNetwork from '@/components/PiAdsNetwork';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import { Button } from '@/components/ui/button';

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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [upgradeModal, setUpgradeModal] = useState<{
    isOpen: boolean;
    upgradeType: 'skill' | 'powerup' | 'unlock' | 'boost';
    upgradeName: string;
    piCost: number;
  }>({
    isOpen: false,
    upgradeType: 'skill',
    upgradeName: '',
    piCost: 0
  });

  // Check Pi Browser on component mount
  useEffect(() => {
    const isPiBrowser = isRunningInPiBrowser();
    if (isPiBrowser) {
      setShowPiBrowserCheck(false);
    }
  }, []);

  // Background music control
  useEffect(() => {
    if (soundEnabled) {
      musicController.start();
    } else {
      musicController.stop();
    }

    return () => {
      musicController.stop();
    };
  }, [soundEnabled, musicController]);

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

  // Mascot rendering functions
  const renderMascotEyes = (eyeType: string) => {
    const eyeProps = {
      cx: "85",
      cy: "80",
      rx: "8",
      ry: "12",
      fill: "#000"
    };

    const rightEyeProps = {
      cx: "115",
      cy: "80",
      rx: "8",
      ry: "12",
      fill: "#000"
    };

    switch (eyeType) {
      case "happy":
        return (
          <>
            <ellipse {...eyeProps} ry="6" />
            <ellipse {...rightEyeProps} ry="6" />
          </>
        );
      case "excited":
        return (
          <>
            <ellipse {...eyeProps} ry="15" />
            <ellipse {...rightEyeProps} ry="15" />
          </>
        );
      case "sleepy":
        return (
          <>
            <line x1="77" y1="80" x2="93" y2="80" stroke="#000" strokeWidth="3" />
            <line x1="107" y1="80" x2="123" y2="80" stroke="#000" strokeWidth="3" />
          </>
        );
      case "hearts":
        return (
          <>
            <text x="85" y="85" fontSize="12" textAnchor="middle" fill="red">♥</text>
            <text x="115" y="85" fontSize="12" textAnchor="middle" fill="red">♥</text>
          </>
        );
      case "wide":
        return (
          <>
            <ellipse {...eyeProps} rx="12" ry="15" />
            <ellipse {...rightEyeProps} rx="12" ry="15" />
          </>
        );
      case "wink":
        return (
          <>
            <ellipse {...eyeProps} ry="6" />
            <line x1="107" y1="80" x2="123" y2="80" stroke="#000" strokeWidth="3" />
          </>
        );
      default:
        return (
          <>
            <ellipse {...eyeProps} />
            <ellipse {...rightEyeProps} />
          </>
        );
    }
  };

  const renderMascotMouth = (mouthType: string) => {
    switch (mouthType) {
      case "smile":
        return <path d="M 85 110 Q 100 125 115 110" stroke="#000" strokeWidth="3" fill="none" />;
      case "big-smile":
        return <path d="M 80 110 Q 100 130 120 110" stroke="#000" strokeWidth="3" fill="none" />;
      case "neutral":
        return <line x1="90" y1="115" x2="110" y2="115" stroke="#000" strokeWidth="2" />;
      case "open":
        return <ellipse cx="100" cy="115" rx="8" ry="12" fill="#000" />;
      case "yawn":
        return <ellipse cx="100" cy="115" rx="12" ry="15" fill="#000" />;
      case "gentle-smile":
        return <path d="M 87 112 Q 100 120 113 112" stroke="#000" strokeWidth="2" fill="none" />;
      case "puzzled":
        return <path d="M 85 115 Q 95 110 105 115 Q 110 120 115 115" stroke="#000" strokeWidth="2" fill="none" />;
      case "grin":
        return <path d="M 80 108 Q 100 128 120 108" stroke="#000" strokeWidth="3" fill="none" />;
      case "proud-smile":
        return <path d="M 82 108 Q 100 128 118 108" stroke="#000" strokeWidth="3" fill="none" />;
      case "smirk":
        return <path d="M 85 115 Q 95 120 110 112" stroke="#000" strokeWidth="2" fill="none" />;
      default:
        return <path d="M 85 110 Q 100 125 115 110" stroke="#000" strokeWidth="3" fill="none" />;
    }
  };

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

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      sounds.click();
    }
  };

  const handleGameClick = (game: any, category: string) => {
    if (soundEnabled) sounds.click();
    
    if (!game.is_free && userPlan === 'free' && !purchasedGames.includes(game.id)) {
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'unlock',
        upgradeName: game.name,
        piCost: game.price_pi || 1
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
    if (soundEnabled) sounds.click();
    
    setUpgradeModal({
      isOpen: true,
      upgradeType: 'unlock',
      upgradeName: game.name,
      piCost: game.price_pi || 1
    });
  };

  const handleUpgradeToPremium = async () => {
    if (soundEnabled) sounds.click();
    
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
      if (soundEnabled) sounds.unlock();
    } catch (error) {
      console.error('Premium upgrade failed:', error);
    }
  };

  const handleGameComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    setCurrentEmotion(8); // proud
    
    if (soundEnabled) sounds.success();
    
    toast({
      title: "Great Job!",
      description: `You earned ${score} points!`,
    });

    // Show upgrade opportunity after game completion
    setTimeout(() => {
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'powerup',
        upgradeName: 'Score Multiplier',
        piCost: 0.5
      });
    }, 2000);
  };

  const handleUpgradeComplete = (method: 'pi' | 'ad') => {
    if (soundEnabled) {
      if (method === 'pi') {
        sounds.coin();
      } else {
        sounds.powerup();
      }
    }
    
    setCurrentEmotion(8); // proud
    // Apply the upgrade logic here
  };

  const handleBackToGames = () => {
    if (soundEnabled) sounds.click();
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
            {/* Sound Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSound}
              className="fixed top-4 right-4 z-50"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            
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

      <Button
        variant="outline"
        size="sm"
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50"
      >
        {soundEnabled ? (
          <>
            <Volume2 className="w-4 h-4 mr-2" />
            Sound On
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 mr-2" />
            Sound Off
          </>
        )}
      </Button>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Droplink Gaming Platform
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {games.length}+ interactive games and activities with Pi Network integration
            </p>
            
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
                      
                      <ellipse
                        cx="75"
                        cy="70"
                        rx="12"
                        ry="18"
                        fill="rgba(255, 255, 255, 0.6)"
                        className="animate-shimmer"
                      />
                      
                      {renderMascotEyes(emotions[currentEmotion].eyes)}
                      {renderMascotMouth(emotions[currentEmotion].mouth)}
                    </svg>
                    
                    <div className="absolute -right-4 -top-4 bg-white rounded-lg p-3 shadow-lg border-2 border-primary/20 max-w-xs animate-float">
                      <p className="text-sm font-medium text-primary">
                        {emotions[currentEmotion].thought}
                      </p>
                    </div>
                  </div>

                  <PiAdsNetwork placementId="gaming-sidebar" />
                </div>
              </div>
            </div>

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

        <GameUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal(prev => ({ ...prev, isOpen: false }))}
          upgradeType={upgradeModal.upgradeType}
          upgradeName={upgradeModal.upgradeName}
          piCost={upgradeModal.piCost}
          onUpgradeComplete={handleUpgradeComplete}
        />
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
    </>
  );
};

export default PlayWithMascot;
