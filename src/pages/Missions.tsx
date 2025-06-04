
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MissionsPanel from '@/components/missions/MissionsPanel';
import EnhancedDailyRewards from '@/components/rewards/EnhancedDailyRewards';
import IconButton from '@/components/ui/icon-button';

const Missions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Daily Missions & Rewards - Play with Droplink</title>
        <meta name="description" content="Complete daily missions and claim rewards for your droplet pet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              🎯 Daily Missions & Rewards
            </h1>
            <p className="text-lg text-gray-600">
              Complete missions and claim daily rewards for your pet
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center mb-8">
            <IconButton
              icon={Home}
              label="Back Home"
              onClick={() => navigate('/play')}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Rewards */}
            <div>
              <EnhancedDailyRewards />
            </div>
            
            {/* Daily Missions */}
            <div>
              <MissionsPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Missions;
