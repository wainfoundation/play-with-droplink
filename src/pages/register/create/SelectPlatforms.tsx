import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUser } from '@/context/UserContext';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

const platformsData: Platform[] = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'spotify', name: 'Spotify', icon: 'spotify' },
  { id: 'website', name: 'Website', icon: 'website' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
];

const SelectPlatforms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { updateProfile } = useUserProfile();

  const handleContinue = async () => {
    if (!user?.id) return;

    try {
      // Save selected platforms logic would go here
      // For now, just navigate to next step
      
      const searchParams = new URLSearchParams(location.search);
      const entryPoint = searchParams.get('freeEntryPoint') || 
                        searchParams.get('basicEntryPoint') || 
                        searchParams.get('proEntryPoint') || 
                        searchParams.get('premiumEntryPoint');
      
      navigate(`/register/create/add-links?${entryPoint}EntryPoint=ON_SIGNUP`);
    } catch (error) {
      console.error('Error saving platforms:', error);
      toast({
        title: "Error",
        description: "Failed to save platforms. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-semibold mb-4">Select Your Platforms</h1>
      <p className="text-gray-600 mb-6">Choose the platforms you're active on to get started.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {platformsData.map((platform) => (
          <Button key={platform.id} variant="outline" className="justify-start">
            {platform.name}
          </Button>
        ))}
      </div>

      <Button className="w-full" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};

export default SelectPlatforms;
