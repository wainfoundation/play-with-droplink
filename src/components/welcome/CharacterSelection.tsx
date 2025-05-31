
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Play, Shuffle } from 'lucide-react';
import CharacterRenderer from './CharacterRenderer';
import { characters } from './characterData';
import { generateRandomName, resetUsedNames } from '@/utils/nameGenerator';

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
  const [charactersWithRandomNames, setCharactersWithRandomNames] = useState(characters);

  useEffect(() => {
    // Reset used names and generate new random names for all characters
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithRandomNames(updatedCharacters);
  }, []);

  const handleGenerateNewNames = () => {
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithRandomNames(updatedCharacters);
  };

  const selectedCharacterData = charactersWithRandomNames.find(c => c.id === selectedCharacter);

  return (
    <>
      <Helmet>
        <title>Choose Your Gaming Character - Droplink</title>
        <meta name="description" content="Choose your gaming companion for the Droplink gaming experience." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Choose Your Gaming Character
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Select a character to accompany you on your gaming adventure!
            </p>
            
            {/* Generate New Names Button */}
            <Button 
              onClick={handleGenerateNewNames}
              variant="outline"
              className="mb-6 flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Generate New Names
            </Button>
            
            {/* Character Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
              {charactersWithRandomNames.map((character) => (
                <div
                  key={character.id}
                  onClick={() => onCharacterSelect(character.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCharacter === character.id
                      ? 'bg-white border-4 border-primary shadow-lg scale-105'
                      : 'bg-white/50 border-2 border-gray-200 hover:shadow-md hover:scale-102'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <CharacterRenderer character={character} size={80} />
                    <div className="mt-3 text-center">
                      <h3 className="font-semibold text-lg">{character.name}</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          character.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {character.gender === 'male' ? '♂' : '♀'} {character.gender}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {character.mood}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{character.personality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Selected Character Preview */}
            {selectedCharacterData && (
              <div className="bg-white rounded-xl p-6 mb-8 border-2 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Your Gaming Companion:</h3>
                <div className="flex items-center justify-center gap-6">
                  <CharacterRenderer character={selectedCharacterData} size={100} />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">{selectedCharacterData.name}</h4>
                    <p className="text-gray-600 mb-2">{selectedCharacterData.personality}</p>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedCharacterData.gender === 'male' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-pink-100 text-pink-700'
                      }`}>
                        {selectedCharacterData.gender}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {selectedCharacterData.mood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button 
                onClick={onConfirm}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
              >
                Start Gaming
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterSelection;
