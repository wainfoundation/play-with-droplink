
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, MessageCircle, FileText, HelpCircle, Gamepad2, ArrowRight } from 'lucide-react';
import { helpArticles } from '@/data/helpArticles';
import SearchSection from '@/components/help/SearchSection';
import PopularArticlesSection from '@/components/help/PopularArticlesSection';
import CategoriesSection from '@/components/help/CategoriesSection';
import ContactSupportSection from '@/components/help/ContactSupportSection';
import GoToTop from '@/components/GoToTop';

const Help = () => {
  const popularArticles = helpArticles.slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Gaming Help Center - Play with Droplink</title>
        <meta name="description" content="Get help with Play with Droplink gaming platform. Find guides, FAQs, and support for Pi Network gaming, payments, and account management." />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Button variant="outline" asChild>
                <Link to="/play" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Back to Game
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-4">Gaming Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get help with gaming, Pi Network integration, payments, and account management
            </p>
          </div>

          {/* Search Section */}
          <SearchSection />

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/faqs">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Complete FAQ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive gaming questions and answers
                  </p>
                  <Badge variant="secondary">50+ Questions</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/contact">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Gaming Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help from our gaming experts
                  </p>
                  <Badge variant="secondary">24/7 Available</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/help/article/connecting-pi-wallet-gaming">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pi Wallet Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect and use Pi for gaming
                  </p>
                  <Badge variant="secondary">Step-by-step</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/help/article/character-setup">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Character Setup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your gaming character
                  </p>
                  <Badge variant="secondary">Beginner Friendly</Badge>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Popular Articles */}
          <PopularArticlesSection articles={popularArticles} />

          {/* Categories */}
          <CategoriesSection />

          {/* Contact Support */}
          <ContactSupportSection />
        </div>
      </main>
      
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Help;
