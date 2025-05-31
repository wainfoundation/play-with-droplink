
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface Room {
  id: string;
  name: string;
  background_theme: string;
  furniture: any[];
  decorations: any[];
  created_at: string;
  updated_at: string;
}

export const useRooms = () => {
  const { user } = useUser();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchRooms();
    } else {
      setRooms([]);
      setLoading(false);
    }
  }, [user]);

  const fetchRooms = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await (supabase as any)
        .from('rooms')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at');

      if (error) throw error;
      setRooms(data || []);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (name: string) => {
    if (!user?.id) throw new Error('User not logged in');

    try {
      const { data, error } = await (supabase as any)
        .from('rooms')
        .insert([{
          user_id: user.id,
          name: name.trim(),
          background_theme: 'default',
          furniture: [],
          decorations: []
        }])
        .select()
        .single();

      if (error) throw error;

      setRooms(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error creating room:', err);
      throw err;
    }
  };

  const updateRoom = async (roomId: string, updates: Partial<Room>) => {
    try {
      const { error } = await (supabase as any)
        .from('rooms')
        .update(updates)
        .eq('id', roomId);

      if (error) throw error;

      setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, ...updates } : room
      ));
    } catch (err) {
      console.error('Error updating room:', err);
      throw err;
    }
  };

  const deleteRoom = async (roomId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      setRooms(prev => prev.filter(room => room.id !== roomId));
    } catch (err) {
      console.error('Error deleting room:', err);
      throw err;
    }
  };

  return {
    rooms,
    loading,
    error,
    createRoom,
    updateRoom,
    deleteRoom,
    refetch: fetchRooms
  };
};
