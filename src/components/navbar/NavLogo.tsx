
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/fd8498db-0cee-4181-93de-ba692558b37a.png" 
        alt="Droplink Logo" 
        className="w-8 h-8"
      />
      <span className="text-xl font-bold text-sky-500">Droplink</span>
    </Link>
  );
};

export default NavLogo;
