
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Helmet } from 'react-helmet-async';
import { PiAuthButton } from '@/components/auth/PiAuthButton';
import { useUser } from '@/context/UserContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoggedIn && user) {
      // Check if user has completed setup
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      const petSetupCompleted = localStorage.getItem('petSetupCompleted');
      
      if (welcomeCompleted === 'true' && petSetupCompleted === 'true') {
        navigate('/play');
      } else {
        navigate('/welcome');
      }
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - Droplet Pet</title>
        <meta name="description" content="Sign in to your Droplet Pet account with Pi Network" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4">💧</div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Welcome to Droplet Pet
              </CardTitle>
              <p className="text-gray-600">
                Connect with Pi Network to start your pet care journey
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <PiAuthButton />
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-gray-500 hover:text-gray-700 text-sm underline"
                >
                  ← Back to Home
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
