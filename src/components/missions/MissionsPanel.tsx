
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Star, Coins, CheckCircle, Clock } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward_coins: number;
  reward_xp: number;
  completed: boolean;
  claimed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MissionsPanel: React.FC = () => {
  const [missions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Feed Your Pet',
      description: 'Give food to your droplet pet 3 times',
      progress: 2,
      target: 3,
      reward_coins: 15,
      reward_xp: 25,
      completed: false,
      claimed: false,
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Play Mini Games',
      description: 'Complete 5 mini games successfully',
      progress: 5,
      target: 5,
      reward_coins: 30,
      reward_xp: 50,
      completed: true,
      claimed: false,
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Care Combo',
      description: 'Perform 10 care actions in a row',
      progress: 7,
      target: 10,
      reward_coins: 50,
      reward_xp: 100,
      completed: false,
      claimed: false,
      difficulty: 'hard'
    },
    {
      id: '4',
      title: 'Daily Login',
      description: 'Log in to the game today',
      progress: 1,
      target: 1,
      reward_coins: 10,
      reward_xp: 15,
      completed: true,
      claimed: true,
      difficulty: 'easy'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleClaimReward = (missionId: string) => {
    console.log(`Claiming reward for mission: ${missionId}`);
    // Implement reward claiming logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Target className="h-6 w-6 text-purple-500" />
          Daily Missions
        </CardTitle>
        <p className="text-gray-600">Complete tasks to earn coins and XP!</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {missions.map((mission) => (
            <Card key={mission.id} className={`border-2 ${
              mission.completed 
                ? mission.claimed 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-green-200 bg-green-50'
                : 'border-blue-200 bg-blue-50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{mission.title}</h4>
                      <Badge className={getDifficultyColor(mission.difficulty)}>
                        {mission.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {mission.progress}/{mission.target}
                        </span>
                      </div>
                      <Progress 
                        value={(mission.progress / mission.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="ml-4">
                    {mission.claimed ? (
                      <CheckCircle className="h-6 w-6 text-gray-400" />
                    ) : mission.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Clock className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{mission.reward_coins}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{mission.reward_xp} XP</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {mission.completed && !mission.claimed ? (
                    <Button
                      onClick={() => handleClaimReward(mission.id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      size="sm"
                    >
                      Claim Reward
                    </Button>
                  ) : mission.claimed ? (
                    <Badge variant="outline" className="text-gray-500">
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-blue-600">
                      In Progress
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {missions.filter(m => m.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {missions.filter(m => !m.completed).length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {missions.reduce((sum, m) => sum + (m.completed ? m.reward_coins : 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Coins Earned</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionsPanel;
