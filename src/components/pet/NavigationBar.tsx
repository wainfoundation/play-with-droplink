
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 p-2 min-w-0 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs truncate">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
