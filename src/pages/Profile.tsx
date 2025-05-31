
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Crown, 
  Trophy, 
  Calendar, 
  Settings,
  LogOut,
  Star,
  Gamepad2,
  Award,
  Zap,
  Clock
} from 'lucide-react';

const Profile = () => {
  const [subscriptionStatus] = useState<'free' | 'premium' | 'expired'>('free');
  const [userStats] = useState({
    gamesPlayed: 157,
    totalScore: 45620,
    rank: 42,
    piEarned: 12.5,
    playtime: 89,
    achievements: 23
  });

  const unlockedGames = [
    { name: 'Puzzle Master Pro', category: 'Puzzle', unlocked: '2024-01-15', price: '0.75 Pi' },
    { name: 'Speed Runner Elite', category: 'Action', unlocked: '2024-01-20', price: '1.0 Pi' },
    { name: 'Brain Teaser Ultimate', category: 'Trivia', unlocked: '2024-01-25', price: '0.5 Pi' }
  ];

  const gameHistory = [
    { game: 'Puzzle Challenge', score: 1250, date: '2024-01-30', duration: '15 min' },
    { game: 'Speed Runner', score: 980, date: '2024-01-30', duration: '8 min' },
    { game: 'Brain Quiz', score: 1450, date: '2024-01-29', duration: '12 min' },
    { game: 'Creative Builder', score: 2100, date: '2024-01-29', duration: '25 min' },
    { game: 'Action Hero', score: 1680, date: '2024-01-28', duration: '18 min' }
  ];

  const achievements = [
    { name: 'First Victory', description: 'Complete your first game', earned: '2024-01-10', icon: '🏆' },
    { name: 'Speed Demon', description: 'Complete a game in under 5 minutes', earned: '2024-01-12', icon: '⚡' },
    { name: 'Puzzle Master', description: 'Solve 10 puzzles in a row', earned: '2024-01-15', icon: '🧩' },
    { name: 'High Scorer', description: 'Achieve a score over 2000', earned: '2024-01-18', icon: '🎯' },
    { name: 'Daily Player', description: 'Play games 7 days in a row', earned: '2024-01-20', icon: '📅' },
    { name: 'Premium Member', description: 'Subscribe to Premium', earned: null, icon: '👑' }
  ];

  const getSubscriptionBadge = () => {
    switch (subscriptionStatus) {
      case 'free':
        return <Badge className="bg-gray-600">🆓 Free User</Badge>;
      case 'premium':
        return <Badge className="bg-purple-600">👑 Premium Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-600">⚠️ Premium Expired</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>👤 User Profile - Play with Droplink</title>
        <meta name="description" content="Manage your gaming profile, subscription, and game history on Play with Droplink" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ProGamer2024</h1>
            <p className="text-gray-300 mb-4">Member since January 2024</p>
            {getSubscriptionBadge()}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Gamepad2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.gamesPlayed}</div>
                <div className="text-sm text-gray-400">Games Played</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.totalScore.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">#{userStats.rank}</div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.piEarned}</div>
                <div className="text-sm text-gray-400">Pi Earned</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.playtime}h</div>
                <div className="text-sm text-gray-400">Playtime</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.achievements}</div>
                <div className="text-sm text-gray-400">Achievements</div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="subscription" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 backdrop-blur-sm">
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Subscription Tab */}
            <TabsContent value="subscription">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Subscription Status
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subscriptionStatus === 'free' && (
                    <div className="bg-blue-900/30 p-6 rounded-lg">
                      <h4 className="font-bold text-white mb-3">🆓 Free Plan</h4>
                      <p className="text-blue-200 mb-4">
                        You're currently on the free plan. Upgrade to Premium for the ultimate gaming experience!
                      </p>
                      <ul className="text-sm text-blue-100 space-y-1 mb-4">
                        <li>✅ Access to basic games</li>
                        <li>❌ Ads between gameplay</li>
                        <li>❌ Limited difficulty levels</li>
                        <li>❌ Standard rewards only</li>
                      </ul>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium (10 Pi/month)
                      </Button>
                    </div>
                  )}

                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h4 className="font-bold text-white mb-3">💰 Purchased Games</h4>
                    <p className="text-gray-300 mb-4">
                      Games you've unlocked with one-time Pi payments
                    </p>
                    <div className="space-y-3">
                      {unlockedGames.map((game, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div>
                            <div className="font-medium text-white">{game.name}</div>
                            <div className="text-sm text-gray-400">{game.category} • Unlocked {game.unlocked}</div>
                          </div>
                          <Badge className="bg-green-600">{game.price}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Games Tab */}
            <TabsContent value="games">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Your Game Library</CardTitle>
                  <CardDescription className="text-gray-400">
                    Games you own and your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {unlockedGames.map((game, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-white">{game.name}</h4>
                          <Badge className="bg-blue-600">{game.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          Purchased on {game.unlocked} for {game.price}
                        </p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Gamepad2 className="w-4 h-4 mr-2" />
                          Play Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Game History</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your recent gaming sessions and scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gameHistory.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">🎮</div>
                          <div>
                            <div className="font-medium text-white">{session.game}</div>
                            <div className="text-sm text-gray-400">
                              {session.date} • {session.duration}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-400">{session.score.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Achievements & Badges</CardTitle>
                  <CardDescription className="text-gray-400">
                    Unlock achievements by completing challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        achievement.earned ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-800/30 border border-gray-600/30'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className={`font-bold ${achievement.earned ? 'text-green-400' : 'text-gray-400'}`}>
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-gray-300 mb-2">
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <Badge className="bg-green-600 text-xs">
                                Earned {achievement.earned}
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-600 text-xs">
                                Not yet earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Account Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
