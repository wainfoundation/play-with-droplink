
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { DroplinkService } from '@/services/droplinkService';
import { useUser } from '@/context/UserContext';

interface DroplinkButtonProps {
  type: 'invite' | 'level' | 'challenge';
  gameId?: string;
  level?: number;
  score?: number;
  className?: string;
}

const DroplinkButton: React.FC<DroplinkButtonProps> = ({
  type,
  gameId,
  level,
  score,
  className = ""
}) => {
  const { user } = useUser();

  const handleShare = async () => {
    if (!user?.id) return;

    await DroplinkService.createDroplink(type, {
      userId: user.id,
      gameId,
      level,
      score
    });
  };

  const getButtonText = () => {
    switch (type) {
      case 'invite':
        return 'Invite Friends 💖';
      case 'level':
        return `Share Level ${level} 🎯`;
      case 'challenge':
        return `Challenge Friends! 🏆`;
      default:
        return 'Share 🚀';
    }
  };

  return (
    <Button 
      onClick={handleShare}
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
    >
      <Share2 className="w-4 h-4" />
      {getButtonText()}
    </Button>
  );
};

export default DroplinkButton;
