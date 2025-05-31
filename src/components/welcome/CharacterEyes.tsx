
import React from 'react';

interface CharacterEyesProps {
  mood: string;
}

const CharacterEyes: React.FC<CharacterEyesProps> = ({ mood }) => {
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

export default CharacterEyes;
