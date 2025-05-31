
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Gamepad2, Sparkles, Heart, Star, Users, Trophy, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import { generateRandomName, resetUsedNames } from '@/utils/nameGenerator';
import Footer from '@/components/Footer';

const PlayWithMascot = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [charactersWithNames, setCharactersWithNames] = useState(characters);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGame, setCurrentGame] = useState<'memory' | 'reaction' | 'puzzle' | null>(null);

  useEffect(() => {
    // Generate random names for characters
    resetUsedNames();
    const updatedCharacters = characters.map(character => ({
      ...character,
      name: generateRandomName()
    }));
    setCharactersWithNames(updatedCharacters);
    setSelectedCharacter(updatedCharacters[0]);
  }, []);

  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Test your memory with your character companion!',
      icon: '🧠',
      difficulty: 'Easy',
      reward: '10-50 Points'
    },
    {
      id: 'reaction',
      title: 'Quick Reactions',
      description: 'How fast can you react? Challenge yourself!',
      icon: '⚡',
      difficulty: 'Medium',
      reward: '20-100 Points'
    },
    {
      id: 'puzzle',
      title: 'Puzzle Solver',
      description: 'Solve puzzles with your character by your side!',
      icon: '🧩',
      difficulty: 'Hard',
      reward: '50-200 Points'
    }
  ];

  const handleCharacterSelect = (character: typeof characters[0]) => {
    setSelectedCharacter(character);
  };

  const handleStartGame = (gameType: 'memory' | 'reaction' | 'puzzle') => {
    setCurrentGame(gameType);
    setIsPlaying(true);
    // Simple demo game logic
    setTimeout(() => {
      const points = Math.floor(Math.random() * 100) + 10;
      setGameScore(prev => prev + points);
      setIsPlaying(false);
      setCurrentGame(null);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Play with Droplink - Interactive Gaming with Character Companions</title>
        <meta name="description" content="Play interactive games with your Droplink character companions. Earn points, have fun, and enjoy the Pi Network gaming experience!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Play with Droplink</h1>
                  <p className="text-sm text-gray-600">Your Gaming Companion</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {gameScore} Points
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {charactersWithNames.length} Characters
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Character Selection */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Your Companion
                  </h2>
                  
                  {/* Selected Character Display */}
                  <div className="text-center mb-6">
                    <CharacterRenderer character={selectedCharacter} size={120} />
                    <h3 className="font-semibold text-lg mt-3">{selectedCharacter.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCharacter.personality}</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {selectedCharacter.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedCharacter.mood}
                      </Badge>
                    </div>
                  </div>

                  {/* Character Selection Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {charactersWithNames.map((character) => (
                      <button
                        key={character.id}
                        onClick={() => handleCharacterSelect(character)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          selectedCharacter.id === character.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <CharacterRenderer character={character} size={40} />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Games Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Choose Your Game
                </h2>
                <p className="text-gray-600">Play games with {selectedCharacter.name} and earn points!</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                {games.map((game) => (
                  <Card key={game.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{game.icon}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{game.title}</h3>
                            <p className="text-gray-600 mb-2">{game.description}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{game.difficulty}</Badge>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Gift className="w-3 h-3" />
                                {game.reward}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleStartGame(game.id as 'memory' | 'reaction' | 'puzzle')}
                          disabled={isPlaying}
                          className="flex items-center gap-2"
                        >
                          {isPlaying && currentGame === game.id ? (
                            <>
                              <Zap className="w-4 h-4 animate-pulse" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Gamepad2 className="w-4 h-4" />
                              Play Now
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Game Status */}
              {isPlaying && (
                <Card className="mt-6 border-primary">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <CharacterRenderer character={selectedCharacter} size={60} />
                      <div>
                        <h3 className="font-semibold">Playing with {selectedCharacter.name}!</h3>
                        <p className="text-sm text-gray-600">Game in progress...</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full animate-pulse w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default PlayWithMascot;
