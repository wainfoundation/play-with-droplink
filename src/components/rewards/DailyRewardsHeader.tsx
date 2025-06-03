
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gift } from 'lucide-react';

interface DailyRewardsHeaderProps {
  onBack: () => void;
}

const DailyRewardsHeader: React.FC<DailyRewardsHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center gap-2 justify-center">
          <Gift className="h-8 w-8 text-purple-500" />
          Daily Rewards
        </h1>
        <p className="text-gray-600">Claim your daily login bonus!</p>
      </div>
      <div className="w-20"></div>
    </div>
  );
};

export default DailyRewardsHeader;
