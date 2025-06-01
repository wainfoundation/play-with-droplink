
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play as PlayIcon } from 'lucide-react';

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
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer ${
        selectedGame === game.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onGameClick(game.id, game.name)}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">🎮</div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{game.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{game.description}</p>
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(game.difficulty)} text-xs font-medium`}
          >
            {game.difficulty}
          </Badge>
        </div>
      </div>
      <Button 
        variant={selectedGame === game.id ? "default" : "outline"}
        size="sm"
        disabled={selectedGame === game.id}
        className="min-w-[90px] shadow-sm"
      >
        {selectedGame === game.id ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
