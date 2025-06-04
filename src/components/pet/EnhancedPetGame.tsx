import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Utensils, Gamepad2, Sparkles, Moon, Heart, Star, Zap } from 'lucide-react';
import { useMascotProgression } from '@/hooks/useMascotProgression';
import MascotRenderer from './MascotRenderer';
import MascotEvolution from './MascotEvolution';
import DropTapDash from '@/components/games/DropTapDash';

const EnhancedPetGame: React.FC = () => {
  const { mascotState, petCareActivity, droplinkActivity, hasRoom } = useMascotProgression();
  const [showEvolution, setShowEvolution] = useState(false);
  const [showDropTapDash, setShowDropTapDash] = useState(false);

  const handleFeed = async () => {
    const message = petCareActivity.feedPet();
    toast({
      title: "Fed your pet! 🍎",
      description: message,
      className: "bg-green-50 border-green-200"
    });
  };

  const handlePlay = async () => {
    const message = petCareActivity.playWithPet();
    toast({
      title: "Played with your pet! 🎮",
      description: message,
      className: "bg-blue-50 border-blue-200"
    });
  };

  const handleBathe = async () => {
    const message = petCareActivity.bathePet();
    toast({
      title: "Gave your pet a bath! 🛁",
      description: message,
      className: "bg-cyan-50 border-cyan-200"
    });
  };

  const handleRest = async () => {
    const message = petCareActivity.restPet();
    toast({
      title: "Your pet is resting! 😴",
      description: message,
      className: "bg-purple-50 border-purple-200"
    });
  };

  // Simulate Droplink activities for demo
  const simulateDroplinkActivity = (activity: keyof typeof droplinkActivity) => {
    const message = droplinkActivity[activity]();
    toast({
      title: "Droplink Activity! ⭐",
      description: message,
      className: "bg-yellow-50 border-yellow-200"
    });
  };

  const getCurrentMood = () => {
    const avgStats = Object.values(mascotState.stats).reduce((a, b) => a + b, 0) / 5;
    if (avgStats >= 85) return 'excited';
    if (avgStats >= 70) return 'happy';
    if (avgStats >= 50) return 'content';
    if (avgStats >= 30) return 'sad';
    return 'sick';
  };

  const handleGameEnd = (score: number, xpEarned: number, coinsEarned: number) => {
    // Add XP through the progression system
    droplinkActivity.communityEngagement(); // This gives XP
    
    toast({
      title: "DropTap Dash Complete! 🎮",
      description: `Score: ${score} | +${xpEarned} XP | +${coinsEarned} coins`,
      className: "bg-green-50 border-green-200"
    });
    
    setShowDropTapDash(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            PlayyDrop Mascot Care
          </h1>
          <p className="text-gray-600">
            Care for your mascot and grow through Droplink activities!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pet Display */}
          <Card className="p-6">
            <CardContent className="space-y-6">
              {/* Mascot Stage Badge */}
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-100 text-blue-800">
                  {mascotState.stage.toUpperCase()} STAGE
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEvolution(!showEvolution)}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Evolution
                </Button>
              </div>

              {/* Enhanced Mascot Character with Stage-Based Rendering */}
              <div className="flex justify-center py-4">
                <MascotRenderer
                  stage={mascotState.stage}
                  mood={getCurrentMood()}
                  size="large"
                  isAnimated={true}
                />
              </div>

              {/* XP Progress Bar */}
              <div className="bg-gray-100 rounded-full p-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-4 flex items-center justify-center text-white text-xs font-medium transition-all duration-300"
                  style={{ 
                    width: `${mascotState.xpToNext > 0 ? ((mascotState.xp % 1000) / 10) : 100}%`,
                    minWidth: '20%'
                  }}
                >
                  {mascotState.xp} XP
                </div>
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(mascotState.stats).map(([stat, value]) => (
                  <div key={stat} className="text-center space-y-1">
                    <div className="text-sm font-medium capitalize">{stat}</div>
                    <div className="text-xl font-bold text-blue-600">{value}%</div>
                  </div>
                ))}
              </div>

              {/* Pet Care Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleFeed} className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Feed
                </Button>
                <Button onClick={handlePlay} className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Play
                </Button>
                <Button onClick={handleBathe} className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Bathe
                </Button>
                <Button onClick={handleRest} className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Rest
                </Button>
              </div>

              {/* Mini-Game Button */}
              <Button 
                onClick={() => setShowDropTapDash(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Play DropTap Dash
              </Button>
            </CardContent>
          </Card>

          {/* Evolution Panel or Droplink Activities */}
          {showEvolution ? (
            <MascotEvolution />
          ) : (
            <Card className="p-6">
              <CardContent className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Earn XP through Droplink
                </h3>

                {/* Droplink Activity Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => simulateDroplinkActivity('addLink')}
                    className="w-full justify-start bg-green-500 hover:bg-green-600"
                  >
                    <span className="mr-2">🔗</span>
                    Add New Link (+50 XP)
                  </Button>
                  
                  <Button
                    onClick={() => simulateDroplinkActivity('shareLink')}
                    className="w-full justify-start bg-blue-500 hover:bg-blue-600"
                  >
                    <span className="mr-2">📤</span>
                    Share Link (+75 XP)
                  </Button>
                  
                  <Button
                    onClick={() => simulateDroplinkActivity('dailyLogin')}
                    className="w-full justify-start bg-purple-500 hover:bg-purple-600"
                  >
                    <span className="mr-2">📅</span>
                    Daily Login (+100 XP)
                  </Button>
                  
                  <Button
                    onClick={() => simulateDroplinkActivity('communityEngagement')}
                    className="w-full justify-start bg-orange-500 hover:bg-orange-600"
                  >
                    <span className="mr-2">👥</span>
                    Community Activity (+150 XP)
                  </Button>
                  
                  <Button
                    onClick={() => simulateDroplinkActivity('completeProfile')}
                    className="w-full justify-start bg-pink-500 hover:bg-pink-600"
                  >
                    <span className="mr-2">✨</span>
                    Complete Profile (+200 XP)
                  </Button>
                </div>

                {/* XP Progress */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total XP</span>
                    <span className="text-blue-600 font-bold">{mascotState.xp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next Evolution</span>
                    <span className="text-sm">{mascotState.xpToNext} XP needed</span>
                  </div>
                </div>

                {/* Unlocked Rooms */}
                <div className="space-y-2">
                  <h4 className="font-medium">Unlocked Rooms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mascotState.roomsUnlocked.map((room) => (
                      <Badge key={room} variant="outline" className="text-xs">
                        {room.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* DropTap Dash Game Modal */}
      <AnimatePresence>
        {showDropTapDash && (
          <DropTapDash
            mascotStage={mascotState.stage}
            onGameEnd={handleGameEnd}
            onClose={() => setShowDropTapDash(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedPetGame;
