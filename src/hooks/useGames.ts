
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Game {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  is_free: boolean;
  price_pi: number;
  description?: string;
  thumbnail_url?: string;
  created_at?: string;
}

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('name');

        if (error) throw error;
        setGames(data || []);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};
