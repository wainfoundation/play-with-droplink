
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitFeedback = async (feedback: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('feedback_submissions')
        .insert([{
          feedback,
          user_id: user?.id || null
        }]);

      if (error) throw error;

      toast({
        title: "Feedback Sent!",
        description: "Thank you for your feedback. We'll review it shortly.",
      });

      return true;
    } catch (error) {
      console.error('Feedback error:', error);
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFeedback,
    isSubmitting,
  };
};
