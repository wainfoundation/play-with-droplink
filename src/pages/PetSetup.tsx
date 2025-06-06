
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';

const PetSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [petName, setPetName] = useState('My Droplet');

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleComplete = () => {
    localStorage.setItem('petSetupCompleted', 'true');
    localStorage.setItem('selectedCharacter', JSON.stringify({ id: 'droplet-blue', name: petName }));
    navigate('/play');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Pet Setup - Droplet Pet</title>
        <meta name="description" content="Set up your virtual pet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">💧</div>
            <CardTitle className="text-2xl">Meet Your Droplet!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="petName">What would you like to name your pet?</Label>
              <Input
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter pet name"
                className="mt-2"
              />
            </div>
            <Button onClick={handleComplete} className="w-full">
              Start Playing!
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PetSetup;
