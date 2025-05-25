
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchSection from "@/components/help/SearchSection";
import CategoriesSection from "@/components/help/CategoriesSection";
import PopularArticlesSection from "@/components/help/PopularArticlesSection";
import FAQSection from "@/components/help/FAQSection";
import ContactSupportSection from "@/components/help/ContactSupportSection";
import { faqData } from "@/data/faqData";
import { useHelpArticles } from "@/hooks/useHelpArticles";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { articles, loading } = useHelpArticles();

  // Group articles by category for CategoriesSection
  const categories = articles.reduce((acc: any[], article) => {
    const existingCategory = acc.find(cat => cat.name === article.category);
    if (existingCategory) {
      existingCategory.articles.push({
        title: article.title,
        slug: article.slug
      });
    } else {
      acc.push({
        name: article.category,
        icon: article.category === "Getting Started" ? "🚀" : 
              article.category === "Pi Payments" ? "💰" : 
              article.category === "Customization" ? "🎨" : "📚",
        articles: [{
          title: article.title,
          slug: article.slug
        }]
      });
    }
    return acc;
  }, []);

  // Get popular articles (first 4)
  const popularArticles = articles.slice(0, 4).map(article => ({
    title: article.title,
    excerpt: article.excerpt || "Learn more about this topic",
    slug: article.slug,
    readTime: article.read_time || "5 min"
  }));

  // Get FAQs from the first category (General) for the FAQ section
  const faqs = faqData[0]?.questions || [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <div className="animate-pulse">Loading help content...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">How can we help you?</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to your questions and get the support you need
            </p>
          </div>
          
          <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoriesSection categories={categories} />
          <PopularArticlesSection popularArticles={popularArticles} />
          <FAQSection faqs={faqs} />
          <ContactSupportSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
