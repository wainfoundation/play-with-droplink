
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
import PlayWithMascotHeader from '@/components/games/PlayWithMascotHeader';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import { CharacterCustomization, CharacterStats, ShopItem, PetInteraction } from '@/components/character/types';

const PlayWithMascot = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { games, loading: gamesLoading } = useGames();
  const { handleSubscribe, loading: paymentLoading } = usePiPayment();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [userPlan, setUserPlan] = useState('free');
  const [purchasedGames, setPurchasedGames] = useState<string[]>([]);
  const [showPiBrowserCheck, setShowPiBrowserCheck] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [activeTab, setActiveTab] = useState('games');
  
  // Character system states
  const [character, setCharacter] = useState<CharacterCustomization>({
    id: '1',
    name: 'My Character',
    color: '#4ecdc4',
    clothes: [],
    accessories: [],
    background: 'default',
    room: 'default',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
    // Here you would save to database
    toast({
      title: "Character Updated!",
      description: `${updatedCharacter.name} has been updated.`,
    });
  };

  const handlePurchaseItem = async (item: ShopItem) => {
    if (item.currency === 'pi') {
      // Handle Pi payment
      setUpgradeModal({
        isOpen: true,
        upgradeType: 'unlock',
        upgradeName: item.name,
        piCost: item.price
      });
    } else {
      // Handle ad viewing
      toast({
        title: "Watch Ad",
        description: "Watch an ad to unlock this item!",
      });
      // Here you would show an ad
    }
  };

  const handlePetInteraction = (interaction: PetInteraction) => {
    // Update character happiness based on interaction
    setCurrentEmotion(1); // excited
    
    toast({
      title: "Character Interaction",
      description: `Your character enjoyed ${interaction.type}ing!`,
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
    setCurrentEmotion(1); // excited
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
    
    setCurrentEmotion(8); // proud
    // Apply the upgrade logic here
  };

  const handleMoodChange = (mood: number) => {
    setCurrentEmotion(mood);
  };

  if (showPiBrowserCheck && !isRunningInPiBrowser()) {
    return (
      <PiBrowserCheck 
        showContinueOption={true}
        onContinueAnyway={() => setShowPiBrowserCheck(false)}
      />
    );
  }

  if (gamesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  // Show game engine if a game is selected
  if (currentGame) {
    return (
      <>
        <Helmet>
          <title>{currentGame.name} - Play with Droplink</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="container mx-auto px-4">
            <GameEngine
              game={currentGame}
              onBack={() => setCurrentGame(null)}
              onGameComplete={(score) => {
                setTotalScore(prev => prev + score);
                setCurrentEmotion(8); // proud
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
        <title>Play with Droplink - Interactive Games & Character Customization</title>
        <meta name="description" content="Play 50+ interactive games and customize your unique character! Feed, play, and enhance your virtual pet with Pi Network integration." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          <PlayWithMascotHeader
            totalScore={totalScore}
            userPlan={userPlan}
            soundEnabled={soundEnabled}
            activeTab={activeTab}
            onSoundToggle={toggleSound}
            onTabChange={setActiveTab}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
            <TabsContent value="games">
              <GameManager
                games={games}
                userPlan={userPlan}
                purchasedGames={purchasedGames}
                soundEnabled={soundEnabled}
                onGameClick={handleGameClick}
                onPurchaseGame={handlePurchaseGame}
                onMoodChange={handleMoodChange}
              />
            </TabsContent>

            <TabsContent value="character">
              <CharacterManager
                character={character}
                characterStats={characterStats}
                activeTab={activeTab}
                soundEnabled={soundEnabled}
                onCharacterUpdate={handleCharacterUpdate}
                onStatsUpdate={setCharacterStats}
                onPurchaseItem={handlePurchaseItem}
                onPetInteraction={handlePetInteraction}
              />
            </TabsContent>

            <TabsContent value="customize">
              <CharacterManager
                character={character}
                characterStats={characterStats}
                activeTab={activeTab}
                soundEnabled={soundEnabled}
                onCharacterUpdate={handleCharacterUpdate}
                onStatsUpdate={setCharacterStats}
                onPurchaseItem={handlePurchaseItem}
                onPetInteraction={handlePetInteraction}
              />
            </TabsContent>
          </Tabs>
        </div>

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
