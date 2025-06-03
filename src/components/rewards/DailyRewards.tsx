
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Gift, Calendar, Coins, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  bonus?: string;
}

const dailyRewards: DailyReward[] = [
  { day: 1, coins: 5, xp: 10 },
  { day: 2, coins: 7, xp: 15 },
  { day: 3, coins: 10, xp: 20 },
  { day: 4, coins: 12, xp: 25 },
  { day: 5, coins: 15, xp: 30, bonus: "Extra XP!" },
  { day: 6, coins: 18, xp: 35 },
  { day: 7, coins: 25, xp: 50, bonus: "Weekly Bonus!" },
];

interface DailyRewardsProps {
  onBack: () => void;
}

const DailyRewards: React.FC<DailyRewardsProps> = ({ onBack }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaimDate, setLastClaimDate] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const { user } = useAuthSystem();
  const { addCoins } = useWallet();

  useEffect(() => {
    checkDailyRewardStatus();
  }, [user]);

  const checkDailyRewardStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('daily_rewards')
        .select('*')
        .eq('user_id', user.id)
        .order('claim_date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking daily rewards:', error);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      if (data) {
        setLastClaimDate(data.claim_date);
        setCurrentStreak(data.streak_count);
        
        // Check if already claimed today
        if (data.claim_date === today) {
          setCanClaim(false);
        } else {
          setCanClaim(true);
        }
      } else {
        // First time claiming
        setCanClaim(true);
        setCurrentStreak(0);
      }
    } catch (error) {
      console.error('Error in checkDailyRewardStatus:', error);
    }
  };

  const claimDailyReward = async () => {
    if (!user || !canClaim || claiming) return;

    setClaiming(true);
    try {
      const { data, error } = await supabase.rpc('claim_daily_reward', {
        p_user_id: user.id
      });

      if (error) throw error;

      if (data.success) {
        setCurrentStreak(data.streak);
        setCanClaim(false);
        setLastClaimDate(new Date().toISOString().split('T')[0]);
        
        // Add coins to local wallet
        addCoins(data.coins, 'daily');
        
        toast({
          title: "Daily Reward Claimed!",
          description: `Day ${data.streak}: +${data.coins} coins, +${data.xp} XP`,
          className: "bg-green-50 border-green-200"
        });
      } else {
        toast({
          title: "Already Claimed",
          description: "You've already claimed your daily reward today!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      toast({
        title: "Claim Failed",
        description: "Failed to claim daily reward. Please try again.",
        variant: "destructive"
      });
    } finally {
      setClaiming(false);
    }
  };

  const getRewardForDay = (day: number) => {
    return dailyRewards.find(r => r.day === day) || dailyRewards[0];
  };

  const nextReward = getRewardForDay((currentStreak % 7) + 1);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center gap-2 justify-center">
            <Gift className="h-8 w-8 text-purple-500" />
            Daily Rewards
          </h1>
          <p className="text-gray-600">Claim your daily login bonus!</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Current Streak */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6" />
            Current Streak: {currentStreak} days
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {canClaim ? (
            <div>
              <p className="text-green-600 font-semibold mb-4">
                🎉 Daily reward available!
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Today's Reward:</h3>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Coins className="h-4 w-4" />
                    {nextReward.coins} coins
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {nextReward.xp} XP
                  </Badge>
                  {nextReward.bonus && (
                    <Badge className="bg-purple-100 text-purple-800">
                      {nextReward.bonus}
                    </Badge>
                  )}
                </div>
              </div>
              <Button 
                onClick={claimDailyReward} 
                disabled={claiming}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {claiming ? "Claiming..." : "Claim Reward"}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                ✅ You've already claimed today's reward!
              </p>
              <p className="text-sm text-gray-500">
                Come back tomorrow for your next reward
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Rewards Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Reward Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {dailyRewards.map((reward, index) => {
              const isCompleted = currentStreak > index;
              const isToday = !canClaim && (currentStreak % 7) === index;
              const isNext = canClaim && (currentStreak % 7) === index;
              
              return (
                <motion.div
                  key={reward.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-2 text-center ${
                    isCompleted 
                      ? 'bg-green-100 border-green-300' 
                      : isToday
                      ? 'bg-blue-100 border-blue-300'
                      : isNext
                      ? 'bg-yellow-100 border-yellow-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">Day {reward.day}</div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Coins className="h-3 w-3" />
                      {reward.coins}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3" />
                      {reward.xp}
                    </div>
                    {reward.bonus && (
                      <div className="text-xs text-purple-600 font-semibold">
                        {reward.bonus}
                      </div>
                    )}
                  </div>
                  {isCompleted && <div className="text-green-600 mt-1">✅</div>}
                  {isToday && <div className="text-blue-600 mt-1">📅</div>}
                  {isNext && <div className="text-yellow-600 mt-1">⏰</div>}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Streak Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Streak Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="font-semibold mb-1">Daily Login</h3>
              <p className="text-sm text-gray-600">Claim rewards every day to build your streak</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">Increasing Rewards</h3>
              <p className="text-sm text-gray-600">Longer streaks give better rewards</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-semibold mb-1">Weekly Bonus</h3>
              <p className="text-sm text-gray-600">Special rewards on day 7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyRewards;
