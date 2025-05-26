
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
    <header className="bg-white/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg shadow-primary/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
                alt="Droplink Logo" 
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold hero-title">Droplink</span>
          </Link>

          {/* Go to Top Button */}
          {showGoToTop && (
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 water-ripple border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
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
