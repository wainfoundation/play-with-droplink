
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PiBrowserPrompt from "@/components/PiBrowserPrompt";
import NavLogo from "./navbar/NavLogo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import UserMenu from "./navbar/UserMenu";
import MobileNavigation from "./navbar/MobileNavigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLogo />
            <DesktopNavigation />

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <UserMenu />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        <MobileNavigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </nav>
      <PiBrowserPrompt />
    </>
  );
};

export default Navbar;
