
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Clock, Star, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WordPuzzleEngineProps {
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

const WordPuzzleEngine: React.FC<WordPuzzleEngineProps> = ({ onBack, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [level, setLevel] = useState(1);

  const wordList = [
    'CAT', 'DOG', 'BIRD', 'FISH', 'TREE', 'FLOWER', 'STAR', 'MOON', 'SUN', 'RAIN',
    'FIRE', 'WATER', 'EARTH', 'WIND', 'LOVE', 'HOPE', 'DREAM', 'LIGHT', 'DARK', 'TIME'
  ];

  const generateLetters = useCallback(() => {
    const targetWords = wordList.slice(0, 5 + level);
    const allLetters = new Set<string>();
    
    targetWords.forEach(word => {
      word.split('').forEach(letter => allLetters.add(letter));
    });

    // Add some random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (allLetters.size < 16) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      allLetters.add(randomLetter);
    }

    return Array.from(allLetters).slice(0, 16).sort(() => Math.random() - 0.5);
  }, [level]);

  const startGame = () => {
    const newLetters = generateLetters();
    setLetters(newLetters);
    setSelectedLetters([]);
    setCurrentWord('');
    setFoundWords([]);
    setScore(0);
    setTimeLeft(120);
    setGameState('playing');
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    startGame();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            onGameComplete(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft, score, onGameComplete]);

  const selectLetter = (index: number) => {
    if (selectedLetters.includes(index)) return;
    
    const newSelected = [...selectedLetters, index];
    const newWord = newSelected.map(i => letters[i]).join('');
    
    setSelectedLetters(newSelected);
    setCurrentWord(newWord);
  };

  const clearSelection = () => {
    setSelectedLetters([]);
    setCurrentWord('');
  };

  const submitWord = () => {
    if (currentWord.length < 3) {
      toast({
        title: "Word too short",
        description: "Words must be at least 3 letters long.",
        variant: "destructive"
      });
      return;
    }

    if (foundWords.includes(currentWord)) {
      toast({
        title: "Already found",
        description: "You've already found this word!",
        variant: "destructive"
      });
      clearSelection();
      return;
    }

    if (wordList.includes(currentWord)) {
      const points = currentWord.length * 10;
      setScore(prev => prev + points);
      setFoundWords(prev => [...prev, currentWord]);
      
      toast({
        title: "Word found!",
        description: `+${points} points for "${currentWord}"`,
      });

      if (foundWords.length + 1 >= 5 + level) {
        setGameState('completed');
        onGameComplete(score + points);
      }
    } else {
      toast({
        title: "Invalid word",
        description: "That's not a valid word in our dictionary.",
        variant: "destructive"
      });
    }
    
    clearSelection();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle className="flex items-center gap-2">
              <div className="text-2xl">📝</div>
              Word Puzzle
            </CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🔤</div>
            <h2 className="text-2xl font-bold">Word Puzzle Challenge!</h2>
            <p className="text-gray-600">
              Find words by connecting letters in the grid!
              <br />
              Find all hidden words to advance to the next level.
            </p>
            <Button size="lg" onClick={startGame}>
              Start Playing!
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle>Game Complete!</CardTitle>
            <Badge variant="outline">Level {level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold">Level {level} Complete!</h2>
            <p className="text-gray-600">
              Final Score: {score}
              <br />
              Words Found: {foundWords.length}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={nextLevel} size="lg">
                <Star className="w-4 h-4 mr-2" />
                Next Level
              </Button>
              <Button variant="outline" onClick={startGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Replay
              </Button>
              <Button variant="outline" onClick={() => setGameState('menu')}>
                Menu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">📝</div>
            Word Puzzle
          </CardTitle>
          <Badge variant="outline">Level {level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{score}</span>
            </div>
            <p className="text-xs text-gray-600">Score</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-xs text-gray-600">Time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-green-500" />
              <span className="font-semibold">{foundWords.length}</span>
            </div>
            <p className="text-xs text-gray-600">Words</p>
          </div>
        </div>

        {/* Current Word Display */}
        <div className="text-center mb-6">
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="text-2xl font-bold mb-2">
              {currentWord || 'Select letters to form words'}
            </div>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={submitWord} 
                disabled={currentWord.length < 3}
                size="sm"
              >
                Submit Word
              </Button>
              <Button 
                onClick={clearSelection} 
                variant="outline" 
                size="sm"
                disabled={selectedLetters.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Letter Grid */}
        <div className="grid grid-cols-4 gap-2 mb-6 max-w-xs mx-auto">
          {letters.map((letter, index) => (
            <Button
              key={index}
              variant={selectedLetters.includes(index) ? "default" : "outline"}
              className="h-16 text-xl font-bold"
              onClick={() => selectLetter(index)}
              disabled={selectedLetters.includes(index)}
            >
              {letter}
            </Button>
          ))}
        </div>

        {/* Found Words */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Found Words:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {foundWords.map((word, index) => (
              <Badge key={index} variant="secondary">
                {word} ({word.length * 10}pts)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordPuzzleEngine;
