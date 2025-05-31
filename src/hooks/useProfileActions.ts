
import { useState } from 'react';
import { usePiTipping } from './usePiTipping';
import { toast } from './use-toast';

export const useProfileActions = (profileId?: string) => {
  const [processingTip, setProcessingTip] = useState(false);
  const { sendTip } = usePiTipping();

  const handleLinkClick = async (linkId: string, url: string) => {
    // TODO: Track link clicks in analytics
    console.log('Link click tracking not yet implemented', linkId);
    window.open(url, '_blank');
  };

  const handleTipSubmit = async (amount: number, message: string, recipientUsername: string) => {
    if (!profileId) {
      toast({
        title: "Error",
        description: "Profile not found",
        variant: "destructive",
      });
      return;
    }

    setProcessingTip(true);
    try {
      await sendTip({
        recipientId: profileId,
        recipientUsername,
        amount,
        message
      });
    } finally {
      setProcessingTip(false);
    }
  };

  const handleShareProfile = async (username: string) => {
    try {
      const url = `${window.location.origin}/${username}`;
      await navigator.share({
        title: `Check out ${username}'s profile`,
        url
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/${username}`);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard",
      });
    }
  };

  return {
    processingTip,
    handleLinkClick,
    handleTipSubmit,
    handleShareProfile
  };
};
