
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, ShoppingBag, Package, Wallet, 
  Gamepad2, Gift, User
} from 'lucide-react';

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
    { id: 'home' as GameView, label: 'Home', icon: Home },
    { id: 'shop' as GameView, label: 'Shop', icon: ShoppingBag },
    { id: 'inventory' as GameView, label: 'Inventory', icon: Package },
    { id: 'wallet' as GameView, label: 'Wallet', icon: Wallet },
    { id: 'games' as GameView, label: 'Games', icon: Gamepad2 },
    { id: 'rewards' as GameView, label: 'Rewards', icon: Gift },
    { id: 'profile' as GameView, label: 'Profile', icon: User },
  ];

  const handleItemClick = (viewId: GameView) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <>
      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute top-0 left-0 z-30 h-full w-64 bg-white/95 backdrop-blur-lg shadow-xl"
          >
            <div className="p-4 space-y-2">
              <div className="text-lg font-bold mb-4">Menu</div>
              {menuItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleItemClick(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay for menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-25"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PetGameMenu;
