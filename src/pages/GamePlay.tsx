
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Home, 
  Crown, 
  Zap,
  Star,
  Timer,
  Target
} from 'lucide-react';
import { showInterstitialAdAdvanced } from '@/utils/pi-sdk';

const GamePlay = () => {
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'completed' | 'ad_break'>('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [userType] = useState<'free' | 'premium' | 'paid'>('free'); // This would come from auth

  // Game simulation
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            handleLevelComplete();
            return 0;
          }
          return newProgress;
        });
        
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleLevelComplete = async () => {
    setScore(prev => prev + level * 100);
    setLevel(prev => prev + 1);
    
    // Show ads for free users between levels
    if (userType === 'free' && level % 2 === 0) {
      setGameState('ad_break');
      setIsAdShowing(true);
      
      try {
        await showInterstitialAdAdvanced();
      } catch (error) {
        console.error('Ad failed to show:', error);
      } finally {
        setIsAdShowing(false);
        setGameState('playing');
      }
    }
  };

  const handlePlayPause = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setProgress(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  const getUserTypeBadge = () => {
    switch (userType) {
      case 'free':
        return <Badge className="bg-gray-600">🆓 Free User</Badge>;
      case 'premium':
        return <Badge className="bg-purple-600">👑 Premium</Badge>;
      case 'paid':
        return <Badge className="bg-orange-600">💰 Paid Game</Badge>;
    }
  };

  if (gameState === 'ad_break') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-white mb-4">Ad Break</h3>
            <p className="text-gray-300 mb-6">
              {isAdShowing ? 'Showing ad...' : 'Preparing ad content...'}
            </p>
            <div className="bg-blue-900/30 p-4 rounded-lg">
              <p className="text-sm text-blue-300">
                💡 Upgrade to Premium to enjoy ad-free gaming!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>🎮 Game Play - Puzzle Master Pro</title>
        <meta name="description" content="Playing Puzzle Master Pro on Play with Droplink" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Game Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-gray-600 text-gray-300">
                <Home className="w-4 h-4 mr-2" />
                Back to Playhouse
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">🎯 Puzzle Master Pro</h1>
                <p className="text-gray-400">Level {level} • Puzzle & Logic</p>
              </div>
            </div>
            {getUserTypeBadge()}
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{score.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{level}</div>
                <div className="text-sm text-gray-400">Level</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Timer className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{timeLeft}s</div>
                <div className="text-sm text-gray-400">Time Left</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-400">Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Game Area */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Game Canvas */}
            <div className="lg:col-span-3">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Game Area</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handlePlayPause}>
                        {gameState === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleRestart}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={progress} className="w-full" />
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🎯</div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {gameState === 'playing' ? 'Game in Progress' : 
                         gameState === 'paused' ? 'Game Paused' : 
                         'Game Complete!'}
                      </h3>
                      <p className="text-gray-300">
                        {gameState === 'playing' ? `Solve the puzzle to advance to level ${level + 1}` :
                         gameState === 'paused' ? 'Click play to continue' :
                         `Final Score: ${score.toLocaleString()} points`}
                      </p>
                      {gameState === 'completed' && (
                        <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleRestart}>
                          Play Again
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Info Sidebar */}
            <div className="space-y-4">
              {/* Access Level Info */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Access Level</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userType === 'free' && (
                    <div className="bg-yellow-900/30 p-3 rounded-lg">
                      <p className="text-yellow-300 text-sm mb-2">🆓 Free User Experience:</p>
                      <ul className="text-xs text-yellow-100 space-y-1">
                        <li>• Ads between levels</li>
                        <li>• Limited difficulty levels</li>
                        <li>• Standard rewards</li>
                      </ul>
                    </div>
                  )}
                  {userType === 'premium' && (
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <p className="text-purple-300 text-sm mb-2">👑 Premium Benefits:</p>
                      <ul className="text-xs text-purple-100 space-y-1">
                        <li>• No ads</li>
                        <li>• All difficulty levels</li>
                        <li>• 2x rewards</li>
                        <li>• Exclusive badges</li>
                      </ul>
                    </div>
                  )}
                  {userType === 'paid' && (
                    <div className="bg-orange-900/30 p-3 rounded-lg">
                      <p className="text-orange-300 text-sm mb-2">💰 Paid Game:</p>
                      <ul className="text-xs text-orange-100 space-y-1">
                        <li>• Exclusive content</li>
                        <li>• Special power-ups</li>
                        <li>• Premium rewards</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upgrade Prompt for Free Users */}
              {userType === 'free' && (
                <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Upgrade to Premium
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-3">
                      Enjoy ad-free gaming with all levels unlocked!
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                      Upgrade for 10 Pi/month
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Recent Achievements */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div>🏆</div>
                      <span className="text-gray-300">Level 5 Complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div>⭐</div>
                      <span className="text-gray-300">High Score</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div>🎯</div>
                      <span className="text-gray-300">Perfect Round</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePlay;
