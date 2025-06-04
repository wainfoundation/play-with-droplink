
import React from 'react';

interface CharacterEyesProps {
  mood: string;
}

const CharacterEyes: React.FC<CharacterEyesProps> = ({ mood }) => {
  const getEyeStyle = () => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return (
          <>
            <circle cx="85" cy="85" r="8" fill="#333" />
            <circle cx="115" cy="85" r="8" fill="#333" />
            <circle cx="87" cy="83" r="2" fill="white" />
            <circle cx="117" cy="83" r="2" fill="white" />
          </>
        );
      case 'sad':
        return (
          <>
            <path d="M85 80 Q85 90 85 90" stroke="#333" strokeWidth="3" fill="none" />
            <path d="M115 80 Q115 90 115 90" stroke="#333" strokeWidth="3" fill="none" />
          </>
        );
      case 'sleepy':
        return (
          <>
            <path d="M77 85 Q85 80 93 85" stroke="#333" strokeWidth="3" fill="none" />
            <path d="M107 85 Q115 80 123 85" stroke="#333" strokeWidth="3" fill="none" />
          </>
        );
      case 'angry':
        return (
          <>
            <path d="M77 80 Q85 85 93 80" stroke="#333" strokeWidth="3" fill="none" />
            <path d="M107 80 Q115 85 123 80" stroke="#333" strokeWidth="3" fill="none" />
            <circle cx="85" cy="85" r="6" fill="#333" />
            <circle cx="115" cy="85" r="6" fill="#333" />
          </>
        );
      default:
        return (
          <>
            <circle cx="85" cy="85" r="6" fill="#333" />
            <circle cx="115" cy="85" r="6" fill="#333" />
            <circle cx="87" cy="83" r="2" fill="white" />
            <circle cx="117" cy="83" r="2" fill="white" />
          </>
        );
    }
  };

  return <g className="character-eyes">{getEyeStyle()}</g>;
};

export default CharacterEyes;
