
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Clock, Zap, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'normal' | 'bonus' | 'bomb';
  color: string;
}

interface TargetRushEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const TargetRushEngine: React.FC<TargetRushEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);

  const spawnTarget = useCallback(() => {
    const gameArea = { width: 400, height: 300 };
    const targetTypes = ['normal', 'normal', 'normal', 'bonus', 'bomb'] as const;
    const type = targetTypes[Math.floor(Math.random() * targetTypes.length)];
    
    const newTarget: Target = {
      id: Date.now() + Math.random(),
      x: Math.random() * (gameArea.width - 60),
      y: Math.random() * (gameArea.height - 60),
      size: type === 'bonus' ? 40 : type === 'bomb' ? 50 : 60,
      speed: 1 + level * 0.2,
      type,
      color: type === 'bonus' ? '#10B981' : type === 'bomb' ? '#EF4444' : '#3B82F6'
    };

    setTargets(prev => [...prev, newTarget]);
  }, [level]);

  const startGame = () => {
    setTargets([]);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setCombo(0);
    setGameState('playing');
  };

  const hitTarget = (target: Target) => {
    setTargets(prev => prev.filter(t => t.id !== target.id));
    
    if (target.type === 'bomb') {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('completed');
          onGameComplete(score);
        }
        return newLives;
      });
      setCombo(0);
      toast({
        title: "Bomb Hit!",
        description: "You hit a bomb! Lost a life.",
        variant: "destructive"
      });
    } else {
      const points = target.type === 'bonus' ? 50 : 10;
      const comboBonus = combo * 2;
      const totalPoints = points + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setCombo(prev => prev + 1);
      
      if (target.type === 'bonus') {
        toast({
          title: "Bonus Target!",
          description: `+${totalPoints} points! Combo x${combo + 1}`,
        });
      }
    }
  };

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

  // Spawn targets
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        if (Math.random() < 0.7) {
          spawnTarget();
        }
      }, 1000 - level * 50);
    }
    return () => clearInterval(interval);
  }, [gameState, level, spawnTarget]);

  // Remove targets that have been on screen too long
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTargets(prev => {
          const now = Date.now();
          const filtered = prev.filter(target => now - target.id < 3000);
          
          if (filtered.length < prev.length) {
            setCombo(0); // Reset combo when targets expire
          }
          
          return filtered;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              <div className="text-2xl">🎯</div>
              Target Rush
            </CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold">Target Rush!</h2>
            <p className="text-gray-600">
              Hit the targets as fast as you can!
              <br />
              Blue targets = 10 points, Green = 50 points, Red = BOMB!
            </p>
            <Button size="lg" onClick={startGame}>
              Start Playing!
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
            <CardTitle>Game Over!</CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">{lives > 0 ? '⏰' : '💥'}</div>
            <h2 className="text-2xl font-bold">
              {lives > 0 ? 'Time Up!' : 'Game Over!'}
            </h2>
            <p className="text-gray-600">
              Final Score: {score}
              <br />
              Max Combo: {combo}
            </p>
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
            <div className="text-2xl">🎯</div>
            Target Rush
          </CardTitle>
          <Badge variant="outline">Level {level}</Badge>
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
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-semibold">{lives}</span>
            </div>
            <p className="text-xs text-gray-600">Lives</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">{combo}</span>
            </div>
            <p className="text-xs text-gray-600">Combo</p>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gray-900 rounded-lg mx-auto" style={{ width: 400, height: 300 }}>
          {targets.map(target => (
            <button
              key={target.id}
              className="absolute rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center text-white font-bold"
              style={{
                left: target.x,
                top: target.y,
                width: target.size,
                height: target.size,
                backgroundColor: target.color,
                animation: `pulse 0.5s ease-in-out infinite alternate`
              }}
              onClick={() => hitTarget(target)}
            >
              {target.type === 'bonus' ? '💎' : target.type === 'bomb' ? '💣' : '🎯'}
            </button>
          ))}
          
          {targets.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              Targets will appear here...
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Hit targets to score! Avoid bombs! Build combos for bonus points!
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetRushEngine;
