
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
        <Droplet className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-sky-500">Droplink</span>
    </Link>
  );
};

export default NavLogo;
