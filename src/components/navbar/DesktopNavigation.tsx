
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, HelpCircle } from "lucide-react";

const DesktopNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Play with Droplink", path: "/play", icon: Gamepad2 },
    { name: "Help", path: "/help", icon: HelpCircle },
  ];

  return (
    <div className="hidden md:flex md:items-center md:space-x-6 ml-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
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
