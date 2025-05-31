import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { 
  GamepadIcon, 
  BrainIcon, 
  MessageSquareIcon, 
  TrophyIcon, 
  StarIcon, 
  HeartIcon,
  RefreshCwIcon,
  ZapIcon,
  SmileIcon,
  PuzzleIcon,
  RocketIcon,
  PaletteIcon,
  InfinityIcon,
  CrownIcon,
  LockIcon,
  PlayIcon,
  CoinsIcon
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState(null);
  const [userPlan, setUserPlan] = useState('free'); // 'free' or 'premium'
  const [purchasedGames, setPurchasedGames] = useState([]);

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

  // Game categories with detailed game lists
  const gameCategories = {
    puzzle: {
      name: "Puzzle & Logic",
      icon: PuzzleIcon,
      color: "bg-blue-500",
      games: [
        { id: 'memory-match', name: 'Memory Match', difficulty: 'Easy', free: true },
        { id: 'word-guess', name: 'Word Guess', difficulty: 'Easy', free: true },
        { id: 'pi-wordle', name: 'Pi Wordle', difficulty: 'Medium', free: true },
        { id: 'logic-flow', name: 'Logic Flow', difficulty: 'Hard', free: false },
        { id: 'match-3', name: 'Match 3', difficulty: 'Easy', free: true },
        { id: 'tile-flipper', name: 'Tile Flipper', difficulty: 'Medium', free: true },
        { id: 'sequence-grid', name: 'Sequence Grid', difficulty: 'Hard', free: false },
        { id: 'number-maze', name: 'Number Maze', difficulty: 'Medium', free: true },
        { id: 'block-connect', name: 'Block Connect', difficulty: 'Hard', free: false },
        { id: 'color-merge', name: 'Color Merge', difficulty: 'Easy', free: true }
      ]
    },
    action: {
      name: "Action & Reflex",
      icon: RocketIcon,
      color: "bg-red-500",
      games: [
        { id: 'droplink-runner', name: 'Droplink Runner', difficulty: 'Medium', free: true },
        { id: 'tap-the-drop', name: 'Tap the Drop', difficulty: 'Easy', free: true },
        { id: 'jump-catch', name: 'Jump & Catch', difficulty: 'Medium', free: true },
        { id: 'avoid-spike', name: 'Avoid the Spike', difficulty: 'Hard', free: false },
        { id: 'pi-dash', name: 'Pi Dash', difficulty: 'Medium', free: true },
        { id: 'reflex-taps', name: 'Reflex Taps', difficulty: 'Easy', free: true },
        { id: 'speed-dodger', name: 'Speed Dodger', difficulty: 'Hard', free: false },
        { id: 'pi-jumper', name: 'Pi Jumper', difficulty: 'Medium', free: true },
        { id: 'side-dash', name: 'Side Dash', difficulty: 'Easy', free: true },
        { id: 'swipe-attack', name: 'Swipe Attack', difficulty: 'Hard', free: false }
      ]
    },
    trivia: {
      name: "Trivia & Quiz",
      icon: BrainIcon,
      color: "bg-green-500",
      games: [
        { id: 'pi-trivia-tower', name: 'Pi Trivia Tower', difficulty: 'Medium', free: true },
        { id: 'emoji-quiz', name: 'Emoji Quiz', difficulty: 'Easy', free: true },
        { id: 'fact-or-fake', name: 'Fact or Fake', difficulty: 'Medium', free: true },
        { id: 'typing-speed', name: 'Typing Speed Test', difficulty: 'Easy', free: true },
        { id: 'knowledge-rush', name: 'General Knowledge Rush', difficulty: 'Hard', free: false },
        { id: 'time-quiz', name: 'Time Quiz', difficulty: 'Medium', free: true },
        { id: 'category-frenzy', name: 'Category Frenzy', difficulty: 'Hard', free: false },
        { id: 'true-false', name: 'True or False', difficulty: 'Easy', free: true },
        { id: 'pi-quiz-duel', name: 'Pi Quiz Duel', difficulty: 'Hard', free: false },
        { id: 'one-word-answer', name: 'One-Word Answer', difficulty: 'Medium', free: true }
      ]
    },
    creative: {
      name: "Creative & Fun",
      icon: PaletteIcon,
      color: "bg-purple-500",
      games: [
        { id: 'droplink-dress-up', name: 'Droplink Dress Up', difficulty: 'Easy', free: true },
        { id: 'paint-pi', name: 'Paint Pi', difficulty: 'Easy', free: true },
        { id: 'mascot-builder', name: 'Mascot Builder', difficulty: 'Medium', free: true },
        { id: 'fortune-teller', name: 'Fortune Teller', difficulty: 'Easy', free: true },
        { id: 'design-badge', name: 'Design the Badge', difficulty: 'Medium', free: false },
        { id: 'pixel-painter', name: 'Pixel Painter', difficulty: 'Medium', free: true },
        { id: 'pi-puzzle-art', name: 'Pi Puzzle Art', difficulty: 'Hard', free: false },
        { id: 'avatar-maker', name: 'Avatar Maker', difficulty: 'Easy', free: true },
        { id: 'pi-memoji', name: 'Pi Memoji', difficulty: 'Medium', free: false },
        { id: 'doodle-drop', name: 'Doodle Drop', difficulty: 'Easy', free: true }
      ]
    },
    infinite: {
      name: "Infinite Games",
      icon: InfinityIcon,
      color: "bg-orange-500",
      games: [
        { id: 'infinite-quiz', name: 'Infinite Quiz', difficulty: 'Easy', free: true },
        { id: 'endless-memory', name: 'Endless Memory Match', difficulty: 'Medium', free: true },
        { id: 'pattern-repeat', name: 'Pattern Repeat', difficulty: 'Medium', free: true },
        { id: 'pi-galaxy-shooter', name: 'Pi Galaxy Shooter', difficulty: 'Hard', free: false },
        { id: 'typing-chain', name: 'Typing Chain', difficulty: 'Easy', free: true },
        { id: 'survival-reflex', name: 'Survival Reflex', difficulty: 'Hard', free: false },
        { id: 'infinite-flow', name: 'Infinite Flow', difficulty: 'Medium', free: true },
        { id: 'brain-cycle', name: 'Brain Cycle', difficulty: 'Hard', free: false },
        { id: 'rapid-clicker', name: 'Rapid Clicker', difficulty: 'Easy', free: true },
        { id: 'loop-logic', name: 'Loop the Logic', difficulty: 'Medium', free: true }
      ]
    }
  };

  // Paid games with Pi pricing
  const paidGames = [
    { id: 'pi-chess', name: 'Pi Chess', price: 1, memo: 'Purchase: Pi Chess' },
    { id: 'droplink-dash-extreme', name: 'Droplink Dash Extreme', price: 0.5, memo: 'Purchase: Dash Extreme' },
    { id: 'puzzle-builder-pro', name: 'Puzzle Builder Pro', price: 0.75, memo: 'Purchase: Puzzle Builder' },
    { id: 'build-a-mascot', name: 'Build-a-Mascot', price: 0.75, memo: 'Purchase: Build Mascot' }
  ];

  const renderMascotEyes = (type) => {
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

  const renderMascotMouth = (type) => {
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

  const handleGameClick = (game, category) => {
    if (!game.free && userPlan === 'free') {
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

  const handlePurchaseGame = (game) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase games.",
        variant: "destructive",
      });
      return;
    }

    // Mock Pi payment
    toast({
      title: "Purchase Initiated",
      description: `Processing ${game.price} Pi payment for ${game.name}...`,
    });

    // Simulate successful purchase
    setTimeout(() => {
      setPurchasedGames([...purchasedGames, game.id]);
      toast({
        title: "Purchase Successful!",
        description: `You now own ${game.name}!`,
      });
    }, 2000);
  };

  const handleUpgradeToPremium = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to upgrade to Premium.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Premium Upgrade",
      description: "Processing 10 Pi payment for Premium Game Pass...",
    });

    // Simulate successful premium upgrade
    setTimeout(() => {
      setUserPlan('premium');
      toast({
        title: "Welcome to Premium!",
        description: "All games are now unlocked!",
      });
    }, 2000);
  };

  const renderGameCard = (game, categoryKey) => {
    const category = gameCategories[categoryKey];
    const isLocked = !game.free && userPlan === 'free' && !purchasedGames.includes(game.id);
    const isPaid = paidGames.find(p => p.id === game.id);

    return (
      <Card key={game.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{game.name}</CardTitle>
            {isLocked && <LockIcon className="w-4 h-4 text-gray-400" />}
            {userPlan === 'premium' && <CrownIcon className="w-4 h-4 text-yellow-500" />}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={game.difficulty === 'Easy' ? 'default' : game.difficulty === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
              {game.difficulty}
            </Badge>
            {isPaid && (
              <Badge variant="outline" className="text-xs">
                {isPaid.price} Pi
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            {isLocked ? (
              isPaid ? (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handlePurchaseGame(isPaid)}
                >
                  <CoinsIcon className="w-3 h-3 mr-1" />
                  Buy {isPaid.price} Pi
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleUpgradeToPremium}
                >
                  <CrownIcon className="w-3 h-3 mr-1" />
                  Premium
                </Button>
              )
            ) : (
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => handleGameClick(game, categoryKey)}
              >
                <PlayIcon className="w-3 h-3 mr-1" />
                Play
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

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
              50+ interactive games and activities with Pi Network integration
            </p>
            
            {/* Score & Status Display */}
            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Score: {totalScore}
              </Badge>
              <Badge variant={userPlan === 'premium' ? 'default' : 'outline'} className="text-lg px-4 py-2">
                {userPlan === 'premium' ? <CrownIcon className="w-5 h-5 mr-2" /> : <StarIcon className="w-5 h-5 mr-2" />}
                {userPlan === 'premium' ? 'Premium' : 'Free Plan'}
              </Badge>
            </div>

            {/* Premium CTA for Free Users */}
            {userPlan === 'free' && (
              <Card className="max-w-md mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <CrownIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-800 mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-yellow-700 mb-3">Unlock all 50+ games, remove ads, and get exclusive features!</p>
                  <Button onClick={handleUpgradeToPremium} className="bg-yellow-600 hover:bg-yellow-700">
                    <CoinsIcon className="w-4 h-4 mr-2" />
                    Upgrade for 10 Pi
                  </Button>
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

                  {/* Emotion Buttons */}
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {emotions.slice(0, 10).map((emotion, index) => (
                      <Button
                        key={emotion.name}
                        variant={currentEmotion === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentEmotion(index)}
                        className="text-xs"
                      >
                        {emotion.name}
                      </Button>
                    ))}
                  </div>
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
                          {category.games.map(game => renderGameCard(game, key))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Paid Games Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CoinsIcon className="w-6 h-6" />
                    Premium One-Time Purchase Games
                  </CardTitle>
                  <CardDescription>
                    Special premium games available for individual purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paidGames.map(game => (
                      <Card key={game.id} className="border-yellow-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">{game.name}</CardTitle>
                          <Badge variant="secondary" className="w-fit">
                            {game.price} Pi
                          </Badge>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {purchasedGames.includes(game.id) ? (
                            <Button size="sm" variant="outline" className="w-full" disabled>
                              <StarIcon className="w-3 h-3 mr-1" />
                              Owned
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handlePurchaseGame(game)}
                            >
                              <CoinsIcon className="w-3 h-3 mr-1" />
                              Buy for {game.price} Pi
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
          
          @keyframes gentle-blink {
            0%, 85%, 100% { opacity: 1; }
            90%, 95% { opacity: 0.1; }
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
          
          .animate-gentle-blink {
            animation: gentle-blink 6s ease-in-out infinite;
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
