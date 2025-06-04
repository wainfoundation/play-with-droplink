
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Store, Package, Wallet, Gamepad2, Gift, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GameView = 'home' | 'shop' | 'inventory' | 'wallet' | 'games' | 'rewards' | 'profile';

interface PetGameMenuProps {
  showMenu: boolean;
  currentView: GameView;
  onViewChange: (view: GameView) => void;
  onClose: () => void;
}

const PetGameMenu: React.FC<PetGameMenuProps> = ({
  showMenu,
  currentView,
  onViewChange,
  onClose
}) => {
  const menuItems = [
    { id: 'shop' as GameView, label: 'Shop', icon: Store },
    { id: 'inventory' as GameView, label: 'Inventory', icon: Package },
    { id: 'games' as GameView, label: 'Games', icon: Gamepad2 },
    { id: 'rewards' as GameView, label: 'Rewards', icon: Gift },
    { id: 'wallet' as GameView, label: 'Wallet', icon: Wallet },
    { id: 'profile' as GameView, label: 'Profile', icon: User },
  ];

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', damping: 20 }}
          className="absolute left-0 top-0 bottom-0 z-30 w-64 bg-white/95 backdrop-blur-md shadow-xl"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      onViewChange(item.id);
                      onClose();
                    }}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PetGameMenu;
