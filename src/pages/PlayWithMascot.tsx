
import React from 'react';
import { Helmet } from 'react-helmet-async';
import FullScreenPetGame from '@/components/pet/FullScreenPetGame';

const PlayWithMascot = () => {
  return (
    <>
      <Helmet>
        <title>My Droplet Pet - Virtual Pet Care Game</title>
        <meta name="description" content="Take care of your virtual droplet pet! Feed, play, and watch them grow in this engaging virtual pet game." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <FullScreenPetGame />
    </>
  );
};

export default PlayWithMascot;
