
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Zap, Utensils, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PetStatsPanelProps {
  stats: {
    happiness: number;
    health: number;
    hunger: number;
    energy: number;
  };
}

const PetStatsPanel: React.FC<PetStatsPanelProps> = ({ stats }) => {
  const statItems = [
    { 
      key: 'happiness', 
      label: 'Happy', 
      value: stats.happiness, 
      icon: Sparkles, 
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50' 
    },
    { 
      key: 'health', 
      label: 'Health', 
      value: stats.health, 
      icon: Heart, 
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50' 
    },
    { 
      key: 'hunger', 
      label: 'Full', 
      value: stats.hunger, 
      icon: Utensils, 
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50' 
    },
    { 
      key: 'energy', 
      label: 'Energy', 
      value: stats.energy, 
      icon: Zap, 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50' 
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-lg">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.key} className={`${stat.bgColor} rounded-xl p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">{stat.label}</span>
                </div>
                
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
                
                <div className="text-right mt-1">
                  <span className="text-xs font-bold text-gray-800">
                    {Math.round(stat.value)}/100
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PetStatsPanel;
