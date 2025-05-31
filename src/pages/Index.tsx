
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Gamepad2, 
  Trophy, 
  Coins, 
  Eye, 
  Crown, 
  Zap,
  ChevronRight,
  Volume2,
  VolumeX
} from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import { playSound, sounds } from "@/utils/sounds";

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const isPiBrowser = isRunningInPiBrowser();

  const tutorialSteps = [
    {
      title: "Welcome to Droplink Gaming!",
      description: "The ultimate Pi Network gaming platform with 50+ interactive games",
      icon: "🎮",
      content: "Play puzzle games, action challenges, trivia, and creative activities while earning Pi!"
    },
    {
      title: "How Pi Network Integration Works",
      description: "Earn rewards and unlock premium content",
      icon: "⚡",
      content: "Watch ads to earn Pi or pay directly to unlock premium games and remove ads forever!"
    },
    {
      title: "Gaming Monetization",
      description: "Multiple ways to enhance your gaming experience",
      icon: "💎",
      content: "Subscribe monthly for unlimited access or purchase individual games with Pi Network payments."
    },
    {
      title: "Ready to Play?",
      description: "Start your gaming adventure now!",
      icon: "🚀",
      content: "Jump into 50+ games and start earning Pi through our integrated ad network!"
    }
  ];

  useEffect(() => {
    if (soundEnabled) {
      playSound(sounds.setupComplete, 0.3);
    }
  }, [soundEnabled]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (soundEnabled) {
        playSound(sounds.loadingComplete, 0.2);
      }
    }
  };

  const handleStartPlaying = () => {
    if (soundEnabled) {
      playSound(sounds.setupComplete, 0.4);
    }
    navigate("/play");
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <>
      <Helmet>
        <title>Droplink Gaming - Pi Network Game Platform</title>
        <meta name="description" content="Play 50+ interactive games on Pi Network. Earn Pi through ads, unlock premium content, and enjoy the ultimate gaming experience!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-lg">
                <img 
                  src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
                  alt="Droplink Logo" 
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Droplink Gaming</h1>
                <p className="text-xs text-gray-600">Pi Network Game Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSound}
                className="p-2"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              
              {isPiBrowser ? (
                <Badge className="bg-green-100 text-green-800">Pi Browser ✓</Badge>
              ) : (
                <Badge variant="outline">Regular Browser</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Tutorial Card */}
            <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{tutorialSteps[currentStep].icon}</div>
                <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {tutorialSteps[currentStep].title}
                </CardTitle>
                <p className="text-gray-600 text-lg">{tutorialSteps[currentStep].description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center text-gray-700 text-lg leading-relaxed">
                  {tutorialSteps[currentStep].content}
                </p>

                {/* Progress Indicator */}
                <div className="flex justify-center space-x-2">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  {currentStep < tutorialSteps.length - 1 ? (
                    <Button onClick={handleNext} size="lg" className="px-8">
                      Next <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  ) : (
                    <Button onClick={handleStartPlaying} size="lg" className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      <Play className="mr-2 w-5 h-5" />
                      Start Playing Now!
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleStartPlaying}
                    size="lg"
                  >
                    Skip Tutorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">50+ Games</h3>
                  <p className="text-gray-600 text-sm">Puzzle, Action, Trivia, Creative & Infinite Games</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Watch Ads = Earn Pi</h3>
                  <p className="text-gray-600 text-sm">Watch ads to unlock premium games and earn rewards</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Premium Access</h3>
                  <p className="text-gray-600 text-sm">Monthly subscription for unlimited games & no ads</p>
                </CardContent>
              </Card>
            </div>

            {/* Pi Network Benefits */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">Pi Network Integration</h2>
                  <p className="text-gray-600">Play, Earn, and Unlock with Pi</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Coins className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Earn Pi by Watching Ads</h4>
                      <p className="text-sm text-gray-600">Get rewarded for your time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Pay Pi for Instant Access</h4>
                      <p className="text-sm text-gray-600">Skip ads and unlock immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Monthly Subscriptions</h4>
                      <p className="text-sm text-gray-600">Unlimited access to all games</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Crown className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Premium Experience</h4>
                      <p className="text-sm text-gray-600">Ad-free gaming and exclusive content</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-20">
          <Button 
            onClick={handleStartPlaying}
            size="lg"
            className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
          >
            <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        {/* Background Music Indicator */}
        {soundEnabled && (
          <div className="fixed bottom-6 left-6 z-20">
            <Badge className="bg-white/80 text-primary animate-pulse">
              🎵 Background Music On
            </Badge>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </>
  );
};

export default Index;
