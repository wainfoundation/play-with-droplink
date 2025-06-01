
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TargetRushEngine from '@/components/games/engines/TargetRushEngine';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TargetRush = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character } = location.state || {};

  const handleGameComplete = (score: number) => {
    console.log('Target Rush completed with score:', score);
  };

  const handleBack = () => {
    navigate('/play');
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/play')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Target Rush | Droplink Games</title>
        <meta name="description" content="Test your reflexes and aim for high scores!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <TargetRushEngine onBack={handleBack} onGameComplete={handleGameComplete} />
        </div>
      </div>
    </>
  );
};

export default TargetRush;
