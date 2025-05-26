
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LoginPromptSectionProps {
  onPiLogin: () => Promise<void>;
}

const LoginPromptSection = ({ onPiLogin }: LoginPromptSectionProps) => {
  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-3">Sign in to access features</h2>
      <Button 
        onClick={onPiLogin}
        className="bg-gradient-hero hover:bg-secondary"
      >
        Sign in with Pi Network
      </Button>
      <p className="text-sm text-gray-500 mt-3">
        New to Droplink? <Link to="/signup" className="text-primary underline">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPromptSection;
