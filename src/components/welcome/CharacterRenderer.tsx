
import React from 'react';
import CharacterEyes from './CharacterEyes';
import CharacterMouth from './CharacterMouth';
import CharacterDecorations from './CharacterDecorations';

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
      <CharacterEyes mood={character.mood} />
      
      {/* Mouth based on mood */}
      <CharacterMouth mood={character.mood} />

      {/* Gender indicator and mood icons */}
      <CharacterDecorations gender={character.gender} mood={character.mood} />
    </svg>
  );
};

export default CharacterRenderer;
