
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Shield, FileText, Search, Heart, Gamepad2, Coins, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    window.history.back();
  };

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Gamepad2,
      color: 'bg-blue-500',
      articles: [
        {
          title: 'How to Start Playing',
          description: 'Learn the basics of caring for your pet droplet',
          popular: true
        },
        {
          title: 'Character Selection Guide',
          description: 'Choose the perfect droplet companion for your adventure'
        },
        {
          title: 'First Time Setup',
          description: 'Complete tutorial and initial pet care steps'
        }
      ]
    },
    {
      id: 'pet-care',
      title: 'Pet Care',
      icon: Heart,
      color: 'bg-pink-500',
      articles: [
        {
          title: 'Feeding Your Pet',
          description: 'Keep your droplet happy and healthy with proper nutrition',
          popular: true
        },
        {
          title: 'Cleaning and Hygiene',
          description: 'Maintain your pet\'s cleanliness for optimal happiness'
        },
        {
          title: 'Playing and Exercise',
          description: 'Fun activities to keep your pet entertained'
        },
        {
          title: 'Pet Leveling System',
          description: 'How your pet grows and unlocks new features'
        }
      ]
    },
    {
      id: 'mini-games',
      title: 'Mini Games',
      icon: Gamepad2,
      color: 'bg-purple-500',
      articles: [
        {
          title: 'Available Games',
          description: 'Explore all the fun mini-games you can play'
        },
        {
          title: 'Scoring and Rewards',
          description: 'How to earn points and unlock achievements'
        },
        {
          title: 'Game Controls',
          description: 'Master the controls for each mini-game'
        }
      ]
    },
    {
      id: 'pi-integration',
      title: 'Pi Network Features',
      icon: Coins,
      color: 'bg-yellow-500',
      articles: [
        {
          title: 'Earning Pi Coins',
          description: 'Ways to earn Pi through gameplay and activities',
          popular: true
        },
        {
          title: 'Pi Shop',
          description: 'Spend your Pi coins on pet items and upgrades'
        },
        {
          title: 'Pi Browser Setup',
          description: 'How to access the game through Pi Browser'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: Settings,
      color: 'bg-red-500',
      articles: [
        {
          title: 'Login Issues',
          description: 'Resolve problems with Pi Network authentication'
        },
        {
          title: 'Game Performance',
          description: 'Fix lag, loading, and performance issues'
        },
        {
          title: 'Save Data Problems',
          description: 'Recover lost progress or pet data'
        },
        {
          title: 'Pi Browser Issues',
          description: 'Common Pi Browser compatibility problems'
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Help & Support - Play with Droplink</title>
        <meta name="description" content="Get help and support for Play with Droplink pet care gaming platform." />
      </Helmet>
      
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Game
            </Button>
            <nav className="flex items-center gap-6">
              <Link 
                to="/help" 
                className="flex items-center gap-2 text-primary font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
            <p className="text-xl text-gray-600">Everything you need to know about Play with Droplink</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Help Categories */}
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {category.articles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{article.title}</h3>
                            {article.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{article.description}</p>
                        </div>
                        <div className="text-gray-400">
                          <ArrowLeft className="h-4 w-4 rotate-180" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Tips */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Quick Tips for New Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-700">
                <li>• Feed your pet regularly to keep happiness levels high</li>
                <li>• Play mini-games daily to earn Pi coins and rewards</li>
                <li>• Clean your pet when the cleanliness bar gets low</li>
                <li>• Check the shop for new items and upgrades</li>
                <li>• Use Pi Browser for the best gaming experience</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Still Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Contact our support team through the Pi Network messaging system.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
