
import React from 'react';
import SplashWrapper from '@/components/welcome/SplashWrapper';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const handleStartPlaying = () => {
    navigate('/play');
  };

  const handleViewLanding = () => {
    navigate('/landing');
  };

  return (
    <SplashWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Droplink!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your Pi-powered pet companion awaits. Start your journey today!
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleStartPlaying}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg"
            >
              Start Playing
            </Button>
            
            <Button 
              onClick={handleViewLanding}
              variant="outline"
              className="w-full py-3 text-lg"
            >
              View Landing Page
            </Button>
          </div>
        </div>
      </div>
    </SplashWrapper>
  );
};

export default Index;
