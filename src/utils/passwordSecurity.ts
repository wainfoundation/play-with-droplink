
import { sha1 } from "crypto-hash";

/**
 * Checks if a password has been compromised in known data breaches
 * using the HaveIBeenPwned API with k-anonymity
 * 
 * @param password - The password to check
 * @returns True if the password has been found in data breaches
 */
export async function isPasswordCompromised(password: string): Promise<boolean> {
  try {
    // Generate SHA-1 hash of the password
    const hash = (await sha1(password)).toUpperCase();
    
    // Get the first 5 characters (prefix) of the hash
    const prefix = hash.substring(0, 5);
    
    // Get the rest of the hash for local comparison
    const suffix = hash.substring(5);
    
    // Call the HaveIBeenPwned API with the prefix
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'Add-Padding': 'true', // Add padding to prevent exact count from being determined
        'User-Agent': 'Droplink-Security-Check'
      }
    });
    
    if (!response.ok) {
      console.error("Error checking password security:", response.statusText);
      return false; // Default to allowing the password if API check fails
    }
    
    // Parse the response
    const text = await response.text();
    const hashes = text.split("\r\n");
    
    // Check if the suffix appears in the returned list
    for (const line of hashes) {
      const [returnedSuffix, count] = line.split(":");
      if (returnedSuffix === suffix) {
        return true; // Password has been compromised
      }
    }
    
    return false; // Password not found in breaches
  } catch (error) {
    console.error("Error checking password security:", error);
    return false; // Default to allowing the password if check fails
  }
}

/**
 * Calculate password strength score (0-4)
 * 0 = Very Weak, 1 = Weak, 2 = Fair, 3 = Good, 4 = Strong
 * 
 * @param password - Password to evaluate
 * @returns Score from 0-4 and feedback messages
 */
export function calculatePasswordStrength(password: string): { 
  score: number;
  feedback: string[];
} {
  if (!password) {
    return { score: 0, feedback: ["Password is required"] };
  }

  const feedback: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length < 8) {
    feedback.push("Password should be at least 8 characters long");
  } else if (password.length >= 12) {
    score += 1;
  }

  // Character diversity checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
  // Add to score based on character diversity
  let diversityScore = 0;
  if (hasLowercase) diversityScore++;
  if (hasUppercase) diversityScore++;
  if (hasNumbers) diversityScore++;
  if (hasSpecialChars) diversityScore++;
  
  score += Math.min(3, diversityScore);
  
  // Add feedback based on missing character types
  if (!hasLowercase) feedback.push("Add lowercase letters");
  if (!hasUppercase) feedback.push("Add uppercase letters");
  if (!hasNumbers) feedback.push("Add numbers");
  if (!hasSpecialChars) feedback.push("Add special characters (e.g., !@#$%)");
  
  // Check for common patterns
  if (/^[0-9]+$/.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push("Avoid using only numbers");
  }
  
  if (/^[a-zA-Z]+$/.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push("Avoid using only letters");
  }
  
  // Common passwords or patterns (simplified check for common sequences)
  const commonPatterns = ['password', '123456', 'qwerty', 'admin', 'welcome'];
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    score = Math.max(0, score - 1);
    feedback.push("Avoid common words or patterns");
  }
  
  return {
    score: score,
    feedback: feedback.length > 0 ? feedback : ["Strong password"]
  };
}
