
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Heart, 
  Gamepad2, 
  Coins, 
  Sparkles, 
  Home,
  Bath,
  ChefHat,
  TreePine,
  Stethoscope,
  Palette,
  ArrowRight,
  Star,
  Users,
  Gift,
  PlayCircle,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingMascot from '@/components/landing/FloatingMascot';
import FeatureCard from '@/components/landing/FeatureCard';
import HowItWorksStep from '@/components/landing/HowItWorksStep';
import ScreenshotCarousel from '@/components/landing/ScreenshotCarousel';
import CoinPackCard from '@/components/landing/CoinPackCard';
import TestimonialCarousel from '@/components/landing/TestimonialCarousel';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Custom Pet",
      description: "Choose and customize your unique droplet companion",
      color: "from-pink-200 to-red-200"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Interactive Rooms",
      description: "Bedroom, kitchen, bathroom, nature, and more!",
      color: "from-blue-200 to-indigo-200"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Real-Time Moods",
      description: "Watch your pet react and express emotions",
      color: "from-purple-200 to-pink-200"
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Earn Pi Rewards",
      description: "Real Pi payments for caring for your pet",
      color: "from-yellow-200 to-orange-200"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Mini-Games",
      description: "Play fun games to earn coins and bonuses",
      color: "from-green-200 to-teal-200"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Collectible Themes",
      description: "Unlock skins, rooms, and decorations",
      color: "from-indigo-200 to-purple-200"
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Pick Your Pet",
      description: "Choose from adorable droplet characters with unique personalities",
      icon: <Heart className="h-12 w-12" />,
      color: "from-pink-300 to-red-300"
    },
    {
      step: 2,
      title: "Care Daily",
      description: "Feed, clean, play with your pet to keep them happy and healthy",
      icon: <Sparkles className="h-12 w-12" />,
      color: "from-blue-300 to-indigo-300"
    },
    {
      step: 3,
      title: "Earn & Evolve",
      description: "Collect coins, unlock features, and earn real Pi rewards",
      icon: <Coins className="h-12 w-12" />,
      color: "from-yellow-300 to-orange-300"
    }
  ];

  const coinPacks = [
    {
      name: "Starter Pack",
      piCost: 1,
      coins: 10,
      bonus: 0,
      popular: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Best Value",
      piCost: 12,
      coins: 150,
      bonus: 25,
      popular: true,
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Mega Bundle",
      piCost: 50,
      coins: 750,
      bonus: 50,
      popular: false,
      color: "from-yellow-400 to-orange-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Droplet Pet - Adopt. Care. Earn. | Virtual Pet Game with Pi Rewards</title>
        <meta name="description" content="Feed, play, and evolve your AI pet with real Pi rewards. Join the cutest virtual pet game on Pi Network!" />
        <meta name="keywords" content="virtual pet, pi network, droplet pet, earn pi, pet game, blockchain gaming" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Floating Mascots */}
          <FloatingMascot 
            position="top-20 left-20" 
            color="#3B82F6" 
            delay={0}
            size={80}
          />
          <FloatingMascot 
            position="top-32 right-32" 
            color="#EC4899" 
            delay={2}
            size={60}
          />
          <FloatingMascot 
            position="bottom-20 left-32" 
            color="#10B981" 
            delay={4}
            size={70}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Adopt. Care. Earn.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Feed, play, and evolve your AI pet with real Pi rewards. 
                The cutest way to earn in the Pi ecosystem!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  onClick={() => navigate('/play')}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Start Playing
                </Button>
                
                <Button 
                  onClick={() => scrollToSection('how-it-works')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
                >
                  <PlayCircle className="mr-2 h-6 w-6" />
                  See How It Works
                </Button>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => scrollToSection('features')}
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 animate-bounce"
                >
                  <ChevronDown className="h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Amazing Features
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need for the perfect virtual pet experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  {...feature} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start your pet journey in just 3 simple steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <HowItWorksStep 
                  key={index} 
                  {...step} 
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  See It In Action
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore rooms, feed your pet, and watch them grow
              </p>
            </motion.div>

            <ScreenshotCarousel />
          </div>
        </section>

        {/* Pi Rewards Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Earn Real Pi Rewards
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Get rewarded for taking care of your virtual pet
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {coinPacks.map((pack, index) => (
                <CoinPackCard 
                  key={index} 
                  {...pack} 
                  delay={index * 0.1}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Card className="inline-block bg-gradient-to-r from-green-100 to-teal-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Gift className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-semibold text-green-800">Bonus Rewards</span>
                  </div>
                  <p className="text-green-700">
                    Watch ads = +1 coin • Daily care = bonus Pi • Level up = special rewards
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  What Players Say
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of happy pet owners in the Pi ecosystem
              </p>
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Start?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the cutest way to earn Pi rewards. Your virtual pet is waiting!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/play')}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 text-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Adopt Your Pet Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Free to start • No credit card required • Pi rewards guaranteed
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <LandingFooter />

        {/* Sticky CTA Button for Mobile */}
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <Button 
            onClick={() => navigate('/play')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-4 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
