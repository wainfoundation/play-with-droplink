
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedPetGame from '@/components/pet/EnhancedPetGame';

const PlayDrop: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>PlayDrop - Virtual Pet Game</title>
        <meta name="description" content="Take care of your virtual droplet pet and grow through Droplink activities" />
      </Helmet>
      <EnhancedPetGame />
    </>
  );
};

export default PlayDrop;
