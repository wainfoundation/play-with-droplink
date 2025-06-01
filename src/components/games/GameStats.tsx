
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Clock, Target, Infinity } from 'lucide-react';

interface GameStatsProps {
  score: number;
  level: number;
  streak?: number;
  timeLeft?: number;
  totalLevels?: number;
  accuracy?: number;
  className?: string;
}

const GameStats: React.FC<GameStatsProps> = ({
  score,
  level,
  streak = 0,
  timeLeft,
  totalLevels,
  accuracy,
  className = ""
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLevelDisplay = (): string => {
    if (totalLevels && totalLevels !== 9999999) {
      return `${level}/${totalLevels}`;
    }
    return level.toLocaleString();
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Game Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Score */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-lg">{score.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-600">Score</p>
          </div>

          {/* Level */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {totalLevels === 9999999 ? (
                <Infinity className="w-4 h-4 text-blue-500" />
              ) : (
                <Target className="w-4 h-4 text-blue-500" />
              )}
              <span className="font-bold text-lg">{getLevelDisplay()}</span>
            </div>
            <p className="text-xs text-gray-600">Level</p>
          </div>

          {/* Streak */}
          {streak > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-orange-500">🔥</span>
                <span className="font-bold text-lg">{streak}</span>
              </div>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
          )}

          {/* Time */}
          {timeLeft !== undefined && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock className={`w-4 h-4 ${timeLeft < 30 ? 'text-red-500' : 'text-green-500'}`} />
                <span className={`font-bold text-lg ${timeLeft < 30 ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <p className="text-xs text-gray-600">Time</p>
            </div>
          )}

          {/* Accuracy */}
          {accuracy !== undefined && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="font-bold text-lg">{accuracy}%</span>
              </div>
              <p className="text-xs text-gray-600">Accuracy</p>
            </div>
          )}
        </div>

        {/* Level Badge for Infinite Games */}
        {totalLevels === 9999999 && (
          <div className="mt-4 text-center">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              ∞ Infinite Levels Available
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStats;
