
import React from 'react';

export const LeftLeg = () => (
  <div className="absolute -left-4 bottom-2 animate-leg-kick-left">
    <svg width="25" height="35" viewBox="0 0 25 35">
      <ellipse cx="12" cy="17" rx="6" ry="15" fill="#00aaff" stroke="#0077cc" strokeWidth="1" />
      {/* Foot */}
      <ellipse cx="12" cy="30" rx="8" ry="4" fill="#0077cc" />
    </svg>
  </div>
);

export const RightLeg = () => (
  <div className="absolute -right-4 bottom-2 animate-leg-kick-right">
    <svg width="25" height="35" viewBox="0 0 25 35">
      <ellipse cx="13" cy="17" rx="6" ry="15" fill="#00aaff" stroke="#0077cc" strokeWidth="1" />
      {/* Foot */}
      <ellipse cx="13" cy="30" rx="8" ry="4" fill="#0077cc" />
    </svg>
  </div>
);
