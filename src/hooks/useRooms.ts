
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Room {
  id: string;
  name: string;
  description: string;
  room_type: string;
  background_color: string;
}

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return {
    rooms,
    loading
  };
};
