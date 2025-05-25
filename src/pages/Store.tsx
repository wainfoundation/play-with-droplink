
import { useParams } from "react-router-dom";
import StorePage from "@/components/store/StorePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Store = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="pt-16">
        <StorePage />
      </main>
      <Footer />
    </div>
  );
};

export default Store;
