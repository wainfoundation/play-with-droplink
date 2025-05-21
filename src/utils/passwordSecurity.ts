
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
