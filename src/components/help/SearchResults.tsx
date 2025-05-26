
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchArticles } from "@/data/helpArticles";
import { searchFAQs } from "@/data/faqData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const articleResults = searchArticles(query);
  const faqResults = searchFAQs(query);
  
  if (!query.trim()) return null;
  
  const totalResults = articleResults.length + faqResults.reduce((total, category) => total + category.questions.length, 0);
  
  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No results found for "{query}"</h2>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search terms or browse our help categories below.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Search Results</h2>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      {/* Article Results */}
      {articleResults.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-6">Help Articles ({articleResults.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articleResults.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">
                    <Link to={`/help/article/${article.id}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Droplink Team
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Results */}
      {faqResults.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions ({faqResults.reduce((total, category) => total + category.questions.length, 0)})
          </h3>
          <Card>
            <CardContent className="pt-6">
              {faqResults.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-6 last:mb-0">
                  <h4 className="text-lg font-medium mb-4 text-primary">{category.category}</h4>
                  <Accordion type="single" collapsible>
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default SearchResults;
