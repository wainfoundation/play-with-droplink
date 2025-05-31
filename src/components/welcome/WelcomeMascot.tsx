
import React, { useEffect, useState } from 'react';

interface WelcomeMascotProps {
  visible: boolean;
}

const WelcomeMascot: React.FC<WelcomeMascotProps> = ({ visible }) => {
  const [mascotMood, setMascotMood] = useState(0);

  const moods = [
    { name: 'Happy', eyes: 'normal', mouth: 'smile', color: '#00aaff' },
    { name: 'Excited', eyes: 'wide', mouth: 'big_smile', color: '#ff6600' },
    { name: 'Thinking', eyes: 'squint', mouth: 'neutral', color: '#9966ff' },
    { name: 'Playful', eyes: 'wink', mouth: 'tongue', color: '#00cc66' }
  ];

  useEffect(() => {
    const moodTimer = setInterval(() => {
      setMascotMood(prev => (prev + 1) % moods.length);
    }, 3000);

    return () => clearInterval(moodTimer);
  }, []);

  const renderMascotEyes = (mood: typeof moods[0]) => {
    switch (mood.eyes) {
      case 'wide':
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="4" fill="#333" />
            <circle cx="120" cy="105" r="4" fill="#333" />
            <circle cx="78" cy="103" r="1.5" fill="#fff" />
            <circle cx="118" cy="103" r="1.5" fill="#fff" />
          </>
        );
      case 'squint':
        return (
          <>
            <path d="M 72 110 Q 80 105 88 110" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 112 110 Q 120 105 128 110" stroke="#333" strokeWidth="2" fill="none" />
          </>
        );
      case 'wink':
        return (
          <>
            <circle cx="80" cy="110" r="6" fill="#fff" />
            <circle cx="82" cy="112" r="3" fill="#333" />
            <circle cx="83" cy="111" r="1" fill="#fff" />
            <path d="M 112 115 Q 120 110 128 115" stroke="#333" strokeWidth="2" fill="none" />
          </>
        );
      default:
        return (
          <>
            <circle cx="80" cy="110" r="6" fill="#fff" />
            <circle cx="120" cy="110" r="6" fill="#fff" />
            <circle cx="82" cy="112" r="3" fill="#333" />
            <circle cx="122" cy="112" r="3" fill="#333" />
            <circle cx="83" cy="111" r="1" fill="#fff" />
            <circle cx="123" cy="111" r="1" fill="#fff" />
          </>
        );
    }
  };

  const renderMascotMouth = (mood: typeof moods[0]) => {
    switch (mood.mouth) {
      case 'big_smile':
        return (
          <path
            d="M75 140 Q100 165 125 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'neutral':
        return (
          <ellipse cx="100" cy="145" rx="8" ry="2" fill="#fff" />
        );
      case 'tongue':
        return (
          <>
            <path
              d="M80 140 Q100 160 120 140"
              stroke="#fff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="150" rx="4" ry="6" fill="#ff69b4" />
          </>
        );
      default:
        return (
          <path
            d="M80 140 Q100 155 120 140"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  const currentMood = moods[mascotMood];

  return (
    <div className={`transition-all duration-1000 ${
      visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'
    }`}>
      <div className="relative mb-8">
        <svg
          width="200"
          height="240"
          viewBox="0 0 200 240"
          className="animate-bounce-gentle"
        >
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentMood.color} />
              <stop offset="50%" stopColor={currentMood.color} />
              <stop offset="100%" stopColor="#0077cc" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
            fill="url(#mascotGradient)"
            filter="url(#glow)"
            className="transition-all duration-500"
          />
          
          <ellipse
            cx="75"
            cy="70"
            rx="12"
            ry="18"
            fill="rgba(255, 255, 255, 0.6)"
            className="animate-shimmer"
          />
          
          <circle cx="65" cy="160" r="3" fill="rgba(255,255,255,0.3)" />
          <circle cx="135" cy="160" r="3" fill="rgba(255,255,255,0.3)" />
          <rect x="95" y="155" width="10" height="2" fill="rgba(255,255,255,0.3)" />
          <rect x="99" y="151" width="2" height="10" fill="rgba(255,255,255,0.3)" />
          
          {renderMascotEyes(currentMood)}
          {renderMascotMouth(currentMood)}
        </svg>
        
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600">
            {currentMood.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMascot;
