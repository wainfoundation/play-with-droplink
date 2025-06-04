
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Shield, Users, Play, ArrowRight, Coins, GamepadIcon, Trophy, Star } from "lucide-react";
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CharacterRenderer character={characters[0]} size={140} />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-primary">PlayDrop</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your adorable virtual pet game on Pi Network! Care for your droplet, play engaging mini-games, and earn Pi rewards while having fun.
            </p>
            
            {isPiBrowser ? (
              <Badge className="bg-green-100 text-green-800 border-green-300 mb-8 px-4 py-2">
                ✓ Pi Browser Detected - Ready to Play!
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 mb-8 px-4 py-2">
                ⚠️ Best experienced in Pi Browser
              </Badge>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handlePlayDemo}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          <Card className="border-none bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Pet Care</h3>
              <p className="text-gray-600 leading-relaxed">Feed, clean, and play with your adorable droplet companion. Watch them grow happier!</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <GamepadIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Mini Games</h3>
              <p className="text-gray-600 leading-relaxed">Play fun interactive games and earn coins to buy special items for your pet</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Coins className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Pi Rewards</h3>
              <p className="text-gray-600 leading-relaxed">Earn real Pi cryptocurrency through daily care and special achievements</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">Join thousands of Pi Network users in the largest virtual pet community</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Join Our Growing Community</h2>
            <p className="text-xl text-gray-600">PlayDrop is the most popular virtual pet game on Pi Network</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Players</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Happy Pets</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-600 font-medium">Pi Earned</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">How PlayDrop Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Pet</h3>
              <p className="text-gray-600 leading-relaxed">Select from four unique droplet characters, each with their own personality and style</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-4">Care & Play</h3>
              <p className="text-gray-600 leading-relaxed">Feed, clean, and entertain your pet while exploring different rooms and activities</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-4">Earn Pi Rewards</h3>
              <p className="text-gray-600 leading-relaxed">Complete daily tasks and keep your pet happy to earn real Pi cryptocurrency</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Players Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"My kids love PlayDrop! It's educational and they're actually earning Pi while having fun."</p>
                <div className="font-semibold text-gray-800">- Sarah M.</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"Best Pi Network app I've used. The pet care mechanics are surprisingly deep and engaging."</p>
                <div className="font-semibold text-gray-800">- Alex K.</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"I've earned over 50 Pi just by playing! The community is amazing and supportive."</p>
                <div className="font-semibold text-gray-800">- Maria L.</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
