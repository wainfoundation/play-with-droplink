
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  excerpt: string | null;
  read_time: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useHelpArticles = () => {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('help_articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error('Error fetching help articles:', err);
      setError('Failed to fetch help articles');
    } finally {
      setLoading(false);
    }
  };

  const getArticleBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('help_articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching article:', err);
      return null;
    }
  };

  const getArticlesByCategory = (category: string) => {
    return articles.filter(article => article.category === category);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    getArticleBySlug,
    getArticlesByCategory,
    refetch: fetchArticles,
  };
};
