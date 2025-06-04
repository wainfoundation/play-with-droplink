
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MissionsPanel from '@/components/missions/MissionsPanel';
import EnhancedDailyRewards from '@/components/rewards/EnhancedDailyRewards';

const Missions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Daily Missions & Rewards - Droplet Pet</title>
        <meta name="description" content="Complete daily missions and claim rewards for your droplet pet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center">🎯 Daily Missions & Rewards</h1>
          
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
