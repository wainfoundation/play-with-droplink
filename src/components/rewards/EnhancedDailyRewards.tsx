
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gift, Flame, Coins, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  claimed: boolean;
  isToday: boolean;
}

interface ClaimDailyRewardResponse {
  success: boolean;
  streak?: number;
  coins?: number;
  xp?: number;
}

const EnhancedDailyRewards: React.FC = () => {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [rewardData, setRewardData] = useState<ClaimDailyRewardResponse | null>(null);

  // Generate 7 days of rewards
  const generateRewards = (): DailyReward[] => {
    const today = new Date().getDay() || 7; // Make Sunday = 7
    
    return Array.from({ length: 7 }, (_, index) => {
      const day = index + 1;
      const baseCoins = 5 + index;
      const baseXP = 10 + (index * 2);
      
      return {
        day,
        coins: baseCoins,
        xp: baseXP,
        claimed: day < today || (day === today && !canClaim),
        isToday: day === today
      };
    });
  };

  const [rewards, setRewards] = useState<DailyReward[]>(generateRewards());

  // Check if user can claim daily reward
  const checkDailyReward = async () => {
    if (!user) return;

    try {
      // Check last claim from user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('last_daily_claim, daily_streak')
        .eq('id', user.id)
        .single();

      if (profile) {
        const lastClaim = profile.last_daily_claim ? new Date(profile.last_daily_claim) : null;
        const today = new Date();
        const isToday = lastClaim && 
          lastClaim.toDateString() === today.toDateString();

        setCanClaim(!isToday);
        setStreak(profile.daily_streak || 0);
      }
    } catch (error) {
      console.error('Error checking daily reward:', error);
    }
  };

  // Claim daily reward
  const claimDailyReward = async () => {
    if (!user || claiming) return;

    try {
      setClaiming(true);
      
      const { data, error } = await supabase.rpc('claim_daily_reward', {
        p_user_id: user.id
      });

      if (error) throw error;

      const result = data as unknown as ClaimDailyRewardResponse;

      if (result.success) {
        setRewardData(result);
        setStreak(result.streak || 0);
        setCanClaim(false);
        setShowAnimation(true);
        
        // Update rewards display
        setRewards(generateRewards());
        
        // Hide animation after 3 seconds
        setTimeout(() => setShowAnimation(false), 3000);
        
        toast({
          title: "🎁 Daily Reward Claimed!",
          description: `Day ${result.streak}: +${result.coins} coins, +${result.xp} XP`,
          className: "bg-yellow-50 border-yellow-200"
        });
      } else {
        toast({
          title: "Already claimed today",
          description: "Come back tomorrow for your next reward!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      toast({
        title: "Error",
        description: "Failed to claim daily reward",
        variant: "destructive"
      });
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkDailyReward();
    }
  }, [user]);

  useEffect(() => {
    setRewards(generateRewards());
  }, [canClaim]);

  return (
    <Card className="w-full relative overflow-hidden">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                Day {rewardData?.streak} Claimed!
              </div>
              <div className="text-lg text-gray-700">
                +{rewardData?.coins} coins, +{rewardData?.xp} XP
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-500" />
            Daily Rewards
          </CardTitle>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {streak} day streak
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {rewards.map((reward) => (
            <motion.div
              key={reward.day}
              whileHover={{ scale: 1.05 }}
              className={`
                p-3 rounded-lg border-2 text-center transition-all
                ${reward.isToday 
                  ? canClaim 
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg' 
                    : 'border-green-400 bg-green-50'
                  : reward.claimed 
                    ? 'border-gray-200 bg-gray-50 opacity-60' 
                    : 'border-gray-200 bg-white'
                }
              `}
            >
              <div className="text-xs text-gray-600 mb-1">Day {reward.day}</div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-xs">
                  <Coins className="w-3 h-3 text-yellow-500" />
                  <span className="font-medium">{reward.coins}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs">
                  <Star className="w-3 h-3 text-blue-500" />
                  <span className="font-medium">{reward.xp}</span>
                </div>
              </div>
              
              {reward.isToday && (
                <div className="text-xs mt-1 font-medium">
                  {canClaim ? '🎁' : '✅'}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Claim Button */}
        <div className="text-center">
          {canClaim ? (
            <Button 
              onClick={claimDailyReward}
              disabled={claiming}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3"
            >
              {claiming ? (
                "Claiming..."
              ) : (
                <>
                  <Gift className="w-4 h-4 mr-2" />
                  Claim Today's Reward
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-gray-500 py-3">
              <Calendar className="w-4 h-4" />
              <span>Come back tomorrow for your next reward!</span>
            </div>
          )}
        </div>

        {/* Streak Information */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Current Streak</div>
            <div className="text-2xl font-bold text-blue-600">{streak} days</div>
            <div className="text-xs text-gray-500 mt-1">
              Keep coming back daily to maintain your streak!
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDailyRewards;
