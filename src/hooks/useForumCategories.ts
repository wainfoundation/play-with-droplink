
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
  topic_count?: number;
  latest_activity?: string;
}

export const useForumCategories = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_categories')
        .select(`
          *,
          forum_topics!inner(count)
        `)
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;

      const categoriesWithCounts = data.map(category => ({
        ...category,
        topic_count: category.forum_topics?.length || 0,
        latest_activity: '2 hours ago' // This would be calculated from actual data
      }));

      setCategories(categoriesWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};
