
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import { showRewardedAd } from '@/services/piAdService';
import { toast } from '@/hooks/use-toast';

interface BlockConnectEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const BlockConnectEngine: React.FC<BlockConnectEngineProps> = ({ onBack, onGameComplete }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [grid, setGrid] = useState<number[][]>([]);
  const [connections, setConnections] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<{x: number, y: number} | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  const gridSize = Math.min(4 + Math.floor(level / 5), 8);
  const targetConnections = Math.max(3, Math.floor(level * 1.5));

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft]);

  const generateGrid = () => {
    const newGrid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => Math.floor(Math.random() * 4) + 1)
    );
    setGrid(newGrid);
  };

  const startLevel = async () => {
    if (!adWatched) {
      try {
        const success = await showRewardedAd({
          type: "pi",
          amount: 0.01,
          description: "Block Connect level unlock"
        });
        
        if (!success) {
          toast({
            title: "Ad Required",
            description: "Please watch an ad to start the level",
            variant: "destructive"
          });
          return;
        }
        setAdWatched(true);
      } catch (error) {
        toast({
          title: "Ad Error", 
          description: "Unable to show ad. Try again later.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsPlaying(true);
    setGameOver(false);
    setConnections([]);
    setSelectedBlock(null);
    setTimeLeft(60 + Math.floor(level / 3) * 10);
    generateGrid();
  };

  const handleBlockClick = (x: number, y: number) => {
    if (!isPlaying) return;

    if (!selectedBlock) {
      setSelectedBlock({x, y});
    } else {
      const distance = Math.abs(selectedBlock.x - x) + Math.abs(selectedBlock.y - y);
      if (distance === 1 && grid[selectedBlock.x][selectedBlock.y] === grid[x][y]) {
        const connectionKey = `${Math.min(selectedBlock.x, x)},${Math.min(selectedBlock.y, y)}-${Math.max(selectedBlock.x, x)},${Math.max(selectedBlock.y, y)}`;
        
        if (!connections.includes(connectionKey)) {
          const newConnections = [...connections, connectionKey];
          setConnections(newConnections);
          setScore(prev => prev + 10 * level);
          
          if (newConnections.length >= targetConnections) {
            completeLevel();
          }
        }
      }
      setSelectedBlock(null);
    }
  };

  const completeLevel = () => {
    setIsPlaying(false);
    const levelBonus = level * 50;
    const timeBonus = timeLeft * 2;
    const totalScore = levelBonus + timeBonus;
    setScore(prev => prev + totalScore);
    
    toast({
      title: "Level Complete!",
      description: `Level ${level} completed! +${totalScore} points`,
    });
    
    setLevel(prev => prev + 1);
    setAdWatched(false);
    
    if (level % 10 === 0) {
      onGameComplete(score + totalScore);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    onGameComplete(score);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setAdWatched(false);
    setConnections([]);
    setSelectedBlock(null);
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">🎮 Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Final Score: {score}</p>
            <p className="text-sm text-gray-600">Level Reached: {level}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={resetGame} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button onClick={onBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
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
            🧩 Block Connect - Level {level}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPlaying && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Connections: {connections.length}/{targetConnections}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <Progress value={(connections.length / targetConnections) * 100} className="h-2" />
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-lg font-semibold">Block Connect - Level {level}</h3>
            <p className="text-sm text-gray-600">
              Connect {targetConnections} matching adjacent blocks to complete the level!
            </p>
            <Button onClick={startLevel} size="lg">
              {adWatched ? 'Start Level' : 'Watch Ad to Play'}
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="space-y-4">
            <div className="grid gap-1 mx-auto" style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              maxWidth: '320px'
            }}>
              {grid.map((row, x) =>
                row.map((value, y) => (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => handleBlockClick(x, y)}
                    className={`
                      w-8 h-8 rounded border-2 text-xs font-bold transition-all
                      ${selectedBlock?.x === x && selectedBlock?.y === y 
                        ? 'border-blue-500 bg-blue-100' 
                        : 'border-gray-300 hover:border-blue-300'}
                      ${value === 1 ? 'bg-red-400' :
                        value === 2 ? 'bg-blue-400' :
                        value === 3 ? 'bg-green-400' : 'bg-yellow-400'}
                      text-white
                    `}
                  >
                    {value}
                  </button>
                ))
              )}
            </div>
            <p className="text-center text-sm text-gray-600">
              Select two adjacent blocks with the same number to connect them
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockConnectEngine;
