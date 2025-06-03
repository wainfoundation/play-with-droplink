
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, Star, Lock } from 'lucide-react';

const Games: React.FC = () => {
  const miniGames = [
    {
      id: 1,
      name: 'Memory Match',
      description: 'Match pairs of cards to win coins',
      reward: '5-15 coins',
      difficulty: 'Easy',
      available: true,
      icon: '🧠'
    },
    {
      id: 2,
      name: 'Fruit Catch',
      description: 'Catch falling fruits to feed your pet',
      reward: '10-25 coins',
      difficulty: 'Medium',
      available: true,
      icon: '🍎'
    },
    {
      id: 3,
      name: 'Puzzle Boost',
      description: 'Solve puzzles to boost pet happiness',
      reward: '15-30 coins',
      difficulty: 'Hard',
      available: false,
      icon: '🧩'
    },
    {
      id: 4,
      name: 'Color Merge',
      description: 'Merge colors to create beautiful patterns',
      reward: '20-40 coins',
      difficulty: 'Expert',
      available: false,
      icon: '🎨'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mini Games - Play with Droplink</title>
        <meta name="description" content="Play fun mini-games and earn coins for your pet!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Mini Games
            </h1>
            <p className="text-lg text-gray-600">
              Play fun games and earn coins to care for your pet!
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="text-center py-6">
                <Trophy className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-blue-100">Games Won</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <CardContent className="text-center py-6">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-green-100">Total Score</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
              <CardContent className="text-center py-6">
                <Gamepad2 className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-yellow-100">Coins Earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {miniGames.map((game) => (
              <Card key={game.id} className={`hover:shadow-lg transition-shadow ${!game.available ? 'opacity-75' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{game.icon}</span>
                    <div>
                      <h3 className="text-xl">{game.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          game.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {game.difficulty}
                        </span>
                        {!game.available && (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">
                      Reward: {game.reward}
                    </span>
                    <Button 
                      disabled={!game.available}
                      className={game.available ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
                    >
                      {game.available ? 'Play Now' : 'Coming Soon'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
              className="mr-4"
            >
              Back to Game
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
