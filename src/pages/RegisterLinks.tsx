
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ExternalLink } from 'lucide-react';

const RegisterLinks = () => {
  const navigate = useNavigate();
  const { data, updateStep, savePlatforms } = useOnboarding();
  const [urls, setUrls] = useState<Record<string, string>>(data.platformUrls);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (platform: string, url: string) => {
    setUrls(prev => ({ ...prev, [platform]: url }));
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await savePlatforms(data.selectedPlatforms, urls);
      await updateStep('profile', { platformUrls: urls });
      navigate(`/register/create/name-image-bio?${data.plan}EntryPoint=ON_SIGNUP`);
    } catch (error) {
      console.error('Error saving links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformPlaceholder = (platform: string) => {
    const placeholders: Record<string, string> = {
      youtube: 'https://youtube.com/@yourchannel',
      tiktok: 'https://tiktok.com/@username',
      instagram: 'https://instagram.com/username',
      whatsapp: 'https://wa.me/1234567890',
      facebook: 'https://facebook.com/username',
      twitter: 'https://twitter.com/username',
      linkedin: 'https://linkedin.com/in/username',
      spotify: 'https://open.spotify.com/artist/...',
      website: 'https://yourwebsite.com'
    };
    return placeholders[platform] || `https://example.com`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Add Your Links</CardTitle>
          <p className="text-gray-600">Add URLs for your selected platforms</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {data.selectedPlatforms.map((platform) => (
            <div key={platform}>
              <Label htmlFor={platform} className="capitalize flex items-center gap-2">
                {platform}
                <ExternalLink className="w-4 h-4" />
              </Label>
              <Input
                id={platform}
                placeholder={getPlatformPlaceholder(platform)}
                value={urls[platform] || ''}
                onChange={(e) => handleUrlChange(platform, e.target.value)}
                className="mt-2"
              />
            </div>
          ))}

          {data.selectedPlatforms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No platforms selected. You can add links later in your dashboard.</p>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-sm mb-2">💡 Optional: Connect Pi Profile</h4>
            <p className="text-sm text-gray-600 mb-3">
              Import your existing Pi Network profile data
            </p>
            <Input
              placeholder="profiles.pinet.com/profiles/@username"
              className="bg-white"
            />
          </div>

          <div className="mt-8 text-center">
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

export default RegisterLinks;
