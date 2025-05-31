
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LockIcon, PlayIcon, CoinsIcon, CrownIcon } from 'lucide-react';

interface GameCardProps {
  game: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    is_free: boolean;
    price_pi: number;
    description?: string;
    thumbnail_url?: string;
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
  const getGameLogo = (gameName: string, category: string) => {
    // Generate emoji-based logos for games
    const logoMap: Record<string, string> = {
      // Puzzle games
      'sudoku': '🔢',
      'crossword': '📝',
      'word search': '🔍',
      'jigsaw puzzle': '🧩',
      'sliding puzzle': '🎲',
      'logic grid': '📊',
      'number sequence': '🔢',
      'pattern match': '🎨',
      'memory tiles': '🧠',
      'color code': '🌈',
      
      // Action games
      'droplink dash': '💨',
      'reflex test': '⚡',
      'speed tap': '👆',
      'reaction time': '⏱️',
      'bubble pop': '🫧',
      'catch the drop': '💧',
      'dodge master': '🏃',
      'quick draw': '🎯',
      'finger fury': '✋',
      'tap master': '👉',
      
      // Trivia games
      'general knowledge': '🧠',
      'science quiz': '🔬',
      'history quiz': '📚',
      'geography quiz': '🌍',
      'sports trivia': '⚽',
      'movie quiz': '🎬',
      'music trivia': '🎵',
      'tech quiz': '💻',
      'nature quiz': '🌿',
      'space trivia': '🚀',
      
      // Creative games
      'color mixer': '🎨',
      'pattern creator': '✨',
      'music maker': '🎹',
      'story builder': '📖',
      'art gallery': '🖼️',
      'design studio': '🎭',
      'photo editor': '📸',
      'avatar maker': '👤',
      'emoji creator': '😊',
      'badge designer': '🏆',
      
      // Infinite games
      'endless runner': '🏃‍♂️',
      'infinite jumper': '🦘',
      'space explorer': '🛸',
      'treasure hunt': '💎',
      'survival mode': '🏕️',
      'maze runner': '🌀',
      'tower climb': '🏗️',
      'ocean dive': '🌊',
      'sky glider': '🪂',
      'time traveler': '⏰'
    };

    // Try exact match first
    const exactMatch = logoMap[game.name.toLowerCase()];
    if (exactMatch) return exactMatch;

    // Fallback to category-based logos
    const categoryLogos: Record<string, string> = {
      puzzle: '🧩',
      action: '⚡',
      trivia: '🧠',
      creative: '🎨',
      infinite: '♾️'
    };

    return categoryLogos[category] || '🎮';
  };

  const logo = getGameLogo(game.name, game.category);

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{logo}</div>
            <CardTitle className="text-sm font-medium">{game.name}</CardTitle>
          </div>
          {isLocked && <LockIcon className="w-4 h-4 text-gray-400" />}
          {userPlan === 'premium' && <CrownIcon className="w-4 h-4 text-yellow-500" />}
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={
              game.difficulty === 'Easy' ? 'default' : 
              game.difficulty === 'Medium' ? 'secondary' : 
              'destructive'
            } 
            className="text-xs"
          >
            {game.difficulty}
          </Badge>
          {!game.is_free && (
            <Badge variant="outline" className="text-xs">
              {game.price_pi} Pi
            </Badge>
          )}
        </div>
        {game.description && (
          <p className="text-xs text-gray-600 mt-1">{game.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          {isLocked ? (
            game.price_pi > 0 ? (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onPurchase(game)}
              >
                <CoinsIcon className="w-3 h-3 mr-1" />
                Buy {game.price_pi} Pi
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={onUpgrade}
              >
                <CrownIcon className="w-3 h-3 mr-1" />
                Premium
              </Button>
            )
          ) : (
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => onPlay(game)}
            >
              <PlayIcon className="w-3 h-3 mr-1" />
              Play Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
