
import React from 'react';

const DropletSVG = () => {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      className="animate-bounce-gentle"
    >
      {/* Droplet shape */}
      <path
        d="M60 10 C35 35, 20 60, 20 85 C20 110, 35 130, 60 130 C85 130, 100 110, 100 85 C100 60, 85 35, 60 10 Z"
        fill="url(#dropletGradient)"
        className="animate-pulse-gentle"
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00aaff" />
          <stop offset="50%" stopColor="#0099ee" />
          <stop offset="100%" stopColor="#0077cc" />
        </linearGradient>
      </defs>
      
      {/* Highlight */}
      <ellipse
        cx="45"
        cy="40"
        rx="8"
        ry="12"
        fill="rgba(255, 255, 255, 0.6)"
        className="animate-shimmer"
      />
      
      {/* Face */}
      {/* Eyes */}
      <circle cx="48" cy="65" r="4" fill="#fff" />
      <circle cx="72" cy="65" r="4" fill="#fff" />
      <circle cx="49" cy="66" r="2" fill="#333" className="animate-blink" />
      <circle cx="73" cy="66" r="2" fill="#333" className="animate-blink" />
      
      {/* Smile */}
      <path
        d="M50 80 Q60 90 70 80"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="animate-smile"
      />
    </svg>
  );
};

export default DropletSVG;
