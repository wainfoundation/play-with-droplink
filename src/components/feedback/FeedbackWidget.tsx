
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Here you would send feedback to your backend
      console.log("Feedback submitted:", feedback);
      
      toast({
        title: "Feedback Sent!",
        description: "Thank you for your feedback. We'll review it shortly.",
      });
      
      setFeedback("");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full h-12 w-12 p-0"
        size="sm"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Feedback</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              placeholder="Tell us what you think or report an issue..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
              rows={4}
            />
            
            <div className="flex gap-2">
              <Button
                onClick={submitFeedback}
                disabled={!feedback.trim() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
