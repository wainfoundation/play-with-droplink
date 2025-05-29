
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { Clock, RefreshCw } from 'lucide-react';

const SessionManager = () => {
  const { user, refreshSession } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Session timeout: 30 minutes
    const SESSION_DURATION = 30 * 60 * 1000;
    const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before expiry

    const checkSessionTime = () => {
      if (!user.created_at) return;
      
      const sessionStart = new Date(user.created_at).getTime();
      const now = Date.now();
      const elapsed = now - sessionStart;
      const remaining = SESSION_DURATION - elapsed;

      if (remaining <= 0) {
        // Session expired
        setTimeLeft(0);
        setShowWarning(true);
      } else if (remaining <= WARNING_TIME) {
        // Show warning
        setTimeLeft(remaining);
        setShowWarning(true);
      } else {
        setTimeLeft(remaining);
        setShowWarning(false);
      }
    };

    checkSessionTime();
    const interval = setInterval(checkSessionTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!user || !showWarning) return null;

  return (
    <Alert className="fixed bottom-4 right-4 w-80 z-50 border-orange-200 bg-orange-50">
      <Clock className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Session Expiring</span>
          <span className="text-sm">
            {timeLeft && timeLeft > 0 
              ? `Time left: ${formatTime(timeLeft)}`
              : 'Session expired'
            }
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={refreshSession}
          className="ml-2"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Extend
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SessionManager;
