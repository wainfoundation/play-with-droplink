
import React from 'react';

const WelcomeFloatingElements: React.FC = () => {
  return (
    <>
      {/* Floating Game Icons */}
      <div className="fixed top-20 left-10 text-4xl animate-bounce opacity-60 z-0">🎮</div>
      <div className="fixed top-32 right-20 text-3xl animate-pulse opacity-60 z-0">🎯</div>
      <div className="fixed bottom-32 left-16 text-4xl animate-bounce opacity-60 z-0" style={{ animationDelay: '1s' }}>🏀</div>
      <div className="fixed bottom-20 right-16 text-3xl animate-pulse opacity-60 z-0" style={{ animationDelay: '2s' }}>🎹</div>
      <div className="fixed top-1/2 left-8 text-2xl animate-spin-slow opacity-60 z-0">⭐</div>
      <div className="fixed top-1/3 right-8 text-2xl animate-spin-slow opacity-60 z-0" style={{ animationDelay: '3s' }}>💎</div>
      
      {/* Floating Hearts */}
      <div className="fixed top-24 left-1/3 text-2xl animate-float opacity-50 z-0">💖</div>
      <div className="fixed top-40 right-1/3 text-2xl animate-float opacity-50 z-0" style={{ animationDelay: '1.5s' }}>💕</div>
      <div className="fixed bottom-40 left-1/4 text-2xl animate-float opacity-50 z-0" style={{ animationDelay: '2.5s' }}>💗</div>
      
      {/* Floating Coins */}
      <div className="fixed top-16 left-1/2 text-xl animate-bounce opacity-70 z-0" style={{ animationDelay: '0.5s' }}>🪙</div>
      <div className="fixed bottom-24 right-1/2 text-xl animate-bounce opacity-70 z-0" style={{ animationDelay: '1.8s' }}>💰</div>
    </>
  );
};

export default WelcomeFloatingElements;
