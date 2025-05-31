
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrophyIcon,
  CrownIcon,
  CoinsIcon,
  Volume2,
  VolumeX,
  PuzzleIcon,
  User,
  Settings,
  ShoppingCartIcon,
  HomeIcon,
  SwordsIcon
} from 'lucide-react';

interface PlayWithMascotHeaderProps {
  totalScore: number;
  userPlan: string;
  soundEnabled: boolean;
  activeTab: string;
  onSoundToggle: () => void;
  onTabChange: (tab: string) => void;
}

const PlayWithMascotHeader: React.FC<PlayWithMascotHeaderProps> = ({
  totalScore,
  userPlan,
  soundEnabled,
  activeTab,
  onSoundToggle,
  onTabChange
}) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={onSoundToggle}
        className="fixed top-4 right-4 z-50"
      >
        {soundEnabled ? (
          <>
            <Volume2 className="w-4 h-4 mr-2" />
            Sound On
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 mr-2" />
            Sound Off
          </>
        )}
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
          Play with Droplink
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your interactive gaming platform with character customization & P2P battles
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <TrophyIcon className="w-5 h-5 mr-2" />
            Score: {totalScore}
          </Badge>
          <Badge variant={userPlan === 'premium' ? 'default' : 'outline'} className="text-lg px-4 py-2">
            {userPlan === 'premium' ? <CrownIcon className="w-5 h-5 mr-2" /> : <CoinsIcon className="w-5 h-5 mr-2" />}
            {userPlan === 'premium' ? 'Premium' : 'Free Plan'}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <PuzzleIcon className="w-4 h-4" />
            Games
          </TabsTrigger>
          <TabsTrigger value="character" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Character
          </TabsTrigger>
          <TabsTrigger value="customize" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <ShoppingCartIcon className="w-4 h-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="room" className="flex items-center gap-2">
            <HomeIcon className="w-4 h-4" />
            Room
          </TabsTrigger>
          <TabsTrigger value="battles" className="flex items-center gap-2">
            <SwordsIcon className="w-4 h-4" />
            Battles
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default PlayWithMascotHeader;
