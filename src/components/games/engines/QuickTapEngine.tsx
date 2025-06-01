
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Clock, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickTapEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const QuickTapEngine: React.FC<QuickTapEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [tapCount, setTapCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setTapCount(0);
    setBestStreak(0);
    setCurrentStreak(0);
    setMultiplier(1);
    setGameState('playing');
  };

  const handleTap = useCallback(() => {
    if (gameState !== 'playing') return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);

    setTapCount(prev => prev + 1);
    setCurrentStreak(prev => prev + 1);
    
    // Increase multiplier based on streak
    const newMultiplier = Math.min(Math.floor(currentStreak / 10) + 1, 5);
    setMultiplier(newMultiplier);
    
    const points = 1 * newMultiplier;
    setScore(prev => prev + points);

    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak);
    }

    // Special effects for milestones
    if (currentStreak > 0 && currentStreak % 25 === 0) {
      toast({
        title: "Amazing Streak!",
        description: `${currentStreak} taps in a row! Multiplier: ${newMultiplier}x`,
      });
    }
  }, [gameState, currentStreak, bestStreak]);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            onGameComplete(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft, score, onGameComplete]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        handleTap();
      }
    };

    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState, handleTap]);

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const getTapsPerSecond = () => {
    const elapsed = 30 - timeLeft;
    return elapsed > 0 ? (tapCount / elapsed).toFixed(1) : '0.0';
  };

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle className="flex items-center gap-2">
              <div className="text-2xl">⚡</div>
              Quick Tap
            </CardTitle>
            <Badge variant="outline">Infinity</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold">Quick Tap Challenge!</h2>
            <p className="text-gray-600">
              Tap as fast as you can for 30 seconds!
              <br />
              Build streaks to unlock multipliers up to 5x!
              <br />
              Use mouse clicks or spacebar/enter keys.
            </p>
            <Button size="lg" onClick={startGame}>
              Start Tapping!
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle>Time's Up!</CardTitle>
            <Badge variant="outline">Completed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold">Final Results!</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">{tapCount}</div>
                <div className="text-sm text-gray-600">Total Taps</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600">{bestStreak}</div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-600">{getTapsPerSecond()}</div>
                <div className="text-sm text-gray-600">Taps/Second</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={startGame} size="lg">
                Play Again
              </Button>
              <Button variant="outline" onClick={() => setGameState('menu')}>
                Menu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">⚡</div>
            Quick Tap
          </CardTitle>
          <Badge variant="outline">Playing</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{score}</span>
            </div>
            <p className="text-xs text-gray-600">Score</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-xs text-gray-600">Time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">{currentStreak}</span>
            </div>
            <p className="text-xs text-gray-600">Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-lg">×</span>
              <span className="font-semibold">{multiplier}</span>
            </div>
            <p className="text-xs text-gray-600">Multiplier</p>
          </div>
        </div>

        {/* Main Tap Button */}
        <div className="text-center mb-6">
          <Button
            onClick={handleTap}
            className={`w-64 h-64 rounded-full text-4xl font-bold transition-all duration-100 ${
              isAnimating ? 'scale-95 brightness-110' : 'scale-100'
            } bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl`}
            style={{
              background: `conic-gradient(from 0deg, #3B82F6, #8B5CF6, #3B82F6)`,
              transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            TAP!
          </Button>
        </div>

        {/* Game Info */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
            <span className="text-sm font-medium">Total Taps:</span>
            <span className="text-lg font-bold">{tapCount}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
            <span className="text-sm font-medium">Best Streak:</span>
            <span className="text-lg font-bold">{bestStreak}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
            <span className="text-sm font-medium">Taps/Second:</span>
            <span className="text-lg font-bold">{getTapsPerSecond()}</span>
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Keep tapping to build your streak and unlock multipliers!
          <br />
          Use mouse or keyboard (Space/Enter)
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTapEngine;
