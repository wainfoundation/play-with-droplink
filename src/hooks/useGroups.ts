
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Group {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  is_private: boolean;
  max_members?: number;
  image_url?: string;
  category?: string;
  tags?: string[];
  is_active: boolean;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface GroupMembership {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'banned' | 'left';
  joined_at: string;
  expires_at?: string;
  payment_id?: string;
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPublicGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('is_active', true)
        .eq('is_private', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast({
        title: "Error",
        description: "Failed to load groups",
        variant: "destructive",
      });
    }
  };

  const fetchMyGroups = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_memberships!inner(
            role,
            status,
            joined_at
          )
        `)
        .eq('group_memberships.user_id', user.user.id)
        .eq('group_memberships.status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyGroups(data || []);
    } catch (error) {
      console.error('Error fetching my groups:', error);
    }
  };

  const createGroup = async (groupData: Partial<Group>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      if (!groupData.name) throw new Error('Group name is required');

      const { data, error } = await supabase
        .from('groups')
        .insert({
          name: groupData.name,
          description: groupData.description,
          price: groupData.price || 0,
          currency: groupData.currency || 'Pi',
          is_private: groupData.is_private || false,
          max_members: groupData.max_members,
          image_url: groupData.image_url,
          category: groupData.category,
          tags: groupData.tags,
          creator_id: user.user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin member
      await supabase
        .from('group_memberships')
        .insert({
          group_id: data.id,
          user_id: user.user.id,
          role: 'admin',
          status: 'active',
        });

      toast({
        title: "Success",
        description: "Group created successfully",
      });

      fetchMyGroups();
      return data;
    } catch (error) {
      console.error('Error creating group:', error);
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      });
      return null;
    }
  };

  const joinGroup = async (groupId: string, paymentId?: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_memberships')
        .insert({
          group_id: groupId,
          user_id: user.user.id,
          role: 'member',
          status: 'active',
          payment_id: paymentId,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Joined group successfully",
      });

      fetchMyGroups();
      return true;
    } catch (error) {
      console.error('Error joining group:', error);
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPublicGroups();
    fetchMyGroups();
    setLoading(false);
  }, []);

  return {
    groups,
    myGroups,
    loading,
    createGroup,
    joinGroup,
    refreshGroups: () => {
      fetchPublicGroups();
      fetchMyGroups();
    },
  };
};
