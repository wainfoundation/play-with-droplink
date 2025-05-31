import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import GameEngine from '@/components/games/GameEngine';
import GameUpgradeModal from '@/components/games/GameUpgradeModal';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import GameManager from '@/components/games/GameManager';
import CharacterManager from '@/components/character/CharacterManager';
import StoreManager from '@/components/store/StoreManager';
import RoomManager from '@/components/room/RoomManager';
import BattleManager from '@/components/battles/BattleManager';
import PlayWithMascotHeader from '@/components/games/PlayWithMascotHeader';
import Navbar from '@/components/Navbar';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import { CharacterCustomization, CharacterStats, ShopItem, PetInteraction } from '@/components/character/types';
import MyBooHeader from '@/components/games/MyBooHeader';
import MyBooBottomNavigation from '@/components/games/MyBooBottomNavigation';
import MyBooCharacterDisplay from '@/components/games/MyBooCharacterDisplay';
import MyBooGameGrid from '@/components/games/MyBooGameGrid';
import MyBooStyleShop from '@/components/games/MyBooStyleShop';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { handleSubscribe, loading: paymentLoading } = usePiPayment();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [currentBattle, setCurrentBattle] = useState<any>(null);
  const [userPlan, setUserPlan] = useState('free');
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [activeTab, setActiveTab] = useState('games');
  
  // Character system states - Load from localStorage or use default
  const [character, setCharacter] = useState<CharacterCustomization>(() => {
    const saved = localStorage.getItem('droplinkCharacter');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved character:', e);
      }
    }
    return {
      id: '1',
      name: 'My Droplink',
      color: '#00aaff',
      clothes: [],
      accessories: [],
      background: 'default',
      room: 'default',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });
  
  const [characterStats, setCharacterStats] = useState<CharacterStats>({
    happiness: 80,
    hunger: 60,
    cleanliness: 70,
    energy: 85
  });

  const [upgradeModal, setUpgradeModal] = useState<{
    isOpen: boolean;
    upgradeType: 'skill' | 'powerup' | 'unlock' | 'boost';
    upgradeName: string;
    piCost: number;
  }>({
    isOpen: false,
    upgradeType: 'skill',
    upgradeName: '',
    piCost: 0
  });

  // Check Pi Browser on component mount
  useEffect(() => {
    const isPiBrowser = isRunningInPiBrowser();
    if (isPiBrowser) {
      setShowPiBrowserCheck(false);
    }
  }, []);

  // Background music control
  useEffect(() => {
    if (soundEnabled) {
      musicController.start();
    } else {
      musicController.stop();
    }

    return () => {
      musicController.stop();
    };
  }, [soundEnabled, musicController]);

  // Set user plan from user data
  useEffect(() => {
    if (user?.plan) {
      setUserPlan(user.plan);
    }
    if (user?.total_score) {
      setTotalScore(user.total_score);
    }
  }, [user]);

  const handleCharacterUpdate = (updatedCharacter: CharacterCustomization) => {
    setCharacter(updatedCharacter);
    // Save to localStorage
    localStorage.setItem('droplinkCharacter', JSON.stringify(updatedCharacter));
    toast({
      title: "Character Updated!",
      description: `${updatedCharacter.name} has been updated.`,
    });
  };

  const handleStorePurchase = (item: any) => {
    if (item.currency === 'pi') {
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'unlock',
        upgradeName: item.name,
        piCost: item.price
      });
    } else {
      toast({
        title: "Watch Ad",
        description: "Watch an ad to unlock this item!",
      });
    }
  };

  const handlePurchaseItem = async (item: ShopItem) => {
    if (item.currency === 'pi') {
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'unlock',
        upgradeName: item.name,
        piCost: item.price
      });
    } else {
      toast({
        title: "Watch Ad",
        description: "Watch an ad to unlock this item!",
      });
    }
  };

  const handlePetInteraction = (interaction: PetInteraction) => {
    setCurrentEmotion(1);
    toast({
      title: "Character Interaction",
      description: `Your character enjoyed ${interaction.type}ing!`,
    });
  };

  const handleStartBattle = (battle: any) => {
    setCurrentBattle(battle);
    setCurrentEmotion(1);
    toast({
      title: "Battle Starting!",
      description: "Get ready to battle!",
    });
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      sounds.click();
    }
  };

  const handleGameClick = (game: any, category: string) => {
    if (soundEnabled) sounds.click();
    
    if (!game.is_free && userPlan === 'free' && !purchasedGames.includes(game.id)) {
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'unlock',
        upgradeName: game.name,
        piCost: game.price_pi || 1
      });
      return;
    }

    setCurrentGame({ ...game, category });
    setCurrentEmotion(1);
    toast({
      title: `Starting ${game.name}`,
      description: "Get ready to play!",
    });
  };

  const handlePurchaseGame = async (game: any) => {
    if (soundEnabled) sounds.click();
    
    setUpgradeModal({
      isOpen: true,
      upgradeType: 'unlock',
      upgradeName: game.name,
      piCost: game.price_pi || 1
    });
  };

  const handleUpgradeComplete = (method: 'pi' | 'ad') => {
    if (soundEnabled) {
      if (method === 'pi') {
        sounds.coin();
      } else {
        sounds.powerup();
      }
    }
    
    setCurrentEmotion(8);
  };

  const handleMoodChange = (mood: number) => {
    setCurrentEmotion(mood);
  };

  if (showPiBrowserCheck && !isRunningInPiBrowser()) {
    return (
      <>
        <Navbar />
        <PiBrowserCheck 
          showContinueOption={true}
          onContinueAnyway={() => setShowPiBrowserCheck(false)}
        />
      </>
    );
  }

  if (gamesLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading games...</p>
          </div>
        </div>
      </>
    );
  }

  // Show game engine if a game is selected
  if (currentGame) {
    return (
      <>
        <Helmet>
          <title>{currentGame.name} - Play with Droplink</title>
        </Helmet>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="container mx-auto px-4">
            <GameEngine
              game={currentGame}
              onBack={() => setCurrentGame(null)}
              onGameComplete={(score) => {
                setTotalScore(prev => prev + score);
                setCurrentEmotion(8);
                if (soundEnabled) sounds.success();
                toast({
                  title: "Great Job!",
                  description: `You earned ${score} points!`,
                });
              }}
            />
          </div>
        </div>
      </>
    );
  }

  // Show battle engine if a battle is selected
  if (currentBattle) {
    return (
      <>
        <Helmet>
          <title>Battle Arena - Play with Droplink</title>
        </Helmet>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Battle Arena</h1>
              <p className="text-lg text-gray-600 mb-8">Battle in progress...</p>
              <button 
                onClick={() => setCurrentBattle(null)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Exit Battle
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const [coins, setCoins] = useState(1125);
  const [level, setLevel] = useState(2);

  const handleMyBooInteraction = (type: string) => {
    setCurrentEmotion(1);
    
    // Update coins and stats based on interaction
    if (type === 'feed') {
      setCharacterStats(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 25),
        happiness: Math.min(100, prev.happiness + 10)
      }));
      setCoins(prev => prev + 10);
    } else if (type === 'play') {
      setCharacterStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 10)
      }));
      setCoins(prev => prev + 15);
    } else if (type === 'clean') {
      setCharacterStats(prev => ({
        ...prev,
        cleanliness: Math.min(100, prev.cleanliness + 30),
        happiness: Math.min(100, prev.happiness + 5)
      }));
      setCoins(prev => prev + 8);
    } else if (type === 'rest') {
      setCharacterStats(prev => ({
        ...prev,
        energy: Math.min(100, prev.energy + 25),
        happiness: Math.min(100, prev.happiness + 5)
      }));
      setCoins(prev => prev + 5);
    }

    if (soundEnabled) sounds.powerup();
    
    toast({
      title: "Great!",
      description: `Your Boo enjoyed ${type}ing! +${type === 'play' ? 15 : type === 'feed' ? 10 : type === 'clean' ? 8 : 5} coins`,
    });
  };

  const handleMyBooGameClick = (game: any) => {
    if (soundEnabled) sounds.click();
    
    if (game.locked) {
      toast({
        title: "Game Locked!",
        description: "Complete more activities to unlock this game!",
        variant: "destructive"
      });
      return;
    }

    setCurrentGame({ ...game, category: 'minigames' });
    setCurrentEmotion(1);
    toast({
      title: `Starting ${game.name}`,
      description: "Let's play!",
    });
  };

  const handleStylePurchase = (item: any) => {
    if (coins >= item.price) {
      setCoins(prev => prev - item.price);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${item.name}!`,
      });
    } else {
      toast({
        title: "Not enough coins!",
        description: "Play more games to earn coins!",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>My Boo - Play with {character.name}</title>
        <meta name="description" content={`Take care of your virtual pet ${character.name}, play minigames, and customize their style!`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-200">
        {/* Header */}
        <MyBooHeader
          totalScore={totalScore}
          coins={coins}
          level={level}
          soundEnabled={soundEnabled}
          onSoundToggle={toggleSound}
        />

        {/* Main Content */}
        <div className="px-4 pt-4 pb-20">
          {activeTab === 'character' && (
            <MyBooCharacterDisplay
              character={character}
              stats={characterStats}
              onInteraction={handleMyBooInteraction}
              soundEnabled={soundEnabled}
            />
          )}

          {activeTab === 'games' && (
            <MyBooGameGrid
              games={games}
              onGameClick={handleMyBooGameClick}
              userCoins={coins}
            />
          )}

          {activeTab === 'customize' && (
            <MyBooStyleShop
              character={character}
              onPurchase={handleStylePurchase}
              userCoins={coins}
            />
          )}

          {activeTab === 'store' && (
            <StoreManager
              onPurchase={handleStorePurchase}
              soundEnabled={soundEnabled}
            />
          )}

          {activeTab === 'room' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Community</h2>
              <p className="text-gray-600">Connect with other Boo owners!</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <MyBooBottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Game Upgrade Modal */}
        <GameUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal(prev => ({ ...prev, isOpen: false }))}
          upgradeType={upgradeModal.upgradeType}
          upgradeName={upgradeModal.upgradeName}
          piCost={upgradeModal.piCost}
          onUpgradeComplete={handleUpgradeComplete}
        />
      </div>
    </>
  );
};

export default PlayWithMascot;
