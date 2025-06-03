
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StreakBenefitsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="font-semibold mb-1">Daily Login</h3>
            <p className="text-sm text-gray-600">Claim rewards every day to build your streak</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold mb-1">Increasing Rewards</h3>
            <p className="text-sm text-gray-600">Longer streaks give better rewards</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold mb-1">Weekly Bonus</h3>
            <p className="text-sm text-gray-600">Special rewards on day 7</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakBenefitsCard;
