
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Store, Package, Wallet, Gamepad2, BarChart3, Settings, Target } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/play' },
    { icon: Target, label: 'Missions', path: '/missions' },
    { icon: Store, label: 'Shop', path: '/shop' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Gamepad2, label: 'Games', path: '/games' },
    { icon: BarChart3, label: 'Stats', path: '/stats' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-400 to-purple-500 border-t-4 border-white z-40 shadow-2xl">
      <div className="flex justify-around items-center py-3 px-2 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || 
                          (path === '/play' && location.pathname === '/home');
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 p-3 min-w-0 transition-all duration-300 rounded-xl ${
                isActive 
                  ? 'bg-white text-blue-600 scale-110 shadow-lg' 
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold truncate">{label}</span>
            </Button>
          );
        })}
      </div>
      
      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-pink-400"></div>
    </div>
  );
};

export default NavigationBar;
