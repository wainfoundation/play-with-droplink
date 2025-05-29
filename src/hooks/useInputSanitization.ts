
import { useMemo } from 'react';
import { sanitizeHtml, sanitizeText, sanitizeUrl, sanitizeUsername, isValidEmail } from '@/utils/input-sanitizer';

export const useInputSanitization = () => {
  return useMemo(() => ({
    sanitizeHtml,
    sanitizeText,
    sanitizeUrl,
    sanitizeUsername,
    isValidEmail,
  }), []);
};
