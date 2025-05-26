
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/developers/HeroSection";
import ApiDocsSection from "@/components/developers/ApiDocsSection";
import SdksSection from "@/components/developers/SdksSection";
import WebhooksSection from "@/components/developers/WebhooksSection";
import PiIntegrationSection from "@/components/developers/PiIntegrationSection";
import GetStartedSection from "@/components/developers/GetStartedSection";
import DevCTASection from "@/components/developers/DevCTASection";

const DevelopersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Developers | Droplink</title>
        <meta name="description" content="Build with Droplink's API. Comprehensive documentation, SDKs, and developer tools for integrating link management into your applications." />
        <meta property="og:title" content="Developers | Droplink" />
        <meta property="og:description" content="Build with Droplink's API. Comprehensive documentation, SDKs, and developer tools." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ApiDocsSection />
        <SdksSection />
        <WebhooksSection />
        <PiIntegrationSection />
        <GetStartedSection />
        <DevCTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default DevelopersPage;
