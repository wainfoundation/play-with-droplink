
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Upload, Sparkles } from 'lucide-react';

const RegisterProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, updateStep } = useOnboarding();
  const [profileTitle, setProfileTitle] = useState(data.profileTitle);
  const [bio, setBio] = useState(data.bio);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateBio = () => {
    const sampleBios = [
      "Creator sharing my journey and passion with the world 🌟",
      "Building something amazing one day at a time ✨",
      "Connecting people through stories and experiences 💫"
    ];
    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    setBio(randomBio);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await updateStep('complete', { profileTitle, bio });
      const entryPoint = searchParams.get(`${data.plan}EntryPoint`);
      navigate(`/register/create/complete?${data.plan}EntryPoint=${entryPoint || 'ON_SIGNUP'}`);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <p className="text-gray-600">Add your profile image, title, and bio</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Profile Image
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: 400x400px, PNG or JPG
            </p>
          </div>

          <div>
            <Label htmlFor="title">Profile Title</Label>
            <Input
              id="title"
              placeholder="Your Name or Brand"
              value={profileTitle}
              onChange={(e) => setProfileTitle(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="flex items-center justify-between">
              Bio
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGenerateBio}
                className="text-purple-600 hover:text-purple-700"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Write my bio
              </Button>
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell people about yourself and what you do..."
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 80))}
              className="mt-2 h-20"
              maxLength={80}
            />
            <p className="text-xs text-gray-500 mt-1">
              {bio.length}/80 characters
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <h3 className="font-bold">{profileTitle || 'Your Name'}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {bio || 'Your bio will appear here...'}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-8 bg-blue-100 rounded-lg"></div>
                  <div className="h-8 bg-green-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
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

export default RegisterProfile;
