
import React from 'react';

interface MascotIconProps {
  size?: number;
  mood?: string;
}

const MascotIcon: React.FC<MascotIconProps> = ({ size = 64, mood = 'happy' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className="mascot-icon">
      <defs>
        <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00aaff" />
          <stop offset="50%" stopColor="#00aaff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00aaff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Character shape - simplified for icon */}
      <path
        d="M100 20 C70 50, 50 80, 50 120 C50 160, 75 180, 100 180 C125 180, 150 160, 150 120 C150 80, 130 50, 100 20 Z"
        fill="url(#mascotGradient)"
      />
      
      {/* Highlight */}
      <ellipse
        cx="85"
        cy="60"
        rx="8"
        ry="12"
        fill="rgba(255, 255, 255, 0.6)"
      />
      
      {/* Eyes */}
      <circle cx="85" cy="90" r="6" fill="#fff" />
      <circle cx="115" cy="90" r="6" fill="#fff" />
      <circle cx="85" cy="92" r="3" fill="#333" />
      <circle cx="115" cy="92" r="3" fill="#333" />
      <circle cx="86" cy="90" r="1" fill="#fff" />
      <circle cx="116" cy="90" r="1" fill="#fff" />
      
      {/* Mouth */}
      <path
        d="M90 120 Q100 130 110 120"
        stroke="#333"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MascotIcon;
