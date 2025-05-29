import { useState, useCallback } from 'react';

interface SecurityEvent {
  event: string;
  timestamp: string;
  data?: any;
}

export const useAuthSecurity = () => {
  const [authAttempts, setAuthAttempts] = useState<Map<string, { count: number; resetTime: number }>>(new Map());

  // Rate limiting
  const checkRateLimit = useCallback((identifier: string, maxAttempts: number, windowMs: number): boolean => {
    const now = Date.now();
    const attempts = authAttempts.get(identifier);
    
    if (!attempts || now > attempts.resetTime) {
      setAuthAttempts(prev => new Map(prev.set(identifier, { count: 1, resetTime: now + windowMs })));
      return true;
    }
    
    if (attempts.count >= maxAttempts) {
      logSecurityEvent('rate_limit_exceeded', { identifier, attempts: attempts.count });
      return false;
    }
    
    setAuthAttempts(prev => new Map(prev.set(identifier, { ...attempts, count: attempts.count + 1 })));
    return true;
  }, [authAttempts]);

  // Security event logging
  const logSecurityEvent = useCallback((event: string, data?: any) => {
    const securityEvent: SecurityEvent = {
      event,
      timestamp: new Date().toISOString(),
      data
    };
    
    console.log('Security Event:', securityEvent);
    
    // Store in localStorage for debugging (in production, send to server)
    const existingEvents = JSON.parse(localStorage.getItem('security_events') || '[]');
    existingEvents.push(securityEvent);
    
    // Keep only last 100 events
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('security_events', JSON.stringify(existingEvents));
  }, []);

  // Input validation
  const validateInput = useCallback((input: string, type: 'username' | 'email' | 'url'): boolean => {
    if (!input || typeof input !== 'string') return false;
    
    switch (type) {
      case 'username':
        return /^[a-zA-Z0-9_-]{3,30}$/.test(input);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) && input.length <= 254;
      case 'url':
        try {
          const url = new URL(input);
          return ['http:', 'https:'].includes(url.protocol);
        } catch {
          return false;
        }
      default:
        return false;
    }
  }, []);

  return {
    checkRateLimit,
    logSecurityEvent,
    validateInput,
  };
};
