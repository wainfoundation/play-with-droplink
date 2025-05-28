
import { useState } from 'react';
import { trackAnonymousPageView, trackLinkClick } from '@/services/analyticsService';
import { usePiTipping } from '@/hooks/usePiTipping';
import { toast } from '@/hooks/use-toast';

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

export const useProfileActions = (profileUserId?: string) => {
  const [processingTip, setProcessingTip] = useState(false);
  const { sendTip } = usePiTipping();

  const handleLinkClick = async (link: Link) => {
    try {
      // Track the link click
      if (profileUserId) {
        await trackLinkClick(profileUserId, link.id);
      }
      
      // Open the link
      const url = link.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.open(`https://${url}`, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error tracking link click:', error);
      // Still open the link even if tracking fails
      const url = link.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.open(`https://${url}`, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleTipSubmit = async (amount: number, message: string, username: string) => {
    if (!profileUserId) return;
    
    setProcessingTip(true);
    try {
      await sendTip(profileUserId, amount, message);
      toast({
        title: "Tip Sent!",
        description: `Successfully sent ${amount}π to @${username}`,
      });
    } catch (error) {
      console.error('Error sending tip:', error);
      toast({
        title: "Tip Failed",
        description: "There was an error sending your tip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingTip(false);
    }
  };

  const handleShareProfile = (username: string) => {
    const profileUrl = `${window.location.origin}/@${username}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Check out @${username} on Droplink`,
        text: `View @${username}'s profile on Droplink`,
        url: profileUrl,
      }).catch(err => {
        console.log('Error sharing:', err);
        fallbackShare(profileUrl);
      });
    } else {
      fallbackShare(profileUrl);
    }
  };

  const fallbackShare = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "Profile link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Share Link",
        description: url,
      });
    });
  };

  // Track page view when profile is loaded
  const trackPageView = async (path: string) => {
    if (profileUserId) {
      try {
        await trackAnonymousPageView(profileUserId, path);
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    }
  };

  return {
    processingTip,
    handleLinkClick,
    handleTipSubmit,
    handleShareProfile,
    trackPageView
  };
};
