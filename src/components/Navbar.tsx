
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Menu, Twitter, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm px-6 md:px-12 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 font-poppins font-bold text-2xl text-primary">
        <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
        </svg>
        Droplink
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/templates" className="nav-link">Templates</Link>
        <Link to="/login" className="nav-link">Log In</Link>
        <Button asChild className="bg-gradient-hero hover:bg-secondary">
          <Link to="/signup">Start Free</Link>
        </Button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a href="https://instagram.com" aria-label="Instagram" className="text-primary hover:text-secondary transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" className="text-primary hover:text-secondary transition-colors">
          <Twitter size={20} />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" className="text-primary hover:text-secondary transition-colors">
          <Facebook size={20} />
        </a>
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden" 
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        <Menu className="h-6 w-6 text-primary" />
      </Button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 md:hidden overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center gap-2 font-poppins font-bold text-2xl text-primary">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
              </svg>
              Droplink
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-primary" />
            </Button>
          </div>

          <div className="flex flex-col gap-4 my-6">
            <Link to="/features" className="p-3 hover:bg-muted rounded-md transition-colors">Features</Link>
            <Link to="/pricing" className="p-3 hover:bg-muted rounded-md transition-colors">Pricing</Link>
            <Link to="/templates" className="p-3 hover:bg-muted rounded-md transition-colors">Templates</Link>
            <Link to="/login" className="p-3 hover:bg-muted rounded-md transition-colors">Log In</Link>
            <Button asChild className="mt-2 bg-gradient-hero hover:bg-secondary">
              <Link to="/signup">Start Free</Link>
            </Button>
          </div>

          <div className="mt-auto flex justify-center gap-8 py-6">
            <a href="https://instagram.com" aria-label="Instagram" className="text-primary hover:text-secondary transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-primary hover:text-secondary transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="text-primary hover:text-secondary transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
