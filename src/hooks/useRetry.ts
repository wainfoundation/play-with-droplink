
import { useState, useCallback } from 'react';

interface UseRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
}

export function useRetry(options: UseRetryOptions = {}) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(async (fn: () => Promise<any>) => {
    setIsRetrying(true);
    let lastError: Error;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const result = await fn();
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error as Error;
        setRetryCount(i + 1);
        
        if (i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, i)));
        }
      }
    }

    setIsRetrying(false);
    throw lastError!;
  }, [maxRetries, retryDelay]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return { retry, retryCount, isRetrying, reset, canRetry: retryCount < maxRetries };
}
