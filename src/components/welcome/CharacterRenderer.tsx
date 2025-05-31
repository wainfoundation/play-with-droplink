
import React from 'react';

interface Character {
  id: string;
  name: string;
  gender: string;
  color: string;
  mood: string;
  personality: string;
}

interface CharacterRendererProps {
  character: Character;
  size?: number;
}

const CharacterRenderer: React.FC<CharacterRendererProps> = ({ character, size = 120 }) => {
  const gradientId = `${character.id}Gradient`;
  
  // Eye styles based on mood
  const getEyes = (mood: string) => {
    switch (mood) {
      case 'excited':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="5" fill="#333" />
            <circle cx="120" cy="105" r="5" fill="#333" />
            <circle cx="82" cy="103" r="2" fill="#fff" />
            <circle cx="122" cy="103" r="2" fill="#fff" />
          </>
        );
      case 'calm':
        return (
          <>
            <path d="M70 100 Q80 95 90 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      default: // happy
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="83" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
            <circle cx="123" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
          </>
        );
    }
  };

  // Mouth styles based on mood
  const getMouth = (mood: string) => {
    switch (mood) {
      case 'excited':
        return (
          <path
            d="M75 140 Q100 165 125 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'calm':
        return (
          <path
            d="M85 145 Q100 150 115 145"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      default: // happy
        return (
          <path
            d="M80 140 Q100 155 120 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };
  
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" className="animate-bounce-gentle">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={character.color} />
          <stop offset="50%" stopColor={character.color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={character.color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Character shape */}
      <path
        d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
        fill={`url(#${gradientId})`}
        className="animate-pulse-gentle"
      />
      
      {/* Highlight */}
      <ellipse
        cx="75"
        cy="70"
        rx="12"
        ry="18"
        fill="rgba(255, 255, 255, 0.6)"
        className="animate-shimmer"
      />
      
      {/* Eyes based on mood */}
      {getEyes(character.mood)}
      
      {/* Mouth based on mood */}
      {getMouth(character.mood)}

      {/* Gender indicator (optional bow for female characters) */}
      {character.gender === 'female' && (
        <path
          d="M85 45 Q100 35 115 45 Q100 55 85 45"
          fill="#ff1493"
          opacity="0.8"
        />
      )}
    </svg>
  );
};

export default CharacterRenderer;
