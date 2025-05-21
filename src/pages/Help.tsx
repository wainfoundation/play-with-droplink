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
        { title: "Setting Up Pi Payments", slug: "setup-pi-payments" },
        { title: "Pi Transaction Fees", slug: "pi-transaction-fees" },
        { title: "Pi Tips and Donations", slug: "pi-tips-donations" },
        { title: "Pi Network Authentication", slug: "pi-network-auth" }
      ]
    },
    {
      name: "Analytics & Insights",
      icon: "📊",
      articles: [
        { title: "Understanding Your Dashboard", slug: "dashboard-analytics" },
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
  
  const popularArticles = [
    {
      title: "How to Connect Your Pi Wallet",
      excerpt: "Learn how to securely connect your Pi Network wallet to your Droplink account.",
      slug: "connect-pi-wallet",
      readTime: "3 min"
    },
    {
      title: "Optimizing Your Links for Maximum Engagement",
      excerpt: "Tips and strategies to increase click-through rates on your Droplink profile.",
      slug: "optimize-engagement",
      readTime: "5 min"
    },
    {
      title: "Setting Up Custom Themes",
      excerpt: "A step-by-step guide to personalizing your Droplink profile with custom themes.",
      slug: "custom-themes-guide",
      readTime: "4 min"
    },
    {
      title: "Understanding Analytics Dashboard",
      excerpt: "Make data-driven decisions by learning how to use our comprehensive analytics.",
      slug: "analytics-guide",
      readTime: "6 min"
    }
  ];
  
  const faqs = [
    {
      question: "What is Droplink?",
      answer: "Droplink is a link-in-bio platform built specifically for the Pi Network ecosystem. It allows creators to share all their content in one place, sell products or services, and collect Pi cryptocurrency payments or tips."
    },
    {
      question: "How much does Droplink cost?",
      answer: "Droplink offers three subscription tiers: Starter (6π per month), Pro (10π per month), and Premium (15π per month). Each tier includes different features and capabilities. All plans are billed annually, and we offer a 7-day free trial of Pro features for new users."
    },
    {
      question: "Can I use Droplink without a Pi Network account?",
      answer: "While you can create a basic Droplink account without Pi Network integration, many of our core features like payments and Pi authentication require a Pi Network account. We recommend connecting your Pi Network account to get the full Droplink experience."
    },
    {
      question: "How do I change my username?",
      answer: "You can change your username in Account Settings. Note that if you change your username, your profile URL will also change, which could affect existing links you've shared."
    },
    {
      question: "Can I schedule links to appear at specific times?",
      answer: "Yes, Pro and Premium users can schedule links to appear and disappear at specific dates and times. This is useful for limited-time promotions or time-sensitive content."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help Center - Droplink</title>
        <meta name="description" content="Get help with using Droplink, the Pi Network link-in-bio platform. Find tutorials, FAQs, and guides." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoriesSection categories={categories} />
        <PopularArticlesSection popularArticles={popularArticles} />
        <FAQSection faqs={faqs} />
        <ContactSupportSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Help;
