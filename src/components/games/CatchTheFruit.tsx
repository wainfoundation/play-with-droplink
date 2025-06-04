
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Pause, Play } from 'lucide-react';

interface FallingFruit {
  id: string;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  points: number;
}

interface CatchTheFruitProps {
  onGameEnd: (score: number, coinsEarned: number) => void;
  onClose: () => void;
}

const fruitEmojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍑', '🥭'];

const CatchTheFruit: React.FC<CatchTheFruitProps> = ({ onGameEnd, onClose }) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'paused' | 'ended'>('waiting');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fruits, setFruits] = useState<FallingFruit[]>([]);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const fruitSpawnRef = useRef<number>();

  // Initialize game area dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setGameArea({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  // Spawn fruits
  useEffect(() => {
    if (gameState === 'playing') {
      fruitSpawnRef.current = window.setInterval(() => {
        spawnFruit();
      }, 1000 + Math.random() * 1000); // Spawn every 1-2 seconds
    }

    return () => {
      if (fruitSpawnRef.current) {
        clearInterval(fruitSpawnRef.current);
      }
    };
  }, [gameState, gameArea]);

  // Game loop for fruit movement
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = window.requestAnimationFrame(updateGame);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, fruits]);

  const spawnFruit = useCallback(() => {
    if (gameArea.width === 0) return;

    const fruitEmoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
    const newFruit: FallingFruit = {
      id: `fruit-${Date.now()}-${Math.random()}`,
      emoji: fruitEmoji,
      x: Math.random() * (gameArea.width - 60), // Account for fruit size
      y: -60,
      speed: 2 + Math.random() * 3, // Random speed between 2-5
      points: 1
    };

    setFruits(prev => [...prev, newFruit]);
  }, [gameArea.width]);

  const updateGame = useCallback(() => {
    setFruits(prev => {
      const updated = prev.map(fruit => ({
        ...fruit,
        y: fruit.y + fruit.speed
      })).filter(fruit => fruit.y < gameArea.height + 60); // Remove fruits that fell off screen

      return updated;
    });

    if (gameState === 'playing') {
      gameLoopRef.current = window.requestAnimationFrame(updateGame);
    }
  }, [gameState, gameArea.height]);

  const catchFruit = (fruitId: string) => {
    setFruits(prev => prev.filter(fruit => fruit.id !== fruitId));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setFruits([]);
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('ended');
    
    // Calculate rewards based on score
    let coinsEarned = 0;
    if (score >= 15) {
      coinsEarned = 3;
    } else if (score >= 10) {
      coinsEarned = 2;
    } else if (score >= 5) {
      coinsEarned = 1;
    }

    onGameEnd(score, coinsEarned);
  };

  const resetGame = () => {
    setGameState('waiting');
    setScore(0);
    setTimeLeft(30);
    setFruits([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div className="text-white font-bold">
              🍎 Catch the Fruit
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-white">
            <div className="text-xl font-bold">Score: {score}</div>
            <div className="text-xl font-bold">Time: {timeLeft}s</div>
          </div>

          {gameState === 'playing' && (
            <Button variant="outline" size="sm" onClick={pauseGame}>
              <Pause className="h-4 w-4" />
            </Button>
          )}
          {gameState === 'paused' && (
            <Button variant="outline" size="sm" onClick={resumeGame}>
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="absolute inset-0 pt-20 pb-4 px-4"
        style={{ touchAction: 'none' }}
      >
        {/* Waiting State */}
        {gameState === 'waiting' && (
          <div className="flex items-center justify-center h-full">
            <Card className="text-center p-8 bg-white/90">
              <CardContent>
                <div className="text-6xl mb-4">🍎</div>
                <h2 className="text-2xl font-bold mb-4">Catch the Fruit!</h2>
                <p className="text-gray-600 mb-6">
                  Tap falling fruits to catch them before they hit the ground.
                  You have 30 seconds to catch as many as possible!
                </p>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">Rewards:</div>
                  <div className="text-sm">
                    • 5+ fruits = 1 coin<br/>
                    • 10+ fruits = 2 coins<br/>
                    • 15+ fruits = 3 coins
                  </div>
                </div>
                <Button onClick={startGame} size="lg" className="text-lg px-8">
                  Start Game
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Paused State */}
        {gameState === 'paused' && (
          <div className="flex items-center justify-center h-full">
            <Card className="text-center p-8 bg-white/90">
              <CardContent>
                <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
                <div className="space-y-2 mb-6">
                  <div>Score: {score}</div>
                  <div>Time Left: {timeLeft}s</div>
                </div>
                <div className="space-x-4">
                  <Button onClick={resumeGame}>Resume</Button>
                  <Button variant="outline" onClick={onClose}>Quit</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Over State */}
        {gameState === 'ended' && (
          <div className="flex items-center justify-center h-full">
            <Card className="text-center p-8 bg-white/90">
              <CardContent>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <div className="space-y-2 mb-6">
                  <div className="text-xl">Final Score: {score}</div>
                  <div className="text-lg text-green-600">
                    Coins Earned: {score >= 15 ? 3 : score >= 10 ? 2 : score >= 5 ? 1 : 0}
                  </div>
                </div>
                <div className="space-x-4">
                  <Button onClick={resetGame}>Play Again</Button>
                  <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Falling Fruits */}
        <AnimatePresence>
          {fruits.map(fruit => (
            <motion.button
              key={fruit.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => catchFruit(fruit.id)}
              className="absolute text-4xl hover:scale-110 transition-transform cursor-pointer select-none"
              style={{
                left: fruit.x,
                top: fruit.y,
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileTap={{ scale: 1.2 }}
            >
              {fruit.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CatchTheFruit;
