
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Lock, Play, Crown, Coins } from 'lucide-react';

const Playhouse = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮', count: 63 },
    { id: 'puzzle', name: 'Puzzle & Logic', icon: '🧩', count: 15 },
    { id: 'action', name: 'Action & Reflex', icon: '⚡', count: 12 },
    { id: 'trivia', name: 'Trivia & Quiz', icon: '🧠', count: 18 },
    { id: 'creative', name: 'Creative & Fun', icon: '🎨', count: 10 },
    { id: 'infinite', name: 'Infinite Games', icon: '♾️', count: 8 }
  ];

  const games = [
    {
      id: 1,
      name: "Puzzle Master Pro",
      category: "puzzle",
      difficulty: "Medium",
      access: "free",
      thumbnail: "🎯",
      description: "Challenging puzzle game with multiple levels",
      players: "1.2k playing"
    },
    {
      id: 2,
      name: "Speed Runner Elite",
      category: "action",
      difficulty: "Hard",
      access: "premium",
      thumbnail: "🏃",
      description: "Fast-paced action game requiring quick reflexes",
      players: "856 playing"
    },
    {
      id: 3,
      name: "Brain Teaser Ultimate",
      category: "trivia",
      difficulty: "Expert",
      access: "paid",
      price: "0.75 Pi",
      thumbnail: "🧠",
      description: "Ultimate trivia challenge across all topics",
      players: "432 playing"
    },
    {
      id: 4,
      name: "Creative Builder",
      category: "creative",
      difficulty: "Easy",
      access: "free",
      thumbnail: "🎨",
      description: "Build and create your own virtual worlds",
      players: "2.1k playing"
    },
    {
      id: 5,
      name: "Infinite Runner",
      category: "infinite",
      difficulty: "Medium",
      access: "premium",
      thumbnail: "🏃‍♀️",
      description: "Endless running game with power-ups",
      players: "3.5k playing"
    },
    {
      id: 6,
      name: "Strategy Empire",
      category: "puzzle",
      difficulty: "Expert",
      access: "paid",
      price: "1.5 Pi",
      thumbnail: "🏰",
      description: "Build your empire in this strategy masterpiece",
      players: "678 playing"
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getAccessBadge = (game: any) => {
    switch (game.access) {
      case 'free':
        return <Badge className="bg-green-600">🆓 Free</Badge>;
      case 'premium':
        return <Badge className="bg-purple-600">👑 Premium</Badge>;
      case 'paid':
        return <Badge className="bg-orange-600">💰 {game.price}</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (game: any) => {
    switch (game.access) {
      case 'free':
        return (
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Play Now
          </Button>
        );
      case 'premium':
        return (
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Crown className="w-4 h-4 mr-2" />
            Premium Required
          </Button>
        );
      case 'paid':
        return (
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            <Lock className="w-4 h-4 mr-2" />
            Unlock Game
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>🎲 Game Selection / Playhouse - Play with Droplink</title>
        <meta name="description" content="Explore 50+ games across multiple categories in the Droplink Playhouse" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                🎲 The Playhouse
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Explore 50+ exciting games across multiple categories
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`p-4 h-auto flex-col gap-2 ${
                  selectedCategory === category.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="text-xs text-center">
                  <div className="font-medium">{category.name}</div>
                  <div className="opacity-80">{category.count} games</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:border-gray-500 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{game.thumbnail}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{game.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {game.difficulty}
                          </Badge>
                          {getAccessBadge(game)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-3">
                    {game.description}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      👥 {game.players}
                    </div>
                  </div>
                  {getActionButton(game)}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Previous
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                1
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                2
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                3
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playhouse;
