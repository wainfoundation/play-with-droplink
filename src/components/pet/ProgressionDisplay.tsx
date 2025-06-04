
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Star, Zap, Baby, Award } from 'lucide-react';
import { EvolutionStage } from '@/hooks/usePetProgression';

interface ProgressionDisplayProps {
  level: number;
  xp: number;
  xpToNext: number;
  evolutionStage: EvolutionStage;
  unlockedFeatures: string[];
  dailyCoinBonus: number;
}

const ProgressionDisplay: React.FC<ProgressionDisplayProps> = ({
  level,
  xp,
  xpToNext,
  evolutionStage,
  unlockedFeatures,
  dailyCoinBonus
}) => {
  const getStageIcon = () => {
    switch (evolutionStage) {
      case 'baby': return <Baby className="w-5 h-5" />;
      case 'teen': return <Zap className="w-5 h-5" />;
      case 'adult': return <Star className="w-5 h-5" />;
      case 'elder': return <Crown className="w-5 h-5" />;
      default: return <Baby className="w-5 h-5" />;
    }
  };

  const getStageColor = () => {
    switch (evolutionStage) {
      case 'baby': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'teen': return 'bg-green-100 text-green-800 border-green-200';
      case 'adult': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'elder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const xpPercentage = xpToNext > 0 ? ((xp / (xp + xpToNext)) * 100) : 100;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-2 border-white/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStageIcon()}
            <span className="capitalize">{evolutionStage} Droplet</span>
          </div>
          <Badge className={getStageColor()}>
            Level {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Experience</span>
            <span className="text-gray-600">
              {xp} / {xp + xpToNext} XP
            </span>
          </div>
          <Progress 
            value={xpPercentage} 
            className="h-3 bg-gray-200 border border-gray-300" 
          />
          {xpToNext > 0 && (
            <p className="text-xs text-gray-500 text-center">
              {xpToNext} XP to next level
            </p>
          )}
        </div>

        {/* Daily Coin Bonus */}
        <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Daily Bonus</span>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            +{dailyCoinBonus} coins
          </Badge>
        </div>

        {/* Evolution Progress */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Evolution Progress</h4>
          <div className="grid grid-cols-4 gap-2">
            {['baby', 'teen', 'adult', 'elder'].map((stage, index) => {
              const isUnlocked = ['baby', 'teen', 'adult', 'elder'].indexOf(evolutionStage) >= index;
              const isCurrent = evolutionStage === stage;
              
              return (
                <div
                  key={stage}
                  className={`text-center p-2 rounded-lg border-2 transition-all ${
                    isCurrent 
                      ? 'bg-blue-100 border-blue-300 shadow-md' 
                      : isUnlocked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {stage === 'baby' ? '🍼' : stage === 'teen' ? '⚡' : stage === 'adult' ? '⭐' : '👑'}
                  </div>
                  <div className="text-xs capitalize font-medium">
                    {stage}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-blue-600 font-bold mt-1">Current</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Unlocks */}
        {unlockedFeatures.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Unlocked Features</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {unlockedFeatures.slice(-5).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="mr-1 mb-1 text-xs bg-green-50 border-green-200 text-green-700"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressionDisplay;
