
import React from 'react';
import { OutfitConfig } from './types';

interface MascotRendererProps {
  outfit: OutfitConfig;
  isAnimating: boolean;
  lastAction: string;
}

const MascotRenderer: React.FC<MascotRendererProps> = ({ outfit, isAnimating, lastAction }) => {
  return (
    <div className="relative">
      {/* Main mascot body */}
      <svg
        width="200"
        height="240"
        viewBox="0 0 200 240"
        className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : 'animate-bounce-gentle'}`}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={outfit.color} />
            <stop offset="50%" stopColor={outfit.color} />
            <stop offset="100%" stopColor="#0077cc" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main droplet body */}
        <path
          d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
          fill="url(#mascotGradient)"
          filter="url(#glow)"
          className="animate-pulse-gentle"
        />
        
        {/* Shine effect */}
        <ellipse
          cx="75"
          cy="70"
          rx="12"
          ry="18"
          fill="rgba(255, 255, 255, 0.6)"
          className="animate-shimmer"
        />
        
        {/* Eyes */}
        <ellipse cx="85" cy="80" rx="8" ry="12" fill="#000" />
        <ellipse cx="115" cy="80" rx="8" ry="12" fill="#000" />
        <ellipse cx="87" cy="78" rx="3" ry="4" fill="#fff" />
        <ellipse cx="117" cy="78" rx="3" ry="4" fill="#fff" />
        
        {/* Mouth */}
        <path d="M 85 110 Q 100 125 115 110" stroke="#000" strokeWidth="3" fill="none" />
        
        {/* Outfit accessories */}
        {outfit.accessory === 'hat' && (
          <ellipse cx="100" cy="45" rx="25" ry="8" fill="#ff0000" />
        )}
        {outfit.accessory === 'tie' && (
          <path d="M 95 130 L 105 130 L 103 160 L 97 160 Z" fill="#ff0000" />
        )}
        {outfit.accessory === 'headband' && (
          <rect x="70" y="65" width="60" height="5" fill="#ffff00" rx="2" />
        )}
        {outfit.accessory === 'bowtie' && (
          <>
            <path d="M 85 120 L 95 115 L 95 125 Z" fill="#ff00ff" />
            <path d="M 115 120 L 105 115 L 105 125 Z" fill="#ff00ff" />
            <rect x="95" y="117" width="10" height="6" fill="#ff00ff" />
          </>
        )}
      </svg>
      
      {/* Action animation overlay */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-bounce">
            {lastAction === 'feeding' && '🍎'}
            {lastAction === 'playing' && '🎮'}
            {lastAction === 'showering' && '🚿'}
            {lastAction === 'resting' && '😴'}
            {lastAction === 'dressing' && '👕'}
          </div>
        </div>
      )}
    </div>
  );
};

export default MascotRenderer;
