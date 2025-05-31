
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PuzzleIcon,
  RocketIcon,
  BrainIcon,
  PaletteIcon,
  InfinityIcon
} from 'lucide-react';
import GameCard from '@/components/games/GameCard';

interface GameCategoriesProps {
  games: any[];
  userPlan: string;
  purchasedGames: string[];
  onGameClick: (game: any, category: string) => void;
  onPurchaseGame: (game: any) => void;
  onUpgradeToPremium: () => void;
  isPremium?: boolean;
  canAccessAllGames?: boolean;
}

const GameCategories: React.FC<GameCategoriesProps> = ({
  games,
  userPlan,
  purchasedGames,
  onGameClick,
  onPurchaseGame,
  onUpgradeToPremium,
  isPremium = false,
  canAccessAllGames = false
}) => {
  const organizeGamesByCategory = () => {
    const categories = {
      puzzle: {
        name: "Puzzle & Logic",
        icon: PuzzleIcon,
        color: "bg-blue-500",
        games: games.filter(game => game.category === 'puzzle')
      },
      action: {
        name: "Action & Reflex",
        icon: RocketIcon,
        color: "bg-red-500",
        games: games.filter(game => game.category === 'action')
      },
      trivia: {
        name: "Trivia & Quiz",
        icon: BrainIcon,
        color: "bg-green-500",
        games: games.filter(game => game.category === 'trivia')
      },
      creative: {
        name: "Creative & Fun",
        icon: PaletteIcon,
        color: "bg-purple-500",
        games: games.filter(game => game.category === 'creative')
      },
      infinite: {
        name: "Infinite Games",
        icon: InfinityIcon,
        color: "bg-orange-500",
        games: games.filter(game => game.category === 'infinite')
      }
    };
    return categories;
  };

  const gameCategories = organizeGamesByCategory();

  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="puzzle" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {Object.entries(gameCategories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs">
              <category.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(gameCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="w-6 h-6" />
                  {category.name}
                  {isPremium && (
                    <span className="text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full">
                      All Unlocked
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Choose from {category.games.length} amazing {category.name.toLowerCase()} games
                  {isPremium && " - All premium games included!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.games.map(game => {
                    // Premium users can access all games
                    const isLocked = !isPremium && !canAccessAllGames && !game.is_free && !purchasedGames.includes(game.id);
                    return (
                      <GameCard
                        key={game.id}
                        game={game}
                        isLocked={isLocked}
                        userPlan={userPlan}
                        onPlay={(game) => onGameClick(game, key)}
                        onPurchase={onPurchaseGame}
                        onUpgrade={onUpgradeToPremium}
                        isPremium={isPremium}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GameCategories;
