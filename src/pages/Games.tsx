
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';
import NavigationBar from '@/components/pet/NavigationBar';
import MiniGameHub from '@/components/games/MiniGameHub';

const Games: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Mini Games - Play & Earn</title>
        <meta name="description" content="Play fun mini games and earn coins for your pet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 pb-20">
        <div className="bg-gradient-to-r from-red-400 to-yellow-500 text-white p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <IconButton
              icon={ArrowLeft}
              label="Back"
              onClick={() => navigate(-1)}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
            <h1 className="text-3xl font-bold">🎮 Mini Games</h1>
            <IconButton
              icon={Home}
              label="Home"
              onClick={() => navigate('/play')}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
          </div>
        </div>
        
        <MiniGameHub onBack={() => navigate('/play')} />
        <NavigationBar />
      </div>
    </>
  );
};

export default Games;
