
import React from 'react';

interface CharacterDecorationsProps {
  gender: string;
  mood: string;
}

const CharacterDecorations: React.FC<CharacterDecorationsProps> = ({ gender, mood }) => {
  return (
    <g className="character-decorations">
      {/* Gender indicator */}
      {gender === 'female' && (
        <g>
          {/* Bow or eyelashes */}
          <path d="M70 60 Q75 55 80 60 Q75 65 70 60" fill="rgba(255,192,203,0.8)" />
          <path d="M120 60 Q125 55 130 60 Q125 65 120 60" fill="rgba(255,192,203,0.8)" />
        </g>
      )}
      
      {/* Mood indicators */}
      {mood === 'excited' && (
        <g>
          <text x="60" y="50" fontSize="16" fill="gold">✨</text>
          <text x="130" y="45" fontSize="12" fill="gold">⭐</text>
        </g>
      )}
      
      {mood === 'sleepy' && (
        <g>
          <text x="130" y="50" fontSize="20" fill="rgba(0,0,0,0.3)">💤</text>
        </g>
      )}
      
      {mood === 'happy' && (
        <g>
          <circle cx="65" cy="100" r="2" fill="rgba(255,182,193,0.6)" />
          <circle cx="135" cy="100" r="2" fill="rgba(255,182,193,0.6)" />
        </g>
      )}
    </g>
  );
};

export default CharacterDecorations;
