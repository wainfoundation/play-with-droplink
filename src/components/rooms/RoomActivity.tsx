
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Utensils, Sparkles, Gamepad2, Pill, Trees } from 'lucide-react';
import { motion } from 'framer-motion';
import { Room } from '@/hooks/useRooms';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';
import EmotionalCharacterRenderer from '@/components/welcome/EmotionalCharacterRenderer';
import { useCharacterShop } from '@/hooks/useCharacterShop';

interface RoomActivityProps {
  room: Room;
  onBack: () => void;
}

const RoomActivity: React.FC<RoomActivityProps> = ({ room, onBack }) => {
  const { selectedCharacterId, characters } = useCharacterShop();
  const { moodState, actions } = usePetMoodEngine(selectedCharacterId || 'default');

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);
  
  // Create character object for renderer
  const characterForRenderer = selectedCharacter ? {
    id: selectedCharacter.id,
    name: selectedCharacter.name,
    gender: selectedCharacter.gender,
    color: selectedCharacter.color,
    mood: 'happy',
    personality: 'friendly'
  } : null;

  const getRoomActions = () => {
    switch (room.room_type) {
      case 'kitchen':
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={actions.feedPet}
              className="w-full h-20 bg-orange-500 hover:bg-orange-600 flex flex-col gap-2"
            >
              <Utensils className="w-8 h-8" />
              <span>Feed Pet</span>
            </Button>
          </motion.div>
        );
        
      case 'bath':
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={actions.bathePet}
              className="w-full h-20 bg-blue-500 hover:bg-blue-600 flex flex-col gap-2"
            >
              <Sparkles className="w-8 h-8" />
              <span>Bathe Pet</span>
            </Button>
          </motion.div>
        );
        
      case 'play':
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={actions.playWithPet}
              className="w-full h-20 bg-green-500 hover:bg-green-600 flex flex-col gap-2"
            >
              <Gamepad2 className="w-8 h-8" />
              <span>Play Together</span>
            </Button>
          </motion.div>
        );
        
      case 'medicine':
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={actions.giveMedicine}
              className="w-full h-20 bg-red-500 hover:bg-red-600 flex flex-col gap-2"
            >
              <Pill className="w-8 h-8" />
              <span>Give Medicine</span>
            </Button>
          </motion.div>
        );
        
      case 'outside':
        return (
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={actions.playWithPet}
                className="w-full h-20 bg-green-500 hover:bg-green-600 flex flex-col gap-2"
              >
                <Trees className="w-8 h-8" />
                <span>Explore</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={actions.petCharacter}
                className="w-full h-20 bg-pink-500 hover:bg-pink-600 flex flex-col gap-2"
              >
                <Heart className="w-8 h-8" />
                <span>Relax</span>
              </Button>
            </motion.div>
          </div>
        );
        
      default:
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={actions.petCharacter}
              className="w-full h-20 bg-purple-500 hover:bg-purple-600 flex flex-col gap-2"
            >
              <Heart className="w-8 h-8" />
              <span>Pet</span>
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen p-4"
      style={{ backgroundColor: room.background_color }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{room.name}</CardTitle>
            <p className="text-center text-gray-600">{room.description}</p>
          </CardHeader>
          <CardContent>
            {/* Pet Display */}
            <div className="flex justify-center mb-6 p-8 bg-white/50 rounded-xl">
              {characterForRenderer ? (
                <EmotionalCharacterRenderer
                  character={characterForRenderer}
                  moodState={moodState}
                  size={150}
                  showMoodText={true}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>No character selected</p>
                  <p className="text-sm">Please select a character in the shop</p>
                </div>
              )}
            </div>

            {/* Pet Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-semibold">Happiness</span>
                </div>
                <Progress value={moodState.happiness} className="h-2" />
                <span className="text-xs text-gray-600">{Math.round(moodState.happiness)}%</span>
              </div>

              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold">Hunger</span>
                </div>
                <Progress value={moodState.hunger} className="h-2" />
                <span className="text-xs text-gray-600">{Math.round(moodState.hunger)}%</span>
              </div>

              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold">Cleanliness</span>
                </div>
                <Progress value={moodState.cleanliness} className="h-2" />
                <span className="text-xs text-gray-600">{Math.round(moodState.cleanliness)}%</span>
              </div>

              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold">Energy</span>
                </div>
                <Progress value={moodState.energy} className="h-2" />
                <span className="text-xs text-gray-600">{Math.round(moodState.energy)}%</span>
              </div>
            </div>

            {/* Room Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Room Activities</h3>
              {getRoomActions()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomActivity;
