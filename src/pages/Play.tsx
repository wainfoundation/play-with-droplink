
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PuzzleIcon,
  RocketIcon,
  BrainIcon,
  PaletteIcon,
  ArrowLeft,
  Play as PlayIcon
} from 'lucide-react';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Droplink Games
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

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
              <Card key={category.id} className="bg-white shadow-lg transition-all duration-200 hover:shadow-xl border-2 hover:border-blue-200">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose from {category.games.length} {category.name.toLowerCase()} games
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-4">
                    {category.games.map((game) => (
                      <div
                        key={game.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer ${
                          selectedGame === game.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleGameClick(game.id, game.name)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">🎮</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{game.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                            <Badge 
                              variant="outline" 
                              className={`${getDifficultyColor(game.difficulty)} text-xs font-medium`}
                            >
                              {game.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant={selectedGame === game.id ? "default" : "outline"}
                          size="sm"
                          disabled={selectedGame === game.id}
                          className="min-w-[90px] shadow-sm"
                        >
                          {selectedGame === game.id ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Loading
                            </div>
                          ) : (
                            <>
                              <PlayIcon className="w-4 h-4 mr-2" />
                              Play
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              © {new Date().getFullYear()} Droplink Gaming. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Play;
