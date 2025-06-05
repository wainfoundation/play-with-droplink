
import React from 'react';
import { Helmet } from 'react-helmet-async';
import FullScreenPetGame from '@/components/pet/FullScreenPetGame';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Play with Droplink - Your Pi Network Gaming Hub</title>
        <meta name="description" content="Play with your virtual pet droplet, earn rewards, and enjoy mini-games in the Pi Network ecosystem." />
      </Helmet>
      <FullScreenPetGame />
    </>
  );
};

export default Index;
