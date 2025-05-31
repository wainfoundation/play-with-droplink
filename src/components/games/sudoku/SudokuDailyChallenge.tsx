
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Trophy, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import SudokuBoard from './SudokuBoard';
import { generateSudokuPuzzle } from '@/utils/sudokuGenerator';

const SudokuDailyChallenge: React.FC = () => {
  const [dailyPuzzle, setDailyPuzzle] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [completed, setCompleted] = useState(false);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  useEffect(() => {
    // Check if player has already played today
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('sudoku-daily-last-played');
    const todayCompleted = localStorage.getItem('sudoku-daily-completed');
    
    if (lastPlayed === today && todayCompleted === 'true') {
      setHasPlayedToday(true);
      setCompleted(true);
    }

    // Generate or load today's puzzle
    generateDailyPuzzle();
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0 && !completed) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            toast({
              title: "Time's Up!",
              description: "Better luck tomorrow!",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft, completed]);

  const generateDailyPuzzle = () => {
    // Use today's date as seed for consistent daily puzzle
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Generate puzzle based on seed (simplified - in real app, use proper seeded random)
    const { puzzle, solution } = generateSudokuPuzzle('medium');
    
    setDailyPuzzle({
      board: puzzle,
      solution: solution,
      date: today.toDateString()
    });
  };

  const startDailyChallenge = () => {
    if (hasPlayedToday) {
      toast({
        title: "Already Completed",
        description: "Come back tomorrow for a new challenge!",
      });
      return;
    }

    setIsPlaying(true);
    setTimeLeft(300);
    
    toast({
      title: "Daily Challenge Started!",
      description: "You have 5 minutes to complete this puzzle!",
    });
  };

  const handlePuzzleComplete = () => {
    setCompleted(true);
    setIsPlaying(false);
    setHasPlayedToday(true);
    
    const today = new Date().toDateString();
    localStorage.setItem('sudoku-daily-last-played', today);
    localStorage.setItem('sudoku-daily-completed', 'true');
    
    const timeBonus = timeLeft * 10;
    const totalScore = 1000 + timeBonus;
    
    toast({
      title: "Daily Challenge Complete! 🎉",
      description: `Score: ${totalScore} | Time Bonus: ${timeBonus}`,
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const watchAdForEntry = () => {
    toast({
      title: "Watching Ad...",
      description: "Thanks for watching! Starting your challenge...",
    });
    
    setTimeout(() => {
      startDailyChallenge();
    }, 3000);
  };

  const payPiForEntry = () => {
    toast({
      title: "Pi Payment Processing...",
      description: "1 Pi payment confirmed! Starting challenge...",
    });
    
    setTimeout(() => {
      startDailyChallenge();
    }, 2000);
  };

  if (!dailyPuzzle) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Generating today's puzzle...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Daily Challenge</h2>
        </div>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Status */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="font-semibold">{formatTime(timeLeft)}</span>
          </div>
          <p className="text-xs text-gray-600">Time Left</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">Medium</span>
          </div>
          <p className="text-xs text-gray-600">Difficulty</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">1000+</span>
          </div>
          <p className="text-xs text-gray-600">Base Score</p>
        </div>
      </div>

      {/* Entry Options */}
      {!isPlaying && !completed && !hasPlayedToday && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold mb-4">Choose Your Entry Method:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={watchAdForEntry} variant="outline" className="h-16">
                <div className="text-center">
                  <div className="text-2xl mb-1">📺</div>
                  <div>Watch Ad</div>
                  <div className="text-xs text-gray-500">Free Entry</div>
                </div>
              </Button>
              <Button onClick={payPiForEntry} variant="outline" className="h-16">
                <div className="text-center">
                  <div className="text-2xl mb-1">π</div>
                  <div>Pay 1 Pi</div>
                  <div className="text-xs text-gray-500">Skip Ad</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Completed State */}
      {completed && (
        <div className="text-center space-y-4">
          <Badge variant="default" className="text-lg px-6 py-2">
            ✅ Challenge Completed!
          </Badge>
          <p className="text-gray-600">Come back tomorrow for a new puzzle!</p>
          
          {/* Show completed puzzle */}
          <div className="flex justify-center">
            <SudokuBoard
              board={dailyPuzzle.solution}
              selectedCell={null}
              onCellClick={() => {}}
              theme="light"
            />
          </div>
        </div>
      )}

      {/* Playing State */}
      {isPlaying && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <SudokuBoard
              board={dailyPuzzle.board}
              selectedCell={null}
              onCellClick={() => {}}
              theme="light"
            />
          </div>
          
          <div className="text-center">
            <Button onClick={handlePuzzleComplete} variant="outline">
              Complete Puzzle (Demo)
            </Button>
          </div>
        </div>
      )}

      {/* Leaderboard Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-center">Today's Top Times</h3>
        <div className="space-y-2">
          {[
            { rank: 1, name: "PiMaster", time: "2:34", score: 1660 },
            { rank: 2, name: "SudokuPro", time: "3:12", score: 1380 },
            { rank: 3, name: "PuzzleKing", time: "3:45", score: 1150 },
          ].map(player => (
            <div key={player.rank} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold">#{player.rank}</span>
                <span>{player.name}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-sm text-gray-600">{player.time}</span>
                <span className="font-semibold">{player.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SudokuDailyChallenge;
