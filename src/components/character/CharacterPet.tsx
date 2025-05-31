
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Zap, Droplets, Utensils, Gift } from 'lucide-react';
import { CharacterStats, PetInteraction } from './types';
import { sounds } from '@/utils/sounds';

interface CharacterPetProps {
  stats: CharacterStats;
  onStatsUpdate: (stats: CharacterStats) => void;
  onInteraction: (interaction: PetInteraction) => void;
  soundEnabled: boolean;
}

const CharacterPet: React.FC<CharacterPetProps> = ({
  stats,
  onStatsUpdate,
  onInteraction,
  soundEnabled
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAction, setLastAction] = useState('');

  // Gradually decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      onStatsUpdate({
        happiness: Math.max(0, stats.happiness - 0.1),
        hunger: Math.max(0, stats.hunger - 0.2),
        cleanliness: Math.max(0, stats.cleanliness - 0.1),
        energy: Math.max(0, stats.energy - 0.15)
      });
    }, 30000); // Decrease every 30 seconds

    return () => clearInterval(interval);
  }, [stats, onStatsUpdate]);

  const performAction = (
    action: PetInteraction['type'],
    statChanges: Partial<CharacterStats>,
    sound?: string
  ) => {
    if (soundEnabled && sound) {
      switch (sound) {
        case 'feed': sounds.powerup(); break;
        case 'play': sounds.success(); break;
        case 'clean': sounds.coin(); break;
        case 'rest': sounds.unlock(); break;
      }
    }

    setIsAnimating(true);
    setLastAction(action);

    const newStats = {
      happiness: Math.min(100, stats.happiness + (statChanges.happiness || 0)),
      hunger: Math.min(100, stats.hunger + (statChanges.hunger || 0)),
      cleanliness: Math.min(100, stats.cleanliness + (statChanges.cleanliness || 0)),
      energy: Math.min(100, stats.energy + (statChanges.energy || 0))
    };

    onStatsUpdate(newStats);

    const interaction: PetInteraction = {
      type: action,
      timestamp: new Date().toISOString(),
      happiness_gain: statChanges.happiness || 0,
      energy_change: statChanges.energy || 0
    };

    onInteraction(interaction);

    setTimeout(() => {
      setIsAnimating(false);
      setLastAction('');
    }, 1500);
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCharacterExpression = () => {
    const avgStats = (stats.happiness + stats.hunger + stats.cleanliness + stats.energy) / 4;
    
    if (avgStats >= 80) return '😄';
    if (avgStats >= 60) return '😊';
    if (avgStats >= 40) return '😐';
    if (avgStats >= 20) return '😟';
    return '😢';
  };

  return (
    <div className="space-y-4">
      {/* Character Display */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className={`text-8xl mb-4 transition-transform duration-300 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}>
            {getCharacterExpression()}
          </div>
          {lastAction && (
            <div className="text-sm text-gray-600 capitalize animate-pulse">
              {lastAction}ing...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Character Stats</CardTitle>
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
                <Progress value={stats.happiness} className="h-2" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Utensils className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Hunger</span>
                  <span>{Math.round(stats.hunger)}%</span>
                </div>
                <Progress value={stats.hunger} className="h-2" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Cleanliness</span>
                  <span>{Math.round(stats.cleanliness)}%</span>
                </div>
                <Progress value={stats.cleanliness} className="h-2" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Energy</span>
                  <span>{Math.round(stats.energy)}%</span>
                </div>
                <Progress value={stats.energy} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Pet Your Character</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => performAction('feed', { hunger: 25, happiness: 10 }, 'feed')}
              className="flex items-center gap-2"
              disabled={stats.hunger >= 95}
            >
              <Utensils className="w-4 h-4" />
              Feed
            </Button>

            <Button
              onClick={() => performAction('play', { happiness: 20, energy: -10 }, 'play')}
              className="flex items-center gap-2"
              disabled={stats.energy <= 10}
            >
              <Gift className="w-4 h-4" />
              Play
            </Button>

            <Button
              onClick={() => performAction('clean', { cleanliness: 30, happiness: 5 }, 'clean')}
              className="flex items-center gap-2"
              disabled={stats.cleanliness >= 95}
            >
              <Droplets className="w-4 h-4" />
              Clean
            </Button>

            <Button
              onClick={() => performAction('rest', { energy: 25, happiness: 5 }, 'rest')}
              className="flex items-center gap-2"
              disabled={stats.energy >= 95}
            >
              <Zap className="w-4 h-4" />
              Rest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterPet;
