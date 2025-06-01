
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play as PlayIcon, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Play: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    { id: 'puzzle', name: 'Puzzle Game', emoji: '🧩' },
    { id: 'memory', name: 'Memory Game', emoji: '🧠' },
    { id: 'trivia', name: 'Trivia Quiz', emoji: '❓' },
    { id: 'action', name: 'Action Game', emoji: '⚡' }
  ];

  if (currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentGame(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Button>
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Playing: {games.find(g => g.id === currentGame)?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">
                {games.find(g => g.id === currentGame)?.emoji}
              </div>
              <p className="text-lg text-gray-600">
                Game is loading... Have fun playing!
              </p>
              <Button 
                onClick={() => setCurrentGame(null)}
                variant="outline"
              >
                Choose Different Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Welcome
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Game</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{game.emoji}</div>
                <CardTitle>{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  onClick={() => setCurrentGame(game.id)}
                  className="w-full flex items-center gap-2"
                >
                  <PlayIcon className="w-4 h-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Play;
