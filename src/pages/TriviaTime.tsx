
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { piAdService, showRewardedAd } from '@/services/piAdService';
import { usePiPayment } from '@/hooks/usePiPayment';
import { useTriviaGame } from '@/hooks/useTriviaGame';
import TriviaHomeScreen from '@/components/trivia/TriviaHomeScreen';
import TriviaGameScreen from '@/components/trivia/TriviaGameScreen';
import TriviaModals from '@/components/trivia/TriviaModals';

const TriviaTime: React.FC = () => {
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { createPayment, loading: paymentLoading } = usePiPayment();
  
  const {
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
  } = useTriviaGame();

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
  }, [setUserStats]);

  // Show game over modal when lives reach 0
  useEffect(() => {
    if (gameState === 'gameOver') {
      setShowGameOverModal(true);
    }
  }, [gameState]);

  const handleWatchAd = async () => {
    const success = await showRewardedAd({
      type: 'pi',
      amount: 1,
      description: 'extra_life'
    });

    if (success) {
      setShowGameOverModal(false);
      setGameState('playing');
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

  const handlePayCoinsModal = (amount: number) => {
    handlePayCoins(amount);
    setShowGameOverModal(false);
  };

  const handleRestartGame = () => {
    setShowGameOverModal(false);
    restartGame();
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
      <>
        <TriviaHomeScreen
          userStats={userStats}
          onStartGame={startGame}
          onShowLeaderboard={setShowLeaderboard}
          onShowShop={setShowShop}
        />
        <TriviaModals
          showGameOverModal={showGameOverModal}
          showShop={showShop}
          showLeaderboard={showLeaderboard}
          userStats={userStats}
          paymentLoading={paymentLoading}
          onSetShowGameOverModal={setShowGameOverModal}
          onSetShowShop={setShowShop}
          onSetShowLeaderboard={setShowLeaderboard}
          onWatchAd={handleWatchAd}
          onPayPi={handlePayPi}
          onPayCoins={handlePayCoinsModal}
          onRestartGame={handleRestartGame}
          onBuyCoins={buyCoins}
        />
      </>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    return (
      <>
        <TriviaGameScreen
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          isCorrect={isCorrect}
          timeLeft={timeLeft}
          userStats={userStats}
          questionIndex={questionIndex}
          onAnswerSelect={handleAnswerSelect}
          onAnswerSubmit={handleAnswerSubmit}
        />
        <TriviaModals
          showGameOverModal={showGameOverModal}
          showShop={showShop}
          showLeaderboard={showLeaderboard}
          userStats={userStats}
          paymentLoading={paymentLoading}
          onSetShowGameOverModal={setShowGameOverModal}
          onSetShowShop={setShowShop}
          onSetShowLeaderboard={setShowLeaderboard}
          onWatchAd={handleWatchAd}
          onPayPi={handlePayPi}
          onPayCoins={handlePayCoinsModal}
          onRestartGame={handleRestartGame}
          onBuyCoins={buyCoins}
        />
      </>
    );
  }

  return null;
};

export default TriviaTime;
