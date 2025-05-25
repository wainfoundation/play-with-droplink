
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchSection from "@/components/help/SearchSection";
import CategoriesSection from "@/components/help/CategoriesSection";
import PopularArticlesSection from "@/components/help/PopularArticlesSection";
import FAQSection from "@/components/help/FAQSection";
import ContactSupportSection from "@/components/help/ContactSupportSection";

const Help = () => {
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
          
          <SearchSection />
          <CategoriesSection />
          <PopularArticlesSection />
          <FAQSection />
          <ContactSupportSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
