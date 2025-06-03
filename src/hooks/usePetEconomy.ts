
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Wallet {
  id: string;
  user_id: string;
  droplet_coins: number;
  pi_balance: number;
  total_earned: number;
  last_coin_claim?: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  timestamp: string;
}

export const usePetEconomy = (characterId?: string) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWallet();
      fetchTransactions();
    }
  }, [user]);

  const fetchWallet = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_wallet')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No wallet found, create a new one
          const { data: newWallet, error: createError } = await supabase
            .from('user_wallet')
            .insert({
              user_id: user.id,
              droplet_coins: 50, // Starting coins
              pi_balance: 0,
              total_earned: 50
            })
            .select()
            .single();
            
          if (createError) throw createError;
          setWallet(newWallet);
        } else {
          throw error;
        }
      } else {
        setWallet(data);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      toast({
        title: "Error",
        description: "Could not fetch wallet information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      // This would need the appropriate table for transactions
      const { data, error } = await supabase
        .from('pi_payments')
        .select('id, amount, status, created_at, memo')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      // Transform to the transaction interface
      const formattedTransactions = data.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        type: 'earn',
        description: payment.memo || 'Pi payment',
        timestamp: payment.created_at
      }));
      
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addCoins = async (amount: number, description: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to perform this action.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      const { error } = await supabase.rpc(
        'add_droplet_coins',
        { p_user_id: user.id, p_coins_to_add: amount }
      );
        
      if (error) throw error;
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        droplet_coins: prev.droplet_coins + amount,
        total_earned: prev.total_earned + amount
      } : null);

      toast({
        title: "Coins Added",
        description: `+${amount} coins: ${description}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding coins:', error);
      toast({
        title: "Error",
        description: "Could not add coins to your wallet.",
        variant: "destructive",
      });
      return false;
    }
  };

  const spendCoins = async (amount: number, description: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to perform this action.",
        variant: "destructive",
      });
      return false;
    }

    if (!wallet || wallet.droplet_coins < amount) {
      toast({
        title: "Insufficient Coins",
        description: "You don't have enough coins for this action.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('user_wallet')
        .update({ 
          droplet_coins: wallet.droplet_coins - amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        droplet_coins: prev.droplet_coins - amount
      } : null);

      toast({
        title: "Coins Spent",
        description: `-${amount} coins: ${description}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error spending coins:', error);
      toast({
        title: "Error",
        description: "Could not process this purchase.",
        variant: "destructive",
      });
      return false;
    }
  };

  const claimDailyCoins = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to claim daily coins.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      const { data, error } = await supabase.rpc('claim_daily_reward', { 
        p_user_id: user.id 
      });
        
      if (error) throw error;
      
      if (!data.success) {
        toast({
          title: "Already Claimed",
          description: "You've already claimed your daily coins today.",
        });
        return false;
      }

      // Refresh wallet data
      fetchWallet();
      
      toast({
        title: "Daily Reward Claimed!",
        description: `You received ${data.coins} coins and ${data.xp} XP. Current streak: ${data.streak} days!`,
      });
      
      return true;
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      toast({
        title: "Error",
        description: "Could not claim your daily reward.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    wallet,
    transactions,
    loading,
    addCoins,
    spendCoins,
    claimDailyCoins,
    refreshWallet: fetchWallet
  };
};
