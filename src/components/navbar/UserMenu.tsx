
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" asChild>
        <Link to="/play">Play Game</Link>
      </Button>
      <Button asChild>
        <Link to="/games">Mini Games</Link>
      </Button>
    </div>
  );
};

export default UserMenu;
