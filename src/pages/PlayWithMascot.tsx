
import React from 'react';
import { Helmet } from 'react-helmet-async';
import FullScreenPetGame from '@/components/pet/FullScreenPetGame';
import NavigationBar from '@/components/pet/NavigationBar';
import IconButton from '@/components/ui/icon-button';
import { 
  Home, 
  Store, 
  Package, 
  Gamepad2, 
  Target, 
  Wallet,
  BarChart3,
  Settings,
  Gift
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlayWithMascot: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Store, label: 'Shop', path: '/shop', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Package, label: 'Inventory', path: '/inventory', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Gamepad2, label: 'Games', path: '/games', color: 'bg-red-500 hover:bg-red-600' },
    { icon: Target, label: 'Missions', path: '/missions', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: Gift, label: 'Rewards', path: '/missions', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { icon: BarChart3, label: 'Stats', path: '/stats', color: 'bg-cyan-500 hover:bg-cyan-600' },
  ];

  return (
    <>
      <Helmet>
        <title>My Pet Droplet - Play with Droplink</title>
        <meta name="description" content="Take care of your virtual droplet pet and watch it grow!" />
      </Helmet>
      
      <div className="relative">
        <FullScreenPetGame />
        
        {/* Quick Action Buttons Overlay */}
        <div className="fixed top-20 left-4 right-4 z-30 pointer-events-none">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pointer-events-auto">
              {quickActions.map((action) => (
                <IconButton
                  key={action.path}
                  icon={action.icon}
                  label={action.label}
                  onClick={() => navigate(action.path)}
                  className={action.color}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
        
        <NavigationBar />
      </div>
    </>
  );
};

export default PlayWithMascot;
