
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Utensils, Sparkles, Moon, Gamepad2, Pill, Hand } from 'lucide-react';
import EmotionalCharacterRenderer from '@/components/welcome/EmotionalCharacterRenderer';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface RealTimePetCareProps {
  character: any;
}

const RealTimePetCare: React.FC<RealTimePetCareProps> = ({ character }) => {
  const { moodState, personality, currentMessage, actions } = usePetMoodEngine(character.id);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Show floating hearts on care actions
  const triggerHearts = () => {
    setShowFloatingHearts(true);
    setTimeout(() => setShowFloatingHearts(false), 2000);
  };

  const handleCareAction = (action: () => void) => {
    action();
    triggerHearts();
  };

  // Get stat color based on value
  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get urgency level for actions
  const getActionUrgency = (statValue: number) => {
    if (statValue < 25) return 'urgent';
    if (statValue < 50) return 'needed';
    return 'normal';
  };

  const getActionStyle = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-500 hover:bg-red-600 animate-pulse';
      case 'needed':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  // Get time-based greeting
  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "It's very late! Your pet should be sleeping 🌙";
    if (hour < 12) return "Good morning! Your pet is ready for a new day ☀️";
    if (hour < 18) return "Good afternoon! Your pet is active and playful 🌤️";
    if (hour < 22) return "Good evening! Your pet is winding down 🌅";
    return "It's getting late! Your pet might be getting sleepy 🌙";
  };

  if (!personality) {
    return <div>Loading your pet...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Pet Display with Mood */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl font-bold">{character.name}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {moodState.happiness > 80 ? '😊 Happy' : 
               moodState.happiness > 60 ? '😐 Okay' : 
               moodState.happiness > 40 ? '😕 Sad' : '😢 Very Sad'}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{getTimeGreeting()}</p>
        </CardHeader>
        
        <CardContent className="text-center relative">
          {/* Character Display with Mood Text */}
          <div className="relative flex justify-center mb-6">
            <EmotionalCharacterRenderer 
              character={character} 
              moodState={moodState} 
              size={150}
              showMoodText={true}
            />
            
            {/* Floating Hearts Effect */}
            <AnimatePresence>
              {showFloatingHearts && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${30 + i * 10}%`,
                        top: `${40 + (i % 2) * 20}%`
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        y: -50, 
                        scale: [0, 1.2, 0],
                        rotate: [0, 15, -15, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Current Mood Message */}
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-blue-200"
          >
            <p className="text-lg font-medium text-gray-800 italic">
              "{currentMessage}"
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Mood Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            {personality.name}'s Vital Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Happiness', value: moodState.happiness, icon: '😊', color: 'bg-pink-500' },
            { name: 'Hunger', value: moodState.hunger, icon: '🍽️', color: 'bg-orange-500' },
            { name: 'Energy', value: moodState.energy, icon: '⚡', color: 'bg-yellow-500' },
            { name: 'Cleanliness', value: moodState.cleanliness, icon: '🧼', color: 'bg-blue-500' },
            { name: 'Rest', value: moodState.tiredness, icon: '💤', color: 'bg-purple-500' },
            { name: 'Affection', value: moodState.affection, icon: '💖', color: 'bg-red-500' },
            { name: 'Health', value: moodState.health, icon: '💚', color: 'bg-green-500' }
          ].map((stat) => (
            <div key={stat.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center gap-2">
                  <span>{stat.icon}</span>
                  {stat.name}
                </span>
                <Badge className={getStatColor(stat.value) === 'bg-red-500' ? 'bg-red-100 text-red-700' : 
                                 getStatColor(stat.value) === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-700' : 
                                 'bg-green-100 text-green-700'}>
                  {Math.round(stat.value)}%
                </Badge>
              </div>
              <Progress 
                value={stat.value} 
                className="h-3"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Care Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5 text-blue-500" />
            Pet Care Actions
          </CardTitle>
          <p className="text-sm text-gray-600">
            Take care of {personality.name}! Actions marked as urgent need immediate attention.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => handleCareAction(actions.feedPet)}
              className={`w-full h-20 flex flex-col gap-2 ${getActionStyle(getActionUrgency(moodState.hunger))}`}
            >
              <Utensils className="h-6 w-6" />
              <span>Feed</span>
              {getActionUrgency(moodState.hunger) === 'urgent' && (
                <Badge variant="destructive" className="text-xs">URGENT!</Badge>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => handleCareAction(actions.playWithPet)}
              className={`w-full h-20 flex flex-col gap-2 ${getActionStyle(getActionUrgency(moodState.energy))}`}
            >
              <Gamepad2 className="h-6 w-6" />
              <span>Play</span>
              {getActionUrgency(moodState.energy) === 'urgent' && (
                <Badge variant="destructive" className="text-xs">URGENT!</Badge>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => handleCareAction(actions.bathePet)}
              className={`w-full h-20 flex flex-col gap-2 ${getActionStyle(getActionUrgency(moodState.cleanliness))}`}
            >
              <Sparkles className="h-6 w-6" />
              <span>Bathe</span>
              {getActionUrgency(moodState.cleanliness) === 'urgent' && (
                <Badge variant="destructive" className="text-xs">URGENT!</Badge>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => handleCareAction(actions.petCharacter)}
              className={`w-full h-20 flex flex-col gap-2 ${getActionStyle(getActionUrgency(moodState.affection))}`}
            >
              <Heart className="h-6 w-6" />
              <span>Pet</span>
              {getActionUrgency(moodState.affection) === 'urgent' && (
                <Badge variant="destructive" className="text-xs">URGENT!</Badge>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => handleCareAction(actions.sleepPet)}
              className={`w-full h-20 flex flex-col gap-2 ${getActionStyle(getActionUrgency(100 - moodState.tiredness))}`}
            >
              <Moon className="h-6 w-6" />
              <span>Sleep</span>
            </Button>
          </motion.div>

          {moodState.health < 70 && (
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="col-span-1"
            >
              <Button 
                onClick={() => handleCareAction(actions.giveMedicine)}
                className="w-full h-20 flex flex-col gap-2 bg-green-500 hover:bg-green-600"
              >
                <Pill className="h-6 w-6" />
                <span>Medicine</span>
                {moodState.health < 30 && (
                  <Badge variant="destructive" className="text-xs">URGENT!</Badge>
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Pet Schedule & Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Schedule & Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Moon className="h-4 w-4 text-purple-500" />
            <span>Bedtime: {personality.sleepSchedule.bedtime}:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🌅</span>
            <span>Wake up: {personality.sleepSchedule.wakeTime}:00 AM</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>❤️</span>
            <span>Favorite activity: {personality.favoriteActivity}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimePetCare;
