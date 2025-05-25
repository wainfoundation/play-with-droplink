
import { toast } from "@/hooks/use-toast";
import { useCallback } from "react";

export function useErrorHandler() {
  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    
    let message = "An unexpected error occurred. Please try again.";
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes("network")) {
        message = "Network error. Please check your connection.";
      } else if (error.message.includes("unauthorized")) {
        message = "You need to be logged in to perform this action.";
      } else if (error.message.includes("forbidden")) {
        message = "You don't have permission to perform this action.";
      } else {
        message = error.message;
      }
    }
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }, []);

  return { handleError };
}
