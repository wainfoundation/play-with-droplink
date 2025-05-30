
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ForumReply {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  is_solution: boolean;
  created_at: string;
  user_email?: string;
}

export const useForumReplies = (topicId: string) => {
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topicId) {
      fetchReplies();
    }
  }, [topicId]);

  const fetchReplies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching replies:', err);
    } finally {
      setLoading(false);
    }
  };

  const createReply = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('forum_replies')
        .insert({
          topic_id: topicId,
          user_id: user.id,
          content
        })
        .select()
        .single();

      if (error) throw error;
      await fetchReplies();
      return data;
    } catch (err) {
      throw err;
    }
  };

  return { replies, loading, error, createReply, refetch: fetchReplies };
};
