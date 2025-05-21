
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactSupportSection = () => {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-lg mb-8">Our support team is here for you. Reach out and we'll get back to you as soon as possible.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/community">Visit Community Forum</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSupportSection;
