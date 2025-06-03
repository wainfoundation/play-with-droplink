
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Coins, Star } from 'lucide-react';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  bonus?: string;
}

interface WeeklyRewardsCalendarProps {
  dailyRewards: DailyReward[];
  currentStreak: number;
  canClaim: boolean;
}

const WeeklyRewardsCalendar: React.FC<WeeklyRewardsCalendarProps> = ({
  dailyRewards,
  currentStreak,
  canClaim
}) => {
  return (
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
  );
};

export default WeeklyRewardsCalendar;
