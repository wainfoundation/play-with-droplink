
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Coins, User, Award } from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';

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
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 z-50">
        <div className="p-4">
          <Button variant="outline" onClick={onBack} className="mb-4 bg-white/20 border-white/30 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="max-w-md mx-auto space-y-4">
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {wallet.dropletCoins}
                  </div>
                  <div className="text-gray-600">Droplet Coins</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500 to-pink-600 z-50">
        <div className="p-4">
          <Button variant="outline" onClick={onBack} className="mb-4 bg-white/20 border-white/30 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="max-w-md mx-auto space-y-4">
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <CharacterRenderer character={selectedCharacter} size={80} />
                </div>
                <h3 className="text-xl font-bold mb-2">{selectedCharacter.name}</h3>
                <p className="text-gray-600 mb-4">{selectedCharacter.personality}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PetGameViews;
