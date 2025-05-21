
import { Button } from "@/components/ui/button";
import { usePiAuth } from "@/hooks/usePiAuth";

export function PiAuthButton() {
  const { piAuthenticating, handlePiLogin } = usePiAuth();

  return (
    <Button 
      type="button" 
      onClick={handlePiLogin}
      className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-6"
      disabled={piAuthenticating}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
      </svg>
      {piAuthenticating ? "Authenticating..." : "Sign in with Pi Network"}
    </Button>
  );
}
