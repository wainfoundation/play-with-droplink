
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

/**
 * Sign up with email and password
 * @param email - The user's email
 * @param password - The user's password
 * @param metadata - Optional metadata (like username, display name)
 * @returns The session if successful, null if failed
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: { [key: string]: any } = {}
): Promise<{ user: User | null; session: Session | null; error: any }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    return {
      user: data?.user || null,
      session: data?.session || null,
      error
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return { user: null, session: null, error };
  }
}

/**
 * Sign in with email and password
 * @param email - The user's email
 * @param password - The user's password
 * @returns The session if successful, null if failed
 */
export async function signInWithEmail(
  email: string, 
  password: string
): Promise<{ user: User | null; session: Session | null; error: any }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return {
      user: data?.user || null,
      session: data?.session || null,
      error
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return { user: null, session: null, error };
  }
}

/**
 * Sign out the current user
 * @returns True if successful, false if failed
 */
export async function signOut(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
}

/**
 * Get the current session
 * @returns The session if one exists, null if not
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    return data.session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Reset password
 * @param email - The user's email
 * @returns True if successful, false if failed
 */
export async function resetPassword(email: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error resetting password:", error);
    return false;
  }
}

/**
 * Update user profile
 * @param userId - The user ID
 * @param profileData - The profile data to update
 * @returns True if successful, false if failed
 */
export async function updateUserProfile(
  userId: string,
  profileData: any
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
}

/**
 * Get user profile
 * @param userId - The user ID
 * @returns The user profile if successful, null if failed
 */
export async function getUserProfile(userId: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}
