
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Heart, Star, Users, ArrowRight, Sparkles, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Droplet Pet - Virtual Pet Care Game</title>
        <meta name="description" content="Care for your virtual droplet pet! Feed, play, and nurture your digital companion in this engaging pet simulation game." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Main mascot */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-8xl md:text-9xl mb-4"
                >
                  💧
                </motion.div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * 15}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-6">
                <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Your Virtual Pet Adventure Awaits
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  Meet Your New
                  <br />
                  Digital Companion
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Care for your adorable droplet pet! Feed them, play together, 
                  and watch them grow in this heartwarming virtual pet experience.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
                >
                  <Link to="/welcome">
                    <PlayCircle className="mr-2 h-6 w-6" />
                    Start Playing
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/20 hover:border-primary/40 text-lg px-8 py-4"
                >
                  <Link to="/auth">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">❤️</div>
                  <CardTitle>Care & Nurture</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Feed your pet, keep them clean, and make sure they're happy and healthy
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">🎮</div>
                  <CardTitle>Interactive Play</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Explore different rooms, play mini-games, and discover new activities together
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <CardTitle>Customize</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Choose your pet's appearance, decorate their space, and unlock new themes
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Watch Your Pet Thrive</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🍎</div>
                  <div className="font-semibold">Hunger</div>
                  <div className="text-sm text-gray-600">Keep them fed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-semibold">Energy</div>
                  <div className="text-sm text-gray-600">Rest & play balance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">😊</div>
                  <div className="font-semibold">Happiness</div>
                  <div className="text-sm text-gray-600">Joy & contentment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛁</div>
                  <div className="font-semibold">Cleanliness</div>
                  <div className="text-sm text-gray-600">Stay fresh & clean</div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-16 text-center"
            >
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of pet lovers already caring for their droplets
              </p>
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200"
              >
                <Link to="/welcome">
                  <Gift className="mr-2 h-5 w-5" />
                  Get Your Pet Now - It's Free!
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
