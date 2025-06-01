import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Clock, Star, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface ColorTile {
  id: number;
  color: string;
  matched: boolean;
  x: number;
  y: number;
}

interface ColorMergeEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const ColorMergeEngine: React.FC<ColorMergeEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [tiles, setTiles] = useState<ColorTile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [moves, setMoves] = useState(0);
  const [targetMatches, setTargetMatches] = useState(5);
  const [currentMatches, setCurrentMatches] = useState(0);
  
  const isMobile = useIsMobile();

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'
  ];

  const generateTiles = useCallback(() => {
    const newTiles: ColorTile[] = [];
    const gridSize = 6;
    
    for (let i = 0; i < gridSize * gridSize; i++) {
      newTiles.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        matched: false,
        x: i % gridSize,
        y: Math.floor(i / gridSize)
      });
    }
    
    setTiles(newTiles);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setMoves(0);
    setCurrentMatches(0);
    setTargetMatches(5);
    setSelectedTiles([]);
    generateTiles();
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

  const handleTileClick = (tileId: number) => {
    if (gameState !== 'playing') return;
    
    const tile = tiles.find(t => t.id === tileId);
    if (!tile || tile.matched) return;

    if (selectedTiles.includes(tileId)) {
      setSelectedTiles(prev => prev.filter(id => id !== tileId));
      return;
    }

    if (selectedTiles.length >= 2) {
      setSelectedTiles([tileId]);
      return;
    }

    const newSelected = [...selectedTiles, tileId];
    setSelectedTiles(newSelected);

    if (newSelected.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newSelected.map(id => tiles.find(t => t.id === id)!);
      
      if (first.color === second.color) {
        // Match found!
        setTimeout(() => {
          setTiles(prev => prev.map(tile => 
            newSelected.includes(tile.id) ? { ...tile, matched: true } : tile
          ));
          setScore(prev => prev + 100);
          setCurrentMatches(prev => prev + 1);
          setSelectedTiles([]);
          
          toast({
            title: "Perfect Match!",
            description: "+100 points!",
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setSelectedTiles([]);
        }, 1000);
      }
    }
  };

  // Check for level completion
  useEffect(() => {
    if (currentMatches >= targetMatches && gameState === 'playing') {
      setLevel(prev => prev + 1);
      setTargetMatches(prev => prev + 2);
      setCurrentMatches(0);
      setTimeLeft(prev => prev + 30);
      generateTiles();
      
      toast({
        title: "Level Complete!",
        description: `Welcome to level ${level + 1}!`,
      });
    }
  }, [currentMatches, targetMatches, gameState, level, generateTiles]);

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
              <div className="text-2xl">🎨</div>
              Color Merge
            </CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🌈</div>
            <h2 className="text-2xl font-bold">Color Merge Challenge!</h2>
            <p className="text-gray-600">
              Match tiles of the same color to score points!
              <br />
              Find all target matches to advance to the next level.
            </p>
            <Button size="lg" onClick={startGame}>
              Start Matching!
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
            <CardTitle>Game Complete!</CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold">Amazing Colors!</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">{moves}</div>
                <div className="text-sm text-gray-600">Total Moves</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={startGame} size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
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
            <div className="text-2xl">🎨</div>
            Color Merge
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
              <Star className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">{moves}</span>
            </div>
            <p className="text-xs text-gray-600">Moves</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="font-semibold">{currentMatches}/{targetMatches}</span>
            </div>
            <p className="text-xs text-gray-600">Matches</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(currentMatches / targetMatches) * 100} className="h-2" />
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-6">
          {tiles.map(tile => (
            <div
              key={tile.id}
              className={`
                aspect-square rounded-lg cursor-pointer transition-all duration-200
                ${tile.matched ? 'opacity-30 scale-95' : 'hover:scale-105'}
                ${selectedTiles.includes(tile.id) ? 'ring-4 ring-yellow-400 scale-110' : ''}
              `}
              style={{ backgroundColor: tile.color }}
              onClick={() => handleTileClick(tile.id)}
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          Tap tiles of the same color to match them!
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorMergeEngine;
