
import { isPasswordCompromised } from "@/utils/passwordSecurity";

/**
 * Validates password security
 * @param password - The password to validate
 * @returns An object containing whether the password is valid and any error messages
 */
export async function validatePasswordSecurity(password: string): Promise<{
  isValid: boolean;
  message?: string;
  isCompromised?: boolean;
}> {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  
  // Check for password complexity
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  let complexity = 0;
  if (hasLowercase) complexity++;
  if (hasUppercase) complexity++;
  if (hasNumber) complexity++;
  if (hasSpecial) complexity++;
  
  if (complexity < 3) {
    return { 
      isValid: false, 
      message: "Password must include at least 3 of the following: lowercase letters, uppercase letters, numbers, and special characters" 
    };
  }
  
  // Check if password has been compromised
  const isCompromised = await isPasswordCompromised(password);
  
  if (isCompromised) {
    return {
      isValid: false,
      message: "This password has appeared in data breaches. Please use a stronger password.",
      isCompromised: true
    };
  }
  
  return { isValid: true, isCompromised: false };
}

/**
 * Generates a secure random password
 * @param length - Length of the password (default: 16)
 * @param options - Options for password generation
 * @returns A secure random password
 */
export function generateSecurePassword(length = 16, options = { 
  includeLowercase: true,
  includeUppercase: true, 
  includeNumbers: true, 
  includeSpecial: true
}): string {
  let charset = '';
  if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.includeNumbers) charset += '0123456789';
  if (options.includeSpecial) charset += '!@#$%^&*()-_=+';
  
  // Fallback to ensure we have some charset
  if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  let password = '';
  
  // Generate a cryptographically secure random password
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  
  return password;
}
