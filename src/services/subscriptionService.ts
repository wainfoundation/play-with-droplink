
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment } from "@/services/piPaymentService";

export type SubscriptionPlan = "starter" | "pro" | "premium";
export type BillingCycle = "monthly" | "annual";

const PLAN_PRICING = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

interface SubscriptionData {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  amount: number;
  is_active: boolean;
  expires_at: string;
  started_at: string;
  created_at: string;
}

/**
 * Create a new subscription
 * @param userId - The user ID
 * @param plan - The subscription plan
 * @param billingCycle - The billing cycle
 * @returns The subscription data if successful, null if failed
 */
export async function createSubscription(
  userId: string,
  plan: SubscriptionPlan,
  billingCycle: BillingCycle
): Promise<SubscriptionData | null> {
  try {
    // Calculate amount based on plan and billing cycle
    const amount = billingCycle === 'annual' 
      ? PLAN_PRICING[plan].annual * 12 
      : PLAN_PRICING[plan].monthly;
    
    // Calculate expiration date
    const expires_at = new Date();
    if (billingCycle === 'annual') {
      expires_at.setFullYear(expires_at.getFullYear() + 1);
    } else {
      expires_at.setMonth(expires_at.getMonth() + 1);
    }
    
    // Create payment through Pi Network
    const paymentData = {
      amount,
      memo: `${plan} Plan Subscription (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
      metadata: {
        isSubscription: true,
        plan,
        duration: billingCycle,
        expiresAt: expires_at.toISOString()
      }
    };
    
    // Process payment
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error("User not authenticated");
    }
    
    await createPiPayment(paymentData, user.data.user);
    
    // Create subscription in database
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan,
        amount,
        is_active: true,
        expires_at: expires_at.toISOString(),
        started_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    return null;
  }
}

/**
 * Get user subscription
 * @param userId - The user ID
 * @returns The subscription data if successful, null if failed
 */
export async function getUserSubscription(userId: string): Promise<SubscriptionData | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting subscription:", error);
    return null;
  }
}

/**
 * Cancel user subscription
 * @param userId - The user ID
 * @returns True if successful, false if failed
 */
export async function cancelSubscription(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return false;
  }
}
