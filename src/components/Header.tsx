
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface HeaderProps {
  showGoToTop?: boolean;
}

const Header = ({ showGoToTop = false }: HeaderProps) => {
  const { isLoggedIn } = useUser();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Demo", href: "/demo" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Store", href: "/store" },
    { name: "Groups", href: "/groups" },
    { name: "Templates", href: "/templates" },
    { name: "Help", href: "/help" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/fd8498db-0cee-4181-93de-ba692558b37a.png" 
              alt="Droplink Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-[#00BFFF]">Droplink</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-600 hover:text-[#00BFFF] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" asChild className="text-gray-600 hover:text-[#00BFFF]">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-[#00BFFF] hover:bg-[#0099CC] text-white px-6">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button asChild className="bg-[#00BFFF] hover:bg-[#0099CC] text-white px-6">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}

            {/* Go to Top Button */}
            {showGoToTop && (
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white"
              >
                <ArrowUp className="h-4 w-4" />
                Top
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
