
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import BlockConnectEngine from '@/components/games/engines/BlockConnectEngine';
import ColorMergeEngine from '@/components/games/engines/ColorMergeEngine';
import SudokuClassicEngine from '@/components/games/engines/SudokuClassicEngine';
import Enhanced9x9SudokuEngine from '@/components/games/engines/Enhanced9x9SudokuEngine';
import WordPuzzleEngine from '@/components/games/engines/WordPuzzleEngine';
import TargetRushEngine from '@/components/games/engines/TargetRushEngine';
import QuickTapEngine from '@/components/games/engines/QuickTapEngine';
import PiCollectorEngine from '@/components/games/engines/PiCollectorEngine';

interface GameEngineProps {
  game: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
  };
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ game, onBack, onGameComplete }) => {
  // Route to specific game engines based on game ID
  switch (game.id) {
    case 'block-connect':
      return <BlockConnectEngine onBack={onBack} onGameComplete={onGameComplete} />;
    
    case 'color-merge':
      return <ColorMergeEngine onBack={onBack} onGameComplete={onGameComplete} />;

    case 'sudoku-classic':
      return <Enhanced9x9SudokuEngine onBack={onBack} onGameComplete={onGameComplete} />;
    
    case 'word-puzzle':
      return <WordPuzzleEngine onBack={onBack} onGameComplete={onGameComplete} />;
    
    case 'target-rush':
      return <TargetRushEngine onBack={onBack} onGameComplete={onGameComplete} />;
    
    case 'quick-tap':
      return <QuickTapEngine onBack={onBack} onGameComplete={onGameComplete} />;
    
    case 'pi-collector':
      return <PiCollectorEngine onBack={onBack} onGameComplete={onGameComplete} />;

    default:
      // Fallback for unknown games
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">🎮</div>
                {game.name}
              </CardTitle>
              <Badge variant="outline">{game.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold">Game Coming Soon!</h2>
              <p className="text-gray-600">
                {game.name} is currently under development.
                <br />
                Check back soon for more exciting games!
              </p>
              <Button onClick={onBack} size="lg">
                Back to Games
              </Button>
            </div>
          </CardContent>
        </Card>
      );
  }
};

export default GameEngine;
