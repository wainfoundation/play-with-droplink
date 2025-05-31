
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
        <title>Droplink | Drop All Your Links - Play with My Boo</title>
        <meta name="description" content="Meet My Boo! Your adorable virtual pet companion. Play games, customize, and watch your Boo grow happy in the Pi Network ecosystem." />
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
                Meet My Boo! 🎮
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                Your Adorable Virtual Pet
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Take care of your cute Boo, play mini-games, customize their style, and watch them grow happy! 
                All powered by Pi Network.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl border-4 border-white">
                <Link to="/play" className="flex items-center gap-2">
                  <Play className="w-6 h-6" />
                  Start Playing Now!
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg rounded-2xl border-2">
                <Link to="/welcome" className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Take the Tour
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Makes My Boo Special?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-cyan-100 to-blue-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <CardTitle className="text-xl">Mini-Games Galore</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Play Boo Climb, Piano Boo, Bubble Pop, and many more exciting mini-games to earn coins and keep your Boo entertained!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-pink-100 to-purple-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">👕</div>
                <CardTitle className="text-xl">Style & Customize</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Dress up your Boo with cool accessories, hair styles, and clothes. Visit the daily shop for special deals!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-green-100 to-yellow-100 border-4 border-white shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <CardTitle className="text-xl">Earn & Spend Coins</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  Take care of your Boo by feeding, playing, and cleaning to earn coins. Use them to unlock new items and games!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl p-8 text-center text-white border-4 border-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Join the Boo Community!</h3>
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
                  12
                </div>
                <p className="text-sm opacity-90">Mini-Games</p>
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
            <h3 className="text-3xl font-bold text-gray-800">Ready to Meet Your Boo?</h3>
            <p className="text-lg text-gray-600">Your virtual pet is waiting for you!</p>
            
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-3xl shadow-2xl border-4 border-white animate-pulse">
              <Link to="/play" className="flex items-center gap-3">
                <span className="text-2xl">😊</span>
                Enter My Boo World
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
