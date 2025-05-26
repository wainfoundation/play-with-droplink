
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showGoToTop?: boolean;
}

const Header = ({ showGoToTop = false }: HeaderProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0d519e46-7a30-4f3d-a07a-17e763eeda19.png" 
              alt="Droplink Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">Droplink</span>
          </Link>

          {/* Go to Top Button */}
          {showGoToTop && (
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              Top
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
