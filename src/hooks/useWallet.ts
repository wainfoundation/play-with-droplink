
import { useState, useEffect, useCallback } from 'react';

export interface WalletState {
  dropletCoins: number;
  piBalance: number;
  lastCoinClaim: number;
  totalEarned: number;
}

const DEFAULT_WALLET: WalletState = {
  dropletCoins: 50, // Starting coins
  piBalance: 0,
  lastCoinClaim: 0,
  totalEarned: 0
};

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>(DEFAULT_WALLET);

  // Load wallet from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('petWallet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWallet(parsed);
      } catch (error) {
        console.log('Error loading wallet, using default');
      }
    }
  }, []);

  // Save wallet to localStorage
  const saveWallet = useCallback((newWallet: WalletState) => {
    localStorage.setItem('petWallet', JSON.stringify(newWallet));
    setWallet(newWallet);
  }, []);

  // Add coins from various sources
  const addCoins = useCallback((amount: number, source: 'ad' | 'daily' | 'purchase' | 'levelup') => {
    setWallet(prev => {
      const newWallet = {
        ...prev,
        dropletCoins: prev.dropletCoins + amount,
        totalEarned: prev.totalEarned + amount
      };
      saveWallet(newWallet);
      return newWallet;
    });
  }, [saveWallet]);

  // Spend coins for purchases
  const spendCoins = useCallback((amount: number) => {
    if (wallet.dropletCoins < amount) return false;
    
    setWallet(prev => {
      const newWallet = {
        ...prev,
        dropletCoins: prev.dropletCoins - amount
      };
      saveWallet(newWallet);
      return newWallet;
    });
    return true;
  }, [wallet.dropletCoins, saveWallet]);

  // Check if daily coins can be claimed
  const canClaimDailyCoins = useCallback(() => {
    const now = Date.now();
    const lastClaim = wallet.lastCoinClaim;
    const oneDayMs = 24 * 60 * 60 * 1000;
    return now - lastClaim >= oneDayMs;
  }, [wallet.lastCoinClaim]);

  // Claim daily coins based on pet level
  const claimDailyCoins = useCallback((petLevel: number) => {
    if (!canClaimDailyCoins()) return false;

    const coinsToAdd = Math.max(1, petLevel * 2); // Level-based daily reward
    setWallet(prev => {
      const newWallet = {
        ...prev,
        dropletCoins: prev.dropletCoins + coinsToAdd,
        lastCoinClaim: Date.now(),
        totalEarned: prev.totalEarned + coinsToAdd
      };
      saveWallet(newWallet);
      return newWallet;
    });
    return coinsToAdd;
  }, [canClaimDailyCoins, saveWallet]);

  // Buy coins with Pi (simulation)
  const buyCoinsWithPi = useCallback((piAmount: number) => {
    const coinsToAdd = piAmount * 10; // 1 Pi = 10 Droplet Coins
    addCoins(coinsToAdd, 'purchase');
    return coinsToAdd;
  }, [addCoins]);

  return {
    wallet,
    addCoins,
    spendCoins,
    canClaimDailyCoins,
    claimDailyCoins,
    buyCoinsWithPi
  };
};
