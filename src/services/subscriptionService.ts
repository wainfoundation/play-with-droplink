
import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionData {
  id: string;
  user_id: string;
  plan: string;
  is_active: boolean;
  started_at: string;
  expires_at: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  pi_wallet_address?: string;
  pi_domain?: string;
  custom_domain?: string;
  plan: string;
  created_at: string;
  updated_at: string;
  games_played?: number;
  total_score?: number;
}

// TODO: Subscriptions table not yet implemented in database
// For now, return mock data and placeholder functions

export const createSubscription = async (userId: string, plan: string): Promise<SubscriptionData | null> => {
  try {
    console.log('Subscription creation not yet implemented', { userId, plan });
    
    // TODO: Implement when subscriptions table is available
    // const subscriptionData = {
    //   user_id: userId,
    //   plan,
    //   is_active: true,
    //   started_at: new Date().toISOString(),
    //   expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    // };

    // const { data, error } = await supabase
    //   .from('subscriptions')
    //   .insert(subscriptionData)
    //   .select()
    //   .single();

    // if (error) throw error;

    // For now, just update the user's plan in user_profiles
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ plan })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Return mock subscription data
    return {
      id: 'mock-subscription-id',
      user_id: userId,
      plan,
      is_active: true,
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    return null;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const getActiveSubscription = async (userId: string): Promise<SubscriptionData | null> => {
  try {
    console.log('Subscription fetching not yet implemented', { userId });
    
    // TODO: Implement when subscriptions table is available
    // const { data, error } = await supabase
    //   .from('subscriptions')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .eq('is_active', true)
    //   .single();

    // if (error) throw error;

    // For now, return null (no active subscription)
    return null;
  } catch (error) {
    console.error('Error fetching active subscription:', error);
    return null;
  }
};

export const cancelSubscription = async (subscriptionId: string): Promise<boolean> => {
  try {
    console.log('Subscription cancellation not yet implemented', { subscriptionId });
    
    // TODO: Implement when subscriptions table is available
    // const { error } = await supabase
    //   .from('subscriptions')
    //   .update({ is_active: false, cancelled_at: new Date().toISOString() })
    //   .eq('id', subscriptionId);

    // if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return false;
  }
};

export const updateUserPlan = async (userId: string, plan: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ plan })
      .eq('id', userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error updating user plan:', error);
    return false;
  }
};
