
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { backgroundMusic } from '@/utils/sounds';

interface MusicToggleProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ 
  className = "", 
  size = "sm",
  variant = "ghost"
}) => {
  const [isMuted, setIsMuted] = useState(backgroundMusic.getMuted());

  const handleToggle = () => {
    const newMutedState = backgroundMusic.toggle();
    setIsMuted(newMutedState);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={`${className}`}
      title={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
};
