
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Legal Information</h1>
            <p className="text-xl text-muted-foreground">
              Legal notices and compliance information for Droplink
            </p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
              <p className="text-muted-foreground mb-4">
                By using Droplink, you agree to our terms of service and privacy policy.
                Our platform is designed to help creators monetize their content through
                the Pi Network ecosystem.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We respect your privacy and are committed to protecting your personal
                information. We collect only the necessary data to provide our services
                and never share your information with third parties without consent.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Pi Network Compliance</h2>
              <p className="text-muted-foreground mb-4">
                Droplink operates in compliance with Pi Network's developer guidelines
                and community standards. All transactions are processed through Pi's
                official payment infrastructure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                For legal inquiries, please contact us at legal@droplink.space
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
