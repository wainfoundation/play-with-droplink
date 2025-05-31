
import React from 'react';

interface CharacterDecorationsProps {
  gender: string;
  mood: string;
}

const CharacterDecorations: React.FC<CharacterDecorationsProps> = ({ gender, mood }) => {
  return (
    <>
      {/* Gender indicator (optional bow for female characters) */}
      {gender === 'female' && (
        <path
          d="M85 45 Q100 35 115 45 Q100 55 85 45"
          fill="#ff1493"
          opacity="0.8"
        />
      )}

      {/* Mood indicator - small icon based on mood */}
      {mood === 'hungry' && (
        <text x="140" y="80" fontSize="16" fill="#ff6b35">🍎</text>
      )}
      {mood === 'sleepy' && (
        <text x="140" y="80" fontSize="16" fill="#6b73ff">💤</text>
      )}
      {mood === 'playful' && (
        <text x="140" y="80" fontSize="16" fill="#ff6b6b">⚽</text>
      )}
      {mood === 'focused' && (
        <text x="140" y="80" fontSize="16" fill="#4ecdc4">🎯</text>
      )}
    </>
  );
};

export default CharacterDecorations;
