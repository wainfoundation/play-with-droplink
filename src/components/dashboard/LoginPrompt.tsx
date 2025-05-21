
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LoginPromptProps {
  handlePiLogin: () => Promise<void>;
}

const LoginPrompt = ({ handlePiLogin }: LoginPromptProps) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Please Log In to Access Your Dashboard</h2>
      <Button onClick={handlePiLogin} className="bg-gradient-hero hover:bg-secondary">
        Sign in with Pi Network
      </Button>
      <p className="mt-4 text-sm text-gray-500">
        New to Droplink? <Link to="/signup" className="text-primary underline">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPrompt;
