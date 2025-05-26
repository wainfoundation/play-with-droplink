
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">D</span>
      </div>
      <span className="text-xl font-bold text-gray-900">Droplink</span>
    </Link>
  );
};

export default NavLogo;
