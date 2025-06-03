
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { useWallet } from '@/hooks/useWallet';
import { toast } from '@/hooks/use-toast';
import DailyRewardsHeader from './DailyRewardsHeader';
import CurrentStreakCard from './CurrentStreakCard';
import WeeklyRewardsCalendar from './WeeklyRewardsCalendar';
import StreakBenefitsCard from './StreakBenefitsCard';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  bonus?: string;
}

interface ClaimRewardResponse {
  success: boolean;
  streak: number;
  coins: number;
  xp: number;
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
        
        if (data.claim_date === today) {
          setCanClaim(false);
        } else {
          setCanClaim(true);
        }
      } else {
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

      const response = data as unknown as ClaimRewardResponse;

      if (response.success) {
        setCurrentStreak(response.streak);
        setCanClaim(false);
        setLastClaimDate(new Date().toISOString().split('T')[0]);
        
        addCoins(response.coins, 'daily');
        
        toast({
          title: "Daily Reward Claimed!",
          description: `Day ${response.streak}: +${response.coins} coins, +${response.xp} XP`,
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
      <DailyRewardsHeader onBack={onBack} />
      
      <CurrentStreakCard
        currentStreak={currentStreak}
        canClaim={canClaim}
        claiming={claiming}
        nextReward={nextReward}
        onClaimReward={claimDailyReward}
      />

      <WeeklyRewardsCalendar
        dailyRewards={dailyRewards}
        currentStreak={currentStreak}
        canClaim={canClaim}
      />

      <StreakBenefitsCard />
    </div>
  );
};

export default DailyRewards;
