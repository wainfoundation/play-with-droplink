
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import WalletDisplay from '@/components/economy/WalletDisplay';

type GameView = 'wallet' | 'profile';

interface PetGameViewsProps {
  currentView: GameView;
  onBack: () => void;
  wallet: { dropletCoins: number };
  user: any;
  profile: any;
  selectedCharacter: any;
}

const PetGameViews: React.FC<PetGameViewsProps> = ({
  currentView,
  onBack,
  wallet,
  user,
  profile,
  selectedCharacter
}) => {
  if (currentView === 'wallet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">My Wallet</h1>
            <div></div>
          </div>
          <WalletDisplay dropletCoins={wallet.dropletCoins} />
        </div>
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Profile</h1>
            <div></div>
          </div>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <CharacterRenderer character={selectedCharacter} size={100} />
              </div>
              <h2 className="text-xl font-bold mb-2">{profile?.display_name || user?.email || 'Player'}</h2>
              <div className="space-y-2">
                <Badge variant="outline">Level 1</Badge>
                <Badge variant="outline">{wallet.dropletCoins} Coins</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default PetGameViews;
