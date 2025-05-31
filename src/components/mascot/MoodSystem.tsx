
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface MoodSystemProps {
  currentEmotion: number;
  lastAction: string;
}

const MoodSystem: React.FC<MoodSystemProps> = ({ currentEmotion, lastAction }) => {
  const emotions = [
    { name: "happy", thought: "Let's have some fun together! 🎮" },
    { name: "excited", thought: "This is so much fun! 🎉" },
    { name: "thinking", thought: "Hmm, what should we do next? 🤔" },
    { name: "surprised", thought: "Wow! That was amazing! 😲" },
    { name: "sleepy", thought: "I'm getting a bit tired... 😴" },
    { name: "loving", thought: "I love spending time with you! 💕" },
    { name: "confused", thought: "That's a bit confusing... 🤨" },
    { name: "playful", thought: "Ready for some games? 😄" },
    { name: "proud", thought: "You're doing great! 🌟" },
    { name: "mischievous", thought: "I have a fun idea... 😏" }
  ];

  return (
    <div className="mt-4 text-center">
      <Badge variant="secondary" className="text-xs">
        <Sparkles className="w-3 h-3 mr-1" />
        {lastAction ? `${lastAction}...` : emotions[currentEmotion]?.thought || 'Happy & Ready!'}
      </Badge>
    </div>
  );
};

export default MoodSystem;
