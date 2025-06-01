
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  PuzzleIcon,
  RocketIcon,
  BrainIcon,
  PaletteIcon,
  InfinityIcon,
  TrophyIcon,
  CrownIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import WelcomeStyles from '@/components/welcome/WelcomeStyles';
import { usePiPayment } from '@/hooks/usePiPayment';
import { toast } from '@/hooks/use-toast';

const Play = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [userStats, setUserStats] = useState({
    totalScore: 0,
    gamesPlayed: 0,
    level: 1,
    piCoins: 0,
    lives: 5,
    boosts: 3
  });
  const navigate = useNavigate();
  const { handleSubscribe, processingPayment } = usePiPayment();

  useEffect(() => {
    // Load selected character from localStorage
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

    // Load user stats
    const savedStats = localStorage.getItem('userGameStats');
    if (savedStats) {
      try {
        setUserStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error parsing saved stats:', error);
      }
    }
  }, []);

  const gameCategories = [
    {
      id: 'puzzle',
      name: "Puzzle & Logic",
      icon: PuzzleIcon,
      color: "from-blue-400 to-blue-600",
      description: "Challenge your mind with brain teasers",
      games: [
        { 
          id: 'sudoku-infinite', 
          name: 'Sudoku Infinite', 
          route: '/game/sudoku-infinite',
          difficulty: 'Dynamic', 
          description: 'Unlimited levels of Sudoku puzzles',
          piCost: 0,
          premium: false
        },
        { 
          id: 'block-connect-pro', 
          name: 'Block Connect Pro', 
          route: '/game/block-connect',
          difficulty: 'Progressive', 
          description: 'Connect blocks with unlimited challenges',
          piCost: 1,
          premium: true
        },
        { 
          id: 'word-master', 
          name: 'Word Master', 
          route: '/game/word-puzzle',
          difficulty: 'Adaptive', 
          description: 'Infinite word puzzles and vocabulary challenges',
          piCost: 0.5,
          premium: true
        }
      ]
    },
    {
      id: 'action',
      name: "Action & Reflex",
      icon: RocketIcon,
      color: "from-red-400 to-red-600",
      description: "Test your speed and reflexes",
      games: [
        { 
          id: 'target-rush', 
          name: 'Target Rush', 
          route: '/game/target-rush',
          difficulty: 'Intense', 
          description: 'Unlimited target shooting with increasing speed',
          piCost: 0,
          premium: false
        },
        { 
          id: 'quick-tap-infinity', 
          name: 'Quick Tap Infinity', 
          route: '/game/quick-tap',
          difficulty: 'Extreme', 
          description: 'Tap as fast as you can with endless levels',
          piCost: 0.3,
          premium: true
        }
      ]
    },
    {
      id: 'infinite',
      name: "Infinite Adventures",
      icon: InfinityIcon,
      color: "from-purple-400 to-purple-600",
      description: "Never-ending gaming experiences",
      games: [
        { 
          id: 'droplink-runner', 
          name: 'Droplink Runner', 
          route: '/game/droplink-runner',
          difficulty: 'Endless', 
          description: 'Run with your character through infinite worlds',
          piCost: 0,
          premium: false
        },
        { 
          id: 'pi-collector', 
          name: 'Pi Collector', 
          route: '/game/pi-collector',
          difficulty: 'Progressive', 
          description: 'Collect Pi coins in unlimited adventures',
          piCost: 2,
          premium: true
        }
      ]
    }
  ];

  const handleGameStart = (game: any) => {
    if (game.premium && userStats.piCoins < game.piCost) {
      toast({
        title: "Insufficient Pi Coins",
        description: `You need ${game.piCost} Pi coins to play this game.`,
        variant: "destructive"
      });
      return;
    }

    // Navigate to the specific game page
    navigate(game.route, { 
      state: { 
        character: selectedCharacter, 
        userStats: userStats 
      } 
    });
  };

  const handleBuyPiCoins = async () => {
    try {
      await handleSubscribe('pi-coins', 'one-time');
      toast({
        title: "Pi Coins Purchased!",
        description: "Your Pi coins have been added to your account.",
      });
      
      // Update local stats
      setUserStats(prev => ({ ...prev, piCoins: prev.piCoins + 10 }));
      localStorage.setItem('userGameStats', JSON.stringify({
        ...userStats,
        piCoins: userStats.piCoins + 10
      }));
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to purchase Pi coins. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your gaming companion...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play with {selectedCharacter.name} - Droplink Gaming on Pi Network</title>
        <meta name="description" content={`Play infinite games with your companion ${selectedCharacter.name}! The best gaming experience on Pi Network with unlimited levels and Pi rewards.`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-200/30 rounded-full animate-float"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-purple-200/30 rounded-full animate-float-delay-1"></div>
          <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-pink-200/30 rounded-full animate-float-delay-2"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              Play with {selectedCharacter.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
              The ultimate Pi Network gaming experience with unlimited levels!
            </p>
          </div>

          {/* Character and Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Character Display */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <CharacterRenderer character={selectedCharacter} size={150} />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">{selectedCharacter.name}</CardTitle>
                  <CardDescription>{selectedCharacter.personality}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="w-full">
                        <TrophyIcon className="w-4 h-4 mr-1" />
                        Level {userStats.level}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="w-full">
                        <CrownIcon className="w-4 h-4 mr-1" />
                        {userStats.totalScore}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pi Coins:</span>
                      <Badge variant="outline">{userStats.piCoins}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Lives:</span>
                      <Badge variant="outline">{userStats.lives}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Boosts:</span>
                      <Badge variant="outline">{userStats.boosts}</Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBuyPiCoins}
                    disabled={processingPayment}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    {processingPayment ? 'Processing...' : 'Buy Pi Coins (1 Pi = 10 Coins)'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Game Categories */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {gameCategories.map((category) => (
                  <Card key={category.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-2 hover:border-blue-300 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                          <category.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-gray-800">{category.name}</div>
                          <CardDescription className="text-lg">{category.description}</CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {category.games.map((game) => (
                          <Card key={game.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{game.name}</CardTitle>
                                  <Badge variant="outline" className="mt-1">
                                    {game.difficulty}
                                  </Badge>
                                </div>
                                {game.premium && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                                    {game.piCost} Pi
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                              <Button 
                                onClick={() => handleGameStart(game)}
                                className="w-full"
                                variant={game.premium ? "default" : "outline"}
                              >
                                {game.premium ? `Play (${game.piCost} Pi)` : 'Play Free'}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🚀 Coming Soon!
              </CardTitle>
              <CardDescription className="text-lg">
                More incredible games are being developed for the Pi Network community
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-semibold">Battle Royale</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl mb-2">🏁</div>
                  <p className="text-sm font-semibold">Racing Games</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl mb-2">🧪</div>
                  <p className="text-sm font-semibold">Strategy Games</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="text-sm font-semibold">Adventure RPG</p>
                </div>
              </div>
              <p className="text-gray-600">
                Join our community and be the first to play these exciting new games!
              </p>
            </CardContent>
          </Card>
        </div>

        <WelcomeStyles />
      </div>
    </>
  );
};

export default Play;
