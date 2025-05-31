
import React from 'react';

interface CharacterMouthProps {
  mood: string;
}

const CharacterMouth: React.FC<CharacterMouthProps> = ({ mood }) => {
  switch (mood) {
    case 'excited':
      return (
        <ellipse
          cx="100"
          cy="150"
          rx="20"
          ry="12"
          fill="#333"
        />
      );
    case 'calm':
      return (
        <path
          d="M85 145 Q100 150 115 145"
          stroke="#333"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'sleepy':
      return (
        <circle
          cx="100"
          cy="148"
          r="3"
          fill="#333"
        />
      );
    case 'hungry':
      return (
        <ellipse
          cx="100"
          cy="150"
          rx="15"
          ry="10"
          fill="#333"
        />
      );
    case 'playful':
      return (
        <path
          d="M75 140 Q100 165 125 140"
          stroke="#333"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'focused':
      return (
        <path
          d="M90 148 Q100 145 110 148"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
    default: // happy
      return (
        <path
          d="M80 140 Q100 155 120 140"
          stroke="#333"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      );
  }
};

export default CharacterMouth;
