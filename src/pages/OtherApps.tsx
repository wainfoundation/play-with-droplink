
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Users, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OtherApps = () => {
  const handleBack = () => {
    window.history.back();
  };

  const apps = [
    {
      id: 'droplink-main',
      name: 'Droplink',
      description: 'The ultimate link-in-bio platform for Pi Network. Create beautiful landing pages, manage multiple links, and monetize your content with Pi cryptocurrency.',
      status: 'Coming Soon',
      category: 'Social & Business',
      features: [
        'Custom link-in-bio pages',
        'Pi cryptocurrency integration',
        'Analytics and insights',
        'Mobile-optimized design',
        'Social media integration'
      ],
      icon: '🔗',
      color: 'from-blue-500 to-purple-600',
      comingSoon: true
    },
    {
      id: 'pi-chat',
      name: 'Pi Chat Pro',
      description: 'Enhanced messaging and community platform built for Pi Network users. Connect, chat, and build communities with advanced features.',
      status: 'In Development',
      category: 'Communication',
      features: [
        'Group messaging',
        'Pi Network integration',
        'File sharing',
        'Voice messages',
        'Community features'
      ],
      icon: '💬',
      color: 'from-green-500 to-blue-500',
      comingSoon: true
    },
    {
      id: 'pi-marketplace',
      name: 'Pi Marketplace',
      description: 'Buy and sell digital products, services, and collectibles using Pi cryptocurrency. A secure marketplace for the Pi community.',
      status: 'Planning',
      category: 'E-commerce',
      features: [
        'Digital product sales',
        'Pi payment processing',
        'Seller analytics',
        'Buyer protection',
        'Community ratings'
      ],
      icon: '🛒',
      color: 'from-yellow-500 to-red-500',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Other Apps - MRWAIN ORGANIZATION</title>
        <meta name="description" content="Discover other amazing apps by MRWAIN ORGANIZATION built for the Pi Network ecosystem." />
      </Helmet>
      
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Game
            </Button>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">MRWAIN ORGANIZATION</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our App Ecosystem</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our growing collection of innovative applications built specifically for the Pi Network community. 
              Each app is designed to enhance your Pi experience and provide unique value.
            </p>
          </div>

          {/* Current App Highlight */}
          <Card className="mb-12 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-2 border-pink-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl">🐾</div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h2 className="text-2xl font-bold">Play with Droplink</h2>
                    <Badge className="bg-green-500">Currently Playing!</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    The pet care gaming platform you're currently enjoying! Take care of your adorable droplet companion, 
                    play mini-games, and earn Pi coins in this delightful gaming experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Pet Care</Badge>
                    <Badge variant="secondary">Mini Games</Badge>
                    <Badge variant="secondary">Pi Rewards</Badge>
                    <Badge variant="secondary">Community</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Apps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <Card key={app.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${app.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{app.icon}</div>
                      <Badge variant="outline" className="text-xs">
                        {app.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs w-fit">
                      {app.category}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {app.description}
                    </p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {app.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        disabled={app.comingSoon}
                      >
                        {app.comingSoon ? (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Notify Me
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Learn More
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Organization Info */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">About MRWAIN ORGANIZATION</h3>
              </div>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We are dedicated to building innovative applications for the Pi Network ecosystem. 
                Our mission is to create tools and experiences that empower Pi Network users and 
                contribute to the growth of the Pi community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-gray-600">Apps in Development</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Pi First</div>
                  <div className="text-gray-600">Built for Pi Network</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-gray-600">Community Focused</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Be the first to know when our new apps launch and get exclusive access to beta features.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Users className="w-4 h-4 mr-2" />
                Join Our Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtherApps;
