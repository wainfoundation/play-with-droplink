
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BrainIcon,
  MessageCircleIcon,
  ZapIcon,
  MicIcon,
  Dices
} from 'lucide-react';
import GameCard from './GameCard';
import InteractiveMascot from '@/components/mascot/InteractiveMascot';
import PiAdsNetwork from '@/components/PiAdsNetwork';

interface GameManagerProps {
  games: any[];
  userPlan: string;
  purchasedGames: string[];
  soundEnabled: boolean;
  onGameClick: (game: any, category: string) => void;
  onPurchaseGame: (game: any) => void;
  onMoodChange: (mood: number) => void;
}

const GameManager: React.FC<GameManagerProps> = ({
  games,
  userPlan,
  purchasedGames,
  soundEnabled,
  onGameClick,
  onPurchaseGame,
  onMoodChange
}) => {
  // Game categories organized like the reference image
  const organizeGamesByCategory = () => {
    const categories = {
      wordguessing: {
        name: "Word Guessing",
        icon: BrainIcon,
        color: "bg-blue-500",
        description: "Guess Droplink-related words letter by letter!",
        games: games.filter(game => 
          game.name.toLowerCase().includes('word') || 
          game.name.toLowerCase().includes('guess') ||
          game.name.toLowerCase().includes('hangman') ||
          game.category === 'puzzle'
        ).slice(0, 5)
      },
      droplinkquiz: {
        name: "Droplink Quiz", 
        icon: MessageCircleIcon,
        color: "bg-purple-500",
        description: "Test your knowledge about Droplink and Pi Network!",
        games: games.filter(game => 
          game.name.toLowerCase().includes('quiz') || 
          game.name.toLowerCase().includes('trivia') ||
          game.category === 'trivia'
        ).slice(0, 5)
      },
      memorymatch: {
        name: "Memory Match",
        icon: ZapIcon,
        color: "bg-green-500", 
        description: "Match pairs of symbols and test your memory!",
        games: games.filter(game => 
          game.name.toLowerCase().includes('memory') || 
          game.name.toLowerCase().includes('match') ||
          game.name.toLowerCase().includes('pairs')
        ).slice(0, 5)
      },
      talktodroplink: {
        name: "Talk to Droplink",
        icon: MicIcon,
        color: "bg-orange-500",
        description: "Have a conversation with our friendly mascot!",
        games: games.filter(game => 
          game.name.toLowerCase().includes('chat') || 
          game.name.toLowerCase().includes('talk') ||
          game.name.toLowerCase().includes('conversation')
        ).slice(0, 3)
      },
      randomfun: {
        name: "Random Fun",
        icon: Dices,
        color: "bg-pink-500",
        description: "50+ amazing games to keep you entertained!",
        games: games.filter(game => {
          // Get all remaining games not in other categories
          const usedGameIds = new Set();
          
          // Add games from other categories to the used set
          games.filter(g => 
            g.name.toLowerCase().includes('word') || 
            g.name.toLowerCase().includes('guess') ||
            g.name.toLowerCase().includes('hangman') ||
            g.name.toLowerCase().includes('quiz') || 
            g.name.toLowerCase().includes('trivia') ||
            g.name.toLowerCase().includes('memory') || 
            g.name.toLowerCase().includes('match') ||
            g.name.toLowerCase().includes('pairs') ||
            g.name.toLowerCase().includes('chat') || 
            g.name.toLowerCase().includes('talk') ||
            g.name.toLowerCase().includes('conversation')
          ).forEach(g => usedGameIds.add(g.id));
          
          return !usedGameIds.has(game.id);
        })
      }
    };
    
    return categories;
  };

  const gameCategories = organizeGamesByCategory();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-4 space-y-6">
          <InteractiveMascot 
            onMoodChange={onMoodChange}
            soundEnabled={soundEnabled}
          />
          <PiAdsNetwork placementId="gaming-sidebar" />
        </div>
      </div>

      <div className="lg:col-span-2">
        <Tabs defaultValue="wordguessing" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {Object.entries(gameCategories).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs">
                <category.icon className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {key === 'randomfun' ? 'Fun' : category.name.split(' ')[0]}
                </span>
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
                    {key === 'randomfun' && (
                      <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                        50+ Games
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {category.games.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <category.icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Coming Soon!</p>
                      <p className="text-sm">More {category.name.toLowerCase()} games will be added.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.games.map(game => {
                        const isLocked = !game.is_free && userPlan === 'free' && !purchasedGames.includes(game.id);
                        return (
                          <GameCard
                            key={game.id}
                            game={game}
                            isLocked={isLocked}
                            userPlan={userPlan}
                            onPlay={(game) => onGameClick(game, key)}
                            onPurchase={() => onPurchaseGame(game)}
                            onUpgrade={() => {}}
                          />
                        );
                      })}
                    </div>
                  )}
                  
                  {key === 'randomfun' && category.games.length > 0 && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        🎮 {category.games.length} games available • More being added daily!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default GameManager;
