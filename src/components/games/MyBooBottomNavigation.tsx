
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Shirt, Gamepad2, ShoppingBag, Users } from 'lucide-react';

interface MyBooBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MyBooBottomNavigation: React.FC<MyBooBottomNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const navItems = [
    { id: 'character', icon: Home, label: 'Boo', color: 'bg-blue-500' },
    { id: 'customize', icon: Shirt, label: 'Style', color: 'bg-purple-500' },
    { id: 'games', icon: Gamepad2, label: 'Minigames', color: 'bg-green-500' },
    { id: 'store', icon: ShoppingBag, label: 'Shop', color: 'bg-orange-500' },
    { id: 'room', icon: Users, label: 'Community', color: 'bg-pink-500' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-yellow-400 p-2 border-t-4 border-orange-600 shadow-2xl z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              variant="ghost"
              className={`
                flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200
                ${isActive 
                  ? `${item.color} text-white shadow-lg scale-110 border-2 border-white` 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-bold">{item.label}</span>
              {item.id === 'games' && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
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

export default MyBooBottomNavigation;
