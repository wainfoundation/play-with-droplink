
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InteractiveMascot from '@/components/mascot/InteractiveMascot';
import { useNavigate } from 'react-router-dom';
import { Home, Gamepad2 } from 'lucide-react';

const MascotCare = () => {
  const navigate = useNavigate();

  const handleMoodChange = (mood: number) => {
    console.log('Mascot mood changed to:', mood);
  };

  return (
    <>
      <Helmet>
        <title>🐾 Meet Your Mascot - Play with Droplink</title>
        <meta name="description" content="Take care of your Droplink mascot - feed, play, and nurture your virtual companion" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                🐾 Meet Your Mascot
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Take care of your Droplink companion! Feed, play, and nurture your virtual pet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => navigate('/')}
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                onClick={() => navigate('/playhouse')}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Visit Playhouse
              </Button>
            </div>
          </div>

          {/* Mascot Interaction */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Mascot Area */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-center">Your Droplink Companion</CardTitle>
                  <CardDescription className="text-gray-400 text-center">
                    Interact with your mascot to keep them happy and healthy
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <InteractiveMascot 
                    onMoodChange={handleMoodChange} 
                    soundEnabled={true}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Care Tips */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-pink-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">💡 Care Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-pink-900/30 p-3 rounded-lg">
                    <h4 className="font-semibold text-pink-300 mb-1">🍎 Feeding</h4>
                    <p className="text-sm text-pink-100">Keep your mascot fed to maintain their energy and happiness!</p>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-1">🎮 Playing</h4>
                    <p className="text-sm text-blue-100">Play games together to boost happiness and bond with your companion.</p>
                  </div>
                  <div className="bg-green-900/30 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-1">🚿 Hygiene</h4>
                    <p className="text-sm text-green-100">Regular showers keep your mascot clean and healthy.</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-1">😴 Rest</h4>
                    <p className="text-sm text-purple-100">Let your mascot rest to restore their energy for more fun!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">🎯 Daily Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Feed mascot</span>
                    <span className="text-green-400">✓ 2/3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Play 5 games</span>
                    <span className="text-yellow-400">3/5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Give shower</span>
                    <span className="text-green-400">✓ 1/1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Rest time</span>
                    <span className="text-red-400">0/2</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-orange-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">🏆 Mascot Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>🌟</span>
                    <span className="text-gray-300">Happy Companion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🎮</span>
                    <span className="text-gray-300">Gaming Buddy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>💎</span>
                    <span className="text-gray-400">Fashion Icon (Locked)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Play Games Together?</h3>
                <p className="text-gray-300 mb-6">
                  Your mascot is excited to join you in the Playhouse! Explore 50+ games and earn rewards together.
                </p>
                <Button 
                  onClick={() => navigate('/playhouse')}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Enter the Playhouse
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MascotCare;
