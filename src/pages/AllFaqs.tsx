
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSearch from "@/components/help/FaqSearch";
import FaqCategory from "@/components/help/FaqCategory";
import NoFaqResults from "@/components/help/NoFaqResults";
import ContactSupport from "@/components/help/ContactSupport";
import { faqData } from "@/data/faqData";

const AllFaqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() === "" ? faqData : faqData.map(category => {
    return {
      ...category,
      questions: category.questions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(category => category.questions.length > 0);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>All FAQs - Droplink Help Center</title>
        <meta name="description" content="Find answers to the most frequently asked questions about Droplink - the Pi Network link-in-bio platform." />
      </Helmet>
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to the most common questions about Droplink
            </p>
            
            <FaqSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {filteredFaqs.length === 0 ? (
            <NoFaqResults clearSearch={clearSearch} />
          ) : (
            filteredFaqs.map((category, index) => (
              <FaqCategory 
                key={index} 
                name={category.category} 
                questions={category.questions} 
              />
            ))
          )}
          
          <ContactSupport />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllFaqs;
