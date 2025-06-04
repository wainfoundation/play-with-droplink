
import { useState, useEffect } from 'react';
import { usePiPayment } from '@/hooks/usePiPayment';
import { useWallet } from '@/hooks/useWallet';

export interface CoinPack {
  id: string;
  coins_given: number;
  pi_cost: number;
  bonus_percentage: number;
  description: string;
  is_active: boolean;
}

export const useShopItems = () => {
  const [coinPacks, setCoinPacks] = useState<CoinPack[]>([]);
  const [loading, setLoading] = useState(false);
  const { createPayment } = usePiPayment();
  const { addCoins } = useWallet();

  // Mock coin packs data - in real app this would come from Supabase
  useEffect(() => {
    const mockCoinPacks: CoinPack[] = [
      {
        id: 'cp_small',
        coins_given: 10,
        pi_cost: 1,
        bonus_percentage: 0,
        description: 'Starter Pack',
        is_active: true
      },
      {
        id: 'cp_medium',
        coins_given: 100,
        pi_cost: 10,
        bonus_percentage: 10,
        description: 'Popular Pack',
        is_active: true
      },
      {
        id: 'cp_large',
        coins_given: 300,
        pi_cost: 25,
        bonus_percentage: 20,
        description: 'Value Pack',
        is_active: true
      },
      {
        id: 'cp_premium',
        coins_given: 1000,
        pi_cost: 75,
        bonus_percentage: 35,
        description: 'Premium Pack',
        is_active: true
      }
    ];
    setCoinPacks(mockCoinPacks);
  }, []);

  const buyCoinPack = async (pack: CoinPack) => {
    setLoading(true);
    try {
      await createPayment({
        amount: pack.pi_cost,
        memo: `Purchase ${pack.description}`,
        metadata: { 
          type: 'coin_pack',
          packId: pack.id,
          coins: pack.coins_given,
          bonus: pack.bonus_percentage
        }
      });

      // In a real implementation, coins would be added after payment verification
      // For now, simulate successful purchase
      const totalCoins = pack.coins_given + Math.floor(pack.coins_given * pack.bonus_percentage / 100);
      addCoins(totalCoins, `Purchased ${pack.description}`);
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    coinPacks,
    buyCoinPack,
    loading
  };
};
