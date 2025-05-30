import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { siteConfig } from "@/config/site";
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
import { Menu } from "lucide-react";
import NavLogo from "@/components/NavLogo";
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
      <div className="container flex h-14 items-center">
        <NavLogo />
        
        <DesktopNavigation />
        <MobileNavigation />
        
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
