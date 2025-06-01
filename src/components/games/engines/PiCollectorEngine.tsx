
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Clock, Coins, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PiCoin {
  id: number;
  x: number;
  y: number;
  value: number;
  type: 'normal' | 'golden' | 'mega';
  speed: number;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PiCollectorEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const PiCollectorEngine: React.FC<PiCollectorEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [player, setPlayer] = useState<Player>({ x: 180, y: 250, width: 40, height: 40 });
  const [coins, setCoins] = useState<PiCoin[]>([]);
  const [score, setScore] = useState(0);
  const [piCoins, setPiCoins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(2);

  const gameArea = { width: 400, height: 300 };

  const spawnCoin = useCallback(() => {
    const coinTypes = ['normal', 'normal', 'normal', 'golden', 'mega'] as const;
    const type = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    
    const newCoin: PiCoin = {
      id: Date.now() + Math.random(),
      x: Math.random() * (gameArea.width - 30),
      y: -30,
      value: type === 'mega' ? 10 : type === 'golden' ? 5 : 1,
      type,
      speed: 1 + level * 0.3
    };

    setCoins(prev => [...prev, newCoin]);
  }, [level, gameArea.width]);

  const startGame = () => {
    setPlayer({ x: 180, y: 250, width: 40, height: 40 });
    setCoins([]);
    setScore(0);
    setPiCoins(0);
    setTimeLeft(60);
    setLevel(1);
    setSpeed(2);
    setGameState('playing');
  };

  const movePlayer = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameState !== 'playing') return;

    setPlayer(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'left':
          newX = Math.max(0, prev.x - speed * 8);
          break;
        case 'right':
          newX = Math.min(gameArea.width - prev.width, prev.x + speed * 8);
          break;
        case 'up':
          newY = Math.max(0, prev.y - speed * 8);
          break;
        case 'down':
          newY = Math.min(gameArea.height - prev.height, prev.y + speed * 8);
          break;
      }

      return { ...prev, x: newX, y: newY };
    });
  }, [gameState, speed, gameArea.width, gameArea.height]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          movePlayer('right');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          movePlayer('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, movePlayer]);

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

  // Spawn coins
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        if (Math.random() < 0.8) {
          spawnCoin();
        }
      }, 800 - level * 50);
    }
    return () => clearInterval(interval);
  }, [gameState, level, spawnCoin]);

  // Move coins and check collisions
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setCoins(prev => {
          const updatedCoins = prev.map(coin => ({
            ...coin,
            y: coin.y + coin.speed
          })).filter(coin => coin.y < gameArea.height + 50);

          // Check for collisions
          updatedCoins.forEach((coin, index) => {
            if (
              player.x < coin.x + 30 &&
              player.x + player.width > coin.x &&
              player.y < coin.y + 30 &&
              player.y + player.height > coin.y
            ) {
              // Collision detected
              const points = coin.value * 10;
              setScore(prev => prev + points);
              setPiCoins(prev => prev + coin.value);

              if (coin.type === 'mega') {
                toast({
                  title: "Mega Pi Coin!",
                  description: `+${coin.value} Pi coins! (+${points} points)`,
                });
              } else if (coin.type === 'golden') {
                toast({
                  title: "Golden Pi Coin!",
                  description: `+${coin.value} Pi coins! (+${points} points)`,
                });
              }

              // Remove collected coin
              updatedCoins.splice(index, 1);
            }
          });

          return updatedCoins;
        });

        // Level up based on score
        const newLevel = Math.floor(score / 500) + 1;
        if (newLevel > level) {
          setLevel(newLevel);
          setSpeed(prev => prev + 0.5);
          toast({
            title: "Level Up!",
            description: `Welcome to level ${newLevel}! Coins fall faster now!`,
          });
        }
      }, 16); // ~60 FPS
    }
    return () => clearInterval(interval);
  }, [gameState, player, level, score, gameArea.height]);

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
              <div className="text-2xl">π</div>
              Pi Collector
            </CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">π💰</div>
            <h2 className="text-2xl font-bold">Pi Collector!</h2>
            <p className="text-gray-600">
              Collect falling Pi coins to earn points!
              <br />
              Normal coins = 1π, Golden = 5π, Mega = 10π
              <br />
              Use arrow keys or WASD to move around.
            </p>
            <Button size="lg" onClick={startGame}>
              Start Collecting!
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
            <CardTitle>Collection Complete!</CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold">Great Collection!</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-600">π {piCoins}</div>
                <div className="text-sm text-gray-600">Pi Coins Collected</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={startGame} size="lg">
                Collect Again
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
            <div className="text-2xl">π</div>
            Pi Collector
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
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">π {piCoins}</span>
            </div>
            <p className="text-xs text-gray-600">Pi Coins</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">{speed.toFixed(1)}x</span>
            </div>
            <p className="text-xs text-gray-600">Speed</p>
          </div>
        </div>

        {/* Game Area */}
        <div 
          className="relative bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg mx-auto overflow-hidden" 
          style={{ width: gameArea.width, height: gameArea.height }}
        >
          {/* Player */}
          <div
            className="absolute bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-75"
            style={{
              left: player.x,
              top: player.y,
              width: player.width,
              height: player.height
            }}
          >
            🚀
          </div>

          {/* Pi Coins */}
          {coins.map(coin => (
            <div
              key={coin.id}
              className={`absolute rounded-full flex items-center justify-center text-white font-bold transition-all duration-100 ${
                coin.type === 'mega' ? 'animate-pulse' : ''
              }`}
              style={{
                left: coin.x,
                top: coin.y,
                width: 30,
                height: 30,
                backgroundColor: 
                  coin.type === 'mega' ? '#8B5CF6' : 
                  coin.type === 'golden' ? '#F59E0B' : '#3B82F6',
                boxShadow: `0 0 ${coin.type === 'mega' ? '15px' : '8px'} ${
                  coin.type === 'mega' ? '#8B5CF6' : 
                  coin.type === 'golden' ? '#F59E0B' : '#3B82F6'
                }50`
              }}
            >
              π
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-2 mt-6 max-w-xs mx-auto">
          <div></div>
          <Button variant="outline" onClick={() => movePlayer('up')}>
            ⬆️
          </Button>
          <div></div>
          <Button variant="outline" onClick={() => movePlayer('left')}>
            ⬅️
          </Button>
          <Button variant="outline" onClick={() => movePlayer('down')}>
            ⬇️
          </Button>
          <Button variant="outline" onClick={() => movePlayer('right')}>
            ➡️
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Use arrow keys or WASD to move. Collect Pi coins for points!
        </div>
      </CardContent>
    </Card>
  );
};

export default PiCollectorEngine;
