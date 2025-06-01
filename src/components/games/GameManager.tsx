
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface GameStats {
  totalScore: number;
  gamesPlayed: number;
  level: number;
  piCoins: number;
  lives: number;
  boosts: number;
  achievements: string[];
  playTime: number;
}

interface GameManagerContextType {
  gameStats: GameStats;
  updateStats: (updates: Partial<GameStats>) => void;
  earnPiCoins: (amount: number, reason: string) => void;
  spendPiCoins: (amount: number, item: string) => boolean;
  addAchievement: (achievement: string) => void;
  resetGameStats: () => void;
}

const GameManagerContext = createContext<GameManagerContextType | undefined>(undefined);

const initialStats: GameStats = {
  totalScore: 0,
  gamesPlayed: 0,
  level: 1,
  piCoins: 0,
  lives: 5,
  boosts: 3,
  achievements: [],
  playTime: 0
};

export const GameManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameStats, setGameStats] = useState<GameStats>(initialStats);

  useEffect(() => {
    // Load saved stats
    const savedStats = localStorage.getItem('droplink-game-stats');
    if (savedStats) {
      try {
        setGameStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading game stats:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save stats whenever they change
    localStorage.setItem('droplink-game-stats', JSON.stringify(gameStats));
  }, [gameStats]);

  const updateStats = (updates: Partial<GameStats>) => {
    setGameStats(prev => ({ ...prev, ...updates }));
  };

  const earnPiCoins = (amount: number, reason: string) => {
    setGameStats(prev => ({ ...prev, piCoins: prev.piCoins + amount }));
    toast({
      title: "Pi Coins Earned!",
      description: `+${amount} Pi coins for ${reason}`,
    });
  };

  const spendPiCoins = (amount: number, item: string): boolean => {
    if (gameStats.piCoins >= amount) {
      setGameStats(prev => ({ ...prev, piCoins: prev.piCoins - amount }));
      toast({
        title: "Purchase Successful!",
        description: `Purchased ${item} for ${amount} Pi coins`,
      });
      return true;
    } else {
      toast({
        title: "Insufficient Pi Coins",
        description: `You need ${amount} Pi coins to purchase ${item}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const addAchievement = (achievement: string) => {
    if (!gameStats.achievements.includes(achievement)) {
      setGameStats(prev => ({ 
        ...prev, 
        achievements: [...prev.achievements, achievement] 
      }));
      toast({
        title: "Achievement Unlocked!",
        description: achievement,
      });
    }
  };

  const resetGameStats = () => {
    setGameStats(initialStats);
    localStorage.removeItem('droplink-game-stats');
  };

  return (
    <GameManagerContext.Provider value={{
      gameStats,
      updateStats,
      earnPiCoins,
      spendPiCoins,
      addAchievement,
      resetGameStats
    }}>
      {children}
    </GameManagerContext.Provider>
  );
};

export const useGameManager = () => {
  const context = useContext(GameManagerContext);
  if (context === undefined) {
    throw new Error('useGameManager must be used within a GameManagerProvider');
  }
  return context;
};
