import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { playSoundEffect } from '@/utils/sounds';
import DroplinkButton from '@/components/games/DroplinkButton';
import LivesSystem from '@/components/games/LivesSystem';
import GameStats from '@/components/games/GameStats';
import InfiniteLevelGenerator from '@/components/games/InfiniteLevelGenerator';

interface BlockConnectEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const BlockConnectEngine: React.FC<BlockConnectEngineProps> = ({ onBack, onGameComplete }) => {
  const { toast } = useToast();
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [infiniteLevels] = useState(true);
  const [lives, setLives] = useState(5);

  // Generate infinite level on mount and level change
  useEffect(() => {
    generateLevel();
  }, [currentLevel]);

  const generateLevel = () => {
    const config = InfiniteLevelGenerator.generateLevelConfig('block-connect', currentLevel);
    const generatedGrid = InfiniteLevelGenerator.generateBlockGrid(config);
    setGrid(generatedGrid);
    setSelectedBlocks([]);
    setScore(currentLevel * 100); // Bonus points for reaching higher levels
  };

  const handleBlockClick = (row: number, col: number) => {
    const blockValue = grid[row][col];

    if (selectedBlocks.length === 0) {
      // First block selected
      setSelectedBlocks([[row, col]]);
    } else {
      const [lastRow, lastCol] = selectedBlocks[selectedBlocks.length - 1];

      if (row === lastRow && col === lastCol) {
        // Deselect the block if it's clicked again
        setSelectedBlocks([]);
      } else if (
        grid[row][col] === grid[lastRow][lastCol] &&
        isAdjacent(row, col, lastRow, lastCol)
      ) {
        // Valid connection
        setSelectedBlocks([...selectedBlocks, [row, col]]);
        playSoundEffect('collect', 0.4);
      } else {
        // Invalid connection - reset selection
        setSelectedBlocks([[row, col]]);
        playSoundEffect('error', 0.3);
      }
    }
  };

  const isAdjacent = (row1: number, col1: number, row2: number, col2: number): boolean => {
    const dx = Math.abs(row1 - row2);
    const dy = Math.abs(col1 - col2);
    return (dx <= 1 && dy <= 1) && !(dx === 0 && dy === 0);
  };

  const clearConnectedBlocks = () => {
    if (selectedBlocks.length < 3) {
      toast({
        title: "Not enough blocks!",
        description: "Connect at least 3 blocks to clear them.",
        variant: "destructive",
      });
      playSoundEffect('error', 0.3);
      return;
    }

    // Clear blocks and update score
    let newGrid = grid.map(row => [...row]);
    selectedBlocks.forEach(([row, col]) => {
      newGrid[row][col] = -1; // Mark as cleared
    });
    setGrid(newGrid);

    // Animate clearing
    setTimeout(() => {
      setGrid(prevGrid => prevGrid.map(row => row.map(block => (block === -1 ? 0 : block))));
      setSelectedBlocks([]);
      const points = selectedBlocks.length * 10;
      setScore(prevScore => prevScore + points);
      playSoundEffect('success', 0.5);
      toast({
        title: "Blocks Cleared! 🎉",
        description: `+${points} points!`,
      });
      checkLevelComplete();
    }, 500);
  };

  const checkLevelComplete = () => {
    const remainingBlocks = grid.flat().filter(block => block !== 0);
    if (remainingBlocks.length === 0) {
      handleLevelComplete();
    }
  };

  const handleLevelComplete = () => {
    const levelBonus = currentLevel * 10;
    const newScore = score + levelBonus;
    setScore(newScore);
    
    toast({
      title: `Level ${currentLevel} Complete! 🎉`,
      description: `+${levelBonus} bonus points! Moving to level ${currentLevel + 1}`,
    });
    
    setTimeout(() => {
      setCurrentLevel(prev => prev + 1);
    }, 1500);
  };

  const useLive = () => {
    if (lives <= 0) {
      // Game over
      setGameFinished(true);
      onGameComplete(score);
      return false;
    }
    
    setLives(prev => prev - 1);
    return true;
  };

  const renderBlock = (row: number, col: number) => {
    const isSelected = selectedBlocks.some(
      ([selectedRow, selectedCol]) => selectedRow === row && selectedCol === col
    );
    const isLastSelected =
      selectedBlocks.length > 0 &&
      selectedBlocks[selectedBlocks.length - 1][0] === row &&
      selectedBlocks[selectedBlocks.length - 1][1] === col;

    let blockClass = "w-8 h-8 border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200";
    if (grid[row][col] === 0) {
      blockClass += " bg-transparent"; // Cleared block
    } else {
      blockClass += " bg-blue-100 hover:bg-blue-200";
    }
    if (isSelected) {
      blockClass += " ring-2 ring-blue-500";
    }
    if (isLastSelected) {
      blockClass += " ring-4 ring-blue-700";
    }

    return (
      <div
        key={`${row}-${col}`}
        className={blockClass}
        onClick={() => handleBlockClick(row, col)}
      >
        {grid[row][col] > 0 && grid[row][col]}
      </div>
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">🧱</div>
            Block Connect
            {infiniteLevels && <Badge variant="secondary">∞</Badge>}
          </CardTitle>
          <DroplinkButton 
            type="level" 
            gameId="block-connect" 
            level={currentLevel}
            score={score}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <GameStats 
          score={score}
          level={currentLevel}
          totalLevels={9999999}
          className="mb-4"
        />
        
        <LivesSystem 
          onLivesChange={setLives}
        />
        
        <div className="grid gap-1 mt-4">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((_, colIndex) => renderBlock(rowIndex, colIndex))}
            </div>
          ))}
        </div>

        <Button
          onClick={clearConnectedBlocks}
          disabled={selectedBlocks.length < 2}
          className="mt-4 w-full"
        >
          Clear Blocks ({selectedBlocks.length})
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlockConnectEngine;
