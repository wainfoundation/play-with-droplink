
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrophyIcon, CrownIcon, CoinsIcon, Coins } from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import WelcomeStyles from '@/components/welcome/WelcomeStyles';
import RewardedAdButton from '@/components/RewardedAdButton';

interface CharacterDisplayProps {
  selectedCharacter: any;
  totalScore: number;
  userPlan: string;
  paymentLoading: boolean;
  onUpgradeToPremium: () => void;
  onAdReward: (reward: any) => void;
  onAdError: (error: string) => void;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  selectedCharacter,
  totalScore,
  userPlan,
  paymentLoading,
  onUpgradeToPremium,
  onAdReward,
  onAdError
}) => {
  if (!selectedCharacter) return null;

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <CharacterRenderer character={selectedCharacter} size={200} />
              
              {/* Thought bubble */}
              <div className="absolute -right-4 -top-4 bg-white rounded-lg p-3 shadow-lg border-2 border-primary/20 max-w-xs animate-float">
                <p className="text-sm font-medium text-primary">
                  Let's play some amazing games! 🎮
                </p>
              </div>
            </div>

            {/* Character Info */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold">{selectedCharacter.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedCharacter.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                }`}>
                  {selectedCharacter.gender === 'male' ? '♂' : '♀'} {selectedCharacter.gender}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {selectedCharacter.mood}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedCharacter.personality}</p>
            </div>

            {/* Score & Status Display */}
            <div className="flex flex-col gap-2 mb-4 w-full max-w-xs">
              <Badge variant="secondary" className="text-lg px-4 py-2 justify-center">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Score: {totalScore}
              </Badge>
              <Badge variant={userPlan === 'premium' ? 'default' : 'outline'} className="text-lg px-4 py-2 justify-center">
                {userPlan === 'premium' ? <CrownIcon className="w-5 h-5 mr-2" /> : <CoinsIcon className="w-5 h-5 mr-2" />}
                {userPlan === 'premium' ? 'Premium' : 'Free Plan'}
              </Badge>
            </div>

            {/* Watch Ad and Pay for Pi Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <RewardedAdButton
                reward={{ type: "pi", amount: 0.1, description: "Watch ad reward" }}
                onAdComplete={onAdReward}
                onAdError={onAdError}
                buttonText="Watch Ad for Reward"
                className="w-full"
              />
              
              <Button 
                onClick={onUpgradeToPremium}
                disabled={paymentLoading || userPlan === 'premium'}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <Coins className="w-4 h-4 mr-2" />
                {userPlan === 'premium' ? 'Premium Active' : 'Pay 10 Pi for Premium'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <WelcomeStyles />
    </>
  );
};

export default CharacterDisplay;
