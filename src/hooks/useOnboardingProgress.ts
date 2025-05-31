
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

interface OnboardingProgress {
  currentStep: string;
  selectedIntent: string;
  selectedPlan: string;
  selectedTemplate: string;
  completedSteps: string[];
  platformSelections: string[];
  linksData: any;
  profileData: any;
  isCompleted: boolean;
  completedAt: string | null;
}

export const useOnboardingProgress = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState<OnboardingProgress>({
    currentStep: 'userinfo',
    selectedIntent: '',
    selectedPlan: '',
    selectedTemplate: '',
    completedSteps: [],
    platformSelections: [],
    linksData: null,
    profileData: null,
    isCompleted: false,
    completedAt: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    try {
      // TODO: Implement when onboarding tables are available
      console.log('Onboarding progress feature not yet implemented');
      setProgress({
        currentStep: 'userinfo',
        selectedIntent: '',
        selectedPlan: '',
        selectedTemplate: '',
        completedSteps: [],
        platformSelections: [],
        linksData: null,
        profileData: null,
        isCompleted: false,
        completedAt: null
      });
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<OnboardingProgress>) => {
    try {
      // TODO: Implement when onboarding tables are available
      console.log('Update onboarding progress feature not yet implemented', updates);
      setProgress(prev => ({ ...prev, ...updates }));
      return true;
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      return false;
    }
  };

  const savePlatformSelections = async (platforms: string[]) => {
    try {
      // TODO: Implement when user_platform_selections table is available
      console.log('Save platform selections feature not yet implemented', platforms);
      return true;
    } catch (error) {
      console.error('Error saving platform selections:', error);
      return false;
    }
  };

  const saveConsent = async (consentType: string, granted: boolean) => {
    try {
      // TODO: Implement when user_consents table is available
      console.log('Save consent feature not yet implemented', { consentType, granted });
      return true;
    } catch (error) {
      console.error('Error saving consent:', error);
      return false;
    }
  };

  return {
    progress,
    loading,
    updateProgress,
    savePlatformSelections,
    saveConsent,
    refetch: loadProgress
  };
};
