
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Droplink Blog</h1>
            <p className="text-xl text-muted-foreground">
              Latest news, tips, and insights from the Pi Network ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Getting Started with Pi Payments</h2>
                <p className="text-muted-foreground mb-4">
                  Learn how to set up and accept Pi payments on your Droplink profile
                </p>
                <div className="text-sm text-muted-foreground">March 15, 2024</div>
              </div>
            </article>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-secondary to-primary"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Maximizing Your Link Performance</h2>
                <p className="text-muted-foreground mb-4">
                  Tips and strategies to increase clicks and engagement on your links
                </p>
                <div className="text-sm text-muted-foreground">March 10, 2024</div>
              </div>
            </article>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground">More articles coming soon!</p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default Blog;
