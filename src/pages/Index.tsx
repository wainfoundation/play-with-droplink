
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Gamepad2, Users, Trophy, Star, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Play with Droplink - Your Pi Network Gaming Hub</title>
        <meta name="description" content="Experience the joy of gaming and pet care in the Pi Network ecosystem. Play games, earn Pi coins, and take care of your adorable pet droplet!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Play with Droplink
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your ultimate Pi Network gaming hub! Care for virtual pets, play exciting games, and earn Pi coins while having fun.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/my-pet-droplet">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  🐾 My Pet Droplet
                </Button>
              </Link>
              <Link to="/play">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  🎮 More Games
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Featured Games */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Featured Games
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* My Pet Droplet Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardHeader>
                  <div className="text-6xl text-center mb-4">💧</div>
                  <CardTitle className="text-center text-cyan-600">My Pet Droplet</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Raise and bond with your very own Droplet! Feed, play, and watch it grow through different life stages.
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">Virtual Pet</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">Pi Rewards</Badge>
                  </div>
                  <Link to="/my-pet-droplet">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      Start Caring
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pet Care Game Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <div className="text-6xl text-center mb-4">🐣</div>
                  <CardTitle className="text-center text-green-600">Pet Care Adventures</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Advanced pet simulation with character progression, room decoration, and social features.
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Simulation</Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">Multiplayer</Badge>
                  </div>
                  <Link to="/play">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trivia Time Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <div className="text-6xl text-center mb-4">🧠</div>
                  <CardTitle className="text-center text-purple-600">Trivia Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Test your knowledge with endless trivia questions and climb the leaderboard!
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">Quiz</Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Brain Training</Badge>
                  </div>
                  <Link to="/trivia">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                      Start Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Droplink?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pet Care</h3>
              <p className="text-gray-600">Nurture virtual pets with love and watch them grow</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mini Games</h3>
              <p className="text-gray-600">Enjoy variety of fun games with your pets</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pi Rewards</h3>
              <p className="text-gray-600">Earn Pi coins while playing and having fun</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Social Play</h3>
              <p className="text-gray-600">Connect with friends and share your progress</p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of players in the Droplink universe. Your virtual pet is waiting for you!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/my-pet-droplet">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  🐾 Start with Pet Droplet
                </Button>
              </Link>
              <Link to="/trivia">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  🧠 Try Trivia Challenge
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Index;
