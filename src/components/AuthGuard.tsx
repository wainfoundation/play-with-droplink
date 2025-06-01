
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle, ExternalLink, Code } from 'lucide-react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import PiBrowserRedirect from '@/components/auth/PiBrowserRedirect';
import { PiAuthButton } from '@/components/auth/PiAuthButton';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const { user, loading } = useAuth();
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [devBypass, setDevBypass] = useState(false);

  useEffect(() => {
    setIsPiBrowser(isRunningInPiBrowser());
    // Check for development bypass
    const hasDevBypass = localStorage.getItem('devBypass') === 'true';
    setDevBypass(hasDevBypass);
  }, []);

  // Show loading state
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

  // If auth is not required, just render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Development bypass
  if (devBypass && process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  // If user is authenticated, render children
  if (user) {
    return <>{children}</>;
  }

  // Development bypass option
  const handleDevBypass = () => {
    localStorage.setItem('devBypass', 'true');
    setDevBypass(true);
  };

  // If not in Pi Browser, show redirect prompt
  if (!isPiBrowser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <CharacterRenderer character={characters[0]} size={80} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Play with Droplink!</h1>
            <p className="text-gray-600">Pi Browser required to continue</p>
          </motion.div>
          
          <PiBrowserRedirect 
            onContinue={() => {}} 
            showContinueOption={false}
          />

          {/* Development bypass */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <Button
                onClick={handleDevBypass}
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                <Code className="w-4 h-4 mr-2" />
                Development Bypass
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If in Pi Browser but not authenticated, show login prompt
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <CharacterRenderer character={characters[0]} size={80} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login Required</h1>
          <p className="text-gray-600">Please sign in to continue playing</p>
        </motion.div>
        
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">Sign In to Play</CardTitle>
            <p className="text-gray-600 text-sm">
              Connect with Pi Network to start your pet care adventure
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <PiAuthButton />
            
            {/* Development bypass */}
            {process.env.NODE_ENV === 'development' && (
              <Button
                onClick={handleDevBypass}
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                <Code className="w-4 h-4 mr-2" />
                Development Bypass
              </Button>
            )}
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Secure authentication via Pi Network
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthGuard;
