
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play as PlayIcon, Loader2 } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  difficulty: string;
  description: string;
}

interface GameItemProps {
  game: Game;
  selectedGame: string | null;
  onGameClick: (gameId: string, gameName: string) => void;
}

const GameItem: React.FC<GameItemProps> = ({ game, selectedGame, onGameClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getGameEmoji = (gameName: string) => {
    if (gameName.toLowerCase().includes('sudoku')) return '🧩';
    if (gameName.toLowerCase().includes('block')) return '🟦';
    if (gameName.toLowerCase().includes('word')) return '📝';
    if (gameName.toLowerCase().includes('target')) return '🎯';
    if (gameName.toLowerCase().includes('tap')) return '👆';
    if (gameName.toLowerCase().includes('quiz') || gameName.toLowerCase().includes('knowledge')) return '🧠';
    if (gameName.toLowerCase().includes('math')) return '🔢';
    if (gameName.toLowerCase().includes('color')) return '🎨';
    if (gameName.toLowerCase().includes('draw')) return '✏️';
    return '🎮';
  };

  const isLoading = selectedGame === game.id;

  return (
    <div
      className={`group flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
        isLoading 
          ? 'bg-blue-100 border-blue-400 shadow-lg scale-102' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
      }`}
      onClick={() => !isLoading && onGameClick(game.id, game.name)}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl animate-pulse">{getGameEmoji(game.name)}</div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
            {game.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">{game.description}</p>
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(game.difficulty)} text-xs font-medium border`}
          >
            {game.difficulty}
          </Badge>
        </div>
      </div>
      
      <Button 
        variant={isLoading ? "default" : "outline"}
        size="sm"
        disabled={isLoading}
        className={`min-w-[100px] shadow-sm transition-all duration-300 ${
          isLoading 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading
          </div>
        ) : (
          <>
            <PlayIcon className="w-4 h-4 mr-2" />
            Play
          </>
        )}
      </Button>
    </div>
  );
};

export default GameItem;
