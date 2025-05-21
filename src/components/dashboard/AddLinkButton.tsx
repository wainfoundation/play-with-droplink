
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddLinkButtonProps {
  onClick: () => void;
}

const AddLinkButton = ({ onClick }: AddLinkButtonProps) => {
  return (
    <Button 
      className="w-full mt-4 bg-primary hover:bg-primary/90"
      onClick={onClick}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add New Link
    </Button>
  );
};

export default AddLinkButton;
