
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlayIcon, 
  GamepadIcon, 
  TrophyIcon, 
  UsersIcon, 
  CrownIcon,
  SparklesIcon,
  ZapIcon,
  BookIcon
} from 'lucide-react';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';

const Index = () => {
  const [musicController] = useState(() => createBackgroundMusicController());
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (soundEnabled) {
      musicController.start();
    } else {
      musicController.stop();
    }

    return () => {
      musicController.stop();
    };
  }, [soundEnabled, musicController]);

  const features = [
    {
      icon: GamepadIcon,
      title: "50+ Games",
      description: "Puzzle, Action, Trivia, Creative & Infinite games",
      color: "text-blue-500"
    },
    {
      icon: CrownIcon,
      title: "Pi Network Integration",
      description: "Earn and spend Pi cryptocurrency in games",
      color: "text-yellow-500"
    },
    {
      icon: TrophyIcon,
      title: "Compete & Win",
      description: "Daily leaderboards and tournaments",
      color: "text-green-500"
    },
    {
      icon: ZapIcon,
      title: "Premium Experience",
      description: "Ad-free gaming with exclusive content",
      color: "text-purple-500"
    }
  ];

  const handlePlayNow = () => {
    if (soundEnabled) sounds.click();
    window.location.href = '/play';
  };

  const handleWorkflow = () => {
    if (soundEnabled) sounds.click();
    window.location.href = '/workflow';
  };

  return (
    <>
      <Helmet>
        <title>Droplink Gaming - Play & Earn on Pi Network</title>
        <meta name="description" content="Welcome to Droplink Gaming! Play 50+ interactive games, earn Pi cryptocurrency, and compete with players worldwide. Premium gaming experience on Pi Network." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Animated Mascot Header */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-bounce-gentle">
                  <SparklesIcon className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Welcome to Droplink
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                🎮 The Ultimate Pi Network Gaming Experience
              </p>
              
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Play amazing games, earn Pi cryptocurrency, and compete with players worldwide. 
                Your favorite digital pet companion awaits!
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold text-yellow-400">50+</div>
                  <div className="text-sm text-gray-300">Games</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold text-blue-400">Pi</div>
                  <div className="text-sm text-gray-300">Rewards</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-gray-300">Gaming</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  onClick={handlePlayNow}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <PlayIcon className="w-6 h-6 mr-2" />
                  Start Playing Now
                </Button>
                
                <Button 
                  onClick={handleWorkflow}
                  variant="outline" 
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200"
                >
                  <BookIcon className="w-6 h-6 mr-2" />
                  View App Workflow
                </Button>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-200">
                    <CardHeader className="text-center pb-2">
                      <feature.icon className={`w-12 h-12 mx-auto mb-3 ${feature.color}`} />
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Game Preview */}
              <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">🎯 Featured Gaming Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge className="bg-blue-600 text-white">🧩 Puzzle & Logic</Badge>
                    <Badge className="bg-red-600 text-white">⚡ Action & Reflex</Badge>
                    <Badge className="bg-green-600 text-white">🧠 Trivia & Quiz</Badge>
                    <Badge className="bg-purple-600 text-white">🎨 Creative & Fun</Badge>
                    <Badge className="bg-orange-600 text-white">♾️ Infinite Games</Badge>
                  </div>
                  <p className="text-gray-300 text-center mt-4">
                    Interactive mascot companion • Pi Network integration • Premium features
                  </p>
                </CardContent>
              </Card>

              {/* Bottom CTA */}
              <div className="mt-16 p-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Play with Your Digital Pet?</h3>
                <p className="text-gray-300 mb-6">
                  Meet the Droplink mascot, play games together, and earn Pi rewards. 
                  Feed, play, and care for your companion while gaming!
                </p>
                <Button 
                  onClick={handlePlayNow}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-full"
                >
                  <GamepadIcon className="w-5 h-5 mr-2" />
                  Meet Your Gaming Companion
                </Button>
              </div>
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

export default Index;
