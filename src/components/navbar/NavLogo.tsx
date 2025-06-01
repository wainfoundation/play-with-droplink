
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/mascot-favicon.svg" 
        alt="Play with Droplink Logo" 
        className="w-8 h-8"
      />
      <span className="text-xl font-bold text-primary">Play with Droplink</span>
    </Link>
  );
};

export default NavLogo;
