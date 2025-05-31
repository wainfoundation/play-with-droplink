
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
  
  // Eye styles based on mood - fixed positioning to prevent jumping
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
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="108" r="3" fill="#333" />
            <circle cx="120" cy="108" r="3" fill="#333" />
          </>
        );
      case 'sleepy':
        return (
          <>
            <path d="M70 105 Q80 100 90 105" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110 105 Q120 100 130 105" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case 'hungry':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="6" fill="#333" />
            <circle cx="120" cy="105" r="6" fill="#333" />
            <circle cx="82" cy="103" r="2" fill="#fff" />
            <circle cx="122" cy="103" r="2" fill="#fff" />
          </>
        );
      case 'playful':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="82" cy="106" r="4" fill="#333" />
            <circle cx="118" cy="106" r="4" fill="#333" />
            <circle cx="83" cy="104" r="1.5" fill="#fff" />
            <circle cx="119" cy="104" r="1.5" fill="#fff" />
          </>
        );
      case 'focused':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="4" fill="#333" />
            <circle cx="120" cy="105" r="4" fill="#333" />
          </>
        );
      default: // happy
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="108" r="4" fill="#333" />
            <circle cx="120" cy="108" r="4" fill="#333" />
            <circle cx="82" cy="106" r="1.5" fill="#fff" />
            <circle cx="122" cy="106" r="1.5" fill="#fff" />
          </>
        );
    }
  };

  // Mouth styles based on mood
  const getMouth = (mood: string) => {
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

      {/* Mood indicator - small icon based on mood */}
      {character.mood === 'hungry' && (
        <text x="140" y="80" fontSize="16" fill="#ff6b35">🍎</text>
      )}
      {character.mood === 'sleepy' && (
        <text x="140" y="80" fontSize="16" fill="#6b73ff">💤</text>
      )}
      {character.mood === 'playful' && (
        <text x="140" y="80" fontSize="16" fill="#ff6b6b">⚽</text>
      )}
      {character.mood === 'focused' && (
        <text x="140" y="80" fontSize="16" fill="#4ecdc4">🎯</text>
      )}
    </svg>
  );
};

export default CharacterRenderer;
