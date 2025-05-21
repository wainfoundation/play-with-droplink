
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  username: string | undefined;
}

const ErrorState = ({ username }: ErrorStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Profile not found</h2>
          <p className="text-gray-600 mb-6">The user @{username} doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Return to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorState;
