
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">See Droplink in Action</h1>
            <p className="text-xl text-muted-foreground">
              Explore our interactive demo to see how Droplink works
            </p>
          </div>
          
          <DemoPreview />
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Ready to create your own Pi Network profile?
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
