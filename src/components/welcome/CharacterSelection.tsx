
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

interface CharacterSelectionProps {
  selectedCharacter: string;
  onCharacterSelect: (characterId: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacter,
  onCharacterSelect,
  onBack,
  onConfirm
}) => {
  const characters = [
    { id: 'droplet-blue', name: 'Blue Droplet', emoji: '💧', color: 'bg-blue-500' },
    { id: 'droplet-pink', name: 'Pink Droplet', emoji: '🌸', color: 'bg-pink-500' },
    { id: 'droplet-green', name: 'Green Droplet', emoji: '🌿', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Choose Your Character</h1>
          <p className="text-gray-600">Select your perfect droplet companion</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {characters.map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCharacter === character.id ? "default" : "outline"}
                className={`w-full p-6 h-auto flex items-center gap-4 ${
                  selectedCharacter === character.id ? character.color : ''
                }`}
                onClick={() => onCharacterSelect(character.id)}
              >
                <span className="text-3xl">{character.emoji}</span>
                <span className="text-lg font-medium">{character.name}</span>
                {selectedCharacter === character.id && (
                  <Check className="ml-auto h-5 w-5" />
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;
