
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import HelpArticleDetail from "@/components/help/HelpArticleDetail";

const HelpArticle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Helmet>
        <title>Help Article - Droplink Help</title>
        <meta name="description" content="Get detailed help and guidance for using Droplink features" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <HelpArticleDetail />
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpArticle;
