
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MyBooStyleGame from '@/components/pet/MyBooStyleGame';

const PlayWithMascot = () => {
  return (
    <>
      <Helmet>
        <title>My Droplet Pet - Virtual Pet Care Game</title>
        <meta name="description" content="Take care of your virtual droplet pet! Feed, play, and watch them grow in this engaging My Boo-style pet game." />
      </Helmet>
      
      <MyBooStyleGame />
    </>
  );
};

export default PlayWithMascot;
