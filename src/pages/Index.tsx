
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedPetGame from '@/components/pet/EnhancedPetGame';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>PlayDrop Evolution - Your Virtual Pet Adventure</title>
        <meta name="description" content="Watch your baby droplet evolve through life stages as you care for it and complete activities!" />
      </Helmet>
      <EnhancedPetGame />
    </>
  );
};

export default Index;
