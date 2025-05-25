
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="p-4 bg-white shadow-lg border">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-2">Cookie Notice</h3>
            <p className="text-xs text-gray-600 mb-3">
              We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our cookie policy.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={acceptCookies} className="text-xs">
                Accept
              </Button>
              <Button size="sm" variant="outline" onClick={declineCookies} className="text-xs">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
