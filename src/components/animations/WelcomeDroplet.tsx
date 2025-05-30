
import React, { useEffect, useState } from 'react';
import DropletSVG from './DropletSVG';
import { LeftHand, RightHand } from './DropletHands';
import { LeftLeg, RightLeg } from './DropletLegs';
import SpeechBubble from './SpeechBubble';
import DropletAnimations from './DropletAnimations';

const WelcomeDroplet = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the droplet after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-20 right-8 z-50 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
    }`}>
      <div className="relative">
        {/* Main droplet body */}
        <div className="droplet-body relative">
          <DropletSVG />
          
          {/* Hands */}
          <LeftHand />
          <RightHand />
          
          {/* Legs */}
          <LeftLeg />
          <RightLeg />
        </div>
        
        {/* Speech bubble */}
        <SpeechBubble />
      </div>
      
      {/* Animations */}
      <DropletAnimations />
    </div>
  );
};

export default WelcomeDroplet;
