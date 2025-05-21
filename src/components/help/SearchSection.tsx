
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchSection = ({ searchQuery, setSearchQuery }: SearchSectionProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="bg-muted py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
        <div className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search for guides, tutorials, and FAQs..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={handleSearchChange}
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
        <p className="mt-4 text-muted-foreground">
          Popular searches: Pi wallet, custom themes, analytics, subscription
        </p>
      </div>
    </section>
  );
};

export default SearchSection;
