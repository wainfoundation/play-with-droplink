
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Gamepad2, 
  Droplets, 
  Shirt, 
  Apple, 
  Sparkles,
  Coffee,
  Zap
} from 'lucide-react';
import { sounds } from '@/utils/sounds';

interface MascotStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
}

interface MascotProps {
  onMoodChange: (mood: number) => void;
  soundEnabled: boolean;
}

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

  // Outfits for the mascot
  const outfits = {
    default: { color: '#00aaff', accessory: null },
    casual: { color: '#00aaff', accessory: 'hat' },
    formal: { color: '#0077cc', accessory: 'tie' },
    sporty: { color: '#00cc99', accessory: 'headband' },
    party: { color: '#ff6600', accessory: 'bowtie' }
  };

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

  const renderMascotWithOutfit = () => {
    const currentOutfit = outfits[outfit as keyof typeof outfits];
    
    return (
      <div className="relative">
        {/* Main mascot body */}
        <svg
          width="200"
          height="240"
          viewBox="0 0 200 240"
          className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : 'animate-bounce-gentle'}`}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentOutfit.color} />
              <stop offset="50%" stopColor={currentOutfit.color} />
              <stop offset="100%" stopColor="#0077cc" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main droplet body */}
          <path
            d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
            fill="url(#mascotGradient)"
            filter="url(#glow)"
            className="animate-pulse-gentle"
          />
          
          {/* Shine effect */}
          <ellipse
            cx="75"
            cy="70"
            rx="12"
            ry="18"
            fill="rgba(255, 255, 255, 0.6)"
            className="animate-shimmer"
          />
          
          {/* Eyes */}
          <ellipse cx="85" cy="80" rx="8" ry="12" fill="#000" />
          <ellipse cx="115" cy="80" rx="8" ry="12" fill="#000" />
          <ellipse cx="87" cy="78" rx="3" ry="4" fill="#fff" />
          <ellipse cx="117" cy="78" rx="3" ry="4" fill="#fff" />
          
          {/* Mouth */}
          <path d="M 85 110 Q 100 125 115 110" stroke="#000" strokeWidth="3" fill="none" />
          
          {/* Outfit accessories */}
          {currentOutfit.accessory === 'hat' && (
            <ellipse cx="100" cy="45" rx="25" ry="8" fill="#ff0000" />
          )}
          {currentOutfit.accessory === 'tie' && (
            <path d="M 95 130 L 105 130 L 103 160 L 97 160 Z" fill="#ff0000" />
          )}
          {currentOutfit.accessory === 'headband' && (
            <rect x="70" y="65" width="60" height="5" fill="#ffff00" rx="2" />
          )}
          {currentOutfit.accessory === 'bowtie' && (
            <>
              <path d="M 85 120 L 95 115 L 95 125 Z" fill="#ff00ff" />
              <path d="M 115 120 L 105 115 L 105 125 Z" fill="#ff00ff" />
              <rect x="95" y="117" width="10" height="6" fill="#ff00ff" />
            </>
          )}
        </svg>
        
        {/* Action animation overlay */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl animate-bounce">
              {lastAction === 'feeding' && '🍎'}
              {lastAction === 'playing' && '🎮'}
              {lastAction === 'showering' && '🚿'}
              {lastAction === 'resting' && '😴'}
              {lastAction === 'dressing' && '👕'}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          {renderMascotWithOutfit()}
        </div>
        
        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-600">Happy</div>
              <div className={`h-2 rounded-full ${getStatColor(stats.happiness)}`} 
                   style={{ width: `${stats.happiness}%` }} />
            </div>
            <span className="text-xs">{Math.round(stats.happiness)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Apple className="w-4 h-4 text-green-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-600">Food</div>
              <div className={`h-2 rounded-full ${getStatColor(stats.hunger)}`} 
                   style={{ width: `${stats.hunger}%` }} />
            </div>
            <span className="text-xs">{Math.round(stats.hunger)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-600">Clean</div>
              <div className={`h-2 rounded-full ${getStatColor(stats.cleanliness)}`} 
                   style={{ width: `${stats.cleanliness}%` }} />
            </div>
            <span className="text-xs">{Math.round(stats.cleanliness)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-600">Energy</div>
              <div className={`h-2 rounded-full ${getStatColor(stats.energy)}`} 
                   style={{ width: `${stats.energy}%` }} />
            </div>
            <span className="text-xs">{Math.round(stats.energy)}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            onClick={feedMascot}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            disabled={stats.hunger >= 95}
          >
            <Apple className="w-3 h-3" />
            Feed
          </Button>
          
          <Button
            onClick={playWithMascot}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            disabled={stats.energy <= 10}
          >
            <Gamepad2 className="w-3 h-3" />
            Play
          </Button>
          
          <Button
            onClick={showerMascot}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            disabled={stats.cleanliness >= 95}
          >
            <Droplets className="w-3 h-3" />
            Shower
          </Button>
          
          <Button
            onClick={restMascot}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            disabled={stats.energy >= 95}
          >
            <Coffee className="w-3 h-3" />
            Rest
          </Button>
        </div>
        
        <Button
          onClick={changeOutfit}
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-1 text-xs"
        >
          <Shirt className="w-3 h-3" />
          Change Outfit ({outfit})
        </Button>
        
        {/* Current status */}
        <div className="mt-4 text-center">
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            {lastAction ? `${lastAction}...` : 'Happy & Ready!'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMascot;
