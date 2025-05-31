
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
  const [currentMood, setCurrentMood] = useState(0);

  // Mood expressions for the droplet mascot
  const moods = [
    { name: "happy", eyes: "normal", mouth: "smile", thought: "Let's play some amazing games! 🎮", color: "#00aaff" },
    { name: "excited", eyes: "wide", mouth: "big-smile", thought: "So many games to choose from! 🎉", color: "#0099ff" },
    { name: "thinking", eyes: "looking-up", mouth: "neutral", thought: "Which game should we play next? 🤔", color: "#0088ee" },
    { name: "surprised", eyes: "wide", mouth: "open", thought: "Wow! You're really good at this! 😲", color: "#00bbff" },
    { name: "sleepy", eyes: "sleepy", mouth: "yawn", thought: "Maybe just one more game... 😴", color: "#0077cc" },
    { name: "loving", eyes: "hearts", mouth: "gentle-smile", thought: "I love playing with you! 💕", color: "#ff6b9d" },
    { name: "confused", eyes: "crossed", mouth: "puzzled", thought: "Hmm, that's tricky! 🤨", color: "#0066bb" },
    { name: "playful", eyes: "wink", mouth: "grin", thought: "Ready for a challenge? 😄", color: "#00ccff" },
    { name: "proud", eyes: "bright", mouth: "proud-smile", thought: "You're absolutely amazing! 🌟", color: "#ffcc00" },
    { name: "sad", eyes: "sad", mouth: "frown", thought: "Oh no... something went wrong! 😢", color: "#0055aa" }
  ];

  // Outfits for the mascot
  const outfits = {
    default: { accessory: null, colorShift: 0 },
    casual: { accessory: 'hat', colorShift: 10 },
    formal: { accessory: 'tie', colorShift: -15 },
    sporty: { accessory: 'headband', colorShift: 20 },
    party: { accessory: 'bowtie', colorShift: 30 }
  };

  // Update mood based on stats
  useEffect(() => {
    const avgStats = (stats.happiness + stats.hunger + stats.cleanliness + stats.energy) / 4;
    
    let newMood;
    if (avgStats >= 90) newMood = 8; // proud
    else if (avgStats >= 75) newMood = 1; // excited
    else if (avgStats >= 60) newMood = 0; // happy
    else if (avgStats >= 45) newMood = 2; // thinking
    else if (avgStats >= 30) newMood = 6; // confused
    else if (avgStats >= 15) newMood = 9; // sad
    else newMood = 4; // sleepy

    setCurrentMood(newMood);
    onMoodChange(newMood);
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

  const renderMascotEyes = () => {
    const mood = moods[currentMood];
    switch (mood.eyes) {
      case 'wide':
        return (
          <>
            <ellipse cx="75" cy="75" rx="12" ry="16" fill="#000" />
            <ellipse cx="125" cy="75" rx="12" ry="16" fill="#000" />
            <ellipse cx="75" cy="73" rx="4" ry="6" fill="#fff" />
            <ellipse cx="125" cy="73" rx="4" ry="6" fill="#fff" />
          </>
        );
      case 'sleepy':
        return (
          <>
            <path d="M 65 80 Q 75 75 85 80" stroke="#000" strokeWidth="3" fill="none" />
            <path d="M 115 80 Q 125 75 135 80" stroke="#000" strokeWidth="3" fill="none" />
          </>
        );
      case 'hearts':
        return (
          <>
            <path d="M 75 70 C 70 65, 65 65, 65 75 C 65 80, 75 85, 75 85 C 75 85, 85 80, 85 75 C 85 65, 80 65, 75 70 Z" fill="#ff69b4" />
            <path d="M 125 70 C 120 65, 115 65, 115 75 C 115 80, 125 85, 125 85 C 125 85, 135 80, 135 75 C 135 65, 130 65, 125 70 Z" fill="#ff69b4" />
          </>
        );
      case 'crossed':
        return (
          <>
            <path d="M 68 72 L 82 82 M 82 72 L 68 82" stroke="#000" strokeWidth="3" />
            <path d="M 118 72 L 132 82 M 132 72 L 118 82" stroke="#000" strokeWidth="3" />
          </>
        );
      case 'wink':
        return (
          <>
            <path d="M 65 80 Q 75 75 85 80" stroke="#000" strokeWidth="3" fill="none" />
            <ellipse cx="125" cy="80" rx="10" ry="14" fill="#000" />
            <ellipse cx="125" cy="78" rx="3" ry="5" fill="#fff" />
          </>
        );
      case 'looking-up':
        return (
          <>
            <ellipse cx="75" cy="70" rx="10" ry="14" fill="#000" />
            <ellipse cx="125" cy="70" rx="10" ry="14" fill="#000" />
            <ellipse cx="75" cy="68" rx="3" ry="4" fill="#fff" />
            <ellipse cx="125" cy="68" rx="3" ry="4" fill="#fff" />
          </>
        );
      case 'sad':
        return (
          <>
            <ellipse cx="75" cy="80" rx="8" ry="12" fill="#000" />
            <ellipse cx="125" cy="80" rx="8" ry="12" fill="#000" />
            <ellipse cx="75" cy="82" rx="2" ry="3" fill="#fff" />
            <ellipse cx="125" cy="82" rx="2" ry="3" fill="#fff" />
            <path d="M 70 88 Q 75 95 75 95" stroke="#4A90E2" strokeWidth="2" fill="none" />
            <path d="M 130 88 Q 125 95 125 95" stroke="#4A90E2" strokeWidth="2" fill="none" />
          </>
        );
      default: // normal
        return (
          <>
            <ellipse cx="75" cy="80" rx="10" ry="14" fill="#000" />
            <ellipse cx="125" cy="80" rx="10" ry="14" fill="#000" />
            <ellipse cx="75" cy="78" rx="3" ry="5" fill="#fff" />
            <ellipse cx="125" cy="78" rx="3" ry="5" fill="#fff" />
          </>
        );
    }
  };

  const renderMascotMouth = () => {
    const mood = moods[currentMood];
    switch (mood.mouth) {
      case 'big-smile':
        return <path d="M 75 115 Q 100 135 125 115" stroke="#000" strokeWidth="3" fill="none" />;
      case 'open':
        return <ellipse cx="100" cy="120" rx="8" ry="12" fill="#000" />;
      case 'yawn':
        return <ellipse cx="100" cy="120" rx="12" ry="18" fill="#000" />;
      case 'gentle-smile':
        return <path d="M 80 115 Q 100 125 120 115" stroke="#000" strokeWidth="2" fill="none" />;
      case 'puzzled':
        return <path d="M 85 115 Q 95 120 105 115 Q 115 120 125 115" stroke="#000" strokeWidth="2" fill="none" />;
      case 'grin':
        return <path d="M 75 115 Q 100 130 125 115" stroke="#000" strokeWidth="3" fill="none" />;
      case 'proud-smile':
        return <path d="M 78 115 Q 100 128 122 115" stroke="#000" strokeWidth="3" fill="none" />;
      case 'frown':
        return <path d="M 80 125 Q 100 115 120 125" stroke="#000" strokeWidth="3" fill="none" />;
      case 'neutral':
        return <line x1="85" y1="120" x2="115" y2="120" stroke="#000" strokeWidth="2" />;
      default: // smile
        return <path d="M 80 115 Q 100 125 120 115" stroke="#000" strokeWidth="3" fill="none" />;
    }
  };

  const renderMascotWithOutfit = () => {
    const currentOutfit = outfits[outfit as keyof typeof outfits];
    const mood = moods[currentMood];
    
    return (
      <div className="relative">
        {/* Speech bubble */}
        <div className="absolute -top-16 -right-8 bg-white rounded-lg p-3 shadow-lg border-2 border-blue-200 max-w-48 z-10">
          <div className="text-xs font-medium text-blue-800 text-center">
            {mood.thought}
          </div>
          <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
        </div>

        {/* Main mascot */}
        <svg
          width="200"
          height="240"
          viewBox="0 0 200 240"
          className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : 'animate-bounce-gentle'}`}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={mood.color} />
              <stop offset="50%" stopColor={mood.color} />
              <stop offset="100%" stopColor="#0066bb" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main droplet body - matching the original design */}
          <path
            d="M100 20 C65 55, 40 95, 40 140 C40 185, 65 220, 100 220 C135 220, 160 185, 160 140 C160 95, 135 55, 100 20 Z"
            fill="url(#mascotGradient)"
            filter="url(#glow)"
            className="animate-pulse-gentle"
          />
          
          {/* Shine effect - like in the original */}
          <ellipse
            cx="80"
            cy="70"
            rx="15"
            ry="25"
            fill="rgba(255, 255, 255, 0.3)"
            className="animate-shimmer"
          />
          <ellipse
            cx="85"
            cy="75"
            rx="8"
            ry="12"
            fill="rgba(255, 255, 255, 0.5)"
            className="animate-shimmer"
          />
          
          {/* Eyes - dynamic based on mood */}
          {renderMascotEyes()}
          
          {/* Mouth - dynamic based on mood */}
          {renderMascotMouth()}
          
          {/* Outfit accessories */}
          {currentOutfit.accessory === 'hat' && (
            <>
              <ellipse cx="100" cy="35" rx="30" ry="10" fill="#ff0000" />
              <ellipse cx="100" cy="25" rx="15" ry="8" fill="#ff0000" />
            </>
          )}
          {currentOutfit.accessory === 'tie' && (
            <path d="M 95 130 L 105 130 L 103 170 L 97 170 Z" fill="#ff0000" />
          )}
          {currentOutfit.accessory === 'headband' && (
            <rect x="70" y="60" width="60" height="6" fill="#ffff00" rx="3" />
          )}
          {currentOutfit.accessory === 'bowtie' && (
            <>
              <path d="M 80 120 L 95 115 L 95 125 Z" fill="#ff00ff" />
              <path d="M 120 120 L 105 115 L 105 125 Z" fill="#ff00ff" />
              <rect x="95" y="117" width="10" height="6" fill="#ff00ff" />
            </>
          )}
        </svg>
        
        {/* Action animation overlay */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl animate-bounce">
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
            {lastAction ? `${lastAction}...` : moods[currentMood].name}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMascot;
