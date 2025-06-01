
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  PuzzleIcon,
  RocketIcon,
  BrainIcon,
  PaletteIcon
} from 'lucide-react';
import PlayHeader from '@/components/play/PlayHeader';
import PlayFooter from '@/components/play/PlayFooter';
import GameCategoryCard from '@/components/play/GameCategoryCard';

const Play = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const gameCategories = [
    {
      id: 'puzzle',
      name: "Puzzle & Logic",
      icon: PuzzleIcon,
      color: "bg-blue-500",
      games: [
        { id: 'sudoku', name: 'Sudoku Classic', difficulty: 'Medium', description: 'Classic number puzzle game' },
        { id: 'block-connect', name: 'Block Connect', difficulty: 'Easy', description: 'Connect colored blocks' },
        { id: 'word-puzzle', name: 'Word Puzzle', difficulty: 'Hard', description: 'Challenge your vocabulary' }
      ]
    },
    {
      id: 'action',
      name: "Action & Reflex",
      icon: RocketIcon,
      color: "bg-red-500",
      games: [
        { id: 'target-shoot', name: 'Target Shooter', difficulty: 'Medium', description: 'Test your aim and speed' },
        { id: 'quick-tap', name: 'Quick Tap', difficulty: 'Easy', description: 'Tap as fast as you can' }
      ]
    },
    {
      id: 'trivia',
      name: "Trivia & Quiz",
      icon: BrainIcon,
      color: "bg-green-500",
      games: [
        { id: 'general-quiz', name: 'General Knowledge', difficulty: 'Medium', description: 'Test your knowledge' },
        { id: 'math-quiz', name: 'Math Challenge', difficulty: 'Hard', description: 'Solve math problems' }
      ]
    },
    {
      id: 'creative',
      name: "Creative & Fun",
      icon: PaletteIcon,
      color: "bg-purple-500",
      games: [
        { id: 'color-merge', name: 'Color Merge', difficulty: 'Easy', description: 'Mix and match colors' },
        { id: 'draw-challenge', name: 'Drawing Challenge', difficulty: 'Medium', description: 'Express your creativity' }
      ]
    }
  ];

  const handleGameClick = (gameId: string, gameName: string) => {
    setSelectedGame(gameId);
    console.log(`Starting game: ${gameName}`);
    // For now, just show selection feedback
    setTimeout(() => {
      alert(`Game "${gameName}" would start here!`);
      setSelectedGame(null);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Play Games - Droplink Gaming</title>
        <meta name="description" content="Play interactive games with Droplink! Choose from puzzle games, action games, trivia, and creative activities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <PlayHeader />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Game</h2>
            <p className="text-lg text-gray-600">
              Select from our collection of interactive games and activities
            </p>
          </div>

          {/* Game Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {gameCategories.map((category) => (
              <GameCategoryCard
                key={category.id}
                category={category}
                selectedGame={selectedGame}
                onGameClick={handleGameClick}
              />
            ))}
          </div>
        </div>

        <PlayFooter />
      </div>
    </>
  );
};

export default Play;
