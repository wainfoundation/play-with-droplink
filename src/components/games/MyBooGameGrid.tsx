
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Star } from 'lucide-react';

interface MyBooGameGridProps {
  games: any[];
  onGameClick: (game: any) => void;
  userCoins: number;
}

const MyBooGameGrid: React.FC<MyBooGameGridProps> = ({
  games,
  onGameClick,
  userCoins
}) => {
  const gameCategories = [
    {
      title: "MINIGAMES",
      color: "from-green-400 to-blue-500",
      games: [
        { id: 1, name: "BOO CLIMB", icon: "🧗", locked: false, stars: 1 },
        { id: 2, name: "PIANO BOO", icon: "🎹", locked: false, stars: 2 },
        { id: 3, name: "BUBBLE POP", icon: "🫧", locked: false, stars: 0 },
        { id: 4, name: "JUMPING", icon: "🦘", locked: false, stars: 1 },
        { id: 5, name: "SOLITAIRE", icon: "🃏", locked: true, stars: 0 },
        { id: 6, name: "BASKETBOO", icon: "🏀", locked: true, stars: 0 },
        { id: 7, name: "RACING", icon: "🏎️", locked: true, stars: 11 },
        { id: 8, name: "BOO SNAKE", icon: "🐍", locked: true, stars: 4 },
        { id: 9, name: "BOO HOP", icon: "🐰", locked: true, stars: 3 },
        { id: 10, name: "FLAPPY BOO", icon: "🐦", locked: true, stars: 11 },
        { id: 11, name: "BOO MIX", icon: "🎭", locked: true, stars: 4 },
        { id: 12, name: "MATCHING", icon: "🎯", locked: true, stars: 13 }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-24">
      {gameCategories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          {/* Category Header */}
          <div className="text-center mb-6">
            <div className={`bg-gradient-to-r ${category.color} p-4 rounded-3xl border-4 border-white shadow-2xl inline-block`}>
              <h2 className="text-white font-bold text-2xl tracking-wider drop-shadow-lg">
                {category.title}
              </h2>
            </div>
          </div>

          {/* Unlock All Button */}
          <div className="mb-6">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl border-4 border-white shadow-2xl">
              <span className="text-lg">🎮 UNLOCK ALL MINIGAMES NOW 💎</span>
            </Button>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-3 gap-4">
            {category.games.map((game) => (
              <Card 
                key={game.id} 
                className={`
                  relative overflow-hidden border-4 border-white shadow-xl rounded-2xl
                  ${game.locked ? 'bg-gray-400' : 'bg-gradient-to-b from-cyan-400 to-blue-500'}
                  hover:scale-105 transition-transform duration-200 cursor-pointer
                `}
                onClick={() => !game.locked && onGameClick(game)}
              >
                <CardContent className="p-4 text-center relative">
                  {/* Game Icon */}
                  <div className="text-4xl mb-2 filter drop-shadow-lg">
                    {game.locked ? '🔒' : game.icon}
                  </div>
                  
                  {/* Game Name */}
                  <h3 className="text-white font-bold text-xs tracking-wide drop-shadow-md">
                    {game.name}
                  </h3>

                  {/* Stars for premium games */}
                  {game.stars > 0 && game.locked && (
                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full border-2 border-white flex items-center justify-center w-8 h-8">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="absolute text-xs font-bold text-white">
                        {game.stars}
                      </span>
                    </div>
                  )}

                  {/* Lock Overlay */}
                  {game.locked && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooGameGrid;
