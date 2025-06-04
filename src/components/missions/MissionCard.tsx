
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Coins, Star, CheckCircle } from 'lucide-react';
import { Mission } from '@/hooks/useMissions';

interface MissionCardProps {
  mission: Mission;
  onClaimReward: (missionId: string) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onClaimReward }) => {
  const progressPercentage = (mission.current_progress / mission.target_count) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'feed': return '🍎';
      case 'play': return '🎮';
      case 'clean': return '🧼';
      case 'sleep': return '💤';
      case 'mini_game': return '🎯';
      case 'combo': return '⭐';
      default: return '📋';
    }
  };

  return (
    <Card className="bg-white border-2 hover:border-blue-200 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="text-2xl">{getMissionIcon(mission.mission_type)}</span>
            {mission.title}
          </CardTitle>
          <Badge className={getDifficultyColor(mission.difficulty)}>
            {mission.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{mission.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-gray-600">
              {mission.current_progress} / {mission.target_count}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3"
          />
        </div>

        {/* Rewards */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{mission.reward_coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{mission.reward_xp} XP</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {mission.reward_claimed ? (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Reward Claimed
            </div>
          ) : mission.is_completed ? (
            <Button 
              onClick={() => onClaimReward(mission.id)}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Claim Reward
            </Button>
          ) : (
            <div className="text-center text-gray-500 text-sm py-2">
              Complete to claim reward
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
