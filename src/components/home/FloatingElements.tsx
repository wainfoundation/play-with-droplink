
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface FloatingElementsProps {
  soundEnabled: boolean;
  onStartPlaying: () => void;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ soundEnabled, onStartPlaying }) => {
  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button 
          onClick={onStartPlaying}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
        >
          <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Background Music Indicator */}
      {soundEnabled && (
        <div className="fixed bottom-6 left-6 z-20">
          <Badge className="bg-white/80 text-primary animate-pulse">
            🎵 Background Music On
          </Badge>
        </div>
      )}
    </>
  );
};

export default FloatingElements;
