
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Beautiful Templates</h1>
            <p className="text-xl text-muted-foreground">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Template previews */}
            {[1, 2, 3, 4, 5, 6].map((template) => (
              <div key={template} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Template {template}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">Modern Template {template}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Clean and professional design perfect for creators and businesses
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Free</span>
                    <button className="text-primary hover:text-primary/80 font-medium text-sm">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              More templates added regularly. Have a design request?
            </p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default Templates;
