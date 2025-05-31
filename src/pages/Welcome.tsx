
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, 
  Heart, 
  Crown, 
  Sparkles,
  Play,
  Star
} from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleMeetMascot = () => {
    navigate('/mascot');
  };

  const handleEnterPlayhouse = () => {
    navigate('/playhouse');
  };

  return (
    <>
      <Helmet>
        <title>🎮 Play with Droplink - Pi Gaming World</title>
        <meta name="description" content="Welcome to Play with Droplink — your ultimate Pi-powered gaming world! Take care of your Droplink mascot and enjoy 50+ games." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Main Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-bounce-gentle">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                🎮 Play with Droplink
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Welcome to Play with Droplink — your ultimate Pi-powered gaming world!<br/>
              Take care of your Droplink mascot, explore the Playhouse, and enjoy 50+ exciting games across Puzzle, Action, Trivia, and Creative categories.
            </p>
          </div>

          {/* Tutorial Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            <Card className="bg-gray-900/50 border-pink-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-4xl mb-3">👾</div>
                <CardTitle className="text-white">Meet Your Mascot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Meet your Droplink Mascot! Feed, play, and care for your mascot like a virtual pet.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-blue-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-4xl mb-3">🎲</div>
                <CardTitle className="text-white">Visit the Playhouse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Visit the Playhouse with 50+ free and premium games across multiple categories.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-4xl mb-3">💎</div>
                <CardTitle className="text-white">Premium Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Subscribe to Premium to unlock all games, remove ads, and earn exclusive badges.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={handleMeetMascot}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-2" />
              🐾 Meet Your Mascot
            </Button>
            
            <Button 
              onClick={handleEnterPlayhouse}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-6 h-6 mr-2" />
              🎲 Enter the Playhouse
            </Button>
          </div>

          {/* Game Stats */}
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-gray-300">Games Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold text-blue-400">5</div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold text-purple-400">Pi</div>
                <div className="text-sm text-gray-300">Powered</div>
              </div>
            </div>
          </div>

          {/* Game Categories Preview */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">🎯 Game Categories</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Explore diverse gaming experiences across multiple categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className="bg-blue-600 text-white text-sm py-2 px-4">🧩 Puzzle & Logic</Badge>
                <Badge className="bg-red-600 text-white text-sm py-2 px-4">⚡ Action & Reflex</Badge>
                <Badge className="bg-green-600 text-white text-sm py-2 px-4">🧠 Trivia & Quiz</Badge>
                <Badge className="bg-purple-600 text-white text-sm py-2 px-4">🎨 Creative & Fun</Badge>
                <Badge className="bg-orange-600 text-white text-sm py-2 px-4">♾️ Infinite Games</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Ready to start your Pi-powered gaming adventure?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black">
                <Crown className="w-4 h-4 mr-2" />
                Get Premium
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                <Star className="w-4 h-4 mr-2" />
                View Leaderboards
              </Button>
            </div>
          </div>
        </div>

        {/* Custom Animation Styles */}
        <style>
          {`
            @keyframes bounce-gentle {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-15px); }
              60% { transform: translateY(-8px); }
            }
            
            .animate-bounce-gentle {
              animation: bounce-gentle 4s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Welcome;
