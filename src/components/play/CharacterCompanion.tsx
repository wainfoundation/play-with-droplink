
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Heart, Gamepad2 } from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';

interface Character {
  id: string;
  name: string;
  gender: string;
  color: string;
  mood: string;
  personality: string;
}

interface CharacterCompanionProps {
  character: Character;
  selectedGame: string | null;
}

const CharacterCompanion: React.FC<CharacterCompanionProps> = ({ character, selectedGame }) => {
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [characterMood, setCharacterMood] = useState(character.mood);

  useEffect(() => {
    // Load user stats from localStorage
    const savedScore = localStorage.getItem('totalScore');
    const savedGames = localStorage.getItem('gamesPlayed');
    
    if (savedScore) setTotalScore(parseInt(savedScore, 10));
    if (savedGames) setGamesPlayed(parseInt(savedGames, 10));
  }, []);

  useEffect(() => {
    // Change character mood based on selected game
    if (selectedGame) {
      setCharacterMood('excited');
    } else {
      setCharacterMood(character.mood);
    }
  }, [selectedGame, character.mood]);

  const getEncouragementMessage = () => {
    if (selectedGame) {
      return `${character.name} is excited to watch you play!`;
    }
    
    if (gamesPlayed === 0) {
      return `${character.name} is ready for your first game!`;
    }
    
    if (gamesPlayed < 5) {
      return `${character.name} says: "You're doing great! Let's play more!"`;
    }
    
    return `${character.name} is impressed by your skills!`;
  };

  const handleCharacterInteraction = () => {
    // Simple character interaction
    const messages = [
      `${character.name}: "Ready for another game?"`,
      `${character.name}: "You're amazing at this!"`,
      `${character.name}: "I believe in you!"`,
      `${character.name}: "Let's have some fun!"`,
      `${character.name}: "Choose your favorite game!"`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
  };

  const currentCharacter = {
    ...character,
    mood: characterMood
  };

  return (
    <div className="space-y-6">
      {/* Character Display Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            Your Gaming Companion
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {/* Character Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CharacterRenderer character={currentCharacter} size={120} />
              {selectedGame && (
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <div className="bg-yellow-400 rounded-full p-1">
                    <Star className="w-4 h-4 text-yellow-800" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Character Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{character.personality}</p>
            
            <div className="flex justify-center gap-2 mb-4">
              <Badge 
                variant="outline" 
                className={`${
                  character.gender === 'male' 
                    ? 'bg-blue-100 text-blue-700 border-blue-300' 
                    : 'bg-pink-100 text-pink-700 border-pink-300'
                }`}
              >
                {character.gender === 'male' ? '♂' : '♀'} {character.gender}
              </Badge>
              <Badge 
                variant="outline" 
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                {characterMood}
              </Badge>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              {getEncouragementMessage()}
            </p>
          </div>

          {/* Character Interaction Button */}
          <Button 
            onClick={handleCharacterInteraction}
            variant="outline"
            className="w-full flex items-center gap-2 hover:bg-blue-50"
          >
            <Heart className="w-4 h-4" />
            Chat with {character.name}
          </Button>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Score</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {totalScore}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Games Played</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {gamesPlayed}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Level</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {Math.floor(gamesPlayed / 3) + 1}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            View Achievements
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Game History
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Change Character
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCompanion;
