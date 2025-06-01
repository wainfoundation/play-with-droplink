
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import GameEngine from '@/components/games/GameEngine';
import AllGames from '@/components/games/AllGames';
import LivesSystem from '@/components/games/LivesSystem';
import DroplinkButton from '@/components/games/DroplinkButton';
import { Play as PlayIcon, ArrowLeft } from 'lucide-react';

const Play: React.FC = () => {
  const { user, isLoggedIn } = useUser();
  const [searchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [lives, setLives] = useState(5);

  // Check for game parameters from URL (from droplinks)
  useEffect(() => {
    const gameId = searchParams.get('game');
    const level = searchParams.get('level');
    const challenge = searchParams.get('challenge');
    
    if (gameId) {
      setSelectedGame(gameId);
    }
  }, [searchParams]);

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <PlayIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Sign In to Play</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You need to sign in to access the games and track your progress.
            </p>
            <Button onClick={() => window.location.href = '/auth'} className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {selectedGame && (
              <Button variant="outline" onClick={handleBackToGames}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedGame ? 'Playing' : 'Choose Your Game'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {selectedGame && (
              <DroplinkButton 
                type="invite" 
                gameId={selectedGame}
              />
            )}
            <LivesSystem onLivesChange={setLives} />
          </div>
        </div>

        {selectedGame ? (
          <div className="space-y-6">
            <GameEngine 
              gameId={selectedGame}
              lives={lives}
              onLivesChange={setLives}
            />
          </div>
        ) : (
          <AllGames onGameSelect={setSelectedGame} />
        )}
      </div>
    </div>
  );
};

export default Play;
