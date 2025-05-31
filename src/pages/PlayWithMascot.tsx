
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useGames } from '@/hooks/useGames';
import { usePiPayment } from '@/hooks/usePiPayment';
import { useCharacter } from '@/hooks/useCharacter';
import GameEngine from '@/components/games/GameEngine';
import GameUpgradeModal from '@/components/games/GameUpgradeModal';
import PiBrowserCheck from '@/components/PiBrowserCheck';
import Navbar from '@/components/Navbar';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import { CharacterStats, PetInteraction } from '@/components/character/types';
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
  const { character, loading: characterLoading, updateStats, unlockRoom } = useCharacter();
  
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [currentBattle, setCurrentBattle] = useState<any>(null);
  const [userPlan, setUserPlan] = useState('free');
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [activeTab, setActiveTab] = useState('character');
  const [coins, setCoins] = useState(1125);
  const [level, setLevel] = useState(2);

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

  // Redirect to welcome if no character
  useEffect(() => {
    if (isLoggedIn && !characterLoading && !character) {
      window.location.href = '/welcome';
    }
  }, [isLoggedIn, character, characterLoading]);

  const handleMyBooInteraction = async (type: string) => {
    if (!character) return;

    setCurrentEmotion(1);
    
    let newStats = { ...character.stats };
    let coinsEarned = 0;

    // Update stats based on interaction
    if (type === 'feed') {
      newStats.hunger = Math.min(100, newStats.hunger + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 10);
      coinsEarned = 10;
    } else if (type === 'play') {
      newStats.happiness = Math.min(100, newStats.happiness + 20);
      newStats.energy = Math.max(0, newStats.energy - 10);
      coinsEarned = 15;
    } else if (type === 'clean') {
      newStats.cleanliness = Math.min(100, newStats.cleanliness + 30);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 8;
    } else if (type === 'sleep') {
      newStats.energy = Math.min(100, newStats.energy + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 5;
    }

    await updateStats(newStats);
    setCoins(prev => prev + coinsEarned);

    if (soundEnabled) sounds.powerup();
    
    toast({
      title: "Great!",
      description: `Your ${character.name} enjoyed ${type}ing! +${coinsEarned} coins`,
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

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      sounds.click();
    }
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

  if (gamesLoading || characterLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!character) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Character Found</h1>
            <p className="text-gray-600 mb-4">Please create a character first.</p>
            <a href="/welcome" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
              Create Character
            </a>
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
          <title>{currentGame.name} - Play with {character.name}</title>
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
              stats={character.stats}
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
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Store</h2>
              <p className="text-gray-600">Buy items for your character!</p>
            </div>
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
