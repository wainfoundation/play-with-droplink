
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useUser();

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleContinue = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    navigate('/pet-setup');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Welcome - Droplet Pet</title>
        <meta name="description" content="Welcome to Droplet Pet!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">💧</div>
            <CardTitle className="text-2xl">Welcome, {profile?.display_name || profile?.username}!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You're ready to start your Droplet Pet adventure! Let's set up your virtual pet.
            </p>
            <Button onClick={handleContinue} className="w-full">
              Continue to Pet Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Welcome;
