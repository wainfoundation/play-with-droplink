
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Star, Crown, Zap, Gift, Calendar, TrendingUp } from 'lucide-react';
import { useMascotProgression, MascotStage } from '@/hooks/useMascotProgression';
import MascotRenderer from './MascotRenderer';

const MascotEvolution: React.FC = () => {
  const { mascotState, getStageInfo } = useMascotProgression();
  const stageInfo = getStageInfo();

  const getStageColor = (stage: MascotStage) => {
    switch (stage) {
      case 'baby': return 'bg-pink-100 text-pink-800';
      case 'kid': return 'bg-blue-100 text-blue-800';
      case 'teen': return 'bg-purple-100 text-purple-800';
      case 'adult': return 'bg-green-100 text-green-800';
      case 'old': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = mascotState.xpToNext > 0 
    ? ((mascotState.xp - (stageInfo.requirements?.minXP || 0)) / mascotState.xpToNext) * 100
    : 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Mascot Evolution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Stage with Visual Mascot */}
        <div className="text-center">
          <MascotRenderer
            stage={mascotState.stage}
            mood="happy"
            size="medium"
            isAnimated={true}
          />
          <Badge className={getStageColor(mascotState.stage)}>
            {mascotState.stage.toUpperCase()} STAGE
          </Badge>
          <p className="text-sm text-gray-600 mt-2">
            Age: {mascotState.ageDays} days
          </p>
        </div>

        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Experience</span>
            <span className="text-sm text-gray-600">
              {mascotState.xp} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          {stageInfo.nextStage && (
            <p className="text-xs text-gray-500 text-center">
              {mascotState.xpToNext} XP to {stageInfo.nextStage}
            </p>
          )}
        </div>

        {/* Evolution Stages Timeline */}
        <div className="grid grid-cols-5 gap-2">
          {(['baby', 'kid', 'teen', 'adult', 'old'] as MascotStage[]).map((stage, index) => {
            const isUnlocked = mascotState.xp >= (stageInfo.requirements?.minXP || 0);
            const isCurrent = stage === mascotState.stage;
            
            return (
              <div key={stage} className="text-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg mb-1
                  ${isCurrent 
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                    : isUnlocked 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  <MascotRenderer stage={stage} size="small" isAnimated={false} />
                </div>
                <p className="text-xs font-medium capitalize">{stage}</p>
              </div>
            );
          })}
        </div>

        {/* Unlocked Features */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Unlocked Features
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {mascotState.featuresUnlocked.map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs justify-center">
                {feature.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Pet Stats
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(mascotState.stats).map(([stat, value]) => (
              <div key={stat} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{stat}</span>
                  <span>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions for XP */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Earn XP through Droplink:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>Add Link: +50 XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-blue-500" />
              <span>Share Link: +75 XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-green-500" />
              <span>Daily Login: +100 XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Gift className="w-3 h-3 text-purple-500" />
              <span>Community: +150 XP</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MascotEvolution;
