
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePiPayment } from './usePiPayment';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface CoinPack {
  id: string;
  description: string;
  pi_cost: number;
  coins_given: number;
  bonus_percentage: number;
  is_popular?: boolean;
  is_best_value?: boolean;
  savings_percentage?: number;
}

export const useShopItems = () => {
  const [coinPacks, setCoinPacks] = useState<CoinPack[]>([]);
  const [loading, setLoading] = useState(true);
  const { buyCoinPack: processPiPayment } = usePiPayment();
  const { user } = useAuth();

  useEffect(() => {
    const loadCoinPacks = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('coin_packs')
          .select('*')
          .order('pi_cost', { ascending: true });
          
        if (error) throw error;
        setCoinPacks(data || []);
      } catch (error) {
        console.error('Error loading coin packs:', error);
        toast({
          title: "Error Loading Shop",
          description: "Could not load shop items. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCoinPacks();
  }, []);

  const buyCoinPack = async (pack: CoinPack) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase coins.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await processPiPayment(pack);
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
