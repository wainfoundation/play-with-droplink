
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface PiProfileData {
  avatar: string;
  bio: string;
  links: Array<{ title: string; url: string }>;
  username: string;
}

export const usePiProfileImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState<PiProfileData | null>(null);

  const importPiProfile = async (username: string): Promise<PiProfileData | null> => {
    try {
      setIsImporting(true);
      
      // Get current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase.functions.invoke('import-pi-profile', {
        body: null,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        method: 'GET',
        query: { username }
      });

      if (error) {
        console.error('Import function error:', error);
        throw new Error(error.message || 'Failed to import Pi profile');
      }

      if (!data.success) {
        throw new Error(data.error || 'Import failed');
      }

      setImportedData(data.data);
      
      toast({
        title: "Profile imported successfully",
        description: `Imported ${data.data.links.length} links from Pi profile`,
      });

      return data.data;
    } catch (error) {
      console.error('Pi profile import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import Pi profile",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsImporting(false);
    }
  };

  const savePiProfileData = async (data: PiProfileData, userId: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          imported_pi_avatar: data.avatar,
          imported_pi_bio: data.bio,
          imported_pi_links: data.links,
          pi_profile_last_synced: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile data saved",
        description: "Pi profile data has been saved to your Droplink profile",
      });

      return true;
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save failed",
        description: "Failed to save Pi profile data",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isImporting,
    importedData,
    importPiProfile,
    savePiProfileData,
    setImportedData
  };
};
