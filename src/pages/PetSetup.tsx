
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Play, Shuffle, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import { generateRandomName, resetUsedNames } from '@/utils/nameGenerator';
import { MusicToggle } from '@/components/ui/MusicToggle';
import { toast } from '@/hooks/use-toast';

const PetSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'character' | 'naming' | 'final'>('character');
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [petName, setPetName] = useState('');
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

  const handleGenerateNewNames = () => {
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithRandomNames(updatedCharacters);
  };

  const handleNext = () => {
    if (step === 'character') {
      setStep('naming');
      setPetName(selectedCharacter.name); // Pre-fill with character name
    } else if (step === 'naming') {
      if (petName.trim().length < 2) {
        toast({
          title: "Name too short",
          description: "Please enter a name with at least 2 characters",
          variant: "destructive"
        });
        return;
      }
      setStep('final');
    } else if (step === 'final') {
      // Save the final pet setup
      const finalPet = {
        ...selectedCharacter,
        name: petName.trim(),
        setupCompleted: true,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('selectedCharacter', JSON.stringify(finalPet));
      localStorage.setItem('petSetupCompleted', 'true');
      localStorage.setItem('welcomeCompleted', 'true');
      
      toast({
        title: "Welcome to Droplet Pet!",
        description: `${petName} is ready to play!`,
        className: "bg-green-50 border-green-200"
      });
      
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step === 'naming') {
      setStep('character');
    } else if (step === 'final') {
      setStep('naming');
    } else {
      navigate('/welcome');
    }
  };

  return (
    <>
      <Helmet>
        <title>Setup Your Pet - Droplet Pet</title>
        <meta name="description" content="Create and customize your virtual pet droplet companion" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Music Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <MusicToggle 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {step === 'character' && 'Choose Your Character'}
                  {step === 'naming' && 'Name Your Pet'}
                  {step === 'final' && 'Meet Your New Friend!'}
                </h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${step === 'character' ? 'bg-primary' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${step === 'naming' ? 'bg-primary' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${step === 'final' ? 'bg-primary' : 'bg-gray-300'}`} />
                </div>
              </div>
              
              <div className="w-24" />
            </div>

            {/* Character Selection Step */}
            {step === 'character' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-6">
                    Choose a character that will be your digital companion!
                  </p>
                  
                  <Button 
                    onClick={handleGenerateNewNames}
                    variant="outline"
                    className="mb-6 flex items-center gap-2 mx-auto"
                  >
                    <Shuffle className="h-4 w-4" />
                    Generate New Names
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {charactersWithRandomNames.map((character) => (
                    <motion.div
                      key={character.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharacterSelect(character)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedCharacter.id === character.id
                          ? 'bg-white border-4 border-primary shadow-lg'
                          : 'bg-white/70 border-2 border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <CharacterRenderer character={character} size={80} />
                        <div className="mt-3 text-center">
                          <h3 className="font-semibold text-lg">{character.name}</h3>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {character.gender === 'male' ? '♂' : '♀'} {character.gender}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Naming Step */}
            {step === 'naming' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-8">
                    Give your new friend a special name!
                  </p>
                </div>
                
                <Card className="bg-white/80 backdrop-blur-sm max-w-md mx-auto">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <CharacterRenderer character={selectedCharacter} size={120} />
                    </div>
                    <CardTitle className="text-center">Name Your Pet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="Enter pet name..."
                      className="text-center text-lg font-semibold"
                      maxLength={20}
                    />
                    <p className="text-sm text-gray-500 text-center">
                      Choose a name between 2-20 characters
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Final Step */}
            {step === 'final' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-8">
                    Congratulations! Your pet is ready to start their adventure!
                  </p>
                </div>
                
                <Card className="bg-white/80 backdrop-blur-sm max-w-md mx-auto">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-6"
                    >
                      <CharacterRenderer character={selectedCharacter} size={140} />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold mb-2">{petName}</h2>
                    <p className="text-gray-600 mb-4">{selectedCharacter.personality}</p>
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Badge className="bg-pink-100 text-pink-700">
                        <Heart className="h-3 w-3 mr-1" />
                        Ready to Play!
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Take good care of {petName} by feeding, playing, and keeping them happy!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Action Button */}
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-8 py-3 text-lg flex items-center gap-2"
              >
                {step === 'character' && 'Choose Name'}
                {step === 'naming' && 'Create Pet'}
                {step === 'final' && (
                  <>
                    Start Playing
                    <Play className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetSetup;
