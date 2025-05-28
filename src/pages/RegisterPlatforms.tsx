
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Youtube, MessageCircle, Instagram, Facebook, Music, Globe, Twitter, Linkedin } from 'lucide-react';

const RegisterPlatforms = () => {
  const navigate = useNavigate();
  const { data, updateStep } = useOnboarding();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(data.selectedPlatforms);
  const [isLoading, setIsLoading] = useState(false);

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: <Youtube className="w-8 h-8" />, color: 'text-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">T</div>, color: 'text-black' },
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-8 h-8" />, color: 'text-pink-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle className="w-8 h-8" />, color: 'text-green-600' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-8 h-8" />, color: 'text-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: <Twitter className="w-8 h-8" />, color: 'text-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="w-8 h-8" />, color: 'text-blue-700' },
    { id: 'spotify', name: 'Spotify', icon: <Music className="w-8 h-8" />, color: 'text-green-500' },
    { id: 'website', name: 'Website', icon: <Globe className="w-8 h-8" />, color: 'text-gray-600' }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await updateStep('links', { selectedPlatforms });
      navigate('/register/create/add-links');
    } catch (error) {
      console.error('Error updating platforms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Select Your Platforms</CardTitle>
          <p className="text-gray-600">Which platforms are you on?</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className={`cursor-pointer transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'ring-2 ring-primary border-primary bg-primary/5'
                    : 'hover:shadow-md'
                }`}
                onClick={() => togglePlatform(platform.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${platform.color} mb-3 flex justify-center`}>
                    {platform.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{platform.name}</h3>
                  {selectedPlatforms.includes(platform.id) && (
                    <Badge variant="default" className="mt-2 text-xs">
                      Selected
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center space-y-4">
            {selectedPlatforms.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
              </p>
            )}
            
            <Button
              onClick={handleContinue}
              disabled={isLoading}
              size="lg"
              className="px-8"
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPlatforms;
