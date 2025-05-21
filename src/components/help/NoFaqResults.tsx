
import { Button } from "@/components/ui/button";

interface NoFaqResultsProps {
  clearSearch: () => void;
}

const NoFaqResults = ({ clearSearch }: NoFaqResultsProps) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground mb-6">Try a different search query or browse all categories below.</p>
      <Button variant="outline" onClick={clearSearch}>
        Clear Search
      </Button>
    </div>
  );
};

export default NoFaqResults;
