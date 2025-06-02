import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Users, Trophy, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PetCareGame from "@/components/games/PetCareGame";
import NewPetCareGame from "@/components/games/NewPetCareGame";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame === 'pet-care') {
    return <PetCareGame onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'new-pet-care') {
    return <NewPetCareGame onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">🎮 Infinite Games Hub</h1>
            <p className="text-gray-600">Play, earn Pi coins, and have fun!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Updated Pet Care Game */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Heart className="w-8 h-8 text-pink-500" />
                  <div className="flex gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
                <CardTitle className="text-pink-700">🏠 Pet Care Center</CardTitle>
                <CardDescription>
                  Complete pet care system with characters, rooms, and economy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🛍️</span>
                    <span>Character shop with coins</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🏠</span>
                    <span>Multiple rooms & activities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💰</span>
                    <span>Earn coins through care</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-pink-500 hover:bg-pink-600"
                  onClick={() => setSelectedGame('new-pet-care')}
                >
                  Enter Pet Center
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legacy Pet Care for comparison */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Heart className="w-8 h-8 text-blue-500" />
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Legacy</div>
                </div>
                <CardTitle className="text-blue-700">🐾 Virtual Pet (Classic)</CardTitle>
                <CardDescription>
                  Original pet care system with basic features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedGame('pet-care')}
                >
                  Play Classic Version
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Games;
