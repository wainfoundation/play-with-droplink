
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Activity } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const location = useLocation();
  const { user, signOut } = useUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Templates", path: "/templates" },
    { name: "Stickers", path: "/stickers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Help", path: "/help" },
    { name: "Status", path: "/status", icon: Activity },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-3 py-2 text-base font-medium transition-colors ${
              isActive(item.path)
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            }`}
            onClick={onClose}
          >
            {item.name === "Stickers" && <Sparkles className="w-4 h-4 inline mr-1" />}
            {item.name === "Status" && <Activity className="w-4 h-4 inline mr-1" />}
            {item.name}
          </Link>
        ))}
        
        {user ? (
          <div className="border-t pt-3 mt-3">
            <Link
              to={`/@${user.username}`}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={onClose}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={onClose}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="border-t pt-3 mt-3 space-y-2">
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 text-base font-medium bg-primary text-white rounded-md text-center"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
