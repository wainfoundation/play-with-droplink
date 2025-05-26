
import { Button } from "@/components/ui/button";

interface LoginPromptSectionProps {
  onPiLogin: () => Promise<void>;
}

const LoginPromptSection = ({ onPiLogin }: LoginPromptSectionProps) => {
  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-3">Sign in with Pi Network</h2>
      <Button 
        onClick={onPiLogin}
        className="bg-gradient-hero hover:bg-secondary w-full"
      >
        Connect Pi Network Wallet
      </Button>
      <p className="text-sm text-gray-500 mt-3 text-center">
        Use your Pi Network wallet to access all Droplink features
      </p>
    </div>
  );
};

export default LoginPromptSection;
