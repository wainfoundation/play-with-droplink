
import React from 'react';

interface WelcomeMascotProps {
  visible: boolean;
}

const WelcomeMascot: React.FC<WelcomeMascotProps> = ({ visible }) => {
  return (
    <div className={`transition-all duration-1000 ${
      visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
    }`}>
      {/* Animated Welcome Mascot */}
      <div className="relative mb-8">
        <div className="text-8xl animate-bounce-gentle mb-4">😊</div>
        <div className="absolute -top-4 -right-4 text-3xl animate-pulse">💝</div>
        <div className="absolute -bottom-4 -left-4 text-3xl animate-spin-slow">✨</div>
        <div className="absolute top-0 left-8 text-2xl animate-shimmer">⭐</div>
        <div className="absolute bottom-0 right-8 text-2xl animate-shimmer">🎉</div>
      </div>
    </div>
  );
};

export default WelcomeMascot;
