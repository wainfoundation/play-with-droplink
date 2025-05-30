import { Link } from "react-router-dom";
import { Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { searchArticles } from "@/data/helpArticles";
import { searchFAQs } from "@/data/faqData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const articles = searchArticles(query);
  const faqs = searchFAQs(query);
  
  const totalResults = articles.length + faqs.length;

  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No results found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find any results for "{query}". Try searching with different keywords.
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">Pi wallet</Badge>
            <Badge variant="outline">themes</Badge>
            <Badge variant="outline">analytics</Badge>
            <Badge variant="outline">subscription</Badge>
            <Badge variant="outline">payments</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Search Results</h2>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      {/* Articles */}
      {articles.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold mb-6">Help Articles ({articles.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg">
                    <Link 
                      to={`/help/article/${article.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Droplink Team</span>
                      </div>
                    </div>
                    <Link 
                      to={`/help/article/${article.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                  
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions ({faqs.length})</h3>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Helpful Links */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Didn't find what you're looking for?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Try browsing our help categories or contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link 
                to="/help"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Browse Categories
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResults;
