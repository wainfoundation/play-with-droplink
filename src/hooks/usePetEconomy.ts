
import { useState, useEffect } from 'react';

interface Wallet {
  dropletCoins: number;
  piEarned: number;
}

export const usePetEconomy = (characterId: string) => {
  const [wallet, setWallet] = useState<Wallet>({
    dropletCoins: 150,
    piEarned: 0,
  });

  const [dailyRewardAvailable, setDailyRewardAvailable] = useState(true);
  const [lastRewardClaim, setLastRewardClaim] = useState<string | null>(null);

  // Check for daily rewards
  useEffect(() => {
    const checkDailyReward = () => {
      const today = new Date().toDateString();
      const lastClaim = localStorage.getItem('lastDailyReward');
      
      if (!lastClaim || lastClaim !== today) {
        setDailyRewardAvailable(true);
      } else {
        setDailyRewardAvailable(false);
      }
    };

    checkDailyReward();
  }, []);

  const claimDailyReward = () => {
    if (dailyRewardAvailable) {
      const coinReward = 50 + Math.floor(Math.random() * 30); // 50-80 coins
      const piReward = Math.random() * 0.1; // 0-0.1 Pi

      setWallet(prev => ({
        dropletCoins: prev.dropletCoins + coinReward,
        piEarned: prev.piEarned + piReward,
      }));

      const today = new Date().toDateString();
      localStorage.setItem('lastDailyReward', today);
      setLastRewardClaim(today);
      setDailyRewardAvailable(false);

      return { coins: coinReward, pi: piReward };
    }
    return null;
  };

  const spendCoins = (amount: number): boolean => {
    if (wallet.dropletCoins >= amount) {
      setWallet(prev => ({
        ...prev,
        dropletCoins: prev.dropletCoins - amount,
      }));
      return true;
    }
    return false;
  };

  const earnCoins = (amount: number) => {
    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins + amount,
    }));
  };

  // Add alias for addCoins to maintain compatibility
  const addCoins = earnCoins;

  return {
    wallet,
    dailyRewardAvailable,
    claimDailyReward,
    spendCoins,
    earnCoins,
    addCoins,
  };
};
