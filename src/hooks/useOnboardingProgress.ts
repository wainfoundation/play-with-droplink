
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';

interface OnboardingProgress {
  current_step: string;
  selected_intent?: string;
  selected_plan?: string;
  selected_template?: string;
  completed_steps: string[];
  platform_selections: string[];
  links_data: Record<string, any>;
  profile_data: Record<string, any>;
  is_completed: boolean;
  completed_at?: string;
}

export const useOnboardingProgress = () => {
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const fetchProgress = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase.rpc('get_onboarding_progress', {
        user_id_param: user.id
      });

      if (error) throw error;
      
      if (data && data.length > 0) {
        const progressData = data[0];
        setProgress({
          current_step: progressData.current_step,
          selected_intent: progressData.selected_intent,
          selected_plan: progressData.selected_plan,
          selected_template: progressData.selected_template,
          completed_steps: Array.isArray(progressData.completed_steps) 
            ? (progressData.completed_steps as string[])
            : [],
          platform_selections: Array.isArray(progressData.platform_selections) 
            ? (progressData.platform_selections as string[])
            : [],
          links_data: (typeof progressData.links_data === 'object' && progressData.links_data !== null)
            ? (progressData.links_data as Record<string, any>)
            : {},
          profile_data: (typeof progressData.profile_data === 'object' && progressData.profile_data !== null)
            ? (progressData.profile_data as Record<string, any>)
            : {},
          is_completed: progressData.is_completed,
          completed_at: progressData.completed_at
        });
      }
    } catch (error) {
      console.error('Error fetching onboarding progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (stepName: string, stepData: Record<string, any> = {}) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase.rpc('update_onboarding_progress', {
        user_id_param: user.id,
        step_name: stepName,
        step_data: stepData
      });

      if (error) throw error;
      
      // Refresh progress after update
      await fetchProgress();
      
      return true;
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const savePlatformSelections = async (platforms: string[]) => {
    if (!user?.id) return;

    try {
      // Delete existing selections
      await supabase
        .from('user_platform_selections')
        .delete()
        .eq('user_id', user.id);

      // Insert new selections
      if (platforms.length > 0) {
        const selections = platforms.map(platform => ({
          user_id: user.id,
          platform: platform,
          selected_during_onboarding: true
        }));

        const { error } = await supabase
          .from('user_platform_selections')
          .insert(selections);

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error saving platform selections:', error);
      return false;
    }
  };

  const saveUserConsents = async (consents: {
    newsletter?: boolean;
    pi_integration?: boolean;
    data_usage?: boolean;
    marketing?: boolean;
  }) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('user_consents')
        .upsert({
          user_id: user.id,
          newsletter_consent: consents.newsletter || false,
          pi_integration_consent: consents.pi_integration || false,
          data_usage_consent: consents.data_usage || false,
          marketing_consent: consents.marketing || false,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving user consents:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user?.id]);

  return {
    progress,
    isLoading,
    updateProgress,
    savePlatformSelections,
    saveUserConsents,
    fetchProgress
  };
};
