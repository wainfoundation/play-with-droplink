
import { isPasswordCompromised } from "@/utils/passwordSecurity";

/**
 * Validates password security
 * @param password - The password to validate
 * @returns An object containing whether the password is valid and any error messages
 */
export async function validatePasswordSecurity(password: string): Promise<{
  isValid: boolean;
  message?: string;
}> {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  
  // Check for password complexity
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { 
      isValid: false, 
      message: "Password must contain both letters and numbers" 
    };
  }
  
  // Check if password has been compromised
  const isCompromised = await isPasswordCompromised(password);
  
  if (isCompromised) {
    return {
      isValid: false,
      message: "This password has appeared in data breaches. Please use a stronger password."
    };
  }
  
  return { isValid: true };
}

/**
 * Generates a secure random password
 * @param length - Length of the password (default: 16)
 * @returns A secure random password
 */
export function generateSecurePassword(length = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  let password = '';
  
  // Generate a cryptographically secure random password
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  
  return password;
}
