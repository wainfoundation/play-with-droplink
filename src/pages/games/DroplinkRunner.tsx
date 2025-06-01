
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Coins,
  Zap
} from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { toast } from '@/hooks/use-toast';
import RewardedAdButton from '@/components/RewardedAdButton';

const DroplinkRunner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character, userStats } = location.state || {};
  
  const [gameStats, setGameStats] = useState({
    score: 0,
    highScore: parseInt(localStorage.getItem('droplink-runner-high-score') || '0'),
    distance: 0,
    coinsCollected: 0,
    lives: userStats?.lives || 5,
    piCoins: userStats?.piCoins || 0,
    speed: 1,
    level: 1
  });

  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [playerPosition, setPlayerPosition] = useState(50); // Percentage from left
  const [obstacles, setObstacles] = useState<Array<{id: number, x: number, y: number, type: 'obstacle' | 'coin' | 'boost'}>>([]);
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null);

  // Game mechanics
  const startGame = () => {
    setGameState('playing');
    setGameStats(prev => ({ ...prev, score: 0, distance: 0, coinsCollected: 0 }));
    setObstacles([]);
    
    const loop = setInterval(() => {
      updateGame();
    }, 50); // 20 FPS
    
    setGameLoop(loop);
  };

  const updateGame = useCallback(() => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + 1,
      distance: prev.distance + prev.speed,
      speed: Math.min(prev.speed + 0.001, 3), // Gradually increase speed
      level: Math.floor(prev.distance / 1000) + 1
    }));

    // Spawn obstacles and collectibles
    if (Math.random() < 0.02) {
      const newObstacle = {
        id: Date.now() + Math.random(),
        x: 100,
        y: Math.random() * 60 + 20,
        type: Math.random() < 0.3 ? 'coin' : Math.random() < 0.1 ? 'boost' : 'obstacle' as 'obstacle' | 'coin' | 'boost'
      };
      
      setObstacles(prev => [...prev, newObstacle]);
    }

    // Move obstacles
    setObstacles(prev => 
      prev.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - (2 + gameStats.speed)
      })).filter(obstacle => obstacle.x > -10)
    );
  }, [gameStats.speed]);

  const pauseGame = () => {
    setGameState('paused');
    if (gameLoop) {
      clearInterval(gameLoop);
      setGameLoop(null);
    }
  };

  const resumeGame = () => {
    setGameState('playing');
    const loop = setInterval(updateGame, 50);
    setGameLoop(loop);
  };

  const gameOver = () => {
    setGameState('gameOver');
    if (gameLoop) {
      clearInterval(gameLoop);
      setGameLoop(null);
    }
    
    // Update high score
    if (gameStats.score > gameStats.highScore) {
      setGameStats(prev => ({ ...prev, highScore: prev.score }));
      localStorage.setItem('droplink-runner-high-score', gameStats.score.toString());
      toast({
        title: "New High Score!",
        description: `Amazing! You scored ${gameStats.score} points!`,
      });
    }
  };

  const restartGame = () => {
    if (gameStats.lives > 0) {
      setGameStats(prev => ({ ...prev, lives: prev.lives - 1 }));
      startGame();
    } else {
      toast({
        title: "No Lives Left!",
        description: "Purchase more lives or watch an ad to continue.",
        variant: "destructive"
      });
    }
  };

  // Control player movement
  const movePlayer = (direction: 'left' | 'right') => {
    setPlayerPosition(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 10);
      } else {
        return Math.min(100, prev + 10);
      }
    });
  };

  // Collision detection
  useEffect(() => {
    if (gameState === 'playing') {
      obstacles.forEach(obstacle => {
        if (obstacle.x <= 15 && obstacle.x >= 5 && 
            Math.abs(obstacle.y - 50) < 10 && 
            Math.abs(playerPosition - 50) < 15) {
          
          if (obstacle.type === 'coin') {
            setGameStats(prev => ({
              ...prev,
              coinsCollected: prev.coinsCollected + 1,
              score: prev.score + 10
            }));
            setObstacles(prev => prev.filter(obs => obs.id !== obstacle.id));
          } else if (obstacle.type === 'boost') {
            setGameStats(prev => ({
              ...prev,
              score: prev.score + 50
            }));
            setObstacles(prev => prev.filter(obs => obs.id !== obstacle.id));
          } else {
            gameOver();
          }
        }
      });
    }
  }, [obstacles, playerPosition, gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          movePlayer('left');
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
          movePlayer('right');
        } else if (e.key === ' ') {
          e.preventDefault();
          pauseGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (gameLoop) {
        clearInterval(gameLoop);
      }
    };
  }, [gameLoop]);

  const handleAdReward = (reward: any) => {
    setGameStats(prev => ({
      ...prev,
      lives: prev.lives + 1,
      piCoins: prev.piCoins + reward.amount
    }));
    toast({
      title: "Reward Earned!",
      description: "You got a free life and Pi coins!",
    });
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/play')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Droplink Runner - Level {gameStats.level} | Infinite Adventure</title>
        <meta name="description" content="Run infinite distances with your Droplink character and earn Pi rewards!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => navigate('/play')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Droplink Runner
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Level {gameStats.level}</Badge>
              <Badge variant="secondary">High Score: {gameStats.highScore}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-3">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-4">
                    <span>Score: {gameStats.score}</span>
                    <span>Distance: {Math.floor(gameStats.distance)}m</span>
                    <span>Speed: {gameStats.speed.toFixed(1)}x</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {gameState === 'menu' ? (
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">🏃‍♂️</div>
                      <h2 className="text-2xl font-bold">Infinite Runner Adventure!</h2>
                      <p className="text-gray-600">
                        Run as far as you can, collect coins, and avoid obstacles!
                        <br />
                        Use arrow keys or A/D to move, spacebar to pause.
                      </p>
                      <Button 
                        size="lg"
                        onClick={startGame}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Running!
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Game Canvas */}
                      <div 
                        className="relative w-full h-80 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg overflow-hidden border-4 border-gray-300"
                        style={{ perspective: '1000px' }}
                      >
                        {/* Ground/Track */}
                        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-green-700 to-green-500"></div>
                        
                        {/* Player Character */}
                        <div 
                          className="absolute bottom-16 w-12 h-12 transition-all duration-150"
                          style={{ left: `${playerPosition}%`, transform: 'translateX(-50%)' }}
                        >
                          <CharacterRenderer character={character} size={48} />
                        </div>

                        {/* Obstacles and Collectibles */}
                        {obstacles.map(obstacle => (
                          <div
                            key={obstacle.id}
                            className={`absolute w-8 h-8 transition-all duration-75 ${
                              obstacle.type === 'coin' ? 'text-yellow-500 text-2xl' :
                              obstacle.type === 'boost' ? 'text-blue-500 text-2xl' :
                              'bg-red-500 rounded'
                            }`}
                            style={{ 
                              left: `${obstacle.x}%`, 
                              top: `${obstacle.y}%`,
                              transform: 'translateX(-50%) translateY(-50%)'
                            }}
                          >
                            {obstacle.type === 'coin' ? '🪙' : 
                             obstacle.type === 'boost' ? '⚡' : ''}
                          </div>
                        ))}

                        {/* Game State Overlays */}
                        {gameState === 'paused' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <h3 className="text-2xl font-bold mb-4">Game Paused</h3>
                              <Button onClick={resumeGame}>
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                              </Button>
                            </div>
                          </div>
                        )}

                        {gameState === 'gameOver' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white space-y-4">
                              <h3 className="text-2xl font-bold">Game Over!</h3>
                              <p>Final Score: {gameStats.score}</p>
                              <p>Distance: {Math.floor(gameStats.distance)}m</p>
                              <div className="flex gap-2 justify-center">
                                <Button onClick={restartGame} disabled={gameStats.lives === 0}>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Try Again ({gameStats.lives} lives)
                                </Button>
                                <Button variant="outline" onClick={() => setGameState('menu')}>
                                  Menu
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center gap-4">
                        {gameState === 'playing' ? (
                          <Button onClick={pauseGame}>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        ) : gameState === 'paused' ? (
                          <Button onClick={resumeGame}>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        ) : null}
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => movePlayer('left')}
                            disabled={gameState !== 'playing'}
                          >
                            ← Left
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => movePlayer('right')}
                            disabled={gameState !== 'playing'}
                          >
                            Right →
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Character Companion */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg">{character.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-sm text-gray-600 mb-3">
                      {gameState === 'playing' ? '"Keep running! You got this!"' :
                       gameState === 'paused' ? '"Take your time, I\'ll wait!"' :
                       gameState === 'gameOver' ? '"Great run! Ready for another?"' :
                       '"Ready for an adventure?"'}
                    </div>
                  </CardContent>
                </Card>

                {/* Game Stats */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Lives:</span>
                      <Badge variant="outline" className="text-red-600">
                        <Heart className="w-3 h-3 mr-1" />
                        {gameStats.lives}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coins:</span>
                      <Badge variant="outline" className="text-yellow-600">
                        <Coins className="w-3 h-3 mr-1" />
                        {gameStats.coinsCollected}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pi Coins:</span>
                      <Badge variant="outline" className="text-blue-600">
                        π {gameStats.piCoins}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Rewards */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Get More Lives</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <RewardedAdButton
                      reward={{ type: "pi", amount: 1, description: "Watch ad for free life" }}
                      onAdComplete={handleAdReward}
                      onAdError={(error) => console.error('Ad error:', error)}
                      buttonText="Watch Ad for Life"
                      className="w-full"
                    />
                    
                    <div className="text-center text-xs text-gray-500">
                      Every 1000m = 1 Pi coin reward!
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DroplinkRunner;
