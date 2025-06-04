
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Shield, Users, Play, ArrowRight } from "lucide-react";
import { useAuthSystem } from "@/hooks/useAuthSystem";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import CharacterRenderer from "@/components/welcome/CharacterRenderer";
import { characters } from "@/components/welcome/characterData";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthSystem();
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    if (user && !loading) {
      navigate('/play');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handlePlayDemo = () => {
    navigate('/playdrop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <CharacterRenderer character={characters[0]} size={120} />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-primary">PlayDrop</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Your adorable virtual pet game on Pi Network! Care for your droplet, play games, and earn Pi rewards.
            </p>
            
            {isPiBrowser ? (
              <Badge className="bg-green-100 text-green-800 border-green-300 mb-6">
                ✓ Pi Browser Detected - Ready to Play!
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 mb-6">
                ⚠️ Best experienced in Pi Browser
              </Badge>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handlePlayDemo}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pet Care</h3>
              <p className="text-sm text-gray-600">Feed, clean, and play with your adorable droplet companion</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mini Games</h3>
              <p className="text-sm text-gray-600">Play fun games and earn coins to buy items for your pet</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pi Rewards</h3>
              <p className="text-sm text-gray-600">Earn Pi coins through gameplay and activities</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Join the Pi Network gaming community</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">How PlayDrop Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Sign in with Pi</h3>
              <p className="text-gray-600">Connect your Pi Network wallet to start playing</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Care for Your Pet</h3>
              <p className="text-gray-600">Feed, clean, and play with your droplet to keep it happy</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Complete activities and mini-games to earn Pi coins</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
