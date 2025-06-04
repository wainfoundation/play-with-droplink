
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Play, Pause } from 'lucide-react';
import { EvolutionStage } from '@/hooks/usePetProgression';

interface DropTapDashProps {
  mascotStage: EvolutionStage;
  onGameEnd: (score: number, xpEarned: number, coinsEarned: number) => void;
  onClose: () => void;
}

interface Drop {
  id: string;
  x: number;
  y: number;
  speed: number;
  points: number;
  type: 'normal' | 'bonus' | 'penalty';
}

const STAGE_CONFIG = {
  baby: {
    dropSpeed: 2,
    spawnRate: 1500,
    maxDrops: 3,
    gameDuration: 30,
    xpMultiplier: 1,
    coinMultiplier: 0.5,
    theme: { primary: '#87CEEB', secondary: '#FFB6C1' }
  },
  teen: {
    dropSpeed: 4,
    spawnRate: 1000,
    maxDrops: 5,
    gameDuration: 60,
    xpMultiplier: 1.5,
    coinMultiplier: 1,
    theme: { primary: '#4A4A4A', secondary: '#9370DB' }
  },
  adult: {
    dropSpeed: 5,
    spawnRate: 800,
    maxDrops: 6,
    gameDuration: 60,
    xpMultiplier: 2,
    coinMultiplier: 1.5,
    theme: { primary: '#8B0000', secondary: '#DAA520' }
  },
  elder: {
    dropSpeed: 3,
    spawnRate: 1800,
    maxDrops: 4,
    gameDuration: 45,
    xpMultiplier: 2.5,
    coinMultiplier: 2,
    theme: { primary: '#8B4513', secondary: '#C0C0C0' }
  }
};

export default function DropTapDash({ mascotStage, onGameEnd, onClose }: DropTapDashProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [combo, setCombo] = useState(0);

  const config = STAGE_CONFIG[mascotStage];

  const generateDrop = useCallback((): Drop => {
    const dropTypes = ['normal', 'normal', 'normal', 'bonus', 'penalty'];
    const type = dropTypes[Math.floor(Math.random() * dropTypes.length)] as Drop['type'];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 90, // 0-90% to avoid edges
      y: -10,
      speed: config.dropSpeed + Math.random() * 2,
      points: type === 'bonus' ? 20 : type === 'penalty' ? -10 : 10,
      type
    };
  }, [config.dropSpeed]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(config.gameDuration);
    setDrops([]);
    setCombo(0);
  };

  const endGame = () => {
    setGameState('ended');
    const xpEarned = Math.floor(score * config.xpMultiplier);
    const coinsEarned = Math.floor(score * config.coinMultiplier);
    onGameEnd(score, xpEarned, coinsEarned);
  };

  const tapDrop = (dropId: string) => {
    setDrops(prev => {
      const drop = prev.find(d => d.id === dropId);
      if (!drop) return prev;

      if (drop.type === 'penalty') {
        setCombo(0);
        setScore(s => Math.max(0, s + drop.points));
      } else {
        setCombo(c => c + 1);
        const comboMultiplier = Math.floor(combo / 5) + 1;
        setScore(s => s + (drop.points * comboMultiplier));
      }

      return prev.filter(d => d.id !== dropId);
    });
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });

      // Move drops down
      setDrops(prev => prev.map(drop => ({
        ...drop,
        y: drop.y + drop.speed
      })).filter(drop => drop.y < 110)); // Remove drops that went off screen

      // Reset combo if no taps
      setCombo(prev => Math.max(0, prev - 0.1));
    }, 100);

    return () => clearInterval(gameInterval);
  }, [gameState]);

  // Spawn drops
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      setDrops(prev => {
        if (prev.length >= config.maxDrops) return prev;
        return [...prev, generateDrop()];
      });
    }, config.spawnRate);

    return () => clearInterval(spawnInterval);
  }, [gameState, config.maxDrops, config.spawnRate, generateDrop]);

  const getDropColor = (type: Drop['type']) => {
    switch (type) {
      case 'bonus': return '#FFD700';
      case 'penalty': return '#FF4444';
      default: return config.theme.primary;
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="w-4 h-4" />
          </Button>

          <h2 className="text-2xl font-bold mb-4" style={{ color: config.theme.primary }}>
            DropTap Dash
          </h2>
          
          <div className="mb-6">
            <Badge className="mb-2" style={{ backgroundColor: config.theme.secondary }}>
              {mascotStage.toUpperCase()} LEVEL
            </Badge>
            <p className="text-gray-600 text-sm">
              Tap the falling droplets to score points!<br/>
              Duration: {config.gameDuration}s
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
            <div className="text-center">
              <div className="w-4 h-6 mx-auto mb-1 rounded-full" style={{ backgroundColor: config.theme.primary }}></div>
              <span>Normal<br/>+10 pts</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-6 mx-auto mb-1 rounded-full bg-yellow-400"></div>
              <span>Bonus<br/>+20 pts</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-6 mx-auto mb-1 rounded-full bg-red-400"></div>
              <span>Penalty<br/>-10 pts</span>
            </div>
          </div>

          <Button onClick={startGame} className="w-full" style={{ backgroundColor: config.theme.primary }}>
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'ended') {
    const xpEarned = Math.floor(score * config.xpMultiplier);
    const coinsEarned = Math.floor(score * config.coinMultiplier);

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-600">Game Complete!</h2>
          
          <div className="space-y-3 mb-6">
            <div className="text-3xl font-bold" style={{ color: config.theme.primary }}>
              {score} Points
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-semibold">XP Earned</div>
                <div className="text-blue-600">+{xpEarned}</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="font-semibold">Coins Earned</div>
                <div className="text-yellow-600">+{coinsEarned}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={startGame} variant="outline" className="flex-1">
              Play Again
            </Button>
            <Button onClick={onClose} className="flex-1" style={{ backgroundColor: config.theme.primary }}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-100 to-blue-200 z-50">
      {/* Game Header */}
      <div className="flex justify-between items-center p-4 bg-white/90 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setGameState('paused')}>
            <Pause className="w-4 h-4" />
          </Button>
          <div className="text-lg font-bold">Score: {score}</div>
          {combo > 0 && (
            <Badge variant="secondary">Combo x{Math.floor(combo / 5) + 1}</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold">⏱️ {timeLeft}s</div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-full overflow-hidden">
        <AnimatePresence>
          {drops.map((drop) => (
            <motion.button
              key={drop.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => tapDrop(drop.id)}
              className="absolute w-8 h-10 rounded-full shadow-lg border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                backgroundColor: getDropColor(drop.type)
              }}
              whileTap={{ scale: 0.8 }}
            >
              {drop.type === 'bonus' && '⭐'}
              {drop.type === 'penalty' && '💥'}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Pause Overlay */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-4">Game Paused</h3>
            <div className="flex gap-2">
              <Button onClick={() => setGameState('playing')} className="flex-1">
                Resume
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1">
                Quit
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
