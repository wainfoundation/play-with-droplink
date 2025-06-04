
import React from 'react';

interface CharacterMouthProps {
  mood: string;
}

const CharacterMouth: React.FC<CharacterMouthProps> = ({ mood }) => {
  const getMouthStyle = () => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return (
          <path
            d="M85 120 Q100 135 115 120"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'sad':
        return (
          <path
            d="M85 130 Q100 115 115 130"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'surprised':
        return (
          <ellipse
            cx="100"
            cy="125"
            rx="8"
            ry="10"
            fill="#333"
          />
        );
      case 'sleepy':
        return (
          <circle
            cx="100"
            cy="125"
            r="4"
            fill="#333"
          />
        );
      default:
        return (
          <path
            d="M90 125 Q100 130 110 125"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  return <g className="character-mouth">{getMouthStyle()}</g>;
};

export default CharacterMouth;
