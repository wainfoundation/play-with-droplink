import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import SearchSection from "@/components/help/SearchSection";
import CategoriesSection from "@/components/help/CategoriesSection";
import PopularArticlesSection from "@/components/help/PopularArticlesSection";
import FAQSection from "@/components/help/FAQSection";
import ContactSupportSection from "@/components/help/ContactSupportSection";
import SearchResults from "@/components/help/SearchResults";
import { getFeaturedArticles } from "@/data/helpArticles";
import { faqData } from "@/data/faqData";
import GoToTop from '@/components/GoToTop';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    {
      name: "Getting Started",
      icon: "🚀",
      articles: [
        { title: "Creating Your Droplink Account", slug: "creating-account" },
        { title: "Setting Up Your Profile", slug: "profile-setup" },
        { title: "Adding Your First Links", slug: "adding-links" },
        { title: "Understanding the Dashboard", slug: "dashboard-overview" },
        { title: "Mobile App vs. Web Platform", slug: "app-vs-web" }
      ]
    },
    {
      name: "Account Management",
      icon: "👤",
      articles: [
        { title: "Changing Your Username", slug: "change-username" },
        { title: "Managing Email Preferences", slug: "email-preferences" },
        { title: "Account Security Best Practices", slug: "security-best-practices" },
        { title: "Deleting Your Account", slug: "delete-account" },
        { title: "Managing Multiple Profiles", slug: "multiple-profiles" }
      ]
    },
    {
      name: "Customization",
      icon: "🎨",
      articles: [
        { title: "Choosing a Theme", slug: "choosing-theme" },
        { title: "Custom Colors and Fonts", slug: "custom-colors-fonts" },
        { title: "Adding Profile Photos", slug: "profile-photos" },
        { title: "Link Appearance Options", slug: "link-appearance" },
        { title: "Custom Domain Setup", slug: "custom-domain" }
      ]
    },
    {
      name: "Pi Network Integration",
      icon: "π",
      articles: [
        { title: "Connecting Your Pi Wallet", slug: "connecting-pi-wallet" },
        { title: "Setting Up Pi Payments", slug: "pi-payments-setup" },
        { title: "Pi Transaction Fees", slug: "pi-transaction-fees" },
        { title: "Pi Tips and Donations", slug: "pi-tips-donations" },
        { title: "Pi Network Authentication", slug: "pi-network-auth" }
      ]
    },
    {
      name: "Analytics & Insights",
      icon: "📊",
      articles: [
        { title: "Understanding Your Dashboard", slug: "analytics-guide" },
        { title: "Traffic Sources", slug: "traffic-sources" },
        { title: "Link Performance", slug: "link-performance" },
        { title: "Audience Demographics", slug: "audience-demographics" },
        { title: "Exporting Analytics Data", slug: "export-analytics" }
      ]
    },
    {
      name: "Billing & Subscription",
      icon: "💳",
      articles: [
        { title: "Subscription Plans", slug: "subscription-plans" },
        { title: "Payment Methods", slug: "payment-methods" },
        { title: "Upgrading or Downgrading", slug: "upgrade-downgrade" },
        { title: "Cancellation & Refunds", slug: "cancellation-refunds" },
        { title: "Pi Payment Issues", slug: "pi-payment-issues" }
      ]
    }
  ];
  
  const popularArticles = getFeaturedArticles();
  
  // Get sample FAQs from multiple categories
  const faqs = faqData.slice(0, 3).flatMap(category => 
    category.questions.slice(0, 2)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help Center - Droplink Support & Documentation</title>
        <meta name="description" content="Get comprehensive help with using Droplink, the Pi Network link-in-bio platform. Find tutorials, FAQs, guides, and support for all features." />
        <meta name="keywords" content="droplink help, pi network support, link in bio tutorial, droplink documentation, pi payments help" />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="container mx-auto px-4 py-8">
          {searchQuery.trim() ? (
            <SearchResults query={searchQuery} />
          ) : (
            <>
              <CategoriesSection categories={categories} />
              <PopularArticlesSection popularArticles={popularArticles} />
              <FAQSection faqs={faqs} />
            </>
          )}
        </div>
        
        <ContactSupportSection />
        <CTA />
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Help;
