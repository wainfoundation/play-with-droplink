
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  Calendar,
  Clock,
  Award
} from 'lucide-react';

const Leaderboards = () => {
  const [selectedGame, setSelectedGame] = useState('all');

  const dailyLeaders = [
    { rank: 1, username: "PuzzleMaster", score: 15420, avatar: "🎯", badge: "👑", change: "+2" },
    { rank: 2, username: "SpeedRunner", score: 14850, avatar: "⚡", badge: "🥈", change: "-1" },
    { rank: 3, username: "Brainiac", score: 14200, avatar: "🧠", badge: "🥉", change: "+1" },
    { rank: 4, username: "GameGuru", score: 13980, avatar: "🎮", badge: "", change: "+3" },
    { rank: 5, username: "ProPlayer", score: 13750, avatar: "⭐", badge: "👑", change: "-2" },
    { rank: 6, username: "QuizWhiz", score: 13500, avatar: "🤓", badge: "", change: "+1" },
    { rank: 7, username: "CreativeKing", score: 13200, avatar: "🎨", badge: "", change: "+4" },
    { rank: 8, username: "ActionHero", score: 12900, avatar: "💥", badge: "", change: "-1" },
    { rank: 9, username: "LogicLord", score: 12650, avatar: "🧩", badge: "", change: "+2" },
    { rank: 10, username: "GamerGirl", score: 12400, avatar: "🌟", badge: "👑", change: "-3" }
  ];

  const allTimeLeaders = [
    { rank: 1, username: "LegendaryGamer", score: 1254200, avatar: "👑", badge: "👑", games: 450 },
    { rank: 2, username: "MasterPlayer", score: 1198500, avatar: "🏆", badge: "👑", games: 423 },
    { rank: 3, username: "ProChampion", score: 1142000, avatar: "⭐", badge: "👑", games: 398 },
    { rank: 4, username: "GameMaster", score: 1098000, avatar: "🎯", badge: "👑", games: 367 },
    { rank: 5, username: "ElitePlayer", score: 1045000, avatar: "💎", badge: "👑", games: 334 }
  ];

  const premiumLeaders = [
    { rank: 1, username: "PremiumPro", score: 98420, avatar: "👑", badge: "👑", tier: "Diamond" },
    { rank: 2, username: "VIPGamer", score: 94850, avatar: "💎", badge: "👑", tier: "Platinum" },
    { rank: 3, username: "EliteUser", score: 91200, avatar: "⭐", badge: "👑", tier: "Gold" },
    { rank: 4, username: "PremiumAce", score: 87980, avatar: "🌟", badge: "👑", tier: "Gold" },
    { rank: 5, username: "TopTier", score: 84750, avatar: "🔥", badge: "👑", tier: "Silver" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</div>;
    }
  };

  const getChangeIndicator = (change: string) => {
    if (change.startsWith('+')) {
      return <Badge className="bg-green-600 text-xs">↗️ {change}</Badge>;
    } else if (change.startsWith('-')) {
      return <Badge className="bg-red-600 text-xs">↘️ {change}</Badge>;
    }
    return <Badge className="bg-gray-600 text-xs">- {change}</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>🏆 Leaderboards - Play with Droplink</title>
        <meta name="description" content="View daily, all-time, and premium leaderboards on Play with Droplink" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                🏆 Leaderboards
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Compete with players worldwide and climb the rankings
            </p>
          </div>

          {/* User's Current Rank */}
          <Card className="mb-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🎮</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Your Current Rank</h3>
                    <p className="text-blue-200">See how you stack up against other players</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">#42</div>
                  <div className="text-sm text-blue-200">Daily Rank</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 backdrop-blur-sm">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Daily Rankings
              </TabsTrigger>
              <TabsTrigger value="alltime" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                All-Time Leaders
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Premium Only
              </TabsTrigger>
            </TabsList>

            {/* Daily Rankings */}
            <TabsContent value="daily">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Daily Top Players
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Rankings reset every 24 hours • Last updated: 2 minutes ago
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyLeaders.map((player, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                        player.rank <= 3 ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30' : 'bg-gray-800/50'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(player.rank)}
                            {player.badge && <span className="text-lg">{player.badge}</span>}
                          </div>
                          <div className="text-3xl">{player.avatar}</div>
                          <div>
                            <div className="font-semibold text-white">{player.username}</div>
                            <div className="text-sm text-gray-400">Score: {player.score.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getChangeIndicator(player.change)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* All-Time Leaders */}
            <TabsContent value="alltime">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    All-Time Legends
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Lifetime achievements and high scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allTimeLeaders.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(player.rank)}
                            <span className="text-lg">{player.badge}</span>
                          </div>
                          <div className="text-3xl">{player.avatar}</div>
                          <div>
                            <div className="font-semibold text-white">{player.username}</div>
                            <div className="text-sm text-gray-400">
                              {player.score.toLocaleString()} points • {player.games} games
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-purple-600">
                          <Star className="w-3 h-3 mr-1" />
                          Legend
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Premium Only */}
            <TabsContent value="premium">
              <Card className="bg-gray-900/50 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Premium Exclusive Rankings
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Exclusive competitions with Pi rewards for premium subscribers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {premiumLeaders.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-400/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(player.rank)}
                            <span className="text-lg">{player.badge}</span>
                          </div>
                          <div className="text-3xl">{player.avatar}</div>
                          <div>
                            <div className="font-semibold text-white">{player.username}</div>
                            <div className="text-sm text-purple-200">
                              {player.score.toLocaleString()} points • {player.tier} Tier
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            Premium
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Premium CTA */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30 border border-purple-500/50 rounded-lg">
                    <div className="text-center">
                      <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="font-bold text-white mb-2">Want to compete here?</h4>
                      <p className="text-sm text-purple-200 mb-4">
                        Upgrade to Premium and join exclusive competitions with Pi rewards!
                      </p>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Game Filter */}
          <Card className="mt-8 bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Filter by Game</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {['All Games', 'Puzzle Master', 'Speed Runner', 'Brain Teaser', 'Creative Builder', 'Action Hero'].map((game, index) => (
                  <Button
                    key={index}
                    variant={selectedGame === game.toLowerCase().replace(' ', '_') ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedGame(game.toLowerCase().replace(' ', '_'))}
                  >
                    {game}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Leaderboards;
