
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export type OnboardingStep = 'userinfo' | 'intent' | 'plan' | 'template' | 'platforms' | 'links' | 'profile' | 'complete';
export type UserIntent = 'creator' | 'business' | 'personal';
export type UserPlan = 'free' | 'basic' | 'pro' | 'premium';

interface OnboardingData {
  step: OnboardingStep;
  username: string;
  intent: UserIntent;
  plan: UserPlan;
  templateId: string;
  selectedPlatforms: string[];
  platformUrls: Record<string, string>;
  profileTitle: string;
  bio: string;
  avatarUrl: string;
  consentUpdates: boolean;
}

export const useOnboarding = () => {
  const { profile, refreshProfile } = useUser();
  const [data, setData] = useState<OnboardingData>({
    step: 'userinfo',
    username: '',
    intent: 'personal',
    plan: 'free',
    templateId: '',
    selectedPlatforms: [],
    platformUrls: {},
    profileTitle: '',
    bio: '',
    avatarUrl: '',
    consentUpdates: false
  });

  useEffect(() => {
    if (profile) {
      setData(prev => ({
        ...prev,
        step: profile.onboarding_step || 'userinfo',
        username: profile.username || '',
        intent: profile.intent || 'personal',
        plan: profile.plan || 'free',
        profileTitle: profile.profile_title || '',
        bio: profile.bio || '',
        avatarUrl: profile.avatar_url || '',
        consentUpdates: profile.consent_updates || false
      }));
    }
  }, [profile]);

  const updateStep = async (step: OnboardingStep, stepData?: Partial<OnboardingData>) => {
    if (!profile?.id) return;

    const updatedData = { ...data, ...stepData, step };
    setData(updatedData);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          onboarding_step: step,
          username: updatedData.username,
          intent: updatedData.intent,
          plan: updatedData.plan,
          profile_title: updatedData.profileTitle,
          bio: updatedData.bio,
          avatar_url: updatedData.avatarUrl,
          consent_updates: updatedData.consentUpdates,
          template_id: updatedData.templateId || null
        })
        .eq('id', profile.id);

      if (error) throw error;

      if (step === 'complete') {
        await supabase
          .from('user_profiles')
          .update({ onboarding_completed: true })
          .eq('id', profile.id);
      }

      await refreshProfile();
    } catch (error) {
      console.error('Error updating onboarding step:', error);
    }
  };

  const savePlatforms = async (platforms: string[], urls: Record<string, string>) => {
    if (!profile?.id) return;

    try {
      // Delete existing platforms
      await supabase
        .from('user_platforms')
        .delete()
        .eq('user_id', profile.id);

      // Insert new platforms
      const platformData = platforms.map(platform => ({
        user_id: profile.id,
        platform: platform as any,
        url: urls[platform] || null
      }));

      if (platformData.length > 0) {
        const { error } = await supabase
          .from('user_platforms')
          .insert(platformData);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving platforms:', error);
    }
  };

  return {
    data,
    updateStep,
    savePlatforms,
    isComplete: profile?.onboarding_completed || false
  };
};
