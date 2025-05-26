
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | Droplink</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-20 w-20 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-8">
            Oops! We couldn't find the page you're looking for.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
