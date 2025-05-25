
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { WifiOff, Wifi } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function NetworkStatus() {
  const { isOnline, isSlowConnection } = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) {
      toast({
        title: "No Internet Connection",
        description: "Please check your network connection and try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Connection Restored",
        description: "You're back online!",
      });
    }
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">No internet connection</span>
        </div>
      </div>
    );
  }

  if (isSlowConnection) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white p-2 text-center z-50">
        <div className="flex items-center justify-center gap-2">
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Slow connection detected</span>
        </div>
      </div>
    );
  }

  return null;
}
