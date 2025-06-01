
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DroplinkService } from '@/services/droplinkService';
import { useUser } from '@/context/UserContext';
import { ArrowRight, Gift, Trophy, Users } from 'lucide-react';

const DroplinkRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();
  const [droplink, setDroplink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      handleDroplink();
    }
  }, [id]);

  const handleDroplink = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const result = await DroplinkService.redeemDroplink(id);
      
      if (!result?.success) {
        setError('Invalid or expired droplink');
        return;
      }
      
      setDroplink(result);
    } catch (err) {
      setError('Failed to process droplink');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = () => {
    if (!droplink) return;

    switch (droplink.type) {
      case 'invite':
        if (isLoggedIn) {
          navigate('/play');
        } else {
          navigate('/auth?ref=invite');
        }
        break;
      case 'level':
        if (isLoggedIn) {
          navigate(`/play?game=${droplink.gameId}&level=${droplink.level}`);
        } else {
          navigate(`/auth?ref=level&game=${droplink.gameId}&level=${droplink.level}`);
        }
        break;
      case 'challenge':
        if (isLoggedIn) {
          navigate(`/play?game=${droplink.gameId}&challenge=true&score=${droplink.score}`);
        } else {
          navigate(`/auth?ref=challenge&game=${droplink.gameId}&score=${droplink.score}`);
        }
        break;
      default:
        navigate('/play');
    }
  };

  const getIcon = () => {
    switch (droplink?.type) {
      case 'invite': return Users;
      case 'level': return Gift;
      case 'challenge': return Trophy;
      default: return ArrowRight;
    }
  };

  const getTitle = () => {
    switch (droplink?.type) {
      case 'invite': return 'You\'re Invited to Play! 🎉';
      case 'level': return `Try Level ${droplink.level}! 🎯`;
      case 'challenge': return `Challenge Accepted! 🏆`;
      default: return 'Welcome to Play!';
    }
  };

  const getDescription = () => {
    switch (droplink?.type) {
      case 'invite': 
        return 'A friend has invited you to join the fun! Sign up and start playing amazing puzzle games.';
      case 'level': 
        return `Someone wants you to try level ${droplink.level} in ${droplink.gameId}. Think you can beat it?`;
      case 'challenge': 
        return `Can you beat a score of ${droplink.score?.toLocaleString()}? Accept the challenge and show your skills!`;
      default: 
        return 'Get ready for an amazing gaming experience!';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Processing your droplink...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !droplink) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              {error || 'This droplink is invalid or has expired.'}
            </p>
            <Button onClick={() => navigate('/play')}>
              Go to Games
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = getIcon();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">
            {getDescription()}
          </p>
          
          <div className="space-y-3">
            <Button onClick={handleAction} className="w-full" size="lg">
              <ArrowRight className="w-4 h-4 mr-2" />
              {isLoggedIn ? 'Continue' : 'Sign Up & Play'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/play')}
              className="w-full"
            >
              Browse All Games
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroplinkRedirect;
