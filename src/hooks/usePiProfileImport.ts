
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface PiProfileData {
  username: string;
  avatar?: string;
  bio?: string;
  links: Array<{
    title: string;
    url: string;
    platform?: string;
  }>;
}

export const usePiProfileImport = () => {
  const [importing, setImporting] = useState(false);
  const [importedData, setImportedData] = useState<PiProfileData | null>(null);

  const importPiProfile = useCallback(async (username: string): Promise<void> => {
    try {
      setImporting(true);

      // TODO: Implement when Pi profile import service is available
      console.log('Pi profile import feature not yet implemented for username:', username);

      // Mock imported data for now
      const mockData: PiProfileData = {
        username,
        avatar: 'https://via.placeholder.com/150',
        bio: 'Imported from Pi Network',
        links: [
          { title: 'Sample Link', url: 'https://example.com' }
        ]
      };

      setImportedData(mockData);

      toast({
        title: "Import Successful",
        description: "Pi profile data imported successfully!",
      });
    } catch (error) {
      console.error('Error importing Pi profile:', error);
      toast({
        title: "Import Error",
        description: "Failed to import Pi profile",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  }, []);

  const savePiProfileData = useCallback(async (profileData: PiProfileData, userId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          avatar_url: profileData.avatar,
          bio: profileData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Create links if provided
      if (profileData.links && profileData.links.length > 0) {
        const linksToInsert = profileData.links.map(link => ({
          user_id: userId,
          title: link.title,
          url: link.url,
          icon: '🔗',
          position: 0,
          is_active: true
        }));

        const { error: linksError } = await supabase
          .from('links')
          .insert(linksToInsert);

        if (linksError) throw linksError;
      }

      toast({
        title: "Save Successful",
        description: "Profile data saved successfully",
      });

      return true;
    } catch (error) {
      console.error('Error saving imported data:', error);
      toast({
        title: "Save Error",
        description: "Failed to save imported data",
        variant: "destructive",
      });
      return false;
    }
  }, []);

  return {
    isImporting: importing,
    importedData,
    importPiProfile,
    savePiProfileData,
    setImportedData,
    importing,
    importFromPiProfile: importPiProfile,
    saveImportedData: (profileData: PiProfileData) => savePiProfileData(profileData, '')
  };
};
