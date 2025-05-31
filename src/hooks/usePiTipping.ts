
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePiTipping = () => {
  const [loading, setLoading] = useState(false);

  const sendTip = useCallback(async (
    toUserId: string,
    amount: number,
    message?: string
  ) => {
    try {
      setLoading(true);

      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Must be logged in to send tips');
      }

      // Create tip record using only fields that exist in the tips table
      const { data: tip, error: tipError } = await supabase
        .from('tips')
        .insert({
          from_user_id: user.id,
          to_user_id: toUserId,
          amount,
          message: message || null
        })
        .select()
        .single();

      if (tipError) throw tipError;

      toast({
        title: "Tip Sent!",
        description: `Successfully sent ${amount}π tip`,
      });

      return tip;
    } catch (error) {
      console.error('Error sending tip:', error);
      toast({
        title: "Error",
        description: "Failed to send tip",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTipsReceived = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tips')
        .select('*')
        .eq('to_user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching received tips:', error);
      return [];
    }
  }, []);

  const getTipsSent = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tips')
        .select('*')
        .eq('from_user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching sent tips:', error);
      return [];
    }
  }, []);

  const getTotalReceived = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tips')
        .select('amount')
        .eq('to_user_id', userId);

      if (error) throw error;
      
      const total = data?.reduce((sum, tip) => sum + (tip.amount || 0), 0) || 0;
      return total;
    } catch (error) {
      console.error('Error calculating total tips received:', error);
      return 0;
    }
  }, []);

  return {
    sendTip,
    getTipsReceived,
    getTipsSent,
    getTotalReceived,
    loading
  };
};
