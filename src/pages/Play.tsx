
import React, { useState, useEffect } from 'react';
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
import CharacterCompanion from '@/components/play/CharacterCompanion';

const Play = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  useEffect(() => {
    // Load selected character from localStorage
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        setSelectedCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Error parsing saved character:', error);
        // Set default character if parsing fails
        setSelectedCharacter({
          id: 'droplet-blue-happy',
          name: 'Droplink',
          gender: 'male',
          color: '#00aaff',
          mood: 'happy',
          personality: 'Cheerful and optimistic'
        });
      }
    } else {
      // Set default character if none selected
      setSelectedCharacter({
        id: 'droplet-blue-happy',
        name: 'Droplink',
        gender: 'male',
        color: '#00aaff',
        mood: 'happy',
        personality: 'Cheerful and optimistic'
      });
    }
  }, []);

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

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your gaming companion...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play Games with {selectedCharacter.name} - Droplink Gaming</title>
        <meta name="description" content={`Play interactive games with your companion ${selectedCharacter.name}! Choose from puzzle games, action games, trivia, and creative activities.`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <PlayHeader />

        {/* Hero Section with Character */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gaming with {selectedCharacter.name}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your gaming companion is ready for adventure!
            </p>
          </div>

          {/* Character and Games Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Character Companion Sidebar */}
            <div className="lg:col-span-1">
              <CharacterCompanion 
                character={selectedCharacter}
                selectedGame={selectedGame}
              />
            </div>

            {/* Game Categories */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        <PlayFooter />
      </div>
    </>
  );
};

export default Play;
