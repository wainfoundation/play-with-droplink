
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { trackPageView } from '@/services/analyticsService';

export function useAnalytics() {
  const { user } = useUser();

  const trackPage = (path: string) => {
    if (user?.id) {
      trackPageView(user.id, path);
    }
  };

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Analytics event tracking
    console.log('Analytics Event:', eventName, properties);
    
    // You can integrate with analytics services here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }
  };

  return { trackPage, trackEvent };
}
