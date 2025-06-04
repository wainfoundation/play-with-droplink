
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import CatchTheFruit from './CatchTheFruit';
import { useWallet } from '@/hooks/useWallet';
import { usePetStats } from '@/hooks/usePetStats';
import { toast } from '@/hooks/use-toast';

const CatchTheFruitGame: React.FC = () => {
  const [showGame, setShowGame] = useState(false);
  const { addCoins } = useWallet();
  const { updateStat } = usePetStats();

  const handleGameEnd = (score: number, coinsEarned: number) => {
    // Add coins if any were earned
    if (coinsEarned > 0) {
      addCoins(coinsEarned, `Catch the Fruit game (${score} fruits)`);
    }

    // Boost pet mood based on performance
    const moodBoost = Math.min(score, 15); // Cap at 15 points
    if (moodBoost > 0) {
      updateStat('happiness', moodBoost);
    }

    // Show results
    toast({
      title: "Game Complete! 🎮",
      description: `Score: ${score} | Coins: +${coinsEarned} | Mood: +${moodBoost}`,
      className: "bg-green-50 border-green-200"
    });

    setShowGame(false);
  };

  if (showGame) {
    return (
      <CatchTheFruit
        onGameEnd={handleGameEnd}
        onClose={() => setShowGame(false)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="text-center">
          <div className="text-6xl mb-2">🍎</div>
          <CardTitle className="text-xl">Catch the Fruit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">
            Test your reflexes! Tap falling fruits before they hit the ground.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="font-semibold text-center mb-2">Rewards:</div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>5+ fruits:</span>
                <span className="text-yellow-600">+1 coin</span>
              </div>
              <div className="flex justify-between">
                <span>10+ fruits:</span>
                <span className="text-yellow-600">+2 coins</span>
              </div>
              <div className="flex justify-between">
                <span>15+ fruits:</span>
                <span className="text-yellow-600">+3 coins</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            <span className="text-sm text-gray-500">Game Type:</span>
            <span className="text-sm font-medium">Reflex</span>
          </div>
          
          <Button
            onClick={() => setShowGame(true)}
            className="w-full"
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            Play Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CatchTheFruitGame;
