
import React from 'react';

interface CharacterEyesProps {
  mood: string;
}

const CharacterEyes: React.FC<CharacterEyesProps> = ({ mood }) => {
  const getEyeShape = () => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return (
          <>
            <circle cx="80" cy="110" r="8" fill="#fff" />
            <circle cx="120" cy="110" r="8" fill="#fff" />
            <circle cx="80" cy="112" r="4" fill="#333" />
            <circle cx="120" cy="112" r="4" fill="#333" />
            <circle cx="81" cy="110" r="1.5" fill="#fff" />
            <circle cx="121" cy="110" r="1.5" fill="#fff" />
            {/* Sparkles for excited mood */}
            {mood === 'excited' && (
              <>
                <circle cx="70" cy="100" r="1" fill="#FFD700" className="animate-pulse" />
                <circle cx="130" cy="100" r="1" fill="#FFD700" className="animate-pulse delay-300" />
              </>
            )}
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="80" cy="115" r="8" fill="#fff" />
            <circle cx="120" cy="115" r="8" fill="#fff" />
            <circle cx="80" cy="117" r="4" fill="#333" />
            <circle cx="120" cy="117" r="4" fill="#333" />
            <circle cx="81" cy="115" r="1.5" fill="#fff" />
            <circle cx="121" cy="115" r="1.5" fill="#fff" />
          </>
        );
      case 'surprised':
        return (
          <>
            <circle cx="80" cy="110" r="10" fill="#fff" />
            <circle cx="120" cy="110" r="10" fill="#fff" />
            <circle cx="80" cy="110" r="5" fill="#333" />
            <circle cx="120" cy="110" r="5" fill="#333" />
            <circle cx="82" cy="108" r="2" fill="#fff" />
            <circle cx="122" cy="108" r="2" fill="#fff" />
          </>
        );
      default:
        return (
          <>
            <circle cx="80" cy="110" r="8" fill="#fff" />
            <circle cx="120" cy="110" r="8" fill="#fff" />
            <circle cx="80" cy="112" r="4" fill="#333" />
            <circle cx="120" cy="112" r="4" fill="#333" />
            <circle cx="81" cy="110" r="1.5" fill="#fff" />
            <circle cx="121" cy="110" r="1.5" fill="#fff" />
          </>
        );
    }
  };

  return <>{getEyeShape()}</>;
};

export default CharacterEyes;
