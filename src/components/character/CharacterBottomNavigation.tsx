
import React from 'react';
import { Button } from '@/components/ui/button';

interface CharacterBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CharacterBottomNavigation: React.FC<CharacterBottomNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const navItems = [
    { 
      id: 'home', 
      label: 'Boo',
      bgColor: 'bg-yellow-500',
      activeBg: 'bg-yellow-600',
      character: true
    },
    { 
      id: 'style', 
      icon: '🎨', 
      label: 'Style',
      bgColor: 'bg-orange-500',
      activeBg: 'bg-orange-600'
    },
    { 
      id: 'games', 
      icon: '🎮', 
      label: 'Minigames',
      bgColor: 'bg-purple-500',
      activeBg: 'bg-purple-600'
    },
    { 
      id: 'community', 
      icon: '🏠', 
      label: 'Community',
      bgColor: 'bg-green-500',
      activeBg: 'bg-green-600'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-yellow-400 p-3 border-t-4 border-orange-600 shadow-2xl z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              variant="ghost"
              className={`
                flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 border-2 border-white
                ${isActive 
                  ? `${item.activeBg} text-white shadow-lg scale-110` 
                  : `${item.bgColor} text-white hover:scale-105`
                }
              `}
            >
              {item.character ? (
                <div className={`${isActive ? 'animate-bounce' : ''}`}>
                  <svg
                    width="24"
                    height="29"
                    viewBox="0 0 200 240"
                    className="mx-auto"
                  >
                    <defs>
                      <linearGradient id="navCharacterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFE4B5" />
                        <stop offset="50%" stopColor="#FFE4B5" />
                        <stop offset="100%" stopColor="#0077cc" />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                      fill="url(#navCharacterGradient)"
                    />
                    
                    <ellipse
                      cx="75"
                      cy="70"
                      rx="12"
                      ry="18"
                      fill="rgba(255, 255, 255, 0.6)"
                    />
                    
                    <circle cx="80" cy="110" r="6" fill="#fff" />
                    <circle cx="120" cy="110" r="6" fill="#fff" />
                    <circle cx="82" cy="112" r="3" fill="#333" />
                    <circle cx="122" cy="112" r="3" fill="#333" />
                    <circle cx="83" cy="111" r="1" fill="#fff" />
                    <circle cx="123" cy="111" r="1" fill="#fff" />
                    
                    <path
                      d="M80 140 Q100 155 120 140"
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ) : (
                <span className={`text-2xl ${isActive ? 'animate-bounce' : ''}`}>
                  {item.icon}
                </span>
              )}
              <span className="text-xs font-bold">{item.label}</span>
              {item.id === 'games' && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  !
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterBottomNavigation;
