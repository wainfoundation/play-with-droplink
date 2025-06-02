
import { useState, useEffect } from 'react';
import { TriviaQuestion, UserStats, GameState } from '@/types/trivia';
import { SAMPLE_QUESTIONS } from '@/data/triviaQuestions';
import { toast } from '@/hooks/use-toast';
import { playSoundEffect } from '@/utils/sounds';

export const useTriviaGame = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [userStats, setUserStats] = useState<UserStats>({
    lives: 3,
    coins: 0,
    level: 1,
    totalCorrect: 0,
    currentStreak: 0
  });

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

  const handlePayCoins = (amount: number) => {
    if (userStats.coins >= amount) {
      const livesToAdd = amount === 10 ? 3 : 1;
      setUserStats(prev => ({
        ...prev,
        coins: prev.coins - amount,
        lives: prev.lives + livesToAdd
      }));

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
    startGame();
  };

  return {
    gameState,
    currentQuestion,
    selectedAnswer,
    showResult,
    isCorrect,
    timeLeft,
    questionIndex,
    userStats,
    setUserStats,
    startGame,
    handleAnswerSelect,
    handleAnswerSubmit,
    handlePayCoins,
    restartGame,
    setGameState
  };
};
