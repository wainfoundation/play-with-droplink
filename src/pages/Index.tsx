import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Gamepad2, Star, Users, Zap, Sparkles, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmotionalCharacterRenderer from "@/components/welcome/EmotionalCharacterRenderer";
import { characters } from "@/components/welcome/characterData";
import GoToTop from '@/components/GoToTop';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const { moodState } = usePetMoodEngine(selectedCharacter.id);

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

  const handleCharacterSelect = (character: any) => {
    setSelectedCharacter(character);
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    setShowCharacterSelector(false);
  };

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
                New: Real-Time Emotional Pet System! 🧠💖
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Living Virtual Soul
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Care for your emotional pet droplet that reacts in real-time! Watch their mood change based on your care, time of day, and personal needs. Every character is a living virtual companion with unique emotions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/play">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold">
                    Start Caring For Your Pet
                    <Heart className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/welcome">
                  <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                    Choose Your Character
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
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">Meet {selectedCharacter.name}!</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCharacterSelector(true)}
                      className="h-8 w-8 p-0"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600">Your living emotional companion</p>
                  
                  {/* Real-time mood indicator */}
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-white/60">
                      Current Mood: {
                        moodState.happiness > 80 ? '😊 Very Happy' :
                        moodState.happiness > 60 ? '😐 Content' :
                        moodState.happiness > 40 ? '😕 Sad' :
                        '😢 Needs Care'
                      }
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <EmotionalCharacterRenderer 
                    character={selectedCharacter} 
                    moodState={moodState}
                    size={150} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-pink-200">
                    <Heart className="w-6 h-6 text-pink-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-pink-700">Real-Time Care</p>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(moodState.affection)}% Loved
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-blue-200">
                    <Gamepad2 className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-blue-700">Energy</p>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(moodState.energy)}% Active
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-yellow-200">
                    <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-yellow-700">Happiness</p>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(moodState.happiness)}% Happy
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center border-2 border-green-200">
                    <Users className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-green-700">Health</p>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(moodState.health)}% Healthy
                    </div>
                  </div>
                </div>

                {/* Urgent care alerts */}
                {(moodState.hunger < 30 || moodState.cleanliness < 30 || moodState.health < 50) && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mt-4 bg-red-100 border-2 border-red-300 rounded-lg p-3 text-center"
                  >
                    <p className="text-red-700 font-semibold text-sm">
                      🚨 {selectedCharacter.name} needs urgent care!
                    </p>
                    <Link to="/play">
                      <Button size="sm" className="mt-2 bg-red-500 hover:bg-red-600">
                        Care For Pet Now
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Character Selector Modal */}
      <AnimatePresence>
        {showCharacterSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCharacterSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-6">Choose Your Emotional Companion</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() => handleCharacterSelect(character)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedCharacter.id === character.id
                        ? 'bg-primary/10 border-4 border-primary shadow-lg scale-105'
                        : 'bg-gray-50 border-2 border-gray-200 hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <EmotionalCharacterRenderer character={character} moodState={moodState} size={80} />
                      <h3 className="font-semibold text-sm mt-2">{character.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs mt-1 ${
                        character.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {character.gender}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button onClick={() => setShowCharacterSelector(false)}>
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionary Emotional Pet System</h2>
            <p className="text-xl text-gray-600">Real-time emotions that respond to time, care, and interaction</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Real-Time Emotions",
                description: "Watch your pet's mood change based on care, time of day, and personal needs",
                color: "text-pink-500"
              },
              {
                icon: Gamepad2,
                title: "Time-Based Needs",
                description: "Pets get hungry, tired, and dirty based on real-world time passage",
                color: "text-blue-500"
              },
              {
                icon: Zap,
                title: "Dynamic Reactions",
                description: "Each character reacts differently to care and neglect with unique personalities",
                color: "text-yellow-500"
              },
              {
                icon: Star,
                title: "Personality System",
                description: "Every pet has unique sleep schedules, favorite activities, and emotional patterns",
                color: "text-purple-500"
              },
              {
                icon: Users,
                title: "Character Variety",
                description: "Multiple unique droplet characters with distinct emotional traits and needs",
                color: "text-green-500"
              },
              {
                icon: Sparkles,
                title: "Living Companion",
                description: "Your pet lives and grows even when you're away, creating genuine emotional bonds",
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
              Ready to Meet Your Living Virtual Soul?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the most advanced emotional pet system ever created!
            </p>
            
            <Link to="/play">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold">
                Start Your Emotional Journey
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <GoToTop />
    </div>
  );
};

export default Index;
