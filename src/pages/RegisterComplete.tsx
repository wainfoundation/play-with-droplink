
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOnboarding } from '@/hooks/useOnboarding';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';

const RegisterComplete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useOnboarding();

  const handleContinueBuilding = () => {
    navigate('/admin');
  };

  const handleViewProfile = () => {
    window.open(`/profile/${data.username}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Looking good! 🎉
          </CardTitle>
          <p className="text-gray-600">
            Your Droplink is off to a great start. Continue building to make it even better.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Your Profile Preview
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <h4 className="font-bold">{data.profileTitle || data.username}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {data.bio || 'Your bio will appear here'}
              </p>
              <Badge variant="outline" className="mt-2">
                droplink.space/@{data.username}
              </Badge>
              
              <div className="mt-4 space-y-2">
                {data.selectedPlatforms.slice(0, 3).map((platform, index) => (
                  <div key={platform} className="h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm capitalize">
                    {platform}
                  </div>
                ))}
                {data.selectedPlatforms.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{data.selectedPlatforms.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-medium mb-3">What's Next?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Customize your profile design and layout
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Add more links and organize them
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                Set up analytics to track your performance
              </li>
              {data.plan !== 'free' && (
                <>
                  <li className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                    Configure your .pi domain
                  </li>
                  {(data.plan === 'pro' || data.plan === 'premium') && (
                    <li className="flex items-center">
                      <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                      Start selling digital products
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleViewProfile}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Profile
            </Button>
            
            <Button
              onClick={handleContinueBuilding}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue Building
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterComplete;
