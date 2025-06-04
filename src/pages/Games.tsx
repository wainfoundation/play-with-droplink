
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, Star, Home, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const Games: React.FC = () => {
  const navigate = useNavigate();

  const gameCategories = [
    {
      id: 'arcade',
      name: 'Arcade',
      icon: Gamepad2,
      color: 'bg-red-500 hover:bg-red-600',
      games: ['DropTap Dash', 'Catch the Fruit', 'Color Match']
    },
    {
      id: 'puzzle',
      name: 'Puzzle',
      icon: Target,
      color: 'bg-purple-500 hover:bg-purple-600',
      games: ['Block Connect', 'Sudoku', 'Word Search']
    },
    {
      id: 'action',
      name: 'Action',
      icon: Zap,
      color: 'bg-orange-500 hover:bg-orange-600',
      games: ['Pet Run', 'Jump Quest', 'Speed Challenge']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mini Games - Play with Droplink</title>
        <meta name="description" content="Play fun mini games and earn coins for your pet!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              🎮 Mini Games
            </h1>
            <p className="text-lg text-gray-600">
              Play games to earn coins and XP for your pet!
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">High Score: 1,250</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                <Star className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Games Played: 47</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center mb-8">
            <IconButton
              icon={Home}
              label="Back Home"
              onClick={() => navigate('/play')}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>

          {/* Game Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {gameCategories.map((category) => (
              <IconButton
                key={category.id}
                icon={category.icon}
                label={category.name}
                onClick={() => console.log(`Play ${category.name} games`)}
                className={category.color}
                size="lg"
              />
            ))}
          </div>

          {/* Detailed Game Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6" />
                    {category.name} Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.games.map((game, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{game}</span>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                          Play
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Game */}
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Zap className="h-8 w-8" />
                  Featured: DropTap Dash
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Test your reflexes in this fast-paced dropping game! Collect droplets and avoid obstacles.
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold">
                  Play Now - Earn 6 XP!
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
