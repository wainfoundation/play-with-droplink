
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import GameItem from './GameItem';

interface Game {
  id: string;
  name: string;
  difficulty: string;
  description: string;
}

interface GameCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  games: Game[];
}

interface GameCategoryCardProps {
  category: GameCategory;
  selectedGame: string | null;
  onGameClick: (gameId: string, gameName: string) => void;
}

const GameCategoryCard: React.FC<GameCategoryCardProps> = ({ 
  category, 
  selectedGame, 
  onGameClick 
}) => {
  return (
    <Card className="bg-white shadow-lg transition-all duration-200 hover:shadow-xl border-2 hover:border-blue-200">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
          <div className={`p-2 rounded-lg ${category.color}`}>
            <category.icon className="w-6 h-6 text-white" />
          </div>
          {category.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose from {category.games.length} {category.name.toLowerCase()} games
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="space-y-4">
          {category.games.map((game) => (
            <GameItem
              key={game.id}
              game={game}
              selectedGame={selectedGame}
              onGameClick={onGameClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCategoryCard;
