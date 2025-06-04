
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Utensils, Gamepad2, Sparkles, Moon, Heart, Star, Zap } from 'lucide-react';
import { usePetProgression } from '@/hooks/usePetProgression';
import { usePetStats } from '@/hooks/usePetStats';
import EvolutionStageRenderer from './EvolutionStageRenderer';
import ProgressionDisplay from './ProgressionDisplay';
import DropTapDash from '@/components/games/DropTapDash';
import { MusicToggle } from '@/components/ui/MusicToggle';

const EnhancedPetGame: React.FC = () => {
  const { progression, petCareActivities } = usePetProgression();
  const { petStats, updateStat } = usePetStats();
  const [showDropTapDash, setShowDropTapDash] = useState(false);

  const handleFeed = async () => {
    const message = petCareActivities.feed();
    updateStat('hunger', Math.min(100, (petStats?.hunger || 60) + 20));
    updateStat('happiness', Math.min(100, (petStats?.happiness || 80) + 10));
    
    toast({
      title: "Fed your pet! 🍎",
      description: message,
      className: "bg-green-50 border-green-200"
    });
  };

  const handlePlay = async () => {
    const message = petCareActivities.play();
    updateStat('happiness', Math.min(100, (petStats?.happiness || 80) + 20));
    updateStat('energy', Math.max(0, (petStats?.energy || 85) - 10));
    
    toast({
      title: "Played with your pet! 🎮",
      description: message,
      className: "bg-blue-50 border-blue-200"
    });
  };

  const handleBathe = async () => {
    const message = petCareActivities.bathe();
    updateStat('cleanliness', Math.min(100, (petStats?.cleanliness || 70) + 30));
    updateStat('happiness', Math.min(100, (petStats?.happiness || 80) + 5));
    
    toast({
      title: "Gave your pet a bath! 🛁",
      description: message,
      className: "bg-cyan-50 border-cyan-200"
    });
  };

  const handleRest = async () => {
    const message = petCareActivities.sleep();
    updateStat('energy', Math.min(100, (petStats?.energy || 85) + 40));
    updateStat('happiness', Math.min(100, (petStats?.happiness || 80) + 5));
    
    toast({
      title: "Your pet is resting! 😴",
      description: message,
      className: "bg-purple-50 border-purple-200"
    });
  };

  const handlePet = async () => {
    const message = petCareActivities.pet();
    updateStat('happiness', Math.min(100, (petStats?.happiness || 80) + 5));
    
    toast({
      title: "You petted your droplet! 🤗",
      description: message,
      className: "bg-pink-50 border-pink-200"
    });
  };

  const getCurrentMood = () => {
    const avgStats = Object.values(petStats || {}).reduce((a: number, b: any) => a + (typeof b === 'number' ? b : 0), 0) / 5;
    if (avgStats >= 85) return 'excited';
    if (avgStats >= 70) return 'happy';
    if (avgStats >= 50) return 'content';
    if (avgStats >= 30) return 'sad';
    return 'sick';
  };

  const handleGameEnd = (score: number, xpEarned: number, coinsEarned: number) => {
    petCareActivities.play();
    
    toast({
      title: "DropTap Dash Complete! 🎮",
      description: `Score: ${score} | Gained XP from playing!`,
      className: "bg-green-50 border-green-200"
    });
    
    setShowDropTapDash(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 relative">
          <h1 className="text-3xl font-bold text-gray-800">
            PlayDrop Evolution System
          </h1>
          <p className="text-gray-600">
            Care for your droplet and watch it evolve through life stages!
          </p>
          
          {/* Music Toggle Button */}
          <div className="absolute top-0 right-0">
            <MusicToggle 
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm border-white/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pet Display */}
          <Card className="lg:col-span-2 p-6">
            <CardContent className="space-y-6">
              {/* Evolution Stage Badge */}
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                  {progression.evolutionStage.toUpperCase()} STAGE - LEVEL {progression.level}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    +{progression.dailyCoinBonus} daily coins
                  </Badge>
                </div>
              </div>

              {/* Enhanced Pet Character with Evolution Stage Rendering */}
              <div className="flex justify-center py-4">
                <div 
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={handlePet}
                  title="Click to pet your droplet!"
                >
                  <EvolutionStageRenderer
                    stage={progression.evolutionStage}
                    mood={getCurrentMood()}
                    size={200}
                    isAnimated={true}
                  />
                </div>
              </div>

              {/* Pet Stats Display */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(petStats || {}).map(([stat, value]) => {
                  if (typeof value !== 'number') return null;
                  return (
                    <div key={stat} className="text-center space-y-1 bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-sm font-medium capitalize">{stat}</div>
                      <div className="text-xl font-bold text-blue-600">{value}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pet Care Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleFeed} className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Feed (+5 XP)
                </Button>
                <Button onClick={handlePlay} className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Play (+6 XP)
                </Button>
                <Button onClick={handleBathe} className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Bathe (+5 XP)
                </Button>
                <Button onClick={handleRest} className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Rest (+4 XP)
                </Button>
              </div>

              {/* Special Activities */}
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowDropTapDash(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Play DropTap Dash (+6 XP)
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => petCareActivities.dailyTask()}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Daily Task (+10 XP)
                  </Button>
                  <Button 
                    onClick={() => petCareActivities.watchAd()}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Watch Ad (+3 XP)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progression Panel */}
          <div className="space-y-4">
            <ProgressionDisplay
              level={progression.level}
              xp={progression.xp}
              xpToNext={progression.xpToNext}
              evolutionStage={progression.evolutionStage}
              unlockedFeatures={progression.unlockedFeatures}
              dailyCoinBonus={progression.dailyCoinBonus}
            />
          </div>
        </div>
      </div>

      {/* DropTap Dash Game Modal */}
      <AnimatePresence>
        {showDropTapDash && (
          <DropTapDash
            mascotStage={progression.evolutionStage}
            onGameEnd={handleGameEnd}
            onClose={() => setShowDropTapDash(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedPetGame;
