
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface PiProfileData {
  avatar?: string;
  bio?: string;
  links?: Array<{
    title: string;
    url: string;
    platform?: string;
  }>;
}

export const usePiProfileImport = () => {
  const [importing, setImporting] = useState(false);

  const importFromPiProfile = useCallback(async (username: string): Promise<PiProfileData | null> => {
    try {
      setImporting(true);

      // TODO: Implement when Pi profile import service is available
      console.log('Pi profile import feature not yet implemented for username:', username);

      toast({
        title: "Feature Coming Soon",
        description: "Pi profile import will be available soon!",
      });

      return null;
    } catch (error) {
      console.error('Error importing Pi profile:', error);
      toast({
        title: "Import Error",
        description: "Failed to import Pi profile",
        variant: "destructive",
      });
      return null;
    } finally {
      setImporting(false);
    }
  }, []);

  const saveImportedData = useCallback(async (profileData: PiProfileData) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Must be logged in to save profile data');
      }

      // Update user profile with imported data using only existing fields
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          avatar_url: profileData.avatar,
          bio: profileData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Create links if provided
      if (profileData.links && profileData.links.length > 0) {
        const linksToInsert = profileData.links.map(link => ({
          user_id: user.id,
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
        title: "Import Successful",
        description: "Profile data imported successfully",
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
    importFromPiProfile,
    saveImportedData,
    importing
  };
};
