
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Play, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import CharacterMoodSelector from '@/components/welcome/CharacterMoodSelector';
import { characters } from '@/components/welcome/characterData';
import { generateRandomName, resetUsedNames } from '@/utils/nameGenerator';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'character' | 'mood' | 'complete'>('character');
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [selectedMood, setSelectedMood] = useState('happy');
  const [charactersWithRandomNames, setCharactersWithRandomNames] = useState(characters);

  useEffect(() => {
    // Generate random names for characters
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithRandomNames(updatedCharacters);
    setSelectedCharacter(updatedCharacters[0]);
  }, []);

  const handleCharacterSelect = (character: any) => {
    setSelectedCharacter(character);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleNext = () => {
    if (step === 'character') {
      setStep('mood');
    } else if (step === 'mood') {
      // Save the final character with selected mood
      const finalCharacter = {
        ...selectedCharacter,
        mood: selectedMood,
        personality: getMoodPersonality(selectedMood)
      };
      localStorage.setItem('selectedCharacter', JSON.stringify(finalCharacter));
      localStorage.setItem('welcomeCompleted', 'true');
      navigate('/');
    }
  };

  const getMoodPersonality = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      'happy': 'Cheerful and optimistic!',
      'excited': 'Full of energy and enthusiasm!',
      'calm': 'Peaceful and serene.',
      'playful': 'Loves to play and have fun!',
      'sleepy': 'Feeling a bit drowsy.',
      'curious': 'Always wondering about things!'
    };
    return moodMap[mood] || 'A wonderful companion!';
  };

  return (
    <>
      <Helmet>
        <title>Welcome - Choose Your Pet Droplet</title>
        <meta name="description" content="Choose your pet droplet character and mood to start your digital pet adventure!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => step === 'mood' ? setStep('character') : navigate('/')}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 'mood' ? 'Back' : 'Home'}
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {step === 'character' ? 'Choose Your Character' : 'Choose Mood'}
            </h1>
            
            <div className="w-24" /> {/* Spacer */}
          </div>

          {step === 'character' && (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-6">
                  Select a character to be your digital pet companion!
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {charactersWithRandomNames.map((character) => (
                  <div
                    key={character.id}
                    onClick={() => handleCharacterSelect(character)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedCharacter.id === character.id
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
              <Card className="bg-white/80 backdrop-blur-sm max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">Your Selected Character</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CharacterRenderer character={selectedCharacter} size={120} />
                  <h3 className="text-xl font-bold mt-4">{selectedCharacter.name}</h3>
                  <p className="text-gray-600 italic">"{selectedCharacter.personality}"</p>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 'mood' && (
            <div className="space-y-8">
              <CharacterMoodSelector
                character={selectedCharacter}
                onMoodSelect={handleMoodSelect}
                selectedMood={selectedMood}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-8 py-3 text-lg flex items-center gap-2"
            >
              {step === 'character' ? 'Choose Mood' : 'Start Playing'}
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
