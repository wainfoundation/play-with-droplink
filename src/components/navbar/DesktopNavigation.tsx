
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Activity, Play, Heart } from "lucide-react";

const DesktopNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: null },
    { name: "Play My Boo", path: "/play", icon: Heart },
    { name: "Features", path: "/features", icon: null },
    { name: "Pricing", path: "/pricing", icon: null },
    { name: "Help", path: "/help", icon: null },
    { name: "Status", path: "/status", icon: Activity },
  ];

  return (
    <div className="hidden md:flex md:items-center md:space-x-6 ml-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
            isActive(item.path)
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavigation;
