
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Eye } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LivesSystemProps {
  onLivesChange?: (lives: number) => void;
}

const LivesSystem: React.FC<LivesSystemProps> = ({ onLivesChange }) => {
  const { user } = useUser();
  const [lives, setLives] = useState(5);
  const [nextLifeTime, setNextLifeTime] = useState<Date | null>(null);
  const [timeUntilNextLife, setTimeUntilNextLife] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchUserLives();
    }
  }, [user?.id]);

  useEffect(() => {
    if (nextLifeTime) {
      const interval = setInterval(updateTimeDisplay, 1000);
      return () => clearInterval(interval);
    }
  }, [nextLifeTime]);

  const fetchUserLives = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('lives, last_life_regen')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const currentLives = data?.lives || 5;
      setLives(currentLives);
      onLivesChange?.(currentLives);

      // Calculate next life time if not at max
      if (currentLives < 5) {
        const lastRegen = new Date(data?.last_life_regen || Date.now());
        const nextLife = new Date(lastRegen.getTime() + 30 * 60 * 1000); // 30 minutes
        setNextLifeTime(nextLife);
      }
    } catch (error) {
      console.error('Error fetching lives:', error);
    }
  };

  const updateTimeDisplay = () => {
    if (!nextLifeTime) return;

    const now = new Date();
    const diff = nextLifeTime.getTime() - now.getTime();

    if (diff <= 0) {
      regenerateLife();
      return;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setTimeUntilNextLife(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  };

  const regenerateLife = async () => {
    if (!user?.id || lives >= 5) return;

    try {
      const { error } = await supabase.rpc('regenerate_life', { 
        user_id: user.id as any 
      });
      if (error) throw error;

      const newLives = Math.min(lives + 1, 5);
      setLives(newLives);
      onLivesChange?.(newLives);

      if (newLives < 5) {
        const nextLife = new Date(Date.now() + 30 * 60 * 1000);
        setNextLifeTime(nextLife);
      } else {
        setNextLifeTime(null);
        setTimeUntilNextLife('');
      }

      toast({
        title: "Life Regenerated! ❤️",
        description: "You're ready to play again!",
      });
    } catch (error) {
      console.error('Error regenerating life:', error);
    }
  };

  const watchAdForLife = async () => {
    if (!user?.id) return;

    try {
      // Simulate ad watching for now
      const { error } = await supabase.rpc('add_user_life', { 
        user_id: user.id as any 
      });
      if (error) throw error;

      const newLives = Math.min(lives + 1, 5);
      setLives(newLives);
      onLivesChange?.(newLives);

      toast({
        title: "Bonus Life Earned! 🎉",
        description: "Thanks for watching the ad!",
      });
    } catch (error) {
      console.error('Error watching ad for life:', error);
      toast({
        title: "Ad Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const useLives = async (amount: number = 1) => {
    if (!user?.id || lives < amount) return false;

    try {
      const { error } = await supabase.rpc('use_user_lives', { 
        user_id: user.id as any, 
        amount 
      });
      if (error) throw error;

      const newLives = lives - amount;
      setLives(newLives);
      onLivesChange?.(newLives);

      // Start regeneration timer if needed
      if (newLives < 5 && !nextLifeTime) {
        const nextLife = new Date(Date.now() + 30 * 60 * 1000);
        setNextLifeTime(nextLife);
      }

      return true;
    } catch (error) {
      console.error('Error using lives:', error);
      return false;
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-semibold">Lives: {lives}/5</span>
          </div>
          {nextLifeTime && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {timeUntilNextLife}
            </div>
          )}
        </div>

        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${
                i < lives 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {lives < 5 && (
          <div className="space-y-2">
            <Button 
              onClick={watchAdForLife}
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Watch Ad for Life
            </Button>
            {nextLifeTime && (
              <p className="text-xs text-center text-gray-600">
                Next life in {timeUntilNextLife}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { LivesSystem };
export default LivesSystem;
