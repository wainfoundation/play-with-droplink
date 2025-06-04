
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '@/utils/sounds';

interface MusicToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ 
  variant = 'outline', 
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const backgroundAudio = new Audio(sounds.backgroundMusic);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3;
    setAudio(backgroundAudio);

    return () => {
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.src = '';
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Music playback failed - user interaction required');
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleMusic}
      className={`${className} transition-all duration-200`}
      title={isPlaying ? 'Turn off music' : 'Turn on music'}
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </Button>
  );
};
