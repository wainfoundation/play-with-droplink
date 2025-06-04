
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IconButton from '@/components/ui/icon-button';
import NavigationBar from '@/components/pet/NavigationBar';
import { 
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

  return (
    <>
      <Helmet>
        <title>PlayDrop - Your Virtual Pet Adventure</title>
        <meta name="description" content="Take care of your virtual droplet pet and watch it grow!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
        {/* Header - My Boo Style */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white relative">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl animate-bounce">💧</div>
                <div>
                  <h1 className="text-2xl font-bold">
                    PlayDrop
                  </h1>
                  <p className="text-sm opacity-90">Level {userStats.level} • Day {userStats.streak}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-yellow-400 text-black rounded-full px-4 py-2 font-bold">
                  <span className="text-lg">💰</span>
                  <span>{userStats.coins}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-2">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="font-bold text-sm">{userStats.xp}</span>
                </div>
                <IconButton
                  icon={Settings}
                  label="Settings"
                  onClick={() => navigate('/settings')}
                  className="bg-white/20 hover:bg-white/30"
                  size="sm"
                />
              </div>
            </div>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-6">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {/* Pet Display Area - My Boo Style */}
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce drop-shadow-lg">💧</div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Droplet Pet
                </h2>
                <p className="text-gray-600 mb-6 text-lg">Happy and energetic!</p>
                
                {/* Pet Stats - My Boo Style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-bold text-red-600">Happy</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{petStats.happiness}%</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-yellow-200">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <span className="text-lg">⚡</span>
                      <span className="text-sm font-bold text-yellow-600">Energy</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{petStats.energy}%</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <span className="text-lg">🍎</span>
                      <span className="text-sm font-bold text-green-600">Hunger</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{petStats.hunger}%</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <span className="text-lg">🛁</span>
                      <span className="text-sm font-bold text-blue-600">Clean</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{petStats.cleanliness}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-4 border-white shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Daily Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{userStats.streak} Days</div>
                  <p className="text-gray-600 mb-4">Keep playing to maintain your streak!</p>
                  <Button 
                    onClick={() => navigate('/missions')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-8 py-3 text-lg font-bold shadow-lg"
                  >
                    View Missions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-white shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium">Feed your pet</span>
                    <Badge className="bg-green-500 text-white rounded-full">✓ Done</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium">Play a mini game</span>
                    <Badge variant="outline" className="rounded-full">2/3</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium">Clean your pet</span>
                    <Badge variant="outline" className="rounded-full">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <NavigationBar />
      </div>
    </>
  );
};

export default EnhancedPetGame;
