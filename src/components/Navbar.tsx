
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, Pi } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navigationLinks = [
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
    { name: "Help", href: "/help" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-morphism" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-primary">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer hover:bg-primary/10">
                      <Settings className="mr-2 h-4 w-4 text-primary" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pi-dashboard" className="cursor-pointer hover:bg-primary/10">
                      <Pi className="mr-2 h-4 w-4 text-primary" />
                      Pi Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-destructive/10 text-destructive"
                    onSelect={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="cta-button">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/20 py-4 glass-morphism">
            <div className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-primary/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-primary/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/pi-dashboard"
                    className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-primary/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pi Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
