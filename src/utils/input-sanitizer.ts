
/**
 * Input sanitization utilities for security
 */

// Basic HTML sanitization - removes script tags and dangerous attributes
export const sanitizeHtml = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove event handlers
  sanitized = sanitized.replace(/javascript:/gi, ''); // Remove javascript: URLs
  sanitized = sanitized.replace(/data:/gi, ''); // Remove data: URLs for security
  
  return sanitized.trim();
};

// Sanitize text input for database storage
export const sanitizeText = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Basic XSS prevention
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, (match) => match === '"' ? '&quot;' : '&#x27;') // Escape quotes
    .trim();
};

// Sanitize URL input
export const sanitizeUrl = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  try {
    const url = new URL(input);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }
    return url.toString();
  } catch {
    return '';
  }
};

// Validate and sanitize username
export const sanitizeUsername = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Only allow alphanumeric characters, underscores, and hyphens
  return input
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase()
    .slice(0, 30); // Limit length
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);
    
    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    userAttempts.count++;
    return true;
  };
};
