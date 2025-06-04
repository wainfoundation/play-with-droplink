
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CompletePetGame from '@/components/pet/CompletePetGame';
import { useNavigate } from 'react-router-dom';

const PetGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Pet Game - Take Care of Your Droplet</title>
        <meta name="description" content="Take care of your virtual droplet pet. Feed, clean, play and watch it grow!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <CompletePetGame onBack={() => navigate('/')} />
      </div>
    </>
  );
};

export default PetGame;
