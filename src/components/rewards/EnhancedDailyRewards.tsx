
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Coins, Star, Calendar, Flame } from 'lucide-react';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  bonus?: string;
  claimed: boolean;
  available: boolean;
}

const EnhancedDailyRewards: React.FC = () => {
  const [currentStreak] = useState(5);
  const [lastClaimDate] = useState(new Date().toDateString());
  
  const [rewards] = useState<DailyReward[]>([
    { day: 1, coins: 10, xp: 15, claimed: true, available: false },
    { day: 2, coins: 15, xp: 20, claimed: true, available: false },
    { day: 3, coins: 20, xp: 25, bonus: '🎁 Bonus Item', claimed: true, available: false },
    { day: 4, coins: 25, xp: 30, claimed: true, available: false },
    { day: 5, coins: 30, xp: 35, claimed: true, available: false },
    { day: 6, coins: 40, xp: 50, bonus: '💎 Rare Item', claimed: false, available: true },
    { day: 7, coins: 100, xp: 100, bonus: '👑 Epic Reward', claimed: false, available: false }
  ]);

  const handleClaimReward = (day: number) => {
    console.log(`Claiming reward for day ${day}`);
    // Implement reward claiming logic
  };

  const canClaimToday = rewards.some(r => r.available && !r.claimed);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Gift className="h-6 w-6 text-orange-500" />
          Daily Rewards
        </CardTitle>
        <p className="text-gray-600">Log in daily to claim amazing rewards!</p>
      </CardHeader>
      <CardContent>
        {/* Streak Display */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="text-xl font-bold text-orange-800">
                  {currentStreak} Day Streak
                </h3>
                <p className="text-sm text-orange-600">
                  Keep it up! Don't break the chain!
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">🔥</div>
              <div className="text-xs text-orange-500">Streak Bonus Active</div>
            </div>
          </div>
        </div>

        {/* Daily Rewards Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {rewards.map((reward) => (
            <div
              key={reward.day}
              className={`relative p-3 rounded-lg border-2 text-center transition-all ${
                reward.claimed
                  ? 'border-green-200 bg-green-50'
                  : reward.available
                  ? 'border-orange-300 bg-orange-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Day Number */}
              <div className="text-xs font-medium text-gray-600 mb-1">
                Day {reward.day}
              </div>

              {/* Reward Icon */}
              <div className="text-2xl mb-2">
                {reward.day === 7 ? '👑' : reward.day === 3 || reward.day === 6 ? '💎' : '🪙'}
              </div>

              {/* Rewards */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-xs">
                  <Coins className="h-3 w-3 text-yellow-500" />
                  <span className="font-semibold">{reward.coins}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-blue-500" />
                  <span className="font-semibold">{reward.xp}</span>
                </div>
              </div>

              {/* Bonus Badge */}
              {reward.bonus && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-purple-500 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                    +
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              {reward.claimed && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-20 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    ✓
                  </div>
                </div>
              )}

              {reward.available && !reward.claimed && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Today's Reward */}
        {canClaimToday && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-orange-800 mb-1">Today's Reward Available!</h4>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">
                      {rewards.find(r => r.available)?.coins} Coins
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">
                      {rewards.find(r => r.available)?.xp} XP
                    </span>
                  </div>
                  {rewards.find(r => r.available)?.bonus && (
                    <Badge className="bg-purple-100 text-purple-700 text-xs">
                      Bonus Item!
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => handleClaimReward(rewards.find(r => r.available)?.day || 1)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Gift className="h-4 w-4 mr-2" />
                Claim Now
              </Button>
            </div>
          </div>
        )}

        {/* Next Reward Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Tomorrow's Reward</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span>40 Coins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>50 XP</span>
                </div>
                <Badge variant="outline" className="text-purple-600">
                  💎 Rare Item
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Calendar className="h-6 w-6 text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-gray-500">Come back tomorrow</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDailyRewards;
