
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Gamepad2, Star, Users, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CharacterRenderer from "@/components/welcome/CharacterRenderer";
import { characters } from "@/components/welcome/characterData";
import { useAuth } from "@/hooks/useAuth";
import GoToTop from '@/components/GoToTop';

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const { user } = useAuth();

  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      try {
        const parsedCharacter = JSON.parse(savedCharacter);
        setSelectedCharacter(parsedCharacter);
      } catch (error) {
        console.log('Error parsing saved character, using default');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
                New: My Pet Droplet Game! 🐾
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Pi-Powered Digital Pet Adventure
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Care for your adorable pet droplet, play mini-games, earn Pi coins, and build the ultimate digital companion experience!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link to="/play">
                    <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold">
                      Continue Playing
                      <Gamepad2 className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold">
                      Start Your Adventure
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                
                <Link to="/play">
                  <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                    View Games
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-8 border-4 border-pink-200 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Meet Your Pet Droplet!</h3>
                  <p className="text-gray-600">Cute, lovable, and waiting for your care</p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <CharacterRenderer character={selectedCharacter} size={150} />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-pink-200">
                    <Heart className="w-6 h-6 text-pink-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-pink-700">Pet Care</p>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-blue-200">
                    <Gamepad2 className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-blue-700">Mini Games</p>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-yellow-200">
                    <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-yellow-700">Pi Rewards</p>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-green-200">
                    <Users className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-green-700">Community</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pet Droplet?</h2>
            <p className="text-xl text-gray-600">The most engaging Pi Network pet care game</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Pet Care System",
                description: "Feed, clean, play, and watch your pet grow with realistic care mechanics",
                color: "text-pink-500"
              },
              {
                icon: Gamepad2,
                title: "Mini Games",
                description: "Play engaging mini-games to earn Pi coins and keep your pet entertained",
                color: "text-blue-500"
              },
              {
                icon: Zap,
                title: "Pi Network Integration",
                description: "Earn real Pi coins through gameplay and spend them in the pet shop",
                color: "text-yellow-500"
              },
              {
                icon: Star,
                title: "Level Up System",
                description: "Watch your pet grow, unlock new features, and reach higher levels",
                color: "text-purple-500"
              },
              {
                icon: Users,
                title: "Community Features",
                description: "Share your pet's progress and compete with other Pi Network users",
                color: "text-green-500"
              },
              {
                icon: Sparkles,
                title: "Regular Updates",
                description: "New features, pets, and mini-games added regularly to keep it fresh",
                color: "text-indigo-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Pet Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of Pi Network users already caring for their digital pets
            </p>
            
            {user ? (
              <Link to="/play">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold">
                  Continue Playing
                  <Gamepad2 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold">
                  Login with Pi Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <GoToTop />
    </div>
  );
};

export default Index;
