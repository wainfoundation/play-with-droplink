
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface HomeHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ soundEnabled, onToggleSound }) => {
  const isPiBrowser = isRunningInPiBrowser();

  return (
    <div className="relative z-10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-lg">
            <img 
              src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
              alt="Droplink Logo" 
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">Droplink Gaming</h1>
            <p className="text-xs text-gray-600">Pi Network Game Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSound}
            className="p-2"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          
          {isPiBrowser ? (
            <Badge className="bg-green-100 text-green-800">Pi Browser ✓</Badge>
          ) : (
            <Badge variant="outline">Regular Browser</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
