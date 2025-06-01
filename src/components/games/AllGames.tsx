
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Lock, 
  Crown, 
  ShoppingCart, 
  Eye,
  Star,
  Zap,
  Brain,
  Palette,
  Target,
  Infinity
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useToast } from '@/hooks/use-toast';
import { gamesData, getGamesByCategory } from '@/data/gamesData';
import { GameService } from '@/services/gameService';

interface AllGamesProps {
  onGameSelect: (game: any) => void;
  onUpgradeToPremium: () => void;
}

const AllGames: React.FC<AllGamesProps> = ({ onGameSelect, onUpgradeToPremium }) => {
  const { user, isLoggedIn } = useUser();
  const { plan, canAccessAllGames } = useUserPlan();
  const { toast } = useToast();
  const [unlockedGames, setUnlockedGames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isPremium = plan === 'premium';

  // Fetch unlocked games when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchUnlockedGames();
    }
  }, [user?.id]);

  const fetchUnlockedGames = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const unlocked = await GameService.fetchUnlockedGames(user.id);
      setUnlockedGames(unlocked);
    } catch (error) {
      console.error('Error fetching unlocked games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameAction = async (game: any) => {
    const accessMethod = GameService.getAccessMethod(game, isPremium, unlockedGames, isLoggedIn);

    switch (accessMethod) {
      case 'play':
        onGameSelect(game);
        break;
      
      case 'login_required':
        toast({
          title: "Login Required",
          description: "Please sign in with Pi to access premium games.",
          variant: "destructive",
        });
        break;
      
      case 'purchase_required':
        // Show purchase options
        handlePurchaseOptions(game);
        break;
      
      default:
        onGameSelect(game);
    }
  };

  const handlePurchaseOptions = (game: any) => {
    toast({
      title: `Unlock ${game.name}`,
      description: `This game costs π${game.price_pi}. You can purchase it individually or upgrade to Premium to unlock all games.`,
    });
  };

  const handlePurchaseGame = async (game: any) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const success = await GameService.purchaseGameWithPi(
        game.id, 
        game.name, 
        game.price_pi, 
        user.id
      );
      
      if (success) {
        await fetchUnlockedGames();
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockWithAd = async (game: any) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const success = await GameService.unlockGameWithAd(game.id, game.name, user.id);
      
      if (success) {
        await fetchUnlockedGames();
      }
    } catch (error) {
      console.error('Ad unlock failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'puzzle': return Brain;
      case 'action': return Zap;
      case 'trivia': return Star;
      case 'creative': return Palette;
      case 'infinite': return Infinity;
      default: return Target;
    }
  };

  const getGameIcon = (gameName: string) => {
    if (gameName.toLowerCase().includes('runner')) return '🏃';
    if (gameName.toLowerCase().includes('jump')) return '🦘';
    if (gameName.toLowerCase().includes('space')) return '🚀';
    if (gameName.toLowerCase().includes('treasure')) return '💎';
    if (gameName.toLowerCase().includes('survival')) return '⚔️';
    if (gameName.toLowerCase().includes('puzzle')) return '🧩';
    if (gameName.toLowerCase().includes('color')) return '🎨';
    if (gameName.toLowerCase().includes('memory')) return '🧠';
    if (gameName.toLowerCase().includes('sudoku')) return '📊';
    if (gameName.toLowerCase().includes('crossword')) return '📝';
    return '🎮';
  };

  const categories = [
    { id: 'all', name: 'All Games', icon: Target },
    { id: 'puzzle', name: 'Puzzle', icon: Brain },
    { id: 'action', name: 'Action', icon: Zap },
    { id: 'trivia', name: 'Trivia', icon: Star },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'infinite', name: 'Infinite', icon: Infinity }
  ];

  const getGamesForCategory = (categoryId: string) => {
    return categoryId === 'all' ? gamesData : getGamesByCategory(categoryId);
  };

  const renderGameCard = (game: any) => {
    const canAccess = GameService.canAccessGame(game, isPremium, unlockedGames);
    const isUnlocked = unlockedGames.includes(game.id);
    const CategoryIcon = getCategoryIcon(game.category);

    return (
      <Card key={game.id} className={`transition-all duration-200 hover:shadow-lg ${canAccess ? '' : 'opacity-75'} ${isPremium && !game.is_free ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{getGameIcon(game.name)}</div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {game.name}
                  {isPremium && !game.is_free && <Crown className="w-4 h-4 text-yellow-500" />}
                  {isUnlocked && !isPremium && <span className="text-green-500">✓</span>}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CategoryIcon className="w-3 h-3" />
                    {game.category}
                  </Badge>
                  {!game.is_free && (
                    <Badge variant="secondary">
                      π {game.price_pi}
                    </Badge>
                  )}
                  {isPremium && !game.is_free && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {!canAccess && <Lock className="w-5 h-5 text-gray-400" />}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="mb-4 min-h-[3rem]">
            {game.description}
            {isPremium && !game.is_free && " Premium access - No ads!"}
          </CardDescription>
          
          <div className="flex gap-2">
            {canAccess ? (
              <Button 
                onClick={() => handleGameAction(game)} 
                className="flex-1"
                disabled={loading}
              >
                <Play className="w-4 h-4 mr-2" />
                {isPremium && !game.is_free ? 'Play Premium' : 'Play'}
              </Button>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <Button 
                      onClick={() => handlePurchaseGame(game)} 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      disabled={loading}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      π {game.price_pi}
                    </Button>
                    <Button 
                      onClick={() => handleUnlockWithAd(game)} 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      disabled={loading}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Watch Ad
                    </Button>
                    <Button 
                      onClick={onUpgradeToPremium} 
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => handleGameAction(game)} 
                    variant="outline" 
                    className="flex-1"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In to Unlock
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🎮 AllGames</h2>
        <p className="text-gray-600">
          {gamesData.length} games available • {gamesData.filter(g => g.is_free).length} free • {gamesData.filter(g => !g.is_free).length} premium
          {isPremium && " • All games unlocked with Premium!"}
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1 text-xs">
              <category.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getGamesForCategory(category.id).map(renderGameCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AllGames;
