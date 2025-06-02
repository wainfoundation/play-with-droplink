
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface WalletState {
  dropletCoins: number;
  piBalance: number;
  totalEarned: number;
  lastClaimTime: number;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    dropletCoins: 100,
    piBalance: 0,
    totalEarned: 100,
    lastClaimTime: 0
  });

  // Load from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('droplet_wallet');
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet));
      } catch (error) {
        console.log('Error loading wallet');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('droplet_wallet', JSON.stringify(wallet));
  }, [wallet]);

  const addCoins = useCallback((amount: number, source: string = 'manual') => {
    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins + amount,
      totalEarned: prev.totalEarned + amount
    }));

    toast({
      title: `Earned ${amount} coins! 💰`,
      description: `Source: ${source}`,
      className: "bg-yellow-50 border-yellow-200"
    });
  }, []);

  const spendCoins = useCallback((amount: number) => {
    if (wallet.dropletCoins < amount) {
      toast({
        title: "Not enough coins! 💸",
        description: `You need ${amount} coins but only have ${wallet.dropletCoins}`,
        variant: "destructive"
      });
      return false;
    }

    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins - amount
    }));

    return true;
  }, [wallet.dropletCoins]);

  const claimDailyCoins = useCallback((petLevel: number = 1) => {
    const now = Date.now();
    const lastClaim = wallet.lastClaimTime;
    const timeDiff = now - lastClaim;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay) {
      return 0;
    }

    const baseReward = 50;
    const levelBonus = petLevel * 10;
    const totalReward = baseReward + levelBonus;

    setWallet(prev => ({
      ...prev,
      dropletCoins: prev.dropletCoins + totalReward,
      totalEarned: prev.totalEarned + totalReward,
      lastClaimTime: now
    }));

    return totalReward;
  }, [wallet.lastClaimTime]);

  const canClaimDailyCoins = useCallback(() => {
    const now = Date.now();
    const lastClaim = wallet.lastClaimTime;
    const timeDiff = now - lastClaim;
    const oneDay = 24 * 60 * 60 * 1000;
    return timeDiff >= oneDay;
  }, [wallet.lastClaimTime]);

  return {
    wallet,
    addCoins,
    spendCoins,
    claimDailyCoins,
    canClaimDailyCoins
  };
};
