
import { Button } from "@/components/ui/button";
import { PlusCircle, Link as LinkIcon } from "lucide-react";

interface EmptyLinksStateProps {
  onAddClick: () => void;
}

const EmptyLinksState = ({ onAddClick }: EmptyLinksStateProps) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-3">
        <LinkIcon className="h-10 w-10 text-blue-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No links yet</h3>
      <p className="text-gray-600 mb-4">Start by adding your first link below</p>
      <Button 
        className="bg-primary hover:bg-primary/90"
        onClick={onAddClick}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Your First Link
      </Button>
    </div>
  );
};

export default EmptyLinksState;
