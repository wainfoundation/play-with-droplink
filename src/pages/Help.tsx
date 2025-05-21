
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help Center - Droplink</title>
        <meta name="description" content="Get help with using Droplink, the Pi Network link-in-bio platform. Find tutorials, FAQs, and guides." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
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
        
        {/* Categories */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Browse Help Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.slice(0, 3).map((article, i) => (
                      <li key={i}>
                        <Link to={`/help/${article.slug}`} className="text-primary hover:underline">
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {category.articles.length > 3 && (
                    <Link to={`/help/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block mt-3 text-sm font-medium hover:underline">
                      View all {category.articles.length} articles →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Articles */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Popular Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {popularArticles.map((article, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold mb-3">
                    <Link to={`/help/${article.slug}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/help/${article.slug}`} className="text-primary hover:underline font-medium">
                      Read More →
                    </Link>
                    <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-8">
              <Link to="/help/all-faqs">
                <Button variant="outline" size="lg">View All FAQs</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact Support */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg mb-8">Our support team is here for you. Reach out and we'll get back to you as soon as possible.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/community">Visit Community Forum</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Help;
