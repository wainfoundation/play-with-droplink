
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { sounds } from '@/utils/sounds';
import { MascotStats, MascotProps } from './types';
import MoodSystem from './MoodSystem';
import StatsManager from './StatsManager';
import OutfitSystem, { outfits } from './OutfitSystem';
import MascotRenderer from './MascotRenderer';

const InteractiveMascot: React.FC<MascotProps> = ({ onMoodChange, soundEnabled }) => {
  const [stats, setStats] = useState<MascotStats>({
    happiness: 80,
    hunger: 60,
    cleanliness: 70,
    energy: 85
  });
  
  const [outfit, setOutfit] = useState('default');
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAction, setLastAction] = useState('');

  // Update mood based on stats
  useEffect(() => {
    const avgStats = (stats.happiness + stats.hunger + stats.cleanliness + stats.energy) / 4;
    
    if (avgStats >= 80) onMoodChange(1); // excited
    else if (avgStats >= 60) onMoodChange(0); // happy
    else if (avgStats >= 40) onMoodChange(2); // thinking
    else if (avgStats >= 20) onMoodChange(6); // confused
    else onMoodChange(4); // sleepy
  }, [stats, onMoodChange]);

  // Gradually decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        happiness: Math.max(0, prev.happiness - 0.5),
        hunger: Math.max(0, prev.hunger - 0.8),
        cleanliness: Math.max(0, prev.cleanliness - 0.3),
        energy: Math.max(0, prev.energy - 0.4)
      }));
    }, 10000); // Decrease every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const performAction = (action: string, statChanges: Partial<MascotStats>) => {
    if (soundEnabled) sounds.click();
    
    setIsAnimating(true);
    setLastAction(action);
    
    setStats(prev => ({
      happiness: Math.min(100, prev.happiness + (statChanges.happiness || 0)),
      hunger: Math.min(100, prev.hunger + (statChanges.hunger || 0)),
      cleanliness: Math.min(100, prev.cleanliness + (statChanges.cleanliness || 0)),
      energy: Math.min(100, prev.energy + (statChanges.energy || 0))
    }));

    setTimeout(() => {
      setIsAnimating(false);
      setLastAction('');
    }, 1500);
  };

  const feedMascot = () => {
    performAction('feeding', { hunger: 25, happiness: 10 });
    if (soundEnabled) sounds.powerup();
  };

  const playWithMascot = () => {
    performAction('playing', { happiness: 20, energy: -10 });
    if (soundEnabled) sounds.success();
  };

  const showerMascot = () => {
    performAction('showering', { cleanliness: 30, happiness: 5 });
    if (soundEnabled) sounds.powerup();
  };

  const restMascot = () => {
    performAction('resting', { energy: 25, happiness: 5 });
    if (soundEnabled) sounds.coin();
  };

  const changeOutfit = () => {
    const outfitKeys = Object.keys(outfits);
    const currentIndex = outfitKeys.indexOf(outfit);
    const nextIndex = (currentIndex + 1) % outfitKeys.length;
    setOutfit(outfitKeys[nextIndex]);
    
    performAction('dressing', { happiness: 15 });
    if (soundEnabled) sounds.unlock();
  };

  const currentOutfit = outfits[outfit as keyof typeof outfits];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <MascotRenderer 
            outfit={currentOutfit}
            isAnimating={isAnimating}
            lastAction={lastAction}
          />
        </div>
        
        <StatsManager
          stats={stats}
          onFeed={feedMascot}
          onPlay={playWithMascot}
          onShower={showerMascot}
          onRest={restMascot}
        />
        
        <OutfitSystem
          currentOutfit={outfit}
          onChangeOutfit={changeOutfit}
        />
        
        <MoodSystem
          currentEmotion={0}
          lastAction={lastAction}
        />
      </CardContent>
    </Card>
  );
};

export default InteractiveMascot;
