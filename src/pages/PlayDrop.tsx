
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { isRunningInPiBrowser, initPiNetwork } from '@/utils/pi-sdk';
import PiProductionManager from '@/components/production/PiProductionManager';
import FullScreenPetGame from '@/components/pet/FullScreenPetGame';
import { Play, Shield, Zap, ArrowRight } from 'lucide-react';

const PlayDrop: React.FC = () => {
  const [gameMode, setGameMode] = useState<'dashboard' | 'pet' | 'production'>('dashboard');
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const { user, loading } = useAuthSystem();
  const { toast } = useToast();

  useEffect(() => {
    const checkEnvironment = () => {
      const inPiBrowser = isRunningInPiBrowser();
      setIsPiBrowser(inPiBrowser);
      
      if (inPiBrowser) {
        const initialized = initPiNetwork();
        if (initialized) {
          toast({
            title: "Pi Network Ready",
            description: "All Pi Network features are available",
          });
        }
      }
    };

    checkEnvironment();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (gameMode === 'pet') {
    return <FullScreenPetGame />;
  }

  if (gameMode === 'production') {
    return (
      <>
        <Helmet>
          <title>PlayDrop Production - Pi Network Integration</title>
          <meta name="description" content="Complete Pi Network integration for PlayDrop with authentication, payments, and ads" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button 
                onClick={() => setGameMode('dashboard')}
                variant="outline"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <PiProductionManager />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>PlayDrop - Pi Network Gaming Platform</title>
        <meta name="description" content="Complete Pi Network gaming experience with rewards, payments, and virtual pets" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              PlayDrop Gaming Platform
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Complete Pi Network integration with gaming, rewards, and virtual pets
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant={isPiBrowser ? "default" : "destructive"}>
                {isPiBrowser ? "Pi Browser Ready" : "Pi Browser Required"}
              </Badge>
              {user && (
                <Badge variant="default">
                  Authenticated: {user.email}
                </Badge>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Pet Game Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full cursor-pointer" onClick={() => setGameMode('pet')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="text-2xl">🐾</div>
                    Virtual Pet Game
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Take care of your virtual droplet pet, play mini-games, and earn Pi rewards
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Pi Authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Reward System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Interactive Gameplay</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    Play Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Production Testing Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full cursor-pointer" onClick={() => setGameMode('production')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="text-2xl">⚙️</div>
                    Production Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete Pi Network integration testing suite for production deployment
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Pi SDK Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Payment Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Ad Network Testing</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Test Features <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="text-2xl">📊</div>
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pi Browser</span>
                      <Badge variant={isPiBrowser ? "default" : "destructive"}>
                        {isPiBrowser ? "Ready" : "Required"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Authentication</span>
                      <Badge variant={user ? "default" : "secondary"}>
                        {user ? "Active" : "Required"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pi SDK</span>
                      <Badge variant="default">Loaded</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                  </div>
                  
                  {!isPiBrowser && (
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-700">
                        For full functionality, please open this app in Pi Browser
                      </p>
                    </div>
                  )}
                  
                  {!user && (
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/auth'}>
                        Sign In Required
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <h3 className="font-semibold mb-2">Open in Pi Browser</h3>
                  <p className="text-sm text-gray-600">
                    For full Pi Network integration, use the official Pi Browser app
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <h3 className="font-semibold mb-2">Authenticate</h3>
                  <p className="text-sm text-gray-600">
                    Sign in with your Pi Network account to access all features
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <h3 className="font-semibold mb-2">Start Playing</h3>
                  <p className="text-sm text-gray-600">
                    Play games, earn Pi rewards, and manage your virtual pet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlayDrop;
