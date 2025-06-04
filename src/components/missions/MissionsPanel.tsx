
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Gift } from 'lucide-react';
import { useMissions } from '@/hooks/useMissions';
import MissionCard from './MissionCard';

const MissionsPanel: React.FC = () => {
  const { missions, loading, claimReward } = useMissions();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Daily Missions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading missions...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedMissions = missions.filter(m => m.is_completed);
  const totalRewards = completedMissions.reduce((sum, m) => sum + m.reward_coins, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Daily Missions
          </CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4 mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Gift className="w-3 h-3" />
            {completedMissions.length}/{missions.length} Complete
          </Badge>
          {totalRewards > 0 && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              {totalRewards} coins available
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {missions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">No missions available today</div>
            <div className="text-sm text-gray-400">Check back tomorrow for new missions!</div>
          </div>
        ) : (
          missions.map((mission) => (
            <MissionCard 
              key={mission.id}
              mission={mission}
              onClaimReward={claimReward}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MissionsPanel;
