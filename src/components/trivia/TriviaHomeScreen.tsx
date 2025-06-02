
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Coins, Star, Play, Trophy, ShoppingCart } from 'lucide-react';
import { UserStats } from '@/types/trivia';
import AuthGuard from '@/components/AuthGuard';

interface TriviaHomeScreenProps {
  userStats: UserStats;
  onStartGame: () => void;
  onShowLeaderboard: (show: boolean) => void;
  onShowShop: (show: boolean) => void;
}

const TriviaHomeScreen: React.FC<TriviaHomeScreenProps> = ({
  userStats,
  onStartGame,
  onShowLeaderboard,
  onShowShop
}) => {
  return (
    <AuthGuard requireAuth={true}>
      <>
        <Helmet>
          <title>Trivia Time - Test Your Knowledge!</title>
          <meta name="description" content="Challenge yourself with endless trivia questions and earn Pi rewards!" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
          <div className="container mx-auto max-w-2xl">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <div className="font-bold text-lg">{userStats.lives}</div>
                  <div className="text-sm text-gray-600">Lives</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <div className="font-bold text-lg">{userStats.coins}</div>
                  <div className="text-sm text-gray-600">Coins</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="font-bold text-lg">{userStats.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </CardContent>
              </Card>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                🧠 Trivia Time
              </h1>
              <p className="text-gray-600 text-lg">Test your knowledge and earn Pi rewards!</p>
            </div>

            {/* Main Menu */}
            <div className="space-y-4">
              <Button
                onClick={onStartGame}
                size="lg"
                className="w-full h-16 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Game
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => onShowLeaderboard(true)}
                  variant="outline"
                  size="lg"
                  className="h-14"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Leaderboard
                </Button>

                <Button
                  onClick={() => onShowShop(true)}
                  variant="outline"
                  size="lg"
                  className="h-14"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop
                </Button>
              </div>

              {/* Stats Display */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">My Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-bold text-2xl text-green-600">{userStats.totalCorrect}</div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-blue-600">{userStats.currentStreak}</div>
                      <div className="text-sm text-gray-600">Current Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
};

export default TriviaHomeScreen;
