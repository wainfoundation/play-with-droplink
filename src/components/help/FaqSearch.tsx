
import { Input } from "@/components/ui/input";

interface FaqSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FaqSearch = ({ searchQuery, setSearchQuery }: FaqSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search FAQs..."
          className="pl-10 py-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default FaqSearch;
