
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Gamepad2, Trophy, Home, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import { Helmet } from 'react-helmet-async';

const PlayWithMascot = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [petStats, setPetStats] = useState({
    happiness: 85,
    energy: 70,
    hunger: 60,
    level: 5
  });

  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        const parsedCharacter = JSON.parse(savedCharacter);
        const foundCharacter = characters.find(c => c.id === parsedCharacter.id) || characters[0];
        setSelectedCharacter(foundCharacter);
      } catch (error) {
        console.log('Error parsing saved character, using default');
      }
    }
  }, []);

  const feedPet = () => {
    setPetStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 10)
    }));
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.max(0, prev.energy - 10)
    }));
  };

  const restPet = () => {
    setPetStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 25)
    }));
  };

  const getStatColor = (value: number) => {
    if (value >= 70) return 'text-green-600 bg-green-100';
    if (value >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <>
      <Helmet>
        <title>Play with {selectedCharacter.name} - Pet Droplet Game</title>
        <meta name="description" content={`Take care of your pet droplet ${selectedCharacter.name}! Feed, play, and watch your digital companion grow.`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Playing with {selectedCharacter.name}
            </h1>
            <Link to="/welcome">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Change Character
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Pet Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-pink-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {selectedCharacter.name}
                </CardTitle>
                <div className="flex justify-center gap-2">
                  <Badge className={selectedCharacter.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}>
                    {selectedCharacter.gender}
                  </Badge>
                  <Badge variant="outline">Level {petStats.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  <CharacterRenderer character={selectedCharacter} size={200} />
                </div>
                <p className="text-gray-600 text-lg italic">"{selectedCharacter.personality}"</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Pet Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Happiness', value: petStats.happiness, icon: '😊' },
                  { name: 'Energy', value: petStats.energy, icon: '⚡' },
                  { name: 'Hunger', value: petStats.hunger, icon: '🍎' }
                ].map((stat) => (
                  <div key={stat.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium flex items-center gap-2">
                        <span>{stat.icon}</span>
                        {stat.name}
                      </span>
                      <Badge className={getStatColor(stat.value)}>
                        {stat.value}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions & Mini Games */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Care Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Care Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  onClick={feedPet}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-16 flex flex-col items-center gap-1"
                >
                  <span className="text-xl">🍎</span>
                  <span>Feed</span>
                </Button>
                <Button 
                  onClick={playWithPet}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-16 flex flex-col items-center gap-1"
                >
                  <span className="text-xl">🎾</span>
                  <span>Play</span>
                </Button>
                <Button 
                  onClick={restPet}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-16 flex flex-col items-center gap-1"
                >
                  <span className="text-xl">😴</span>
                  <span>Rest</span>
                </Button>
              </CardContent>
            </Card>

            {/* Mini Games */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-blue-500" />
                  Mini Games
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/my-pet-droplet">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2 hover:bg-blue-50">
                    <span className="text-2xl">🎯</span>
                    <span>Bubble Pop</span>
                  </Button>
                </Link>
                <Link to="/my-pet-droplet">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2 hover:bg-green-50">
                    <span className="text-2xl">🧠</span>
                    <span>Memory Game</span>
                  </Button>
                </Link>
                <Link to="/my-pet-droplet">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2 hover:bg-yellow-50">
                    <span className="text-2xl">🏃</span>
                    <span>Droplet Jump</span>
                  </Button>
                </Link>
                <Link to="/my-pet-droplet">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2 hover:bg-purple-50">
                    <span className="text-2xl">🎨</span>
                    <span>Color Match</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'First Friend', description: 'Met your first pet droplet', icon: '🤝' },
                  { name: 'Caring Owner', description: 'Fed your pet 10 times', icon: '🍎' },
                  { name: 'Playmate', description: 'Played 5 mini-games', icon: '🎮' }
                ].map((achievement, index) => (
                  <div key={achievement.name} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PlayWithMascot;
