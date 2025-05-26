
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { processPayment } from "@/services/piPaymentService";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

export const useProfileActions = (profileId?: string) => {
  const [processingTip, setProcessingTip] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLinkClick = async (link: Link) => {
    if (profileId) {
      try {
        // Update click count
        await supabase
          .from('links')
          .update({ clicks: link.clicks + 1 })
          .eq('id', link.id)
          .select();
        
        // Register analytics
        await supabase
          .from('analytics')
          .insert({
            user_id: profileId,
            link_id: link.id,
            link_click: true,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          })
          .select();
          
        // Open the URL
        window.open(link.url, '_blank');
      } catch (err) {
        console.error("Failed to register link click:", err);
      }
    }
  };

  const handleTipSubmit = async (amount: number, message: string, username?: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a tip",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setProcessingTip(true);
    
    try {
      const paymentData = {
        amount: amount,
        memo: message || `Tip to @${username}`,
        metadata: {
          recipientId: profileId,
          type: 'tip',
          message: message
        }
      };
      
      await processPayment(paymentData, user);
      
      toast({
        title: "Sending Tip",
        description: "Follow the Pi payment flow to complete your tip",
      });
      
    } catch (error) {
      console.error("Tip error:", error);
      toast({
        title: "Tip failed",
        description: "There was an error processing your tip",
        variant: "destructive",
      });
    } finally {
      setProcessingTip(false);
    }
  };

  const handleShareProfile = (username: string) => {
    if (navigator.share) {
      navigator.share({
        title: `@${username}'s Profile`,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile URL copied to clipboard",
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
