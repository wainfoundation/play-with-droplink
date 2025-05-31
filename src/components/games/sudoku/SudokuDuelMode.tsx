
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Zap, Clock, Trophy, Swords } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import SudokuBoard from './SudokuBoard';
import { generateSudokuPuzzle } from '@/utils/sudokuGenerator';

interface DuelState {
  mode: 'lobby' | 'searching' | 'playing' | 'completed';
  opponent: string | null;
  puzzle: any;
  playerProgress: number;
  opponentProgress: number;
  timeLeft: number;
  winner: 'player' | 'opponent' | null;
}

const SudokuDuelMode: React.FC = () => {
  const [duelState, setDuelState] = useState<DuelState>({
    mode: 'lobby',
    opponent: null,
    puzzle: null,
    playerProgress: 0,
    opponentProgress: 0,
    timeLeft: 300, // 5 minutes
    winner: null
  });

  const [piBalance] = useState(45.6); // Mock Pi balance

  // Simulate opponent progress during duel
  useEffect(() => {
    if (duelState.mode === 'playing' && duelState.timeLeft > 0) {
      const timer = setInterval(() => {
        setDuelState(prev => {
          // Simulate opponent making progress
          const opponentSpeed = 0.2 + Math.random() * 0.3; // Random speed
          const newOpponentProgress = Math.min(100, prev.opponentProgress + opponentSpeed);
          
          // Check if opponent wins
          if (newOpponentProgress >= 100 && prev.playerProgress < 100) {
            toast({
              title: "Opponent Wins!",
              description: "Better luck next time!",
              variant: "destructive",
            });
            return {
              ...prev,
              mode: 'completed',
              winner: 'opponent',
              opponentProgress: 100
            };
          }
          
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
            opponentProgress: newOpponentProgress
          };
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [duelState.mode, duelState.timeLeft]);

  const startQuickDuel = () => {
    if (piBalance < 2) {
      toast({
        title: "Insufficient Pi",
        description: "You need 2 Pi to enter a duel.",
        variant: "destructive",
      });
      return;
    }

    setDuelState(prev => ({ ...prev, mode: 'searching' }));
    
    toast({
      title: "Searching for Opponent...",
      description: "2 Pi entry fee deducted. Finding a worthy challenger!",
    });

    // Simulate finding opponent
    setTimeout(() => {
      const opponents = ['SudokuMaster', 'PuzzlePro', 'NumberNinja', 'GridKing', 'LogicLord'];
      const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
      const { puzzle, solution } = generateSudokuPuzzle('medium');
      
      setDuelState(prev => ({
        ...prev,
        mode: 'playing',
        opponent: randomOpponent,
        puzzle: { board: puzzle, solution },
        timeLeft: 300,
        playerProgress: 0,
        opponentProgress: 0
      }));

      toast({
        title: `Opponent Found!`,
        description: `You're dueling against ${randomOpponent}. Good luck!`,
      });
    }, 3000);
  };

  const simulatePlayerMove = () => {
    if (duelState.mode !== 'playing') return;
    
    setDuelState(prev => {
      const newProgress = Math.min(100, prev.playerProgress + 5 + Math.random() * 10);
      
      // Check if player wins
      if (newProgress >= 100 && prev.opponentProgress < 100) {
        toast({
          title: "You Win! 🎉",
          description: "You've earned 3 Pi! Great job!",
        });
        return {
          ...prev,
          mode: 'completed',
          winner: 'player',
          playerProgress: 100
        };
      }
      
      return {
        ...prev,
        playerProgress: newProgress
      };
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const returnToLobby = () => {
    setDuelState({
      mode: 'lobby',
      opponent: null,
      puzzle: null,
      playerProgress: 0,
      opponentProgress: 0,
      timeLeft: 300,
      winner: null
    });
  };

  const renderLobby = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">⚔️</div>
        <h2 className="text-2xl font-bold mb-2">Sudoku Duel Arena</h2>
        <p className="text-gray-600">Real-time 1v1 Sudoku battles!</p>
      </div>

      {/* Balance and Entry Fee */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-gray-600">Your Pi Balance</div>
            <div className="text-2xl font-bold text-orange-600">π {piBalance}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Entry Fee</div>
            <div className="text-xl font-bold">π 2.0</div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Winner takes π 3.0 • Platform fee: π 1.0
        </div>
      </div>

      {/* Duel Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-20 flex flex-col items-center justify-center"
          onClick={startQuickDuel}
          disabled={piBalance < 2}
        >
          <Zap className="w-6 h-6 mb-1" />
          <div>Quick Duel</div>
          <div className="text-xs opacity-75">Random Opponent</div>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="h-20 flex flex-col items-center justify-center"
          disabled
        >
          <Users className="w-6 h-6 mb-1" />
          <div>Friend Duel</div>
          <div className="text-xs opacity-75">Coming Soon</div>
        </Button>
      </div>

      {/* Recent Duels */}
      <div className="space-y-3">
        <h3 className="font-semibold">Recent Duel History</h3>
        {[
          { opponent: 'SudokuKing', result: 'win', time: '3:24', prize: '+3 Pi' },
          { opponent: 'PuzzleMaster', result: 'loss', time: '4:12', prize: '-2 Pi' },
          { opponent: 'NumberWiz', result: 'win', time: '2:56', prize: '+3 Pi' },
        ].map((duel, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`text-2xl ${duel.result === 'win' ? '🏆' : '💔'}`}>
                {duel.result === 'win' ? '🏆' : '💔'}
              </div>
              <div>
                <div className="font-medium">vs {duel.opponent}</div>
                <div className="text-sm text-gray-600">Time: {duel.time}</div>
              </div>
            </div>
            <Badge variant={duel.result === 'win' ? 'default' : 'destructive'}>
              {duel.prize}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearching = () => (
    <div className="text-center py-12">
      <div className="animate-spin text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold mb-2">Finding Opponent...</h3>
      <p className="text-gray-600 mb-4">Matching you with a player of similar skill</p>
      <div className="animate-pulse bg-blue-100 h-2 rounded-full w-64 mx-auto"></div>
      
      <Button variant="outline" className="mt-6" onClick={returnToLobby}>
        Cancel Search
      </Button>
    </div>
  );

  const renderPlaying = () => (
    <div className="space-y-4">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-2xl mb-1">👤</div>
            <div className="font-semibold">You</div>
            <Progress value={duelState.playerProgress} className="w-20 mt-2" />
            <div className="text-sm text-gray-600">{Math.round(duelState.playerProgress)}%</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-bold text-lg">{formatTime(duelState.timeLeft)}</span>
            </div>
            <div className="text-2xl">⚔️</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-1">🤖</div>
            <div className="font-semibold">{duelState.opponent}</div>
            <Progress value={duelState.opponentProgress} className="w-20 mt-2" />
            <div className="text-sm text-gray-600">{Math.round(duelState.opponentProgress)}%</div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      {duelState.puzzle && (
        <div className="text-center">
          <SudokuBoard
            board={duelState.puzzle.board}
            selectedCell={null}
            onCellClick={() => {}}
            theme="light"
          />
          
          <Button 
            onClick={simulatePlayerMove} 
            className="mt-4"
            disabled={duelState.playerProgress >= 100}
          >
            Make Move (Demo)
          </Button>
        </div>
      )}
    </div>
  );

  const renderCompleted = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">
        {duelState.winner === 'player' ? '🏆' : '💔'}
      </div>
      <h3 className="text-2xl font-bold mb-2">
        {duelState.winner === 'player' ? 'Victory!' : 'Defeat'}
      </h3>
      <p className="text-gray-600 mb-4">
        {duelState.winner === 'player' 
          ? `Congratulations! You defeated ${duelState.opponent}!`
          : `${duelState.opponent} was faster this time.`
        }
      </p>
      
      <Badge 
        variant={duelState.winner === 'player' ? 'default' : 'destructive'}
        className="text-lg px-6 py-2 mb-6"
      >
        {duelState.winner === 'player' ? '+3 Pi' : '-2 Pi'}
      </Badge>

      <div className="flex gap-4 justify-center">
        <Button onClick={startQuickDuel} disabled={piBalance < 2}>
          <Swords className="w-4 h-4 mr-2" />
          Duel Again
        </Button>
        <Button variant="outline" onClick={returnToLobby}>
          Return to Lobby
        </Button>
      </div>
    </div>
  );

  switch (duelState.mode) {
    case 'searching':
      return renderSearching();
    case 'playing':
      return renderPlaying();
    case 'completed':
      return renderCompleted();
    default:
      return renderLobby();
  }
};

export default SudokuDuelMode;
