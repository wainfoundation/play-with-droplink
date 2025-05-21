
import { Loader2 } from "lucide-react";

const LinksLoadingState = () => {
  return (
    <div className="h-40 flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
    </div>
  );
};

export default LinksLoadingState;
