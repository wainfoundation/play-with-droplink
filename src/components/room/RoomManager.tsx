import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  HomeIcon,
  SettingsIcon,
  PlusIcon,
  TrashIcon,
  EditIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface Room {
  id: string;
  name: string;
  background_theme: string;
  furniture: any[];
  decorations: any[];
  created_at: string;
  updated_at: string;
}

interface RoomManagerProps {
  soundEnabled: boolean;
}

const RoomManager: React.FC<RoomManagerProps> = ({ soundEnabled }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchRooms();
    }
  }, [user]);

  const fetchRooms = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!user?.id || !newRoomName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('rooms')
        .insert([{
          user_id: user.id,
          name: newRoomName.trim(),
          background_theme: 'default',
          furniture: [],
          decorations: []
        }])
        .select()
        .single();

      if (error) throw error;

      setRooms(prev => [...prev, data]);
      setNewRoomName('');
      toast({
        title: "Room Created!",
        description: `${data.name} has been created.`
      });
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Error",
        description: "Failed to create room",
        variant: "destructive"
      });
    }
  };

  const updateRoom = async (roomId: string, updates: Partial<Room>) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update(updates)
        .eq('id', roomId);

      if (error) throw error;

      setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, ...updates } : room
      ));
      
      toast({
        title: "Room Updated!",
        description: "Your room has been updated."
      });
    } catch (error) {
      console.error('Error updating room:', error);
      toast({
        title: "Error",
        description: "Failed to update room",
        variant: "destructive"
      });
    }
  };

  const deleteRoom = async (roomId: string) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      setRooms(prev => prev.filter(room => room.id !== roomId));
      toast({
        title: "Room Deleted",
        description: "The room has been deleted."
      });
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: "Error",
        description: "Failed to delete room",
        variant: "destructive"
      });
    }
  };

  const themes = [
    { id: 'default', name: 'Default', color: '#f0f0f0' },
    { id: 'cozy', name: 'Cozy', color: '#8B4513' },
    { id: 'modern', name: 'Modern', color: '#2C3E50' },
    { id: 'beach', name: 'Beach', color: '#87CEEB' },
    { id: 'space', name: 'Space', color: '#191970' },
    { id: 'garden', name: 'Garden', color: '#228B22' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <HomeIcon className="w-8 h-8" />
          My Rooms
        </h2>
        <p className="text-gray-600">Create and customize your character's living spaces!</p>
      </div>

      {/* Create New Room */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Create New Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter room name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createRoom()}
            />
            <Button onClick={createRoom} disabled={!newRoomName.trim()}>
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map(room => (
          <Card key={room.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <HomeIcon className="w-5 h-5" />
                    {room.name}
                  </CardTitle>
                  <CardDescription>
                    Theme: {themes.find(t => t.id === room.background_theme)?.name || 'Default'}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingRoom(editingRoom === room.id ? null : room.id)}
                  >
                    <EditIcon className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteRoom(room.id)}
                  >
                    <TrashIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Room Preview */}
              <div 
                className="h-32 rounded-lg border-2 border-dashed border-gray-300 mb-4 flex items-center justify-center"
                style={{ backgroundColor: themes.find(t => t.id === room.background_theme)?.color || '#f0f0f0' }}
              >
                <span className="text-gray-600">Room Preview</span>
              </div>

              {editingRoom === room.id && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Background Theme</label>
                    <div className="grid grid-cols-3 gap-2">
                      {themes.map(theme => (
                        <Button
                          key={theme.id}
                          size="sm"
                          variant={room.background_theme === theme.id ? "default" : "outline"}
                          onClick={() => updateRoom(room.id, { background_theme: theme.id })}
                          className="flex items-center gap-2"
                        >
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: theme.color }}
                          />
                          {theme.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-500">
                <span>Furniture: {room.furniture?.length || 0}</span>
                <span>Decorations: {room.decorations?.length || 0}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <HomeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Rooms Yet</h3>
            <p className="text-gray-600 mb-4">Create your first room to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomManager;
