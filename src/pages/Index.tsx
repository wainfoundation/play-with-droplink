import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Play, Star, Users, Trophy, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Droplink | Create Your Character - Virtual Pet Adventure</title>
        <meta name="description" content="Create and care for your virtual character! Feed, play, customize, and explore different rooms in your own virtual world." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-pink-100">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-8">
            {/* Main Character Display */}
            <div className="relative">
              <div className="text-8xl animate-bounce">😊</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-pulse">❤️</div>
              <div className="absolute -bottom-2 -left-2 text-2xl animate-spin-slow">✨</div>
            </div>

            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg px-6 py-2">
                Create Your Character! 🎮
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                Your Virtual Character Adventure
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create, customize, and care for your unique character! Feed them, play games, decorate rooms, and watch them grow happy in your personalized virtual world.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl border-4 border-white">
                <Link to="/character" className="flex items-center gap-2">
                  <Play className="w-6 h-6" />
                  Start Your Adventure!
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg rounded-2xl border-2">
                <Link to="/welcome" className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Create Character
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Makes Your Character Special?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-cyan-100 to-blue-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <CardTitle className="text-xl">Multiple Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Explore bedroom, kitchen, bathroom, garden and more! Each room offers unique activities and interactions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-pink-100 to-purple-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">👕</div>
                <CardTitle className="text-xl">Customize Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Change colors, add accessories, buy new items from the shop, and make your character truly unique!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-green-100 to-yellow-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <CardTitle className="text-xl">Fun Mini-Games</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Play bubble pop, memory match, puzzles and more to earn coins and keep your character entertained!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl p-8 text-center text-white border-4 border-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Join the Character Community!</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Users className="w-8 h-8" />
                  1K+
                </div>
                <p className="text-sm opacity-90">Happy Players</p>
              </div>
              <div>
                <div className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Trophy className="w-8 h-8" />
                  5
                </div>
                <p className="text-sm opacity-90">Unique Rooms</p>
              </div>
              <div>
                <div className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Star className="w-8 h-8" />
                  4.9
                </div>
                <p className="text-sm opacity-90">Player Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Ready to Create Your Character?</h3>
            <p className="text-lg text-gray-600">Your virtual companion is waiting for you!</p>
            
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-3xl shadow-2xl border-4 border-white animate-pulse">
              <Link to="/welcome" className="flex items-center gap-3">
                <span className="text-2xl">😊</span>
                Create Your Character
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
