
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  reply_to_id?: string;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    username: string;
    display_name?: string;
    avatar_url?: string;
  };
}

export const useGroupChat = (groupId: string) => {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('group_messages')
        .select(`
          *,
          user_profiles (
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('group_id', groupId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const typedMessages = (data || []).map(msg => ({
        ...msg,
        message_type: msg.message_type as 'text' | 'image' | 'file' | 'system',
        user_profiles: msg.user_profiles && typeof msg.user_profiles === 'object' && !Array.isArray(msg.user_profiles) ? {
          username: (msg.user_profiles as any).username || '',
          display_name: (msg.user_profiles as any).display_name || undefined,
          avatar_url: (msg.user_profiles as any).avatar_url || undefined,
        } : undefined
      }));
      
      setMessages(typedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [groupId, toast]);

  const sendMessage = async (content: string, replyToId?: string) => {
    try {
      setSending(true);
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: user.user.id,
          content: content.trim(),
          reply_to_id: replyToId,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const editMessage = async (messageId: string, newContent: string) => {
    try {
      const { error } = await supabase
        .from('group_messages')
        .update({
          content: newContent.trim(),
          is_edited: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', messageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error editing message:', error);
      toast({
        title: "Error",
        description: "Failed to edit message",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('group_messages')
        .update({
          is_deleted: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', messageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!groupId) return;

    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel(`group-messages-${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'group_messages',
          filter: `group_id=eq.${groupId}`,
        },
        async (payload) => {
          // Fetch the complete message with user profile
          const { data, error } = await supabase
            .from('group_messages')
            .select(`
              *,
              user_profiles (
                username,
                display_name,
                avatar_url
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            const typedMessage: GroupMessage = {
              ...data,
              message_type: data.message_type as 'text' | 'image' | 'file' | 'system',
              user_profiles: data.user_profiles && typeof data.user_profiles === 'object' && !Array.isArray(data.user_profiles) ? {
                username: (data.user_profiles as any).username || '',
                display_name: (data.user_profiles as any).display_name || undefined,
                avatar_url: (data.user_profiles as any).avatar_url || undefined,
              } : undefined
            };
            setMessages(prev => [...prev, typedMessage]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'group_messages',
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === payload.new.id
                ? { 
                    ...msg, 
                    ...payload.new, 
                    message_type: payload.new.message_type as 'text' | 'image' | 'file' | 'system'
                  }
                : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, fetchMessages]);

  return {
    messages,
    loading,
    sending,
    sendMessage,
    editMessage,
    deleteMessage,
    refreshMessages: fetchMessages,
  };
};
