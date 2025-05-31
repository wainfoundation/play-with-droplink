
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SearchSection from "@/components/help/SearchSection";
import CategoriesSection from "@/components/help/CategoriesSection";
import PopularArticlesSection from "@/components/help/PopularArticlesSection";
import FAQSection from "@/components/help/FAQSection";
import ContactSupportSection from "@/components/help/ContactSupportSection";
import SearchResults from "@/components/help/SearchResults";
import { getFeaturedArticles } from "@/data/helpArticles";
import { faqData } from "@/data/faqData";
import { HelpCircle, Shield, FileText } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    {
      name: "Getting Started",
      icon: "🚀",
      articles: [
        { title: "Creating Your Gaming Account", slug: "creating-account" },
        { title: "Setting Up Your Character", slug: "character-setup" },
        { title: "Playing Your First Game", slug: "first-game" },
        { title: "Understanding Game Categories", slug: "game-categories" },
        { title: "Mobile vs Desktop Gaming", slug: "mobile-vs-desktop" }
      ]
    },
    {
      name: "Game Management",
      icon: "🎮",
      articles: [
        { title: "Changing Your Gaming Character", slug: "change-character" },
        { title: "Managing Game Preferences", slug: "game-preferences" },
        { title: "Game Security & Fair Play", slug: "game-security" },
        { title: "Resetting Game Progress", slug: "reset-progress" },
        { title: "Multiple Character Profiles", slug: "multiple-characters" }
      ]
    },
    {
      name: "Customization & Characters",
      icon: "🎨",
      articles: [
        { title: "Choosing Character Appearance", slug: "character-appearance" },
        { title: "Custom Colors and Themes", slug: "custom-colors-themes" },
        { title: "Character Moods and Personalities", slug: "character-moods" },
        { title: "Unlocking Character Features", slug: "character-features" },
        { title: "Character Animation Settings", slug: "character-animations" }
      ]
    },
    {
      name: "Pi Network Gaming",
      icon: "π",
      articles: [
        { title: "Connecting Your Pi Wallet for Gaming", slug: "connecting-pi-wallet-gaming" },
        { title: "Pi Payments for Premium Games", slug: "pi-payments-games" },
        { title: "Pi Gaming Rewards System", slug: "pi-gaming-rewards" },
        { title: "Pi Tips for Game Achievements", slug: "pi-tips-gaming" },
        { title: "Pi Network Gaming Authentication", slug: "pi-network-gaming-auth" }
      ]
    },
    {
      name: "Game Analytics & Progress",
      icon: "📊",
      articles: [
        { title: "Understanding Your Gaming Dashboard", slug: "gaming-analytics-guide" },
        { title: "Game Score Tracking", slug: "game-score-tracking" },
        { title: "Achievement Progress", slug: "achievement-progress" },
        { title: "Gaming Performance Metrics", slug: "gaming-performance" },
        { title: "Exporting Gaming Data", slug: "export-gaming-data" }
      ]
    },
    {
      name: "Subscriptions & Premium Games",
      icon: "💳",
      articles: [
        { title: "Gaming Subscription Plans", slug: "gaming-subscription-plans" },
        { title: "Premium Game Access", slug: "premium-game-access" },
        { title: "Upgrading for More Games", slug: "upgrade-more-games" },
        { title: "Gaming Subscription Cancellation", slug: "gaming-cancellation" },
        { title: "Pi Payment Issues for Games", slug: "pi-payment-gaming-issues" }
      ]
    }
  ];
  
  const popularArticles = getFeaturedArticles().map(article => ({
    ...article,
    title: article.title.replace("Droplink", "Play with Droplink Gaming"),
    excerpt: article.excerpt.replace("link-in-bio", "gaming").replace("links", "games")
  }));
  
  // Get sample FAQs focused on gaming
  const gamingFaqs = [
    {
      question: "How do I start playing games with Droplink?",
      answer: "Simply visit the Play with Droplink page, choose your character, and start playing from our collection of 50+ games across puzzle, action, trivia, and creative categories."
    },
    {
      question: "What games are available for free?",
      answer: "Free users can access basic puzzle games, simple action games, and limited trivia questions. Premium subscribers get access to all 50+ games including advanced puzzles, multiplayer modes, and exclusive creative tools."
    },
    {
      question: "How do Pi payments work for gaming?",
      answer: "You can use Pi cryptocurrency to unlock premium games, purchase hints, buy power-ups, and tip other players. All transactions are processed securely through the Pi Network."
    },
    {
      question: "Can I play games on mobile?",
      answer: "Yes! All games are optimized for mobile play with full-screen support when using Pi Browser on your mobile device."
    },
    {
      question: "How do I earn Pi rewards from gaming?",
      answer: "Complete daily challenges, achieve high scores, watch rewarded ads, and participate in community events to earn Pi rewards that are automatically added to your Pi wallet."
    },
    {
      question: "What happens if I run out of hints during a game?",
      answer: "When you run out of hints, you can watch a Pi Ad to get 3 more hints for free, or pay 1 Pi to continue playing immediately. This ensures fair gameplay while supporting the platform."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Gaming Help Center - Play with Droplink Support</title>
        <meta name="description" content="Get comprehensive help with Play with Droplink gaming platform. Find tutorials, FAQs, guides, and support for all gaming features and Pi Network integration." />
        <meta name="keywords" content="droplink gaming help, pi network gaming support, play with droplink tutorial, gaming documentation, pi payments gaming help" />
      </Helmet>
      
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-end">
            <nav className="flex items-center gap-6">
              <Link 
                to="/help" 
                className="flex items-center gap-2 text-primary font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="container mx-auto px-4 py-8">
          {searchQuery.trim() ? (
            <SearchResults query={searchQuery} />
          ) : (
            <>
              <CategoriesSection categories={categories} />
              <PopularArticlesSection popularArticles={popularArticles} />
              <FAQSection faqs={gamingFaqs} />
            </>
          )}
        </div>
        
        <ContactSupportSection />
      </main>
    </div>
  );
};

export default Help;
