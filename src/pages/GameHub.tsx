
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { useGames } from '@/hooks/useGames';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useIsMobile } from '@/hooks/use-mobile';
import GameEngine from '@/components/games/GameEngine';
import AllGames from '@/components/games/AllGames';
import LivesSystem from '@/components/games/LivesSystem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, Play as PlayIcon } from 'lucide-react';

const GameHub = () => {
  const { user, isLoggedIn, signOut } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { plan } = useUserPlan();
  const isMobile = useIsMobile();
  
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [lives, setLives] = useState(5);

  const isPremium = plan === 'premium';

  const handleGameSelect = (game: any) => {
    setCurrentGame(game);
    toast({
      title: `Starting ${game.name}`,
      description: isPremium ? "Enjoy ad-free gaming!" : "Get ready to play!",
    });
  };

  const handleBackToHub = () => {
    setCurrentGame(null);
  };

  const handleGameComplete = (score: number) => {
    toast({
      title: "Great Job!",
      description: `You earned ${score} points!`,
    });
  };

  const handleUpgradeToPremium = () => {
    toast({
      title: "Premium Features",
      description: "Premium features coming soon!",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "Come back soon for more gaming!",
    });
  };

  if (gamesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  // Show game engine if a game is selected
  if (currentGame) {
    return (
      <>
        <Helmet>
          <title>{currentGame.name} - Gaming Hub</title>
        </Helmet>
        <div className={isMobile ? "min-h-screen" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8"}>
          <div className={isMobile ? "" : "container mx-auto px-4"}>
            <GameEngine
              game={currentGame}
              onBack={handleBackToHub}
              onGameComplete={handleGameComplete}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gaming Hub - Play Amazing Games</title>
        <meta name="description" content="Play amazing games in our gaming hub! Puzzle games, action games, trivia, and more." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎮</div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                  Gaming Hub
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    <LivesSystem onLivesChange={setLives} />
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4" />
                        <span>{user?.username || user?.email}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button onClick={() => window.location.href = '/auth'}>
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto text-center">
              <Card>
                <CardHeader>
                  <PlayIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Welcome to Gaming Hub</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Sign in to access {games.length} amazing games and track your progress!
                  </p>
                  <Button onClick={() => window.location.href = '/auth'} className="w-full">
                    Sign In to Play
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Choose Your Game</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {games.length} games available
                  {isPremium && " - Premium unlocked!"}
                </p>
              </div>
              
              <AllGames 
                onGameSelect={handleGameSelect}
                onUpgradeToPremium={handleUpgradeToPremium}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default GameHub;
