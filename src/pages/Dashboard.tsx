
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Gamepad2, 
  Crown, 
  Trophy, 
  Gift, 
  User,
  Star,
  Coins,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const featuredGame = {
    name: "Puzzle Master Pro",
    category: "🧩 Puzzle & Logic",
    difficulty: "Medium",
    bonus: "2x Pi Rewards Today!",
    image: "🎯"
  };

  const quickActions = [
    { 
      name: "Free Games", 
      icon: Gamepad2, 
      color: "bg-green-600 hover:bg-green-700", 
      route: "/games/free",
      description: "Play with ads"
    },
    { 
      name: "Premium Games", 
      icon: Crown, 
      color: "bg-purple-600 hover:bg-purple-700", 
      route: "/games/premium",
      description: "Ad-free experience"
    },
    { 
      name: "Paid Games", 
      icon: Coins, 
      color: "bg-orange-600 hover:bg-orange-700", 
      route: "/games/paid",
      description: "Exclusive content"
    },
    { 
      name: "Leaderboards", 
      icon: Trophy, 
      color: "bg-yellow-600 hover:bg-yellow-700", 
      route: "/leaderboards",
      description: "See rankings"
    },
    { 
      name: "Rewards", 
      icon: Gift, 
      color: "bg-pink-600 hover:bg-pink-700", 
      route: "/rewards",
      description: "Claim prizes"
    },
    { 
      name: "Profile", 
      icon: User, 
      color: "bg-blue-600 hover:bg-blue-700", 
      route: "/profile",
      description: "Manage account"
    }
  ];

  return (
    <>
      <Helmet>
        <title>🏠 Home Dashboard - Play with Droplink</title>
        <meta name="description" content="Your gaming command center on Play with Droplink" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  🏠 Home Dashboard
                </span>
              </h1>
              <p className="text-gray-300">Welcome back to your gaming command center!</p>
            </div>
            <Badge className="bg-gray-600 text-white">
              🆓 Free User
            </Badge>
          </div>

          {/* Featured Game of the Day */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">⭐ Featured Game of the Day</CardTitle>
                  <CardDescription className="text-yellow-100">
                    Special bonuses and rewards for today's featured game
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{featuredGame.image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{featuredGame.name}</h3>
                    <p className="text-yellow-200 mb-1">{featuredGame.category}</p>
                    <Badge variant="secondary" className="text-xs">
                      {featuredGame.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-yellow-500/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-yellow-300 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{featuredGame.bonus}</span>
                    </div>
                    <p className="text-sm text-yellow-100">
                      Play now to earn double Pi rewards and exclusive badges!
                    </p>
                  </div>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold">
                    <Star className="w-4 h-4 mr-2" />
                    Play Featured Game
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-24 flex-col gap-2 border-gray-600 hover:border-gray-400 ${action.color} text-white transition-all duration-200 transform hover:scale-105`}
                onClick={() => navigate(action.route)}
              >
                <action.icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.name}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">15</div>
                <div className="text-sm text-gray-400">Games Played</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">2,450</div>
                <div className="text-sm text-gray-400">Total Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">#42</div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">0.5</div>
                <div className="text-sm text-gray-400">Pi Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">📈 Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧩</div>
                    <div>
                      <div className="font-medium text-white">Completed Puzzle Challenge</div>
                      <div className="text-sm text-gray-400">2 hours ago</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">+50 points</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <div className="font-medium text-white">New High Score in Speed Runner</div>
                      <div className="text-sm text-gray-400">5 hours ago</div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600">New Record!</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <div className="font-medium text-white">Earned Daily Challenger Badge</div>
                      <div className="text-sm text-gray-400">1 day ago</div>
                    </div>
                  </div>
                  <Badge className="bg-purple-600">Badge Unlocked</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
