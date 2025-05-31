
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  SwordsIcon,
  UserIcon,
  TrophyIcon,
  PlayIcon,
  UsersIcon,
  ClockIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface Battle {
  id: string;
  player1_id: string;
  player2_id: string | null;
  game_type: string;
  status: string;
  winner_id: string | null;
  player1_score: number;
  player2_score: number;
  room_code: string | null;
  created_at: string;
}

interface BattleManagerProps {
  soundEnabled: boolean;
  onStartBattle: (battle: Battle) => void;
}

const BattleManager: React.FC<BattleManagerProps> = ({ soundEnabled, onStartBattle }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const [selectedGameType, setSelectedGameType] = useState('quiz');

  const gameTypes = [
    { id: 'quiz', name: 'Quiz Battle', icon: '🧠' },
    { id: 'memory', name: 'Memory Match', icon: '🧩' },
    { id: 'reaction', name: 'Reaction Time', icon: '⚡' },
    { id: 'math', name: 'Math Challenge', icon: '🔢' }
  ];

  useEffect(() => {
    if (user?.id) {
      fetchBattles();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchBattles = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('battles')
        .select('*')
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBattles(data || []);
    } catch (error) {
      console.error('Error fetching battles:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('battles')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'battles' 
        }, 
        (payload) => {
          console.log('Battle update:', payload);
          fetchBattles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const createBattle = async () => {
    if (!user?.id) return;

    try {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { data, error } = await supabase
        .from('battles')
        .insert([{
          player1_id: user.id,
          game_type: selectedGameType,
          status: 'waiting',
          room_code: roomCode
        }])
        .select()
        .single();

      if (error) throw error;

      setBattles(prev => [data, ...prev]);
      toast({
        title: "Battle Created!",
        description: `Room code: ${roomCode}. Share this with your opponent!`
      });
    } catch (error) {
      console.error('Error creating battle:', error);
      toast({
        title: "Error",
        description: "Failed to create battle",
        variant: "destructive"
      });
    }
  };

  const joinBattle = async () => {
    if (!user?.id || !roomCode.trim()) return;

    try {
      const { data: existingBattle, error: fetchError } = await supabase
        .from('battles')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (fetchError) {
        toast({
          title: "Battle Not Found",
          description: "No waiting battle found with that room code",
          variant: "destructive"
        });
        return;
      }

      if (existingBattle.player1_id === user.id) {
        toast({
          title: "Cannot Join",
          description: "You cannot join your own battle",
          variant: "destructive"
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('battles')
        .update({
          player2_id: user.id,
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('id', existingBattle.id);

      if (updateError) throw updateError;

      setRoomCode('');
      toast({
        title: "Battle Joined!",
        description: "You've joined the battle. Get ready!"
      });

      // Start the battle
      onStartBattle({ ...existingBattle, player2_id: user.id, status: 'active' });
    } catch (error) {
      console.error('Error joining battle:', error);
      toast({
        title: "Error",
        description: "Failed to join battle",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
          <SwordsIcon className="w-8 h-8" />
          P2P Battles
        </h2>
        <p className="text-gray-600">Challenge other players in epic battles!</p>
      </div>

      {/* Create Battle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayIcon className="w-5 h-5" />
            Create Battle
          </CardTitle>
          <CardDescription>Start a new battle and invite others to join</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Game Type</label>
            <div className="grid grid-cols-2 gap-2">
              {gameTypes.map(type => (
                <Button
                  key={type.id}
                  variant={selectedGameType === type.id ? "default" : "outline"}
                  onClick={() => setSelectedGameType(type.id)}
                  className="flex items-center gap-2"
                >
                  <span>{type.icon}</span>
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={createBattle} className="w-full">
            Create Battle Room
          </Button>
        </CardContent>
      </Card>

      {/* Join Battle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            Join Battle
          </CardTitle>
          <CardDescription>Enter a room code to join an existing battle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter room code..."
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && joinBattle()}
            />
            <Button onClick={joinBattle} disabled={!roomCode.trim()}>
              Join
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Battle History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            Recent Battles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {battles.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No battles yet. Create your first battle!</p>
            ) : (
              battles.map(battle => (
                <div key={battle.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {gameTypes.find(t => t.id === battle.game_type)?.icon || '🎮'}
                    </div>
                    <div>
                      <div className="font-medium">
                        {gameTypes.find(t => t.id === battle.game_type)?.name || battle.game_type}
                      </div>
                      <div className="text-sm text-gray-500">
                        Room: {battle.room_code || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(battle.status)} text-white`}>
                      {battle.status}
                    </Badge>
                    {battle.status === 'completed' && battle.winner_id && (
                      <div className="flex items-center gap-1 text-sm">
                        <TrophyIcon className="w-4 h-4 text-yellow-500" />
                        {battle.winner_id === user?.id ? 'Won' : 'Lost'}
                      </div>
                    )}
                    {battle.status === 'active' && (
                      <Button size="sm" onClick={() => onStartBattle(battle)}>
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleManager;
