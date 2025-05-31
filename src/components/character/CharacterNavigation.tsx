
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building, ShoppingBag, Gamepad2, Lock } from 'lucide-react';

interface CharacterNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unlockedTabs: string[];
}

const CharacterNavigation: React.FC<CharacterNavigationProps> = ({
  activeTab,
  onTabChange,
  unlockedTabs
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, description: 'Character room' },
    { id: 'rooms', label: 'Rooms', icon: Building, description: 'Explore rooms' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, description: 'Buy items' },
    { id: 'games', label: 'Games', icon: Gamepad2, description: 'Mini games' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Navigation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tabs.map((tab) => {
          const isUnlocked = unlockedTabs.includes(tab.id);
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              className={`w-full justify-start gap-3 ${!isUnlocked ? 'opacity-50' : ''}`}
              onClick={() => isUnlocked && onTabChange(tab.id)}
              disabled={!isUnlocked}
            >
              <tab.icon className="w-4 h-4" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  {tab.label}
                  {!isUnlocked && <Lock className="w-3 h-3" />}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tab.description}
                </div>
              </div>
              {isActive && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </Button>
          );
        })}
        
        {unlockedTabs.length < 4 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              🔒 Complete the tutorial to unlock more areas!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterNavigation;
