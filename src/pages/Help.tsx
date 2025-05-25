
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchSection from "@/components/help/SearchSection";
import CategoriesSection from "@/components/help/CategoriesSection";
import PopularArticlesSection from "@/components/help/PopularArticlesSection";
import FAQSection from "@/components/help/FAQSection";
import ContactSupportSection from "@/components/help/ContactSupportSection";
import { faqData } from "@/data/faqData";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for categories
  const categories = [
    {
      name: "Getting Started",
      icon: "🚀",
      articles: [
        { title: "How to create your first Droplink", slug: "create-first-droplink" },
        { title: "Setting up your Pi wallet", slug: "setup-pi-wallet" },
        { title: "Customizing your profile", slug: "customize-profile" },
        { title: "Adding your first links", slug: "add-first-links" }
      ]
    },
    {
      name: "Pi Payments",
      icon: "💰",
      articles: [
        { title: "Accepting Pi payments", slug: "accept-pi-payments" },
        { title: "Setting up tip jars", slug: "setup-tip-jars" },
        { title: "Managing payment settings", slug: "manage-payments" },
        { title: "Withdrawal process", slug: "withdrawal-process" }
      ]
    },
    {
      name: "Customization",
      icon: "🎨",
      articles: [
        { title: "Choosing themes", slug: "choosing-themes" },
        { title: "Custom CSS options", slug: "custom-css" },
        { title: "Brand colors and fonts", slug: "brand-customization" },
        { title: "Advanced styling", slug: "advanced-styling" }
      ]
    }
  ];

  // Sample popular articles
  const popularArticles = [
    {
      title: "Complete Guide to Pi Payments",
      excerpt: "Everything you need to know about accepting and managing Pi payments on your Droplink profile.",
      slug: "pi-payments-guide",
      readTime: "5 min"
    },
    {
      title: "Maximizing Link Clicks",
      excerpt: "Tips and strategies to increase engagement and clicks on your Droplink profile.",
      slug: "maximize-clicks",
      readTime: "3 min"
    },
    {
      title: "Setting Up Your First Store",
      excerpt: "Step-by-step guide to creating and managing your digital store on Droplink.",
      slug: "first-store-setup",
      readTime: "7 min"
    },
    {
      title: "Profile Optimization Tips",
      excerpt: "Best practices for creating an attractive and effective Droplink profile.",
      slug: "profile-optimization",
      readTime: "4 min"
    }
  ];

  // Get FAQs from the first category (General) for the FAQ section
  const faqs = faqData[0]?.questions || [];

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
