
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const HelpArticle = () => {
  const { slug } = useParams();

  // Mock article data - in a real app, this would come from a CMS or API
  const article = {
    title: "Getting Started with Pi Network Integration",
    content: `
      <h2>Setting Up Your Pi Network Integration</h2>
      <p>Welcome to Droplink! This guide will help you get started with Pi Network integration on your profile.</p>
      
      <h3>Step 1: Connect Your Pi Account</h3>
      <p>To begin, navigate to your dashboard and click on the "Connect Pi Network" button. This will open a secure authentication window where you can log in with your Pi Network credentials.</p>
      
      <h3>Step 2: Configure Pi Payments</h3>
      <p>Once connected, you can set up Pi payments for your products and services. Go to the Pi Dashboard and configure your payment settings.</p>
      
      <h3>Step 3: Add Your .pi Domain</h3>
      <p>If you have a .pi domain, you can connect it to your Droplink profile for a seamless experience in the Pi Browser.</p>
      
      <h3>Troubleshooting</h3>
      <p>If you encounter any issues, please check our FAQ section or contact our support team.</p>
    `,
    author: "Droplink Team",
    publishedAt: "2024-01-15",
    readTime: "5 min read"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Helmet>
        <title>{article.title} - Droplink Help</title>
        <meta name="description" content="Learn how to integrate Pi Network with your Droplink profile" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/help" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Help Center
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
                <span>{article.publishedAt}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Was this article helpful?</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">👍 Yes</Button>
              <Button variant="outline">👎 No</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpArticle;
