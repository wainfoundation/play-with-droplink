
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Zap, Users, Calendar, TrendingUp } from 'lucide-react';

const SudokuLeaderboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('weekly');

  const leaderboardData = {
    daily: [
      { rank: 1, name: "PiMaster2024", level: 156, score: 45600, streak: 12, avatar: "🏆" },
      { rank: 2, name: "SudokuKing", level: 143, score: 42800, streak: 8, avatar: "🥈" },
      { rank: 3, name: "PuzzlePro", level: 138, score: 41200, streak: 15, avatar: "🥉" },
      { rank: 4, name: "NumberNinja", level: 129, score: 38700, streak: 6, avatar: "⭐" },
      { rank: 5, name: "LogicLord", level: 125, score: 37500, streak: 9, avatar: "💎" },
    ],
    weekly: [
      { rank: 1, name: "SudokuSensei", level: 289, score: 87400, streak: 23, avatar: "🏆" },
      { rank: 2, name: "PiChampion", level: 267, score: 81200, streak: 18, avatar: "🥈" },
      { rank: 3, name: "GridMaster", level: 245, score: 76800, streak: 31, avatar: "🥉" },
      { rank: 4, name: "NumberWiz", level: 234, score: 72100, streak: 12, avatar: "⭐" },
      { rank: 5, name: "PuzzleAce", level: 223, score: 69500, streak: 7, avatar: "💎" },
    ],
    monthly: [
      { rank: 1, name: "SudokuLegend", level: 1247, score: 324000, streak: 67, avatar: "🏆" },
      { rank: 2, name: "PiGrandmaster", level: 1156, score: 298000, streak: 45, avatar: "🥈" },
      { rank: 3, name: "InfinitePlayer", level: 1089, score: 276000, streak: 89, avatar: "🥉" },
      { rank: 4, name: "EliteGamer", level: 987, score: 251000, streak: 23, avatar: "⭐" },
      { rank: 5, name: "ProSolver", level: 934, score: 238000, streak: 34, avatar: "💎" },
    ],
    allTime: [
      { rank: 1, name: "SudokuGod", level: 9999999, score: 25000000, streak: 456, avatar: "👑" },
      { rank: 2, name: "EternalMaster", level: 8765432, score: 22000000, streak: 389, avatar: "🏆" },
      { rank: 3, name: "InfiniteSage", level: 7654321, score: 19500000, streak: 234, avatar: "🥈" },
      { rank: 4, name: "NumberOracle", level: 6543210, score: 17000000, streak: 567, avatar: "🥉" },
      { rank: 5, name: "LogicPhoenix", level: 5432109, score: 15500000, streak: 123, avatar: "⭐" },
    ]
  };

  const duelStats = [
    { rank: 1, name: "DuelMaster", wins: 234, losses: 12, winRate: 95.1, avatar: "⚔️" },
    { rank: 2, name: "QuickSolver", wins: 189, losses: 23, winRate: 89.2, avatar: "⚡" },
    { rank: 3, name: "SpeedKing", wins: 156, losses: 19, winRate: 89.1, avatar: "🏃" },
    { rank: 4, name: "PvPPro", wins: 134, losses: 28, winRate: 82.7, avatar: "🎯" },
    { rank: 5, name: "BattleAce", wins: 98, losses: 15, winRate: 86.7, avatar: "🛡️" },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getRankIcon = (rank: number): string => {
    switch (rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const renderLeaderboardRow = (player: any, category: 'level' | 'duel' = 'level') => (
    <div key={player.rank} className={`flex items-center justify-between p-3 rounded-lg ${
      player.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200' : 'bg-gray-50'
    }`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{player.avatar}</div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{getRankIcon(player.rank)}</span>
            <span className="font-medium">{player.name}</span>
          </div>
          {category === 'level' ? (
            <div className="text-sm text-gray-600">
              Level {formatNumber(player.level)} • {player.streak} day streak
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              {player.wins}W - {player.losses}L • {player.winRate}% win rate
            </div>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-lg">
          {category === 'level' ? formatNumber(player.score) : `${player.wins}W`}
        </div>
        <div className="text-xs text-gray-500">
          {category === 'level' ? 'Total Score' : 'Total Wins'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Global Leaderboards</h2>
        </div>
        <p className="text-gray-600">Compete with players worldwide!</p>
      </div>

      <Tabs defaultValue="levels">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="levels" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Level Rankings
          </TabsTrigger>
          <TabsTrigger value="duels" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Duel Masters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="space-y-4">
          {/* Period Selector */}
          <div className="flex justify-center gap-2">
            {[
              { key: 'daily', label: 'Today', icon: '📅' },
              { key: 'weekly', label: 'This Week', icon: '📊' },
              { key: 'monthly', label: 'This Month', icon: '🗓️' },
              { key: 'allTime', label: 'All Time', icon: '♾️' }
            ].map(period => (
              <Button
                key={period.key}
                variant={selectedPeriod === period.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.key as any)}
              >
                {period.icon} {period.label}
              </Button>
            ))}
          </div>

          {/* Level Leaderboard */}
          <div className="space-y-2">
            {leaderboardData[selectedPeriod].map(player => renderLeaderboardRow(player, 'level'))}
          </div>

          {/* Your Rank */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👤</div>
                <div>
                  <div className="font-semibold">Your Rank: #1,247</div>
                  <div className="text-sm text-gray-600">Level 156 • 12 day streak</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">45,600</div>
                <div className="text-xs text-gray-500">Total Score</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="duels" className="space-y-4">
          {/* Duel Leaderboard */}
          <div className="space-y-2">
            {duelStats.map(player => renderLeaderboardRow(player, 'duel'))}
          </div>

          {/* Duel Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">Total Wins</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">7</div>
              <div className="text-sm text-gray-600">Total Losses</div>
            </div>
          </div>

          {/* Quick Duel Button */}
          <Button className="w-full" size="lg">
            <Users className="w-4 h-4 mr-2" />
            Start Quick Duel (2 Pi Entry)
          </Button>
        </TabsContent>
      </Tabs>

      {/* Rewards Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2 text-center">🎁 Weekly Rewards</h3>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-bold">🥇 #1</div>
            <div>100 Pi</div>
          </div>
          <div>
            <div className="font-bold">🥈 #2-5</div>
            <div>25 Pi</div>
          </div>
          <div>
            <div className="font-bold">🥉 #6-10</div>
            <div>10 Pi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuLeaderboard;
