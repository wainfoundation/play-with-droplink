
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Settings, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { characters } from '@/components/welcome/characterData';
import { Helmet } from 'react-helmet-async';
import RealTimePetCare from '@/components/games/RealTimePetCare';

const PlayWithMascot = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [currentView, setCurrentView] = useState<'care' | 'games'>('care');

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

  return (
    <>
      <Helmet>
        <title>Play with {selectedCharacter.name} - Real-Time Pet Care</title>
        <meta name="description" content={`Take care of your emotional pet droplet ${selectedCharacter.name}! Watch their mood change in real-time and provide the care they need.`} />
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
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Real-Time Pet Care
              </h1>
              <p className="text-gray-600 text-sm">
                Your pet's emotions change based on time and care!
              </p>
            </div>
            <Link to="/welcome">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Change Character
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex justify-center gap-4">
            <Button
              variant={currentView === 'care' ? 'default' : 'outline'}
              onClick={() => setCurrentView('care')}
              className="flex items-center gap-2"
            >
              <span>💖</span>
              Pet Care
            </Button>
            <Button
              variant={currentView === 'games' ? 'default' : 'outline'}
              onClick={() => setCurrentView('games')}
              className="flex items-center gap-2"
            >
              <span>🎮</span>
              Mini Games
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {currentView === 'care' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RealTimePetCare character={selectedCharacter} />
            </motion.div>
          )}

          {currentView === 'games' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="bg-white/80 backdrop-blur-sm max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <span>🎮</span>
                    Mini Games
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Mini-games are coming soon! Play with your pet to keep them happy while we add more games.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🧠</div>
                      <div className="text-sm font-semibold">Memory Match</div>
                      <div className="text-xs text-gray-600 mt-1">Coming Soon</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-sm font-semibold">Bubble Pop</div>
                      <div className="text-xs text-gray-600 mt-1">Coming Soon</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🏃</div>
                      <div className="text-sm font-semibold">Droplet Jump</div>
                      <div className="text-xs text-gray-600 mt-1">Coming Soon</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <div className="text-sm font-semibold">Color Match</div>
                      <div className="text-xs text-gray-600 mt-1">Coming Soon</div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setCurrentView('care')} 
                    className="w-full"
                    variant="outline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Pet Care
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayWithMascot;
