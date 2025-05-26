
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

const DesktopNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Templates", path: "/templates" },
    { name: "Stickers", path: "/stickers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Help", path: "/help" },
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            isActive(item.path)
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          {item.name === "Stickers" && <Sparkles className="w-4 h-4 inline mr-1" />}
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavigation;
