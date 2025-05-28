
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useErrorHandler } from './useErrorHandler';

export const useNewsletterSubscription = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { handleError } = useErrorHandler();

  const subscribeToNewsletter = async (email: string, userId?: string) => {
    try {
      setIsSubscribing(true);
      
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email,
          user_id: userId || null,
          source: 'signup_consent',
          metadata: {
            consented_at: new Date().toISOString(),
            consent_source: 'user_signup'
          }
        });

      if (error) throw error;

      console.log('Successfully subscribed to newsletter:', email);
      
      toast({
        title: "Newsletter subscription confirmed",
        description: "You'll receive updates and news from Droplink",
      });

      return true;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      handleError(error, 'Newsletter subscription');
      return false;
    } finally {
      setIsSubscribing(false);
    }
  };

  const updateNewsletterConsent = async (userId: string, consent: boolean) => {
    try {
      const { error } = await supabase
        .from('user_consents')
        .upsert({
          user_id: userId,
          newsletter_consent: consent,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      console.log('Updated newsletter consent:', consent);
      return true;
    } catch (error) {
      console.error('Error updating newsletter consent:', error);
      handleError(error, 'Updating newsletter consent');
      return false;
    }
  };

  return {
    subscribeToNewsletter,
    updateNewsletterConsent,
    isSubscribing
  };
};
