
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ForumTopic {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  reply_count: number;
  last_reply_at: string;
  created_at: string;
  user_profiles?: {
    username: string;
    avatar_url?: string;
  };
}

export const useForumTopics = (categoryId?: string) => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, [categoryId]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('forum_topics')
        .select(`
          *,
          user_profiles(username, avatar_url)
        `)
        .order('is_pinned', { ascending: false })
        .order('last_reply_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;

      setTopics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (topicData: {
    category_id: string;
    title: string;
    content: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('forum_topics')
        .insert({
          ...topicData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      await fetchTopics();
      return data;
    } catch (err) {
      throw err;
    }
  };

  return { topics, loading, error, createTopic, refetch: fetchTopics };
};
