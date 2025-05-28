
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOnboarding, UserIntent } from '@/hooks/useOnboarding';
import { Users, Building, User } from 'lucide-react';

const RegisterIntent = () => {
  const navigate = useNavigate();
  const { data, updateStep } = useOnboarding();
  const [selectedIntent, setSelectedIntent] = useState<UserIntent>(data.intent);
  const [isLoading, setIsLoading] = useState(false);

  const intents = [
    {
      id: 'creator' as UserIntent,
      title: 'Creator',
      description: 'Monetize your audience and grow your following',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'business' as UserIntent,
      title: 'Business',
      description: 'Reach more customers and grow your business',
      icon: <Building className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'personal' as UserIntent,
      title: 'Personal',
      description: 'Share your links with friends and family',
      icon: <User className="w-8 h-8" />,
      color: 'bg-green-100 text-green-800'
    }
  ];

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await updateStep('plan', { intent: selectedIntent });
      navigate('/register/select-categories');
    } catch (error) {
      console.error('Error updating intent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">What's your goal?</CardTitle>
          <p className="text-gray-600">Which best describes your goal for using Droplink?</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {intents.map((intent) => (
              <Card
                key={intent.id}
                className={`cursor-pointer transition-all ${
                  selectedIntent === intent.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedIntent(intent.id)}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${intent.color}`}>
                    {intent.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{intent.title}</h3>
                    <p className="text-gray-600">{intent.description}</p>
                  </div>
                  {selectedIntent === intent.id && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full mt-6"
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterIntent;
