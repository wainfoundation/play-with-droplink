
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CharacterRenderer from './CharacterRenderer';

interface Character {
  id: string;
  name: string;
  gender: string;
  color: string;
  mood: string;
  personality: string;
}

interface CharacterMoodSelectorProps {
  character: Character;
  onMoodSelect: (mood: string) => void;
  selectedMood: string;
}

const moods = [
  { id: 'happy', name: 'Happy', emoji: '😊', personality: 'Cheerful and optimistic!' },
  { id: 'excited', name: 'Excited', emoji: '🤩', personality: 'Full of energy and enthusiasm!' },
  { id: 'calm', name: 'Calm', emoji: '😌', personality: 'Peaceful and serene.' },
  { id: 'playful', name: 'Playful', emoji: '😄', personality: 'Loves to play and have fun!' },
  { id: 'sleepy', name: 'Sleepy', emoji: '😴', personality: 'Feeling a bit drowsy.' },
  { id: 'curious', name: 'Curious', emoji: '🤔', personality: 'Always wondering about things!' }
];

const CharacterMoodSelector: React.FC<CharacterMoodSelectorProps> = ({
  character,
  onMoodSelect,
  selectedMood
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center">Choose {character.name}'s Mood</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {moods.map((mood) => {
            const characterWithMood = { ...character, mood: mood.id, personality: mood.personality };
            
            return (
              <div
                key={mood.id}
                onClick={() => onMoodSelect(mood.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedMood === mood.id
                    ? 'bg-primary/10 border-4 border-primary shadow-lg scale-105'
                    : 'bg-gray-50 border-2 border-gray-200 hover:shadow-md hover:scale-102'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <CharacterRenderer character={characterWithMood} size={60} />
                  <div className="mt-2">
                    <span className="text-2xl mb-1 block">{mood.emoji}</span>
                    <h3 className="font-semibold text-sm">{mood.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{mood.personality}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <div className="bg-primary/5 rounded-xl p-4">
            <h4 className="font-semibold mb-2">Current Mood Preview:</h4>
            <div className="flex justify-center">
              <CharacterRenderer 
                character={{
                  ...character, 
                  mood: selectedMood,
                  personality: moods.find(m => m.id === selectedMood)?.personality || character.personality
                }} 
                size={80} 
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 italic">
              "{moods.find(m => m.id === selectedMood)?.personality || character.personality}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterMoodSelector;
