
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Zap, Droplets, Utensils } from 'lucide-react';
import { CharacterCustomization, CharacterStats as StatsType } from './types';

interface CharacterStatsProps {
  character: CharacterCustomization;
  onStatsUpdate: (stats: StatsType) => void;
}

const CharacterStats: React.FC<CharacterStatsProps> = ({
  character
}) => {
  const stats = character.stats;

  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getOverallMood = () => {
    const average = (stats.happiness + stats.hunger + stats.cleanliness + stats.energy) / 4;
    if (average >= 80) return { mood: '😄', text: 'Very Happy', color: 'text-green-600' };
    if (average >= 60) return { mood: '😊', text: 'Happy', color: 'text-blue-600' };
    if (average >= 40) return { mood: '😐', text: 'Okay', color: 'text-yellow-600' };
    if (average >= 20) return { mood: '😟', text: 'Sad', color: 'text-orange-600' };
    return { mood: '😢', text: 'Very Sad', color: 'text-red-600' };
  };

  const mood = getOverallMood();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">{mood.mood}</span>
          {character.name}'s Stats
        </CardTitle>
        <p className={`text-sm ${mood.color} font-medium`}>
          Mood: {mood.text}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Happiness</span>
                <span>{Math.round(stats.happiness)}%</span>
              </div>
              <Progress 
                value={stats.happiness} 
                className={`h-2 ${getStatColor(stats.happiness)}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Utensils className="w-5 h-5 text-orange-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Hunger</span>
                <span>{Math.round(stats.hunger)}%</span>
              </div>
              <Progress 
                value={stats.hunger} 
                className={`h-2 ${getStatColor(stats.hunger)}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Cleanliness</span>
                <span>{Math.round(stats.cleanliness)}%</span>
              </div>
              <Progress 
                value={stats.cleanliness} 
                className={`h-2 ${getStatColor(stats.cleanliness)}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Energy</span>
                <span>{Math.round(stats.energy)}%</span>
              </div>
              <Progress 
                value={stats.energy} 
                className={`h-2 ${getStatColor(stats.energy)}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            💡 Tip: Keep all stats above 50% for a happy character!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterStats;
