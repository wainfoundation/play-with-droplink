
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLinks(userId: string | undefined) {
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLinks = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', userId)
        .order('position', { ascending: true });
      
      if (error) throw error;
      
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast({
        title: "Failed to load links",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [userId]);

  const handleReorderLink = async (direction: 'up' | 'down', linkId: string, currentPosition: number) => {
    // Find the link to swap positions with
    const targetLink = links.find(link => {
      if (direction === 'up') {
        return link.position < currentPosition;
      } else {
        return link.position > currentPosition;
      }
    });
    
    if (!targetLink) return;
    
    try {
      // Swap positions
      const updates = [
        { id: linkId, position: targetLink.position },
        { id: targetLink.id, position: currentPosition }
      ];
      
      // Update both links positions in a transaction
      for (const update of updates) {
        const { error } = await supabase
          .from('links')
          .update({ position: update.position })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      // Refresh links
      fetchLinks();
      
    } catch (error) {
      console.error("Error reordering links:", error);
      toast({
        title: "Error",
        description: "Failed to reorder links. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    links,
    isLoading,
    fetchLinks,
    handleReorderLink
  };
}
