
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  UserIcon,
  CompassIcon,
  ListIcon,
  PlayIcon,
  AwardIcon,
  BookIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CircleDollarSignIcon,
  Gamepad2,
  Crown,
  Zap,
  Star,
  Trophy,
  Users,
  Gift,
  ShoppingBag,
  Calendar,
  Target,
  Sparkles,
  Shield,
  Unlock,
  Coins
} from 'lucide-react';

const GameWorkflow = () => {
  const codeSnippets = {
    premiumSubscription: `Pi.createPayment({
  amount: 10,
  memo: "Droplink Premium Game Pass",
  metadata: { type: "subscription" }
});`,
    gameUnlock: `Pi.createPayment({
  amount: 0.75,
  memo: "Unlock: Puzzle Builder Pro",
  metadata: { type: "game_purchase", gameId: "puzzle_builder" }
});`
  };

  const gameCategories = [
    { name: "Puzzle & Logic", icon: "🧩", games: 15, color: "bg-blue-500" },
    { name: "Action & Reflex", icon: "⚡", games: 12, color: "bg-red-500" },
    { name: "Trivia & Quiz", icon: "🧠", games: 18, color: "bg-green-500" },
    { name: "Creative & Fun", icon: "🎨", games: 10, color: "bg-purple-500" },
    { name: "Infinite Games", icon: "♾️", games: 8, color: "bg-orange-500" }
  ];

  const features = [
    { title: "50+ Games", desc: "Diverse game library", icon: Gamepad2 },
    { title: "Pi Payments", desc: "Seamless crypto transactions", icon: Coins },
    { title: "Ad-Free Premium", desc: "Uninterrupted gaming", icon: Crown },
    { title: "Daily Rewards", desc: "Earn Pi through gameplay", icon: Gift }
  ];

  return (
    <>
      <Helmet>
        <title>🎮 Play with Droplink – App Workflow | Gaming on Pi Network</title>
        <meta name="description" content="Complete workflow guide for Droplink gaming platform on Pi Network. Learn about authentication, game categories, monetization, and premium features." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                🎮 Play with Droplink
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Complete App Workflow on Pi Network
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <feature.icon className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-8 rounded-full text-lg">
                <PlayIcon className="w-5 h-5 mr-2" />
                Start Playing Now
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Section 1: User Login */}
          <Card className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">👤 User Login</CardTitle>
                  <CardDescription className="text-gray-400">Pi Authentication & Profile Management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <Shield className="w-8 h-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Pi Authentication</h4>
                  <p className="text-sm text-gray-400">Secure login using Pi Network credentials</p>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <UserIcon className="w-8 h-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Profile Creation</h4>
                  <p className="text-sm text-gray-400">Automatic profile setup or fetch existing data</p>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <Crown className="w-8 h-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Access Level Check</h4>
                  <p className="text-sm text-gray-400">Verify Free / Premium / Paid game access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Home Dashboard */}
          <Card className="bg-gray-900/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <CompassIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🧭 Home Dashboard</CardTitle>
                  <CardDescription className="text-gray-400">Your Gaming Command Center</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-lg">
                    <Star className="w-8 h-8 text-white mb-2" />
                    <h4 className="font-bold text-white mb-2">Featured Game of the Day</h4>
                    <p className="text-sm text-yellow-100">Special bonuses and rewards for daily featured games</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col gap-2 border-green-500/50 hover:bg-green-500/20">
                    <Gamepad2 className="w-5 h-5" />
                    <span className="text-xs">Free Games</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 border-purple-500/50 hover:bg-purple-500/20">
                    <Crown className="w-5 h-5" />
                    <span className="text-xs">Premium</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 border-orange-500/50 hover:bg-orange-500/20">
                    <Coins className="w-5 h-5" />
                    <span className="text-xs">Paid Games</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 border-yellow-500/50 hover:bg-yellow-500/20">
                    <Trophy className="w-5 h-5" />
                    <span className="text-xs">Leaderboards</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Game Categories */}
          <Card className="bg-gray-900/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <ListIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🎲 Game Categories</CardTitle>
                  <CardDescription className="text-gray-400">Diverse Gaming Experiences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {gameCategories.map((category, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h4 className="font-semibold text-white text-sm mb-1">{category.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {category.games} Games
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-white">Access Levels:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-600">🆓 Free - Basic games with ads</Badge>
                  <Badge className="bg-purple-600">👑 Premium - All games, no ads</Badge>
                  <Badge className="bg-orange-600">💰 Paid - Special premium games</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Game Play Flow */}
          <Card className="bg-gray-900/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <PlayIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🎮 Game Play Flow</CardTitle>
                  <CardDescription className="text-gray-400">Seamless Gaming Experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-green-400 mb-2">🆓 Free Users</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Pi AdNetwork ads between stages</li>
                      <li>• Limited game access</li>
                      <li>• Basic leaderboard features</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-400 mb-2">👑 Premium Users</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Ad-free gaming experience</li>
                      <li>• All levels unlocked</li>
                      <li>• Premium badge & features</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                    <h4 className="font-semibold text-orange-400 mb-2">💰 Paid Games</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• One-time Pi payment</li>
                      <li>• Exclusive game content</li>
                      <li>• Special rewards & bonuses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Monetization */}
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <CircleDollarSignIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">💳 Monetization</CardTitle>
                  <CardDescription className="text-gray-400">Pi Network Payment Integration</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="font-bold text-white">Premium Subscription</h4>
                      <p className="text-purple-400 font-semibold">10 Pi/month</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2 mb-4">
                    <li>✅ Unlock all games</li>
                    <li>✅ All stages available</li>
                    <li>✅ No ads</li>
                    <li>✅ Premium badge</li>
                    <li>✅ Exclusive leaderboards</li>
                  </ul>
                  <div className="bg-gray-800 p-3 rounded text-xs font-mono text-green-400 overflow-x-auto">
                    <pre>{codeSnippets.premiumSubscription}</pre>
                  </div>
                </div>

                <div className="bg-orange-900/30 p-6 rounded-lg border border-orange-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Unlock className="w-8 h-8 text-orange-400" />
                    <div>
                      <h4 className="font-bold text-white">Paid Games</h4>
                      <p className="text-orange-400 font-semibold">0.5 - 2 Pi each</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2 mb-4">
                    <li>🎮 Puzzle Builder Pro - 0.75 Pi</li>
                    <li>🚀 Space Adventure DX - 1.5 Pi</li>
                    <li>🧠 Brain Master Elite - 1 Pi</li>
                    <li>🎨 Creative Studio - 2 Pi</li>
                  </ul>
                  <div className="bg-gray-800 p-3 rounded text-xs font-mono text-green-400 overflow-x-auto">
                    <pre>{codeSnippets.gameUnlock}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Leaderboards */}
          <Card className="bg-gray-900/50 border-red-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <AwardIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🧾 Leaderboards</CardTitle>
                  <CardDescription className="text-gray-400">Compete & Earn Rewards</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-900/30 p-4 rounded-lg">
                  <Calendar className="w-8 h-8 text-yellow-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Daily Rankings</h4>
                  <p className="text-sm text-gray-400">Reset every 24 hours, fresh competition daily</p>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <TrendingUpIcon className="w-8 h-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">All-Time Leaders</h4>
                  <p className="text-sm text-gray-400">Lifetime achievements and high scores</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <Crown className="w-8 h-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Premium Only</h4>
                  <p className="text-sm text-gray-400">Exclusive competitions with Pi rewards</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: User Profile */}
          <Card className="bg-gray-900/50 border-indigo-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <BookIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">📚 User Profile</CardTitle>
                  <CardDescription className="text-gray-400">Manage Your Gaming Journey</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Account Overview</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Subscription status & expiry</li>
                      <li>• Total games played</li>
                      <li>• Achievement badges</li>
                      <li>• Pi transaction history</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Game Library</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Unlocked games list</li>
                      <li>• Purchase history</li>
                      <li>• Favorite games</li>
                      <li>• Progress tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Pi AdNetwork */}
          <Card className="bg-gray-900/50 border-teal-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🔁 Pi AdNetwork System</CardTitle>
                  <CardDescription className="text-gray-400">Monetization for Free Users</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-teal-900/30 p-6 rounded-lg">
                <p className="text-white mb-4">
                  <strong>Strategic Ad Placement:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• After completing game rounds</li>
                    <li>• Before accessing leaderboards</li>
                    <li>• During natural game breaks</li>
                    <li>• Optional reward ads for bonuses</li>
                  </ul>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-xs text-gray-400 mb-2">Ad Integration:</p>
                    <code className="text-green-400 text-xs">
                      Pi.showAd("interstitial")<br/>
                      Pi.showRewardedAd()
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Optional Features */}
          <Card className="bg-gray-900/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-600 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">🚀 Optional Features</CardTitle>
                  <CardDescription className="text-gray-400">Enhanced Gaming Experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-900/30 p-4 rounded-lg">
                  <Target className="w-8 h-8 text-pink-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Daily Challenges</h4>
                  <p className="text-sm text-gray-400">Special tasks with Pi rewards and exclusive badges</p>
                </div>
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <ShoppingBag className="w-8 h-8 text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Cosmetic Store</h4>
                  <p className="text-sm text-gray-400">Buy avatar items, themes, and effects with Pi</p>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <Users className="w-8 h-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Friend System</h4>
                  <p className="text-sm text-gray-400">Add friends, private competitions, and team challenges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Gaming?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of players on the Pi Network's premier gaming platform. 
              Earn Pi, compete with friends, and unlock amazing games!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full">
                <PlayIcon className="w-5 h-5 mr-2" />
                Play Free Games
              </Button>
              <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold py-3 px-8 rounded-full">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWorkflow;
