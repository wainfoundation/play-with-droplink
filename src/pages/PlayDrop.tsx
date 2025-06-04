
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MyBooStyleGame from '@/components/pet/MyBooStyleGame';

const PlayDrop: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>PlayDrop - Virtual Pet Game</title>
        <meta name="description" content="Take care of your virtual droplet pet" />
      </Helmet>
      <MyBooStyleGame />
    </>
  );
};

export default PlayDrop;
