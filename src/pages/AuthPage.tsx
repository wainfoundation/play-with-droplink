
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Shield, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { PiAuthButton } from '@/components/auth/PiAuthButton';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import PiBrowserRedirect from '@/components/auth/PiBrowserRedirect';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthSystem();
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    const checkBrowser = () => {
      const inPiBrowser = isRunningInPiBrowser();
      setIsPiBrowser(inPiBrowser);
      if (inPiBrowser) {
        setShowAuthForm(true);
      }
    };
    
    checkBrowser();
  }, []);

  useEffect(() => {
    if (user && !loading) {
      navigate('/play');
    }
  }, [user, loading, navigate]);

  const handleContinueAnyway = () => {
    setShowAuthForm(true);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login - PlayDrop Pi Network Game</title>
        <meta name="description" content="Login with Pi Network to start your gaming adventure!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <Button
              variant="ghost"
              onClick={handleBackHome}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <CharacterRenderer character={characters[0]} size={80} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to PlayDrop!</h1>
            <p className="text-gray-600">
              {showAuthForm 
                ? "Sign in with Pi Network to start your gaming adventure"
                : "Please use Pi Browser to access all features"
              }
            </p>
          </motion.div>

          {!isPiBrowser && !showAuthForm ? (
            <PiBrowserRedirect 
              onContinue={handleContinueAnyway}
              showContinueOption={true}
            />
          ) : (
            /* Login Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none bg-white/80 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Start Your Adventure
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    Connect with Pi Network to start playing and earning rewards
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-3 text-center border-2 border-pink-200">
                      <Heart className="w-6 h-6 text-pink-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-pink-700">Pet Care</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-3 text-center border-2 border-blue-200">
                      <Sparkles className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-blue-700">Mini Games</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-3 text-center border-2 border-yellow-200">
                      <Shield className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-yellow-700">Pi Rewards</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-3 text-center border-2 border-green-200">
                      <Users className="w-6 h-6 text-green-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-green-700">Community</p>
                    </div>
                  </div>

                  {/* Pi Auth Button */}
                  <div className="space-y-4">
                    <PiAuthButton />
                    
                    <div className="text-center">
                      <Badge variant="outline" className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-yellow-800">
                        <span className="text-xs">Secure Pi Network Login</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-600">
                      🎮 Play games and earn Pi rewards
                    </p>
                    <p className="text-xs text-gray-600">
                      🐾 Take care of your virtual pet droplet
                    </p>
                    <p className="text-xs text-gray-600">
                      🏪 Shop for upgrades and accessories
                    </p>
                  </div>

                  {!isPiBrowser && (
                    <div className="text-center">
                      <p className="text-xs text-orange-600">
                        Note: Some features may be limited outside Pi Browser
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-500">
              Join the Pi Network gaming community
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
