
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
      icon: '😊', 
      label: 'Boo',
      bgColor: 'bg-yellow-500',
      activeBg: 'bg-yellow-600'
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
              <span className={`text-2xl ${isActive ? 'animate-bounce' : ''}`}>
                {item.icon}
              </span>
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
