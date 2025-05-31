
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import NavLogo from "@/components/navbar/NavLogo";
import DesktopNavigation from "@/components/navbar/DesktopNavigation";
import MobileNavigation from "@/components/navbar/MobileNavigation";
import UserMenu from "@/components/navbar/UserMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <NavLogo />
        
        <DesktopNavigation />
        <MobileNavigation />
        
        {/* Welcome Tour Button */}
        <div className="flex items-center gap-2 ml-auto mr-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/welcome" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Welcome Tour</span>
            </Link>
          </Button>
        </div>
        
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
