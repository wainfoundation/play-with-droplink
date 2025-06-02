
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Heart, Coins, Trophy, Gamepad2, Brain, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import PiDomainShowcase from "@/components/PiDomainShowcase";

const Index = () => {
  const gameFeatures = [
    {
      icon: "🐾",
      title: "Pet Care System",
      description: "Take care of your virtual Droplet companion"
    },
    {
      icon: "🎮",
      title: "50+ Mini Games",
      description: "Puzzle, action, trivia, and creative games"
    },
    {
      icon: "💰",
      title: "Pi Integration",
      description: "Earn rewards and make purchases with Pi"
    },
    {
      icon: "🏆",
      title: "Leaderboards",
      description: "Compete with players worldwide"
    }
  ];

  const games = [
    {
      title: "Play with Droplink",
      description: "Your virtual pet gaming world with 50+ interactive games",
      icon: Gamepad2,
      color: "from-blue-500 to-purple-600",
      features: ["Pet Care", "Mini Games", "Pi Shop", "Leveling"],
      href: "/play",
      isNew: false
    },
    {
      title: "Trivia Time",
      description: "Test your knowledge and earn Pi rewards in this endless trivia game",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      features: ["Endless Questions", "Pi Ads", "Lives System", "Leaderboards"],
      href: "/trivia",
      isNew: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>Play with Droplink - Pi Network Gaming Hub</title>
        <meta name="description" content="Experience the ultimate Pi Network gaming platform with virtual pets, 50+ games, and Pi rewards!" />
      </Helmet>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                  🎮
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Play with Droplink
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Your ultimate <span className="font-semibold text-primary">Pi Network</span> gaming hub featuring virtual pets, endless entertainment, and real Pi rewards!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform text-lg px-8 py-3">
                  <Link to="/play">
                    <Play className="w-5 h-5 mr-2" />
                    Start Playing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg px-8 py-3">
                  <Link to="/trivia">
                    <Brain className="w-5 h-5 mr-2" />
                    Try Trivia Time
                  </Link>
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Games</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">∞</div>
                  <div className="text-sm text-gray-600">Trivia Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Pi Integrated</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Choose Your Gaming Adventure
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience different gaming worlds, each with unique features and Pi Network integration
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {games.map((game, index) => (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                          <game.icon className="w-6 h-6 text-white" />
                        </div>
                        {game.isNew && (
                          <Badge className="bg-green-500 text-white">NEW!</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{game.title}</CardTitle>
                      <CardDescription className="text-base">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {game.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild className="w-full" size="lg">
                          <Link to={game.href}>
                            <Play className="w-4 h-4 mr-2" />
                            Play Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Why Choose Play with Droplink?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built specifically for the Pi Network ecosystem with innovative features and real rewards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gameFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pi Domain Showcase */}
        <PiDomainShowcase />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Ready to Start Your Pi Gaming Journey?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of Pi Network pioneers enjoying games, earning rewards, and building their digital presence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform text-lg px-8 py-3">
                  <Link to="/play">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Gaming Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg px-8 py-3">
                  <Link to="/help">
                    Learn How to Play
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
