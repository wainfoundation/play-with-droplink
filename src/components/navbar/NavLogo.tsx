
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/d9cb5b6a-4694-4a1a-befb-302445236f4f.png" 
        alt="Droplink Logo" 
        className="w-8 h-8"
      />
      <span className="text-xl font-bold text-sky-500">Droplink</span>
    </Link>
  );
};

export default NavLogo;
