
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Gamepad2 } from "lucide-react";
import { completeFaqData, searchCompleteFAQs } from "@/data/completeFaqData";
import GoToTop from '@/components/GoToTop';

const AllFaqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredFAQs = searchQuery.trim() 
    ? searchCompleteFAQs(searchQuery)
    : selectedCategory 
    ? completeFaqData.find(cat => cat.name === selectedCategory)?.questions || []
    : [];

  const displayFAQs = searchQuery.trim() || selectedCategory ? filteredFAQs : completeFaqData;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Gaming FAQ - Complete Guide | Play with Droplink</title>
        <meta name="description" content="Find answers to all your questions about gaming with Droplink, Pi Network integration, payments, and gameplay features." />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <Button variant="ghost" asChild>
                <Link to="/help" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Help Center
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/play" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Back to Game
                </Link>
              </Button>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Gaming FAQ</h1>
            <p className="text-xl text-muted-foreground">
              Complete guide to gaming with Droplink and Pi Network integration
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search gaming FAQs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory(null);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          {!searchQuery && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All Categories
                </Button>
                {completeFaqData.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.name)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searchQuery.trim() || selectedCategory ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {searchQuery.trim() 
                    ? `Search Results (${filteredFAQs.length})`
                    : `${selectedCategory} (${filteredFAQs.length} questions)`
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
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
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No FAQs found matching your search.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory(null);
                      }}
                      className="mt-4"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Category View */
            <div className="space-y-6">
              {completeFaqData.map((category) => (
                <Card key={category.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.questions.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.name}-${index}`}>
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
              ))}
            </div>
          )}

          {/* Contact Support */}
          <Card className="mt-12">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our gaming support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/contact">Contact Gaming Support</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/play">Continue Playing</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <GoToTop />
      <Footer />
    </div>
  );
};

export default AllFaqs;
