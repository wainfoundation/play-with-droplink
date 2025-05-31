
import React from 'react';
import { Gamepad2, Heart, Zap } from 'lucide-react';

const WelcomeFloatingElements: React.FC = () => {
  return (
    <>
      <div className="absolute top-20 left-20 animate-bounce">
        <Gamepad2 className="text-primary/30 h-8 w-8" />
      </div>
      <div className="absolute top-40 right-32 animate-bounce delay-300">
        <Heart className="text-red-400/30 h-6 w-6" />
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce delay-700">
        <Zap className="text-yellow-400/30 h-7 w-7" />
      </div>
    </>
  );
};

export default WelcomeFloatingElements;
