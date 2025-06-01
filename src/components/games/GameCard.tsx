
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Play, ShoppingCart, Crown } from 'lucide-react';

interface GameCardProps {
  game: {
    id: string;
    name: string;
    description?: string;
    difficulty: string;
    is_free: boolean;
    price_pi: number;
  };
  isLocked: boolean;
  userPlan: string;
  onPlay: (game: any) => void;
  onPurchase: (game: any) => void;
  onUpgrade: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  isLocked,
  userPlan,
  onPlay,
  onPurchase,
  onUpgrade
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      case 'insane': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGameIcon = (gameName: string) => {
    if (gameName.toLowerCase().includes('sudoku')) return '🧩';
    if (gameName.toLowerCase().includes('block')) return '🧱';
    if (gameName.toLowerCase().includes('color')) return '🎨';
    if (gameName.toLowerCase().includes('memory')) return '🧠';
    if (gameName.toLowerCase().includes('word')) return '📝';
    return '🎮';
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isLocked ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getGameIcon(game.name)}</span>
            <div>
              <CardTitle className="text-lg">{game.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </Badge>
                {!game.is_free && (
                  <Badge variant="secondary">
                    π {game.price_pi}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-4 min-h-[3rem]">
          {game.description || `A challenging ${game.difficulty.toLowerCase()} level ${game.name.toLowerCase()} game.`}
        </CardDescription>
        
        <div className="flex gap-2">
          {!isLocked ? (
            <Button onClick={() => onPlay(game)} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Play
            </Button>
          ) : (
            <>
              {userPlan === 'free' && !game.is_free && (
                <>
                  <Button 
                    onClick={() => onPurchase(game)} 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    π {game.price_pi}
                  </Button>
                  <Button 
                    onClick={onUpgrade} 
                    size="sm"
                    className="flex-1"
                  >
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
