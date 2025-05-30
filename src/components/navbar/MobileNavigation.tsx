
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const MobileNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button className="p-2 rounded-sm">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Navigation Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="pl-10">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3">
          <Link
            to="/"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/templates"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Templates
          </Link>
          <Link
            to="/pricing"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/help"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/community"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Community
          </Link>
          <Link
            to="/forums"
            className="block px-2 py-1 text-lg"
            onClick={() => setOpen(false)}
          >
            Forums
          </Link>
          {user ? (
            <>
              <Link
                to="/admin"
                className="block px-2 py-1 text-lg"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="block px-2 py-1 text-lg w-full text-left"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-2 py-1 text-lg"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-2 py-1 text-lg"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
