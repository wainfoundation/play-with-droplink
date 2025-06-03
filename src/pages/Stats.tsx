
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Droplets, Smile, TrendingUp, Award } from 'lucide-react';

const Stats: React.FC = () => {
  const petStats = {
    happiness: 85,
    energy: 70,
    hunger: 40,
    cleanliness: 90,
    health: 95,
    level: 5,
    xp: 750,
    xpToNextLevel: 1000
  };

  const achievements = [
    { id: 1, name: 'First Pet', description: 'Adopt your first pet', earned: true },
    { id: 2, name: 'Good Caretaker', description: 'Feed your pet 10 times', earned: true },
    { id: 3, name: 'Clean Pet', description: 'Keep pet clean for 7 days', earned: false },
    { id: 4, name: 'Game Master', description: 'Win 5 mini-games', earned: false },
  ];

  return (
    <>
      <Helmet>
        <title>Pet Stats - Play with Droplink</title>
        <meta name="description" content="View your pet's stats, level, and achievements" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Pet Statistics
            </h1>
            <p className="text-lg text-gray-600">
              Monitor your pet's health and progress
            </p>
          </div>

          {/* Level and XP */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                Level & Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">Level {petStats.level}</span>
                <span className="text-sm text-gray-600">{petStats.xp}/{petStats.xpToNextLevel} XP</span>
              </div>
              <Progress value={(petStats.xp / petStats.xpToNextLevel) * 100} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {petStats.xpToNextLevel - petStats.xp} XP until next level
              </p>
            </CardContent>
          </Card>

          {/* Pet Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Smile className="h-6 w-6 text-yellow-500" />
                  Happiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={petStats.happiness} className="h-3" />
                  <p className="text-sm text-gray-600">{petStats.happiness}% Happy</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  Energy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={petStats.energy} className="h-3" />
                  <p className="text-sm text-gray-600">{petStats.energy}% Energized</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Hunger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={100 - petStats.hunger} className="h-3" />
                  <p className="text-sm text-gray-600">{100 - petStats.hunger}% Full</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Droplets className="h-6 w-6 text-cyan-500" />
                  Cleanliness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={petStats.cleanliness} className="h-3" />
                  <p className="text-sm text-gray-600">{petStats.cleanliness}% Clean</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-yellow-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {achievement.earned ? (
                        <Award className="h-6 w-6 text-yellow-600" />
                      ) : (
                        <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />
                      )}
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Back to Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
