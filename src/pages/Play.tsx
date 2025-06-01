
import React from 'react';
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
  InfinityIcon,
  ArrowLeft
} from 'lucide-react';

const Play = () => {
  const gameCategories = [
    {
      id: 'puzzle',
      name: "Puzzle & Logic",
      icon: PuzzleIcon,
      color: "bg-blue-500",
      games: [
        { id: 'sudoku', name: 'Sudoku Classic', difficulty: 'Medium' },
        { id: 'block-connect', name: 'Block Connect', difficulty: 'Easy' },
        { id: 'word-puzzle', name: 'Word Puzzle', difficulty: 'Hard' }
      ]
    },
    {
      id: 'action',
      name: "Action & Reflex",
      icon: RocketIcon,
      color: "bg-red-500",
      games: [
        { id: 'target-shoot', name: 'Target Shooter', difficulty: 'Medium' },
        { id: 'quick-tap', name: 'Quick Tap', difficulty: 'Easy' }
      ]
    },
    {
      id: 'trivia',
      name: "Trivia & Quiz",
      icon: BrainIcon,
      color: "bg-green-500",
      games: [
        { id: 'general-quiz', name: 'General Knowledge', difficulty: 'Medium' },
        { id: 'math-quiz', name: 'Math Challenge', difficulty: 'Hard' }
      ]
    },
    {
      id: 'creative',
      name: "Creative & Fun",
      icon: PaletteIcon,
      color: "bg-purple-500",
      games: [
        { id: 'color-merge', name: 'Color Merge', difficulty: 'Easy' },
        { id: 'draw-challenge', name: 'Drawing Challenge', difficulty: 'Medium' }
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

  const handleGameClick = (game: any) => {
    console.log('Starting game:', game.name);
    // For now, just log the game selection
    // Game engine will be added later
  };

  return (
    <>
      <Helmet>
        <title>Play Games - Droplink Gaming</title>
        <meta name="description" content="Play interactive games with Droplink! Choose from puzzle games, action games, trivia, and creative activities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Droplink Games
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Choose Your Game</h2>
            <p className="text-lg text-gray-600">
              Select from our collection of interactive games and activities
            </p>
          </div>

          {/* Game Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {gameCategories.map((category) => (
              <Card key={category.id} className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-6 h-6" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    Choose from {category.games.length} {category.name.toLowerCase()} games
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.games.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">🎮</div>
                          <div>
                            <h4 className="font-medium">{game.name}</h4>
                            <Badge 
                              variant="outline" 
                              className={getDifficultyColor(game.difficulty)}
                            >
                              {game.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleGameClick(game)}
                          variant="outline"
                          size="sm"
                        >
                          Play
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
        <footer className="mt-16 border-t bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-primary transition-colors"
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
