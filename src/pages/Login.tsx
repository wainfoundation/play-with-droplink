
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Crown, Gamepad2 } from 'lucide-react';
import { usePiAuth } from '@/hooks/usePiAuth';

const Login = () => {
  const navigate = useNavigate();
  const { handlePiLogin, piAuthenticating, error } = usePiAuth();
  const [userStatus, setUserStatus] = useState<'free' | 'premium' | 'paid' | null>(null);

  const handleLogin = async () => {
    try {
      const result = await handlePiLogin();
      if (result) {
        // Simulate checking user status
        setUserStatus('free'); // This would come from your backend
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const getStatusBadge = () => {
    switch (userStatus) {
      case 'free':
        return <Badge className="bg-gray-600">🆓 Free User</Badge>;
      case 'premium':
        return <Badge className="bg-purple-600">👑 Premium Subscriber</Badge>;
      case 'paid':
        return <Badge className="bg-orange-600">💰 Paid Games Owner</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>👤 User Login - Play with Droplink</title>
        <meta name="description" content="Login to your Droplink gaming account with Pi Network authentication" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">👤 User Login</CardTitle>
            <CardDescription className="text-gray-400">
              Pi Authentication System
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!userStatus ? (
              <>
                <div className="space-y-4">
                  <div className="bg-blue-900/30 p-4 rounded-lg text-center">
                    <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-2">Secure Pi Authentication</h4>
                    <p className="text-sm text-gray-400">
                      Login with your Pi Network credentials to access your gaming profile
                    </p>
                  </div>

                  <Button 
                    onClick={handleLogin}
                    disabled={piAuthenticating}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg"
                  >
                    {piAuthenticating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Login with Pi Network
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p>New to Droplink? Your profile will be created automatically!</p>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-4xl mb-2">✅</div>
                  <h4 className="font-semibold text-white mb-2">Login Successful!</h4>
                  <div className="mb-3">{getStatusBadge()}</div>
                  <p className="text-sm text-gray-400">
                    Redirecting to your dashboard...
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4">
              <h5 className="text-white font-medium mb-3">What you get access to:</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-green-400" />
                  <span>50+ Free games with ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <span>Premium subscription for ad-free gaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Personal gaming profile & stats</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
