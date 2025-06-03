
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Heart, Zap, Droplets, Smile, Activity } from 'lucide-react';
import { PetStats } from '@/hooks/useGameData';

interface StatsDisplayProps {
  stats: PetStats;
  className?: string;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, className = "" }) => {
  const statItems = [
    {
      key: 'hunger',
      label: 'Hunger',
      value: stats.hunger,
      icon: <Heart className="h-4 w-4" />,
      color: 'bg-red-500',
      description: 'How full your pet is'
    },
    {
      key: 'energy',
      label: 'Energy',
      value: stats.energy,
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-yellow-500',
      description: 'Energy level for activities'
    },
    {
      key: 'cleanliness',
      label: 'Cleanliness',
      value: stats.cleanliness,
      icon: <Droplets className="h-4 w-4" />,
      color: 'bg-blue-500',
      description: 'How clean your pet is'
    },
    {
      key: 'happiness',
      label: 'Happiness',
      value: stats.happiness,
      icon: <Smile className="h-4 w-4" />,
      color: 'bg-pink-500',
      description: 'Overall mood and joy'
    },
    {
      key: 'health',
      label: 'Health',
      value: stats.health,
      icon: <Activity className="h-4 w-4" />,
      color: 'bg-green-500',
      description: 'Physical wellness'
    }
  ];

  const getStatColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {statItems.map((stat) => (
        <div key={stat.key} className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>
              {stat.value}%
            </span>
          </div>
          <Progress 
            value={stat.value} 
            className="h-2"
          />
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
