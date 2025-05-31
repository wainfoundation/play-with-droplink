
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface StoreItem {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  rarity: string;
  image_url?: string;
}

export const useStore = () => {
  const { user } = useUser();
  const [items, setItems] = useState<StoreItem[]>([]);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStoreItems();
    if (user?.id) {
      fetchUserPurchases();
    }
  }, [user]);

  const fetchStoreItems = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('store_items')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching store items:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch store items');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchases = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await (supabase as any)
        .from('user_purchases')
        .select('item_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserPurchases(data?.map((p: any) => p.item_id) || []);
    } catch (err) {
      console.error('Error fetching user purchases:', err);
    }
  };

  const purchaseItem = async (itemId: string, paymentMethod: 'pi' | 'ad') => {
    if (!user?.id) throw new Error('User not logged in');

    try {
      const { error } = await (supabase as any)
        .from('user_purchases')
        .insert([{
          user_id: user.id,
          item_id: itemId,
          payment_method: paymentMethod
        }]);

      if (error) throw error;

      // Update local state
      setUserPurchases(prev => [...prev, itemId]);
      return true;
    } catch (err) {
      console.error('Error purchasing item:', err);
      throw err;
    }
  };

  return {
    items,
    userPurchases,
    loading,
    error,
    purchaseItem,
    refetch: () => {
      fetchStoreItems();
      fetchUserPurchases();
    }
  };
};
