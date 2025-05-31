
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  enabled: boolean;
  onToggle: () => void;
  className?: string;
}

const BackgroundMusic = ({ enabled, onToggle, className = "" }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create a simple background music track using Web Audio API
  useEffect(() => {
    if (enabled) {
      createBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }

    return () => {
      stopBackgroundMusic();
    };
  }, [enabled]);

  const createBackgroundMusic = () => {
    try {
      // Create a simple ambient background music using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, volume: number = 0.1) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      // Play a gentle ambient sequence
      const playAmbientMusic = () => {
        const notes = [220, 246.94, 261.63, 293.66, 329.63]; // A, B, C, D, E
        let time = 0;
        
        notes.forEach((note, index) => {
          setTimeout(() => {
            createTone(note, 2, 0.05);
            createTone(note * 2, 2, 0.03); // Octave
          }, time);
          time += 2500;
        });

        // Loop the music
        setTimeout(playAmbientMusic, time + 1000);
      };

      if (!isPlaying) {
        playAmbientMusic();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Web Audio API not supported:', error);
    }
  };

  const stopBackgroundMusic = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 ${className}`}
    >
      {enabled ? (
        <>
          <Volume2 className="w-4 h-4 mr-2" />
          Music On
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 mr-2" />
          Music Off
        </>
      )}
    </Button>
  );
};

export default BackgroundMusic;
