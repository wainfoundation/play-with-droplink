import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import HelpArticleDetail from "@/components/help/HelpArticleDetail";
import GoToTop from '@/components/GoToTop';

const HelpArticle = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help Article - Droplink Help</title>
        <meta name="description" content="Get detailed help and guidance for using Droplink features" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <HelpArticleDetail />
      </main>
      
      <GoToTop />
      
      <Footer />
    </div>
  );
};

export default HelpArticle;
