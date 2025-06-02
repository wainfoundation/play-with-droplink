import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Coins, Star, Clock, Trophy, ShoppingCart, Play, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { playSoundEffect } from '@/utils/sounds';
import AuthGuard from '@/components/AuthGuard';
import { piAdService, showRewardedAd } from '@/services/piAdService';
import { usePiPayment } from '@/hooks/usePiPayment';

interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: string;
  difficulty: string;
}

interface UserStats {
  lives: number;
  coins: number;
  level: number;
  totalCorrect: number;
  currentStreak: number;
}

const SAMPLE_QUESTIONS: TriviaQuestion[] = [
  {
    id: '1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    answer: 'Mars',
    category: 'Science',
    difficulty: 'Easy'
  },
  {
    id: '2',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    answer: 'Paris',
    category: 'Geography',
    difficulty: 'Easy'
  },
  {
    id: '3',
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Monet'],
    answer: 'Da Vinci',
    category: 'Art',
    difficulty: 'Medium'
  },
  {
    id: '4',
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippo'],
    answer: 'Blue Whale',
    category: 'Biology',
    difficulty: 'Easy'
  },
  {
    id: '5',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    answer: '1945',
    category: 'History',
    difficulty: 'Medium'
  }
];

const TriviaTime: React.FC = () => {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'gameOver'>('home');
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [userStats, setUserStats] = useState<UserStats>({
    lives: 3,
    coins: 0,
    level: 1,
    totalCorrect: 0,
    currentStreak: 0
  });

  const isMobile = useIsMobile();
  const { createPayment, loading: paymentLoading } = usePiPayment();

  // Initialize Pi Ad Service
  useEffect(() => {
    piAdService.initialize({
      onReward: (reward) => {
        if (reward.type === 'pi' && reward.description === 'extra_life') {
          setUserStats(prev => ({ ...prev, lives: prev.lives + 1 }));
          toast({
            title: "Life Restored! ❤️",
            description: "You gained 1 life from watching the ad!",
          });
        }
      },
      onAdError: (error) => {
        toast({
          title: "Ad Error",
          description: "Unable to show ad. Try again later.",
          variant: "destructive"
        });
      },
      onAdNotSupported: () => {
        toast({
          title: "Ads Not Available",
          description: "Ads are not supported in your current browser.",
          variant: "destructive"
        });
      }
    });
  }, []);

  // Timer for questions
  useEffect(() => {
    if (gameState === 'playing' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswerSubmit();
    }
  }, [gameState, timeLeft, showResult]);

  const startGame = () => {
    setGameState('playing');
    setQuestionIndex(0);
    loadQuestion(0);
    setUserStats(prev => ({ ...prev, currentStreak: 0 }));
    playSoundEffect('newLevel', 0.6);
  };

  const loadQuestion = (index: number) => {
    if (index < SAMPLE_QUESTIONS.length) {
      setCurrentQuestion(SAMPLE_QUESTIONS[index]);
      setSelectedAnswer('');
      setShowResult(false);
      setTimeLeft(15);
    } else {
      // Cycle back to beginning for endless play
      setQuestionIndex(0);
      loadQuestion(0);
      setUserStats(prev => ({ ...prev, level: prev.level + 1 }));
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.answer || timeLeft === 0 ? false : selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSoundEffect('success', 0.7);
      const newStreak = userStats.currentStreak + 1;
      let coinsEarned = 1;
      
      // Bonus for streak
      if (newStreak === 5) {
        coinsEarned += 2;
        toast({
          title: "Streak Bonus! 🔥",
          description: "5 in a row! +2 bonus coins!",
        });
      }

      setUserStats(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        coins: prev.coins + coinsEarned,
        currentStreak: newStreak
      }));

      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        loadQuestion(nextIndex);
      }, 2000);
    } else {
      playSoundEffect('error', 0.5);
      const newLives = userStats.lives - 1;
      setUserStats(prev => ({
        ...prev,
        lives: newLives,
        currentStreak: 0
      }));

      if (newLives <= 0) {
        setTimeout(() => {
          setShowGameOverModal(true);
          setGameState('gameOver');
        }, 2000);
      } else {
        setTimeout(() => {
          const nextIndex = questionIndex + 1;
          setQuestionIndex(nextIndex);
          loadQuestion(nextIndex);
        }, 2000);
      }
    }
  };

  const handleWatchAd = async () => {
    const success = await showRewardedAd({
      type: 'pi',
      amount: 1,
      description: 'extra_life'
    });

    if (success) {
      setShowGameOverModal(false);
      setGameState('playing');
      loadQuestion(questionIndex);
    }
  };

  const handlePayPi = async () => {
    try {
      await createPayment({
        amount: 1,
        memo: "Continue Trivia Game - Refill Lives",
        metadata: { type: 'continue', action: 'refill_lives' }
      });

      setUserStats(prev => ({ ...prev, lives: 3 }));
      setShowGameOverModal(false);
      setGameState('playing');
      loadQuestion(questionIndex);

      toast({
        title: "Lives Restored! ❤️",
        description: "You now have 3 lives to continue playing!",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process Pi payment. Try again.",
        variant: "destructive"
      });
    }
  };

  const handlePayCoins = (amount: number) => {
    if (userStats.coins >= amount) {
      const livesToAdd = amount === 10 ? 3 : 1;
      setUserStats(prev => ({
        ...prev,
        coins: prev.coins - amount,
        lives: prev.lives + livesToAdd
      }));

      setShowGameOverModal(false);
      setGameState('playing');
      loadQuestion(questionIndex);

      toast({
        title: `${livesToAdd} Life${livesToAdd > 1 ? 's' : ''} Added! ❤️`,
        description: `Spent ${amount} coins to continue playing!`,
      });
    } else {
      toast({
        title: "Not Enough Coins",
        description: `You need ${amount} coins for this option.`,
        variant: "destructive"
      });
    }
  };

  const restartGame = () => {
    setUserStats(prev => ({ ...prev, lives: 3, level: 1, currentStreak: 0 }));
    setShowGameOverModal(false);
    startGame();
  };

  const buyCoins = async (coins: number, price: number) => {
    try {
      await createPayment({
        amount: price,
        memo: `Buy ${coins} Trivia Coins`,
        metadata: { type: 'coin_purchase', coins }
      });

      setUserStats(prev => ({ ...prev, coins: prev.coins + coins }));
      toast({
        title: "Coins Purchased! 🪙",
        description: `You received ${coins} coins!`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to process coin purchase.",
        variant: "destructive"
      });
    }
  };

  if (gameState === 'home') {
    return (
      <AuthGuard requireAuth={true}>
        <>
          <Helmet>
            <title>Trivia Time - Test Your Knowledge!</title>
            <meta name="description" content="Challenge yourself with endless trivia questions and earn Pi rewards!" />
          </Helmet>
          
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            <div className="container mx-auto max-w-2xl">
              {/* Header Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <div className="font-bold text-lg">{userStats.lives}</div>
                    <div className="text-sm text-gray-600">Lives</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <div className="font-bold text-lg">{userStats.coins}</div>
                    <div className="text-sm text-gray-600">Coins</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <div className="font-bold text-lg">{userStats.level}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </CardContent>
                </Card>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  🧠 Trivia Time
                </h1>
                <p className="text-gray-600 text-lg">Test your knowledge and earn Pi rewards!</p>
              </div>

              {/* Main Menu */}
              <div className="space-y-4">
                <Button
                  onClick={startGame}
                  size="lg"
                  className="w-full h-16 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Game
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setShowLeaderboard(true)}
                    variant="outline"
                    size="lg"
                    className="h-14"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Leaderboard
                  </Button>

                  <Button
                    onClick={() => setShowShop(true)}
                    variant="outline"
                    size="lg"
                    className="h-14"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Shop
                  </Button>
                </div>

                {/* Stats Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">My Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-bold text-2xl text-green-600">{userStats.totalCorrect}</div>
                        <div className="text-sm text-gray-600">Correct Answers</div>
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-blue-600">{userStats.currentStreak}</div>
                        <div className="text-sm text-gray-600">Current Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Shop Modal */}
          <Dialog open={showShop} onOpenChange={setShowShop}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>🛒 Coin Shop</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">10 Coins</span>
                      <Badge>1 Pi</Badge>
                    </div>
                    <Button
                      onClick={() => buyCoins(10, 1)}
                      disabled={paymentLoading}
                      className="w-full"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">50 Coins</span>
                      <Badge>4 Pi</Badge>
                    </div>
                    <Button
                      onClick={() => buyCoins(50, 4)}
                      disabled={paymentLoading}
                      className="w-full"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>

          {/* Leaderboard Modal */}
          <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>🏆 Leaderboard</DialogTitle>
              </DialogHeader>
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <p className="text-gray-600">Leaderboard coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Connect with other Pi Network trivia players
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      </AuthGuard>
    );
  }

  if (gameState === 'playing') {
    // Ensure we always have a valid question number for the title
    const safeQuestionNumber = typeof questionIndex === 'number' && questionIndex >= 0 ? questionIndex + 1 : 1;
    
    return (
      <AuthGuard requireAuth={true}>
        <>
          <Helmet>
            <title>{`Playing Trivia - Question ${safeQuestionNumber}`}</title>
          </Helmet>
          
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            <div className="container mx-auto max-w-2xl">
              {/* Game Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-bold">{userStats.lives}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">{userStats.coins}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-500" />
                    <span className="font-bold">L{userStats.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-lg">{timeLeft}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Progress value={(timeLeft / 15) * 100} className="h-2" />
              </div>

              {/* Question Card */}
              {currentQuestion && (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{currentQuestion.category}</Badge>
                      <Badge className={
                        currentQuestion.difficulty === 'Easy' ? 'bg-green-500' :
                        currentQuestion.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }>
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-relaxed">
                      {currentQuestion.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          className={`h-12 text-left justify-start ${
                            showResult && option === currentQuestion.answer
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : showResult && selectedAnswer === option && option !== currentQuestion.answer
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : ''
                          }`}
                        >
                          <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>

                    {!showResult && selectedAnswer && (
                      <Button
                        onClick={handleAnswerSubmit}
                        className="w-full mt-4"
                        size="lg"
                      >
                        Submit Answer
                      </Button>
                    )}

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center"
                      >
                        <div className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                        </div>
                        {isCorrect && (
                          <p className="text-green-600 mt-2">+1 coin earned!</p>
                        )}
                        {!isCorrect && (
                          <p className="text-red-600 mt-2">-1 life lost!</p>
                        )}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Streak Display */}
              {userStats.currentStreak > 0 && (
                <Card className="mb-4">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-orange-600">
                      🔥 {userStats.currentStreak} in a row!
                    </div>
                    {userStats.currentStreak === 4 && (
                      <p className="text-sm text-gray-600">One more for bonus coins!</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Game Over Modal */}
          <Dialog open={showGameOverModal} onOpenChange={() => {}}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">❌ Out of Lives!</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Choose how to continue:</p>
                </div>

                <Button
                  onClick={handleWatchAd}
                  className="w-full h-12 bg-green-600 hover:bg-green-700"
                >
                  📺 Watch Pi Ad (+1 Life)
                </Button>

                <Button
                  onClick={handlePayPi}
                  disabled={paymentLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                >
                  💎 Pay 1 Pi (Refill Lives)
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handlePayCoins(10)}
                    disabled={userStats.coins < 10}
                    variant="outline"
                    className="h-12"
                  >
                    🪙 10 Coins<br />
                    <span className="text-xs">(Refill Lives)</span>
                  </Button>

                  <Button
                    onClick={() => handlePayCoins(1)}
                    disabled={userStats.coins < 1}
                    variant="outline"
                    className="h-12"
                  >
                    🪙 1 Coin<br />
                    <span className="text-xs">(+1 Life)</span>
                  </Button>
                </div>

                <Button
                  onClick={restartGame}
                  variant="outline"
                  className="w-full h-12"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart from Level 1
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      </AuthGuard>
    );
  }

  return null;
};

export default TriviaTime;
