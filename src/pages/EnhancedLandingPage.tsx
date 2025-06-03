
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Heart, Coins, Gamepad2, Smartphone, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MascotIcon from '@/components/MascotIcon';
import FeatureCard from '@/components/landing/FeatureCard';
import HowItWorksStep from '@/components/landing/HowItWorksStep';
import FloatingMascot from '@/components/landing/FloatingMascot';
import { dropinkColors } from '@/styles/designSystem';

const EnhancedLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Virtual Pet Care",
      description: "Feed, play, and nurture your unique droplet companion with love and attention.",
      color: "from-pink-400 to-red-500",
      delay: 0.1
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Earn Pi Coins",
      description: "Get rewarded with real Pi cryptocurrency for taking great care of your pet.",
      color: "from-yellow-400 to-orange-500",
      delay: 0.2
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Mini Games",
      description: "Play engaging mini-games to boost your pet's happiness and earn extra rewards.",
      color: "from-green-400 to-blue-500",
      delay: 0.3
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile First",
      description: "Perfectly optimized for mobile devices with smooth touch interactions.",
      color: "from-purple-400 to-pink-500",
      delay: 0.4
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Choose Your Pet",
      description: "Select from various adorable droplet characters, each with unique personalities and traits.",
      icon: <Heart className="h-8 w-8" />,
      color: "from-blue-400 to-cyan-500",
      delay: 0.1
    },
    {
      step: 2,
      title: "Care & Play",
      description: "Feed, clean, and play with your pet to keep them happy and healthy throughout the day.",
      icon: <Gamepad2 className="h-8 w-8" />,
      color: "from-green-400 to-emerald-500",
      delay: 0.2
    },
    {
      step: 3,
      title: "Earn Rewards",
      description: "Receive Pi coins for excellent pet care and use them to buy items, food, and accessories.",
      icon: <Coins className="h-8 w-8" />,
      color: "from-yellow-400 to-orange-500",
      delay: 0.3
    }
  ];

  return (
    <>
      <Helmet>
        <title>Droplink Pet Game - Your Pi-Powered Virtual Companion</title>
        <meta name="description" content="Join the ultimate virtual pet experience powered by Pi Network. Care for your droplet companion and earn real Pi cryptocurrency!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Floating mascots */}
        <FloatingMascot position="top-10 left-10" color={dropinkColors.accent.cyan} delay={0} size={60} />
        <FloatingMascot position="top-20 right-16" color={dropinkColors.accent.pink} delay={1} size={50} />
        <FloatingMascot position="bottom-40 left-8" color={dropinkColors.accent.yellow} delay={2} size={55} />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                Powered by Pi Network
              </Badge>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            >
              Meet Your New
              <br />
              <span className="relative">
                Digital Companion
                <motion.div
                  className="absolute -right-4 -top-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MascotIcon size={60} mood="excited" />
                </motion.div>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Care for adorable droplet pets, play engaging mini-games, and earn real Pi cryptocurrency rewards in the most fun virtual pet experience ever created.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Start Playing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-400 px-8 py-4 text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                <Star className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">10K+</div>
                <div className="text-sm text-gray-600">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">500K+</div>
                <div className="text-sm text-gray-600">Pi Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Droplink Pet?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the perfect blend of entertainment and earning potential with features designed for modern pet lovers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  delay={feature.delay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Getting started with your virtual pet companion is easy and fun!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <HowItWorksStep
                  key={index}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  color={step.color}
                  delay={step.delay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Pet Journey?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of players already earning Pi while having fun with their virtual companions.
              </p>
              
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnhancedLandingPage;
