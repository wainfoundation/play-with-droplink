
import React from 'react';

export const LeftHand = () => (
  <div className="absolute -left-8 top-12 animate-wave-left">
    <svg width="30" height="40" viewBox="0 0 30 40">
      <path
        d="M5 15 Q8 10, 12 12 Q16 8, 20 12 Q24 10, 25 15 Q25 20, 22 25 Q18 30, 12 28 Q8 25, 5 20 Z"
        fill="#00aaff"
        stroke="#0077cc"
        strokeWidth="1"
      />
      {/* Fingers */}
      <circle cx="12" r="2" fill="#00aaff" className="animate-finger-wave" />
      <circle cx="16" r="2" fill="#00aaff" className="animate-finger-wave delay-100" />
      <circle cx="20" r="2" fill="#00aaff" className="animate-finger-wave delay-200" />
    </svg>
  </div>
);

export const RightHand = () => (
  <div className="absolute -right-8 top-12 animate-wave-right">
    <svg width="30" height="40" viewBox="0 0 30 40">
      <path
        d="M25 15 Q22 10, 18 12 Q14 8, 10 12 Q6 10, 5 15 Q5 20, 8 25 Q12 30, 18 28 Q22 25, 25 20 Z"
        fill="#00aaff"
        stroke="#0077cc"
        strokeWidth="1"
      />
      {/* Fingers */}
      <circle cx="18" r="2" fill="#00aaff" className="animate-finger-wave" />
      <circle cx="14" r="2" fill="#00aaff" className="animate-finger-wave delay-100" />
      <circle cx="10" r="2" fill="#00aaff" className="animate-finger-wave delay-200" />
    </svg>
  </div>
);
