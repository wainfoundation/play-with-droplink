
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  description: string;
  amount: number;
  time: string;
}

export const useWallet = () => {
  const { user } = useAuthSystem();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch wallet data
  const fetchWalletData = async () => {
    if (!user) return;

    try {
      const { data: walletData, error } = await supabase
        .from('user_wallet')
        .select('droplet_coins')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching wallet:', error);
        return;
      }

      setBalance(walletData?.droplet_coins || 0);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [user]);

  const addCoins = async (amount: number, source: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('add_droplet_coins', {
        p_user_id: user.id,
        p_coins_to_add: amount
      });

      if (error) {
        console.error('Error adding coins:', error);
        return;
      }

      // Refresh wallet data
      await fetchWalletData();

      // Add mock transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'earn',
        description: source,
        amount: amount,
        time: 'just now'
      };

      setTransactions(prev => [newTransaction, ...prev]);

    } catch (error) {
      console.error('Error adding coins:', error);
    }
  };

  const spendCoins = async (amount: number, description: string) => {
    if (!user) return false;

    if (balance < amount) {
      toast({
        title: "Insufficient Coins",
        description: "You don't have enough coins for this purchase",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Update wallet balance
      const { error } = await supabase
        .from('user_wallet')
        .update({ 
          droplet_coins: balance - amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error spending coins:', error);
        return false;
      }

      // Update local state
      setBalance(prev => prev - amount);

      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'spend',
        description: description,
        amount: -amount,
        time: 'just now'
      };

      setTransactions(prev => [newTransaction, ...prev]);

      return true;
    } catch (error) {
      console.error('Error spending coins:', error);
      return false;
    }
  };

  return {
    balance,
    transactions,
    loading,
    addCoins,
    spendCoins,
    refreshWallet: fetchWalletData
  };
};
