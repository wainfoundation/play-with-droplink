
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Coins, Star } from 'lucide-react';

interface DailyReward {
  day: number;
  coins: number;
  xp: number;
  bonus?: string;
}

interface CurrentStreakCardProps {
  currentStreak: number;
  canClaim: boolean;
  claiming: boolean;
  nextReward: DailyReward;
  onClaimReward: () => void;
}

const CurrentStreakCard: React.FC<CurrentStreakCardProps> = ({
  currentStreak,
  canClaim,
  claiming,
  nextReward,
  onClaimReward
}) => {
  return (
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
              onClick={onClaimReward} 
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
  );
};

export default CurrentStreakCard;
