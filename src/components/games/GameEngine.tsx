
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RefreshCw, Trophy, Star, Heart, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { playSoundEffect, backgroundMusic } from '@/utils/sounds';
import BlockConnectEngine from '@/components/games/engines/BlockConnectEngine';
import ColorMergeEngine from '@/components/games/engines/ColorMergeEngine';
import SudokuClassicEngine from '@/components/games/engines/SudokuClassicEngine';

interface GameEngineProps {
  game: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
  };
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ game, onBack, onGameComplete }) => {
  const isMobile = useIsMobile();
  
  // Check if we have a specific engine for this game
  if (game.id === 'block-connect') {
    return <BlockConnectEngine onBack={onBack} onGameComplete={onGameComplete} />;
  }
  
  if (game.id === 'color-merge') {
    return <ColorMergeEngine onBack={onBack} onGameComplete={onGameComplete} />;
  }

  if (game.id === 'sudoku-classic') {
    return <SudokuClassicEngine onBack={onBack} onGameComplete={onGameComplete} />;
  }

  const [gameState, setGameState] = React.useState<any>({});
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [lives, setLives] = React.useState(3);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  // Start background music when component mounts
  React.useEffect(() => {
    if (soundEnabled) {
      backgroundMusic.play('/sounds/background/gameplay-music.mp3');
    }
    
    return () => {
      backgroundMusic.stop();
    };
  }, [soundEnabled]);

  // Game timer
  React.useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            if (soundEnabled) {
              playSoundEffect('gameOver', 0.7);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft, soundEnabled]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLives(3);
    setTimeLeft(60);
    
    if (soundEnabled) {
      playSoundEffect('newLevel', 0.7);
    }
    
    initializeGameSpecific();
  };

  const initializeGameSpecific = () => {
    switch (game.category) {
      case 'puzzle':
        initializePuzzleGame();
        break;
      case 'action':
        initializeActionGame();
        break;
      case 'trivia':
        initializeTriviaGame();
        break;
      case 'creative':
        initializeCreativeGame();
        break;
      case 'infinite':
        initializeInfiniteGame();
        break;
      default:
        initializeDefaultGame();
    }
  };

  const initializePuzzleGame = () => {
    if (game.name.toLowerCase().includes('sudoku')) {
      setGameState({
        board: generateSudokuBoard(),
        solution: null,
        selectedCell: null
      });
    } else if (game.name.toLowerCase().includes('word')) {
      setGameState({
        letters: generateLetters(),
        currentWord: '',
        foundWords: []
      });
    } else {
      setGameState({
        pieces: generatePuzzlePieces(),
        completed: []
      });
    }
  };

  const initializeActionGame = () => {
    setGameState({
      targets: [],
      bullets: [],
      obstacles: [],
      speed: 1
    });
  };

  const initializeTriviaGame = () => {
    setGameState({
      currentQuestion: 0,
      questions: generateTriviaQuestions(),
      answers: [],
      streak: 0
    });
  };

  const initializeCreativeGame = () => {
    setGameState({
      canvas: [],
      tools: ['brush', 'eraser', 'fill'],
      selectedTool: 'brush',
      colors: ['red', 'blue', 'green', 'yellow']
    });
  };

  const initializeInfiniteGame = () => {
    setGameState({
      player: { x: 50, y: 50 },
      enemies: [],
      powerups: [],
      distance: 0
    });
  };

  const initializeDefaultGame = () => {
    setGameState({
      clicks: 0,
      target: Math.floor(Math.random() * 100) + 1
    });
  };

  const generateSudokuBoard = () => {
    // Simple 4x4 Sudoku for demo
    return [
      [1, 0, 3, 0],
      [0, 2, 0, 1],
      [2, 0, 1, 0],
      [0, 1, 0, 3]
    ];
  };

  const generateLetters = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort(() => Math.random() - 0.5).slice(0, 9);
  };

  const generatePuzzlePieces = () => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: Math.floor(Math.random() * 16)
    }));
  };

  const generateTriviaQuestions = () => {
    return [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
      }
    ];
  };

  const handleGameAction = (action: string, data?: any) => {
    if (!isPlaying) return;

    if (soundEnabled) {
      playSoundEffect('click', 0.3);
    }

    switch (action) {
      case 'click':
        handleClick(data);
        break;
      case 'answer':
        handleAnswer(data);
        break;
      case 'move':
        handleMove(data);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleClick = (data: any) => {
    setScore(prev => prev + 10);
    
    if (soundEnabled) {
      playSoundEffect('collect', 0.5);
    }
    
    if (score > 0 && score % 100 === 0) {
      setLevel(prev => prev + 1);
      if (soundEnabled) {
        playSoundEffect('levelComplete', 0.8);
      }
      toast({
        title: "Level Up!",
        description: `You've reached level ${level + 1}!`,
      });
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const question = gameState.questions?.[gameState.currentQuestion];
    if (question && answerIndex === question.correct) {
      setScore(prev => prev + 50);
      if (soundEnabled) {
        playSoundEffect('success', 0.6);
      }
      setGameState(prev => ({
        ...prev,
        streak: prev.streak + 1,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      setLives(prev => prev - 1);
      if (soundEnabled) {
        playSoundEffect('error', 0.4);
      }
      setGameState(prev => ({
        ...prev,
        streak: 0,
        currentQuestion: prev.currentQuestion + 1
      }));
    }

    if (gameState.currentQuestion >= gameState.questions?.length - 1) {
      endGame();
    }
  };

  const handleMove = (direction: string) => {
    // Handle player movement for action games
    setScore(prev => prev + 1);
    if (soundEnabled) {
      playSoundEffect('collect', 0.3);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (soundEnabled) {
      playSoundEffect('gameOver', 0.7);
    }
    
    onGameComplete(score);
    
    toast({
      title: "Game Complete!",
      description: `Final Score: ${score} points`,
    });
  };

  const renderGameContent = () => {
    if (!isPlaying && !gameOver) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bold mb-2">{game.name}</h3>
          <p className="text-gray-600 mb-6">Ready to play? Click start to begin!</p>
          <Button onClick={startGame} size="lg">
            Start Game
          </Button>
        </div>
      );
    }

    if (gameOver) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-2">Game Over!</h3>
          <p className="text-gray-600 mb-2">Final Score: {score}</p>
          <p className="text-gray-600 mb-6">Level Reached: {level}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={startGame} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
        </div>
      );
    }

    // Render actual game based on category
    switch (game.category) {
      case 'puzzle':
        return renderPuzzleGame();
      case 'action':
        return renderActionGame();
      case 'trivia':
        return renderTriviaGame();
      case 'creative':
        return renderCreativeGame();
      case 'infinite':
        return renderInfiniteGame();
      default:
        return renderDefaultGame();
    }
  };

  const renderPuzzleGame = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Solve the {game.name}!</h3>
        {game.name.toLowerCase().includes('sudoku') ? (
          <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto">
            {gameState.board?.flat().map((cell: number, i: number) => (
              <div
                key={i}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-100"
                onClick={() => handleGameAction('click', { cell: i })}
              >
                {cell || ''}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {gameState.letters?.map((letter: string, i: number) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => handleGameAction('click', { letter })}
              >
                {letter}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderActionGame = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Quick! Tap the targets!</h3>
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <Button
              key={i}
              className="h-16 w-16 rounded-full"
              onClick={() => handleGameAction('click', { target: i })}
            >
              🎯
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTriviaGame = () => {
    const question = gameState.questions?.[gameState.currentQuestion];
    if (!question) return <div>Loading question...</div>;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
            {question.options.map((option: string, i: number) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => handleAnswer(i)}
                className="text-left justify-start"
              >
                {String.fromCharCode(65 + i)}. {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCreativeGame = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Create your masterpiece!</h3>
        <div className="grid grid-cols-8 gap-1 max-w-md mx-auto border-2 border-gray-300 p-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 border border-gray-200 cursor-pointer hover:bg-blue-200"
              onClick={() => handleGameAction('click', { pixel: i })}
            />
          ))}
        </div>
        <div className="flex gap-2 justify-center mt-4">
          {['🔴', '🟡', '🟢', '🔵', '🟣'].map((color, i) => (
            <Button key={i} variant="outline" size="sm">
              {color}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInfiniteGame = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Keep going as long as you can!</h3>
        <div className="relative bg-gray-100 h-64 w-full max-w-md mx-auto rounded">
          <div 
            className="absolute w-8 h-8 bg-blue-500 rounded-full transition-all"
            style={{ 
              left: `${gameState.player?.x || 50}%`, 
              top: `${gameState.player?.y || 50}%` 
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-4">
          <div></div>
          <Button onClick={() => handleMove('up')}>⬆️</Button>
          <div></div>
          <Button onClick={() => handleMove('left')}>⬅️</Button>
          <Button onClick={() => handleMove('down')}>⬇️</Button>
          <Button onClick={() => handleMove('right')}>➡️</Button>
        </div>
      </div>
    </div>
  );

  const renderDefaultGame = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Click to earn points!</h3>
        <Button
          size="lg"
          onClick={() => handleGameAction('click')}
          className="text-2xl h-20 w-20 rounded-full"
        >
          🎯
        </Button>
        <p className="mt-4 text-gray-600">Keep clicking to increase your score!</p>
      </div>
    </div>
  );

  // Mobile full screen wrapper
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-lg">🎮</div>
              <span className="font-semibold text-sm">{game.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
              </Button>
              <Badge variant="outline" className="text-xs">{game.category}</Badge>
            </div>
          </div>

          {/* Mobile Game Stats */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 border-b">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                <span className="font-semibold text-sm">{score}</span>
              </div>
              <p className="text-xs text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-blue-500" />
                <span className="font-semibold text-sm">{level}</span>
              </div>
              <p className="text-xs text-gray-600">Level</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                <span className="font-semibold text-sm">{lives}</span>
              </div>
              <p className="text-xs text-gray-600">Lives</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="font-semibold text-sm">{timeLeft}s</span>
              </div>
              <p className="text-xs text-gray-600">Time</p>
            </div>
          </div>

          {/* Time Progress Bar */}
          {isPlaying && (
            <div className="px-4 py-2 bg-gray-50">
              <Progress value={(timeLeft / 60) * 100} className="h-1" />
            </div>
          )}

          {/* Mobile Game Content */}
          <div className="flex-1 overflow-auto p-4">
            {renderGameContent()}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">🎮</div>
            {game.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Badge variant="outline">{game.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{score}</span>
            </div>
            <p className="text-xs text-gray-600">Score</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{level}</span>
            </div>
            <p className="text-xs text-gray-600">Level</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-semibold">{lives}</span>
            </div>
            <p className="text-xs text-gray-600">Lives</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="font-semibold">{timeLeft}s</span>
            </div>
            <p className="text-xs text-gray-600">Time</p>
          </div>
        </div>

        {/* Time Progress Bar */}
        {isPlaying && (
          <div className="mb-6">
            <Progress value={(timeLeft / 60) * 100} className="h-2" />
          </div>
        )}

        {/* Game Content */}
        {renderGameContent()}
      </CardContent>
    </Card>
  );
};

export default GameEngine;
