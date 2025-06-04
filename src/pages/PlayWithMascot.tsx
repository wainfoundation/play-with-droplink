
import React from 'react';
import { Helmet } from 'react-helmet-async';
import FullScreenPetGame from '@/components/pet/FullScreenPetGame';
import NavigationBar from '@/components/pet/NavigationBar';

const PlayWithMascot: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>My Pet Droplet - Play with Droplink</title>
        <meta name="description" content="Take care of your virtual droplet pet and watch it grow!" />
      </Helmet>
      
      <div className="relative">
        <FullScreenPetGame />
        <NavigationBar />
      </div>
    </>
  );
};

export default PlayWithMascot;
