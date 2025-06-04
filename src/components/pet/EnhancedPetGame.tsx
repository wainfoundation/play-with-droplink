
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IconButton from '@/components/ui/icon-button';
import { 
  Home, 
  Store, 
  Package, 
  Wallet,
  Gamepad2, 
  Target, 
  BarChart3,
  Settings,
  Heart,
  Coins,
  Star,
  Gift
} from 'lucide-react';

const EnhancedPetGame: React.FC = () => {
  const navigate = useNavigate();
  const [petStats] = useState({
    happiness: 85,
    energy: 78,
    hunger: 65,
    cleanliness: 90
  });

  const [userStats] = useState({
    coins: 1240,
    level: 15,
    xp: 2847,
    streak: 5
  });

  const quickActions = [
    { 
      icon: Store, 
      label: 'Shop', 
      path: '/shop', 
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Buy items for your pet'
    },
    { 
      icon: Package, 
      label: 'Inventory', 
      path: '/inventory', 
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Manage your items'
    },
    { 
      icon: Gamepad2, 
      label: 'Games', 
      path: '/games', 
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Play mini games'
    },
    { 
      icon: Target, 
      label: 'Missions', 
      path: '/missions', 
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Complete daily tasks'
    },
    { 
      icon: Wallet, 
      label: 'Wallet', 
      path: '/wallet', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Manage your coins'
    },
    { 
      icon: BarChart3, 
      label: 'Stats', 
      path: '/stats', 
      color: 'bg-cyan-500 hover:bg-cyan-600',
      description: 'View progress'
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <title>PlayDrop - Your Virtual Pet Adventure</title>
        <meta name="description" content="Take care of your virtual droplet pet and watch it grow!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">💧</div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    PlayDrop
                  </h1>
                  <p className="text-sm text-gray-600">Level {userStats.level} • Day {userStats.streak}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">{userStats.coins}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">{userStats.xp} XP</span>
                </div>
                <IconButton
                  icon={Settings}
                  label="Settings"
                  onClick={() => navigate('/settings')}
                  className="bg-gray-500 hover:bg-gray-600"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Pet Display Area */}
          <Card className="mb-6 bg-gradient-to-br from-blue-100 to-purple-100">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">💧</div>
                <h2 className="text-3xl font-bold mb-2">Your Droplet Pet</h2>
                <p className="text-gray-600 mb-6">Happy and energetic!</p>
                
                {/* Pet Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Happy</span>
                    </div>
                    <div className="text-lg font-bold text-red-600">{petStats.happiness}%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">⚡ Energy</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">{petStats.energy}%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">🍎 Hunger</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">{petStats.hunger}%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">🛁 Clean</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{petStats.cleanliness}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {quickActions.map((action) => (
              <div key={action.path} className="text-center">
                <IconButton
                  icon={action.icon}
                  label={action.label}
                  onClick={() => handleNavigate(action.path)}
                  className={action.color}
                  size="lg"
                />
                <p className="text-xs text-gray-600 mt-2">{action.description}</p>
              </div>
            ))}
          </div>

          {/* Daily Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  Daily Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.streak} Days</div>
                  <p className="text-gray-600 mb-4">Keep playing to maintain your streak!</p>
                  <Button 
                    onClick={() => navigate('/missions')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    View Missions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feed your pet</span>
                    <Badge className="bg-green-100 text-green-700">✓ Done</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Play a mini game</span>
                    <Badge variant="outline">2/3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clean your pet</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around items-center py-2">
              {[
                { icon: Home, label: 'Home', path: '/' },
                { icon: Target, label: 'Missions', path: '/missions' },
                { icon: Store, label: 'Shop', path: '/shop' },
                { icon: Package, label: 'Items', path: '/inventory' },
                { icon: Gamepad2, label: 'Games', path: '/games' }
              ].map(({ icon: Icon, label, path }) => (
                <Button
                  key={path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center gap-1 p-2 min-w-0"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedPetGame;
